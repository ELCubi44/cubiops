# Compila la web estática, sube /var/www/cubiops y el API de contacto en localhost:3017.
# No toca miapi (8080), barbershop-haf (3000), MySQL ni Postgres.
# Requiere .local/deploy.env y .local/tools/pscp.exe + plink.exe

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $repoRoot '.local\deploy.env'
$toolsDir = Join-Path $repoRoot '.local\tools'
$pscp = Join-Path $toolsDir 'pscp.exe'
$plink = Join-Path $toolsDir 'plink.exe'

function Read-DeployEnv {
    param([string]$Path)
    if (-not (Test-Path $Path)) {
        throw "No existe $Path. Copia .local/deploy.env.example a .local/deploy.env."
    }
    $vars = @{}
    Get-Content $Path | ForEach-Object {
        $line = $_.Trim()
        if ($line -eq '' -or $line.StartsWith('#')) { return }
        $idx = $line.IndexOf('=')
        if ($idx -lt 1) { return }
        $vars[$line.Substring(0, $idx).Trim()] = $line.Substring($idx + 1).Trim()
    }
    return $vars
}

function Ensure-PuttyTools {
    param([string]$Dir)
    New-Item -ItemType Directory -Force -Path $Dir | Out-Null
    $base = 'https://the.earth.li/~sgtatham/putty/latest/w64'
    foreach ($name in @('pscp.exe', 'plink.exe')) {
        $dest = Join-Path $Dir $name
        if (-not (Test-Path $dest)) {
            Write-Host "Descargando $name..."
            Invoke-WebRequest -Uri "$base/$name" -OutFile $dest
        }
    }
}

function Invoke-Remote {
    param($Plink, $HostName, $Port, $User, $Password, $HostKey, $Command)
    & $Plink -batch -ssh -P $Port -hostkey $HostKey -pw $Password "${User}@${HostName}" $Command
    if ($LASTEXITCODE -ne 0) {
        throw "Comando remoto falló (exit $LASTEXITCODE)"
    }
}

function Copy-Remote {
    param($Pscp, $HostName, $Port, $User, $Password, $HostKey, $Source, $Destination)
    & $Pscp -batch -P $Port -hostkey $HostKey -pw $Password -r $Source "${User}@${HostName}:$Destination"
    if ($LASTEXITCODE -ne 0) {
        throw "Subida falló: $Source -> $Destination"
    }
}

$config = Read-DeployEnv -Path $envFile
Ensure-PuttyTools -Dir $toolsDir

$hostKey = $config['DEPLOY_SSH_HOSTKEY']
if ([string]::IsNullOrWhiteSpace($hostKey)) {
    $hostKey = 'SHA256:hY3FHVobNY7HffYE9Dv2vv/wnnaypHVytyvto4YOlVI'
}

$hostName = $config['DEPLOY_SSH_HOST']
$port = [int]$config['DEPLOY_SSH_PORT']
$user = $config['DEPLOY_SSH_USER']
$password = $config['DEPLOY_SSH_PASSWORD']
$webDir = if ($config['DEPLOY_WEB_DIR']) { $config['DEPLOY_WEB_DIR'].TrimEnd('/') } else { '/var/www/cubiops' }
$contactDir = if ($config['DEPLOY_CONTACT_DIR']) { $config['DEPLOY_CONTACT_DIR'].TrimEnd('/') } else { '/opt/cubiops-contact' }

$stamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$dist = Join-Path $repoRoot 'dist'
$caddySnippet = Join-Path $repoRoot 'deploy\caddy\cubiops.caddy'
$unitFile = Join-Path $repoRoot 'deploy\systemd\cubiops-contact.service'
$serverOut = Join-Path $repoRoot 'dist-server\contact-api.cjs'

Write-Host '==> 1/6 Comprobando servicios ajenos en el VPS...'
Invoke-Remote $plink $hostName $port $user $password $hostKey @'
set -e
echo "miapi=$(systemctl is-active miapi || true)"
echo "barbershop=$(systemctl is-active barbershop-haf || true)"
echo "caddy=$(systemctl is-active caddy || true)"
echo "mysql=$(systemctl is-active mysql || true)"
echo "postgres=$(systemctl is-active postgresql@16-main || true)"
ss -lntp | grep 8080 || true
ss -lntp | grep 3000 || true
ss -lntp | grep ':80 ' || true
ss -lntp | grep ':443' || true
'@

Write-Host '==> 2/6 Compilando web y API de contacto...'
Push-Location $repoRoot
try {
    npm run build
    npm run build:contact
} finally {
    Pop-Location
}

if (-not (Test-Path (Join-Path $dist 'index.html'))) {
    throw 'La compilación no generó dist/index.html'
}
if (-not (Test-Path $serverOut)) {
    throw 'La compilación no generó dist-server/contact-api.cjs'
}

Write-Host '==> 3/6 Copia de seguridad remota...'
Invoke-Remote $plink $hostName $port $user $password $hostKey @"
set -e
stamp='$stamp'
mkdir -p /var/backups/cubiops
if [ -d /var/www/cubiops ]; then
  tar -C /var/www -czf /var/backups/cubiops/web-\$stamp.tgz cubiops
fi
cp -a /etc/caddy/Caddyfile /var/backups/cubiops/Caddyfile-\$stamp
if [ -d /opt/cubiops-contact ]; then
  tar -C /opt -czf /var/backups/cubiops/contact-\$stamp.tgz cubiops-contact || true
fi
mkdir -p /var/www/cubiops /opt/cubiops-contact /tmp/cubiops-upload
echo BACKUP_OK \$stamp
"@

Write-Host '==> 4/6 Subiendo archivos...'
$remoteTmp = "/tmp/cubiops-upload/$stamp"
$bundle = Join-Path $env:TEMP "cubiops-site-$stamp.tgz"
if (Test-Path $bundle) { Remove-Item $bundle -Force }
tar -czf $bundle -C $dist .
Invoke-Remote $plink $hostName $port $user $password $hostKey "mkdir -p $remoteTmp"
Copy-Remote $pscp $hostName $port $user $password $hostKey $bundle "$remoteTmp/site.tgz"
Copy-Remote $pscp $hostName $port $user $password $hostKey $serverOut "$remoteTmp/contact-api.cjs"
Copy-Remote $pscp $hostName $port $user $password $hostKey $caddySnippet "$remoteTmp/cubiops.caddy"
Copy-Remote $pscp $hostName $port $user $password $hostKey $unitFile "$remoteTmp/cubiops-contact.service"
$publishScript = Join-Path $repoRoot 'deploy\remote-publish.sh'
Copy-Remote $pscp $hostName $port $user $password $hostKey $publishScript "$remoteTmp/remote-publish.sh"
$smtpEnv = Join-Path $env:TEMP "cubiops-smtp-$stamp.env"
@(
    "SMTP_HOST=$($config['SMTP_HOST'])"
    "SMTP_PORT=$($config['SMTP_PORT'])"
    "SMTP_SECURE=$($config['SMTP_SECURE'])"
    "SMTP_USER=$($config['SMTP_USER'])"
    "SMTP_PASS=$($config['SMTP_PASS'])"
    "SMTP_FROM=$($config['SMTP_FROM'])"
    "CONTACT_TO=$($config['CONTACT_TO'])"
) | Set-Content -Path $smtpEnv -Encoding ascii
Copy-Remote $pscp $hostName $port $user $password $hostKey $smtpEnv "$remoteTmp/smtp.env"
Remove-Item $smtpEnv -Force
Remove-Item $bundle -Force

Write-Host '==> 5/6 Publicando sin tocar otros sitios...'
Invoke-Remote $plink $hostName $port $user $password $hostKey "tr -d '\r' < $remoteTmp/remote-publish.sh > $remoteTmp/publish.sh && bash $remoteTmp/publish.sh $remoteTmp"

Write-Host '==> 6/6 Verificando que los demás servicios siguen activos...'
Invoke-Remote $plink $hostName $port $user $password $hostKey @'
set -e
for s in miapi barbershop-haf caddy mysql postgresql@16-main cubiops-contact; do
  echo "$s=$(systemctl is-active $s || true)"
done
curl -sS -o /dev/null -w "eternalxi_api=%{http_code}\n" http://127.0.0.1:8080 || true
curl -sS -o /dev/null -w "barbershop=%{http_code}\n" http://127.0.0.1:3000 || true
curl -sS -o /dev/null -w "cubiops_contact=%{http_code}\n" http://127.0.0.1:3017/ || true
curl -sS -o /dev/null -w "caddy_local_http=%{http_code}\n" -H "Host: cubiops.com" http://127.0.0.1/ || true
'@

Write-Host ''
Write-Host "Publicado. Rollback web: mv /var/www/cubiops.prev $webDir && systemctl reload caddy"
Write-Host "Backups en /var/backups/cubiops/*-$stamp"
