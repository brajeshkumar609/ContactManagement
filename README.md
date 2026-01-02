# ContactManagement

Simple MERN Contact Management demo app.

## Quick start ✅

1. Start MongoDB with Docker Compose (from repo root):

```bash
docker-compose up -d
```

2. Start backend:

```bash
cd backend
npm install
cp .env.example .env   # set MONGODB_URI if needed
npm run dev
```

3. Start frontend:

```bash
cd frontend
npm install
npm run dev
```

4. Open http://localhost:3000 and try submitting a contact. The backend API runs at http://localhost:5000 by default.

---

## Notes
- Backend: Express + Mongoose
- Frontend: React (Vite) + Bootstrap for quick styling
- Bonus features: delete contact, success messages, simple validation

## Security Notes 🔒
- Set `NODE_ENV=production` and `CORS_ORIGIN` in your backend `.env` in production to restrict cross-origin requests.
- Use a managed MongoDB or secure your Mongo instance and set `MONGODB_URI` to a production database with credentials.
- The backend includes basic protections: Helmet for HTTP headers, body size limits, rate limiting, and input sanitization to help prevent NoSQL injection and XSS. These are sensible defaults for a demo app but review them for a real production deployment.
- When sharing code, **never** check `.env` or secrets into the repository. Use environment variables or a secrets manager.

