# Security and Authentication

The previous browser-only demonstration has been replaced by a server-side authentication design.

- Registration validates name, email and password strength.
- Passwords are never stored in plain text; each password has a random salt and a scrypt-derived hash.
- Login uses timing-safe hash comparison.
- Successful login creates an eight-hour random session token; the database stores only its SHA-256 hash.
- Disabled accounts cannot log in.
- User and administrator routes are protected by server-side authorization.
- Security headers include Content-Security-Policy, X-Content-Type-Options, X-Frame-Options and Referrer-Policy.
- Production deployment must use HTTPS and a strong `ADMIN_PASSWORD` environment variable.
