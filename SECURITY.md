Security checklist

If you suspect any credentials were exposed, follow these steps immediately:

- Rotate/revoke any potentially leaked tokens (GitHub PATs, cloud provider keys).
- Revoke any Personal Access Tokens in GitHub: Settings → Developer settings → Personal access tokens.
- Enable Two-Factor Authentication (2FA) on your GitHub account.
- Enable branch protection rules for `main` (require PR reviews and status checks).
- Enable Dependabot alerts and security updates in repository settings.
- Use the included secret scanning (`.github/workflows/secret-scan.yml`) and local `pre-commit` hooks to prevent future leaks.
- If you need help, contact your security team and rotate all credentials used by CI or automation.

Local steps to run now:

- Install pre-commit: `pip install pre-commit` then run `pre-commit install` and `pre-commit run --all-files`.
- Remove any local environment variables that contain secrets and rotate those secrets in the provider (e.g. GitHub, AWS).

If you'd like, I can:

- Enable branch protection and security features via the GitHub API (requires admin access/auth).
- Create a Dependabot config to keep dependencies up to date.
- Purge additional large files or run an extended secrets audit.
