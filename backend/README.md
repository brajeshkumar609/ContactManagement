# Contact Management Backend

Simple Express + Mongoose backend for the Contact Management app.

Setup

1. Copy `.env.example` to `.env` and update `MONGODB_URI` if needed.
2. Start MongoDB (see root `docker-compose.yml`) or use your own Mongo instance.
3. Install dependencies and start server:

```bash
cd backend
npm install
npm run dev
```

API Endpoints

- GET /api/contacts - list contacts
- POST /api/contacts - create contact (body: name, email, phone, message)
- DELETE /api/contacts/:id - delete a contact

Seeding the database (dev)

A small seed script is provided to insert dummy contacts for development.

```bash
cd backend
npm install
npm run seed   # inserts 20 dummy contacts by default
```

You can change the number inserted by modifying `scripts/seed.js` or running it with NODE_ENV or direct modifications.
