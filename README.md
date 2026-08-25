# Landscape India — Setup Guide

This is a full-stack app: a **backend** (Node.js + Express + MongoDB) and a
**frontend** (React + Leaflet map), running as two separate programs that
talk to each other over HTTP.

## What you need installed first

1. **Node.js** (v18 or later) — https://nodejs.org (this gives you `node` and `npm`)
2. **MongoDB** — pick ONE of these:
   - Install MongoDB Community Edition locally: https://www.mongodb.com/try/download/community
   - OR create a free cloud database at https://www.mongodb.com/cloud/atlas (easier — no local install)

## Step 1 — Set up the backend

```bash
cd backend
npm install                  # downloads all dependencies listed in package.json
cp .env.example .env         # create your own local env file
```

Open `.env` and set `MONGODB_URI`:
- If you installed MongoDB locally, the default value already works.
- If you used Atlas, paste the connection string Atlas gives you.

Now load some sample data and start the server:

```bash
npm run seed     # inserts 3 sample land listings into your database
npm run dev      # starts the server with auto-reload on changes
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running at http://localhost:5000
```

Test it worked by opening `http://localhost:5000/api/lands` in your browser —
you should see JSON data for the 3 sample lands.

## Step 2 — Set up the frontend

Open a **new terminal window** (keep the backend running in the first one):

```bash
cd frontend
npm install
npm run dev
```

You should see something like:
```
Local:   http://localhost:5173/
```

Open that URL in your browser. You should see a map of India with 3 markers.
Click a marker to see the price, area, and nearby amenities.

## How the pieces connect

- Frontend runs on port **5173**, backend runs on port **5000** — they're
  separate programs. The frontend's `src/api.js` file is hardcoded to call
  `http://localhost:5000`, which is why the backend must be running too.
- `cors()` in `server.js` is what allows a page loaded from port 5173 to
  make requests to port 5000 — browsers block this by default for security,
  so we explicitly allow it.

## Suggested next steps to learn more

1. Add a route to upload real land photos (research `multer` for file uploads)
2. Add a "favorite" button — this teaches you `PATCH` requests
3. Add user login (research `jsonwebtoken` + `bcrypt`) so people can post
   their own land listings, not just view seeded ones
4. Deploy: frontend to Vercel/Netlify, backend to Render/Railway, database
   to MongoDB Atlas (all have free tiers)
