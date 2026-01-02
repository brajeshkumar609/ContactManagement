# Contact Management Frontend

A small React app (Vite) for submitting and viewing contacts.

Run

```bash
cd frontend
npm install
npm run dev
```

By default the frontend expects backend at `http://localhost:5000` (set using `VITE_API_URL`).

Demo (GitHub Pages) mode

The app includes a demo mode that runs entirely in the browser using localStorage (no backend required). To build and publish the frontend to GitHub Pages:

1. Install dev deps and build for demo:

```bash
cd frontend
npm install
# build with demo mode enabled
VITE_DEMO=true npm run build
```

2. Deploy to GitHub Pages (requires `gh-pages` and that your repo is on GitHub):

```bash
npm run deploy
```

The site will be published to `https://<your-github-username>.github.io/<repo-name>` and will use demo mode so the interviewer can try adding/deleting contacts without a backend.

Note: Demo uses `localStorage` and persists data in the browser only. To revert demo data, open devtools and clear site storage or run `localStorage.removeItem('contacts_demo_v1')` in the console.
