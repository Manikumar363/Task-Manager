# Cent Stage — Task Manager (Full-stack Assessment)

Lightweight task manager built for the Cent Stage full-stack assessment.

**Tech stack**

- Frontend: Next.js, React, Tailwind CSS, SWR
- Backend: Node.js, Express, Sequelize (Postgres or sqlite fallback)
- Database: PostgreSQL (recommended) or local sqlite fallback for quick dev
- Testing: Jest + Supertest (backend)
- Optional: Dockerfile provided for backend

Ports used (defaults)

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`

Quick start (single-machine)

1. Clone the repo

```bash
git clone <your-repo-url> "D:/Dev Projects/Assignment"
cd "D:/Dev Projects/Assignment"
```

2. Backend — install & run (sqlite fallback)

```bash
cd backend
npm install
# If you want to use the sqlite fallback (no Postgres needed):
rm -f .env
npm run dev
```

The backend will create a `dev.sqlite` file and start on port `4000` by default. If you prefer to connect to Postgres, copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL`.

3. Frontend — install & run

```bash
cd frontend
npm install
cp .env.example .env.local
# edit .env.local if your backend runs on a different URL
npm run dev
```

Open `http://localhost:3000` to use the app.

Environment variables

- Backend: `backend/.env` (example: `DATABASE_URL`, `PORT`)
- Frontend: `frontend/.env.local` (example: `NEXT_PUBLIC_API_URL=http://localhost:4000`)

Testing (backend)

```bash
cd backend
npm test
```

Docker (backend)

Build and run the backend container (you must supply a `DATABASE_URL` env variable to connect Postgres if not using sqlite inside container):

```bash
cd backend
docker build -t cent-stage-backend .
docker run -e DATABASE_URL="<your-db-url>" -p 4000:4000 cent-stage-backend
```

Notes & troubleshooting

- CORS: backend enables CORS during development so `localhost:3000` can call the API.
- DB fallback: if `DATABASE_URL` is not set the backend uses a local sqlite file `dev.sqlite` for convenience.
- If the frontend shows `Failed to fetch`, ensure the backend is running and `NEXT_PUBLIC_API_URL` points to the correct address.
- To reset the sqlite DB remove `backend/dev.sqlite` and restart the backend.

What you can improve (suggestions)

- Add migrations (Sequelize CLI) instead of `sequelize.sync()` for production.
- Add Docker Compose to run both services together.
- Add authentication and user separation for tasks.

Files of interest

- `backend/src` — Express server, Sequelize models, routes, tests
- `frontend/pages` — Next.js pages and UI
- `frontend/styles` — Tailwind globals and theme

License

- MIT-style (add your license file if you need one)
