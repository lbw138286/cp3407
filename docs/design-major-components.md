# Design of Major Components

The final system consists of a responsive browser UI, Node.js HTTP API, security/authentication service, business/report logic and an executable SQLite relational database.

- `src/`: final UI and pure business logic.
- `server/server.js`: API routes, validation, authorization and static file serving.
- `server/security.js`: scrypt password hashing and session-token functions.
- `server/db.js`: relational schema, migrations and seed data.
- `database/schema.sql`: readable executable schema.
- `design/`: editable class, sequence, ER and UI wireframe sources.
- `tests/`: unit, mock and database/API integration tests.

See `docs/online-design-tool-evidence.md` for online Mermaid editor links.
