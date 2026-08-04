# Deployment

## Local production-style demonstration
1. Install Node.js 22 or later.
2. Run `npm start`.
3. Open `http://127.0.0.1:3000`.
4. The SQLite database is created at `data/expense-tracker.sqlite`.

## Docker
`docker build -t cp3407-expense-tracker .`
`docker run --rm -p 3000:3000 -v cp3407-data:/app/data cp3407-expense-tracker`

## Cloud deployment
This repository is ready for a Node.js-capable service such as Azure App Service. Configure persistent storage for `/app/data`, set `HOST=0.0.0.0`, and replace the default administrator password through `ADMIN_PASSWORD`. A public URL and cloud credentials must be created by the repository owner; they cannot be generated inside the submitted ZIP.

GitHub Pages should be used for project documentation only. The application requires a Node.js server and relational database, so it must be deployed to a server-capable platform.
