# Cent Stage - Backend

This is the backend API for the Cent Stage task manager assessment.

Quick start

- Copy `.env.example` to `.env` and set `DATABASE_URL` to your Postgres connection string.
- Install dependencies:

```bash
cd backend
npm install
```

- Start server:

```bash
npm run dev
```

API endpoints

- `GET /tasks` - list tasks
- `POST /tasks` - create task { title, description }
- `PATCH /tasks/:id/toggle` - toggle status between `pending` and `done`
- `DELETE /tasks/:id` - delete task

Tests

```bash
npm test
```

Docker

Build and run:

```bash
docker build -t cent-stage-backend .
docker run -e DATABASE_URL="<your-db-url>" -p 4000:4000 cent-stage-backend
```
