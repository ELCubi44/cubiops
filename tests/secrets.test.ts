import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const gitignore = readFileSync('.gitignore', 'utf8');
const envExample = readFileSync('.env.example', 'utf8');

describe('secretos fuera de git', () => {
  it('ignora .env y .local', () => {
    expect(gitignore).toContain('.env');
    expect(gitignore).toContain('.local/');
  });

  it('el ejemplo no contiene contraseñas SMTP', () => {
    expect(envExample).toContain('SMTP_PASS=');
    expect(envExample).not.toMatch(/SMTP_PASS=.+/);
  });
});
