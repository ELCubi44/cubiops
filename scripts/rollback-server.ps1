# Restaura la web anterior y recarga Caddy. No toca miapi ni Barber Shop.

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$envFile = Join-Path $repoRoot '.local\deploy.env'
$plink = Join-Path $repoRoot '.local\tools\plink.exe'

$vars = @{}
Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -eq '' -or $line.StartsWith('#')) { return }
    $idx = $line.IndexOf('=')
    if ($idx -lt 1) { return }
    $vars[$line.Substring(0, $idx).Trim()] = $line.Substring($idx + 1).Trim()
}

$hostKey = $vars['DEPLOY_SSH_HOSTKEY']
if ([string]::IsNullOrWhiteSpace($hostKey)) {
    $hostKey = 'SHA256:hY3FHVobNY7HffYE9Dv2vv/wnnaypHVytyvto4YOlVI'
}

& $plink -batch -ssh -P $vars['DEPLOY_SSH_PORT'] -hostkey $hostKey -pw $vars['DEPLOY_SSH_PASSWORD'] "$($vars['DEPLOY_SSH_USER'])@$($vars['DEPLOY_SSH_HOST'])" @'
set -e
if [ ! -d /var/www/cubiops.prev ]; then
  echo "No hay /var/www/cubiops.prev"
  exit 1
fi
rm -rf /var/www/cubiops.failed
if [ -d /var/www/cubiops ]; then mv /var/www/cubiops /var/www/cubiops.failed; fi
mv /var/www/cubiops.prev /var/www/cubiops
systemctl reload caddy
echo ROLLBACK_OK
'@
