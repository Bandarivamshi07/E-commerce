# Vibe Commerce — Mock E-Com Cart (Assignment)

## Overview
Small full-stack shopping cart app that supports:
- Browse products
- Add/remove/update cart items
- View cart total
- Mock checkout (no payments)

Tech:
- Backend: Node.js, Express, MongoDB (Mongoose)
- Frontend: React (Vite), Axios
- APIs: REST under `/api/*`

## Repo structure
(see repo structure in submitted zip)

## Setup (Backend)
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set `MONGODB_URI` (default `mongodb://localhost:27017/vibe_ecom`)
4. `npm run dev`
- API: `http://localhost:5000/api`

## Setup (Frontend)
1. `cd frontend`
2. `npm install`
3. Create `.env` with `VITE_API_URL=http://localhost:5000/api`
4. `npm run dev`
- App: `http://localhost:5173` (or as printed)

## API Endpoints
- `GET /api/products` — list products
- `POST /api/cart` — body `{ productId, qty }`
- `DELETE /api/cart/:id` — remove cart item
- `GET /api/cart` — returns `{ items, total }`
- `PATCH /api/cart/:id` — update qty `{ qty }`
- `POST /api/checkout` — body `{ cartItems, name, email }` -> returns `receipt`

## Screenshots
- Add product grid screenshot
- Add cart & checkout screenshot

## Demo video
Record 1–2 minutes:
- 0:00 — Open product grid, add item
- 0:20 — Open cart, update qty, show total
- 0:40 — Fill checkout and submit → show receipt
- Use Loom/YouTube unlisted and include link in submission

## Bonus ideas implemented / notes
- DB persistence via MongoDB + Mongoose (cart stored as `CartItem`)
- Error handling present in backend & frontend alerts
- To integrate Fake Store API: call `https://fakestoreapi.com/products` in backend or frontend and merge results.

