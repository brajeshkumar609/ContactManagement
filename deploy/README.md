Vercel + MongoDB Atlas deployment (quick start)

Overview
- Frontend: Vite app in `frontend/` (build -> `dist/`)
- Backend: Serverless API under `api/` (Node functions using Mongoose)
- DB: MongoDB Atlas free tier

Steps
1) Create a MongoDB Atlas free cluster
   - https://www.mongodb.com/cloud/atlas/register
   - Create a database user and copy the connection string. Example:
     mongodb+srv://<user>:<password>@cluster0.abcd.mongodb.net/contacts?retryWrites=true&w=majority
   - Update the network access IP whitelist (add your machine or 0.0.0.0/0 during setup).

2) Connect repo to Vercel
   - Go to https://vercel.com/new and choose "Import Git Repository" → select this repository
   - Set the project root to the repository root (Vercel will pick up `frontend` and `api` according to `vercel.json`)

3) Configure environment variables in Vercel (Project Settings → Environment Variables)
   - `MONGODB_URI` = your Atlas connection string (make sure to replace <password>)
   - `CORS_ORIGIN` = your frontend URL (e.g., https://<your-project>.vercel.app) or `*` for testing
   - `NODE_ENV` = production

4) Deploy
   - Trigger a deploy by pushing to `main` or using Vercel UI.

Local development
- To run the backend locally (uses `MONGODB_URI` from your environment):
  - `cd backend && npm install && npm start`
- To run the frontend locally and proxy API requests to the serverless functions, use Vite dev server and set `VITE_API_URL=http://localhost:5000` (or run the local backend in `backend/`).

Notes
- Keep `MONGODB_URI` secret; do not check it into source control.
- Set branch protection rules and required status checks (gitleaks workflow) before enabling auto-merge.

If you want, I can create the Vercel project and set the environment variables for you — I will need you to re-authenticate the `vercel` CLI or add me/collaborator access to the project on Vercel.
