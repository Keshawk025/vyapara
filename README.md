# Vyapara — Fashion E-Commerce Platform

> A futuristic, full-stack fashion e-commerce platform with a glassmorphic dark UI, AI-powered shopping, holographic product cards, and dynamic atmosphere theming.

---

## ✨ Features

### Frontend (React + Vite + Tailwind CSS)
| Feature | Description |
|---------|-------------|
| 🃏 **Holographic 3D Cards** | Product cards physically tilt toward your cursor with a rainbow border shimmer |
| 🔍 **AI Command Palette** | Press the search icon to open a Spotlight-style shopper — type naturally, e.g. *"minimal beach wedding outfit under $200"* |
| 🌌 **Atmosphere Themes** | Switch between Deep Cosmos, Neon Cyberpunk, Cosmic Void, and Studio Glass |
| 🎬 **Scroll Storytelling** | Product detail pages scroll through Design → Material → Fit → Craft narratives |
| 🛍 **Cart Drawer** | Glassmorphic slide-in cart without leaving the page |
| 📱 **Mobile Dock** | Floating pill-shaped bottom navigation on mobile |
| 👆 **Snap-Scroll Cards** | Touch-swipe between product cards with magnetic snap points |
| 🔄 **Pull-to-Refresh** | Elastic pull-down gesture with circular progress indicator on mobile |
| 📐 **Size Selector** | XS–XXL animated size picker with glowing active state |
| 💀 **Shimmer Skeletons** | Premium diagonal shimmer loading states mirroring real card layout |
| 🌈 **Animated Hero** | Liquid orbiting background blobs that respond to the active atmosphere |

### Backend (Django REST Framework)
- JWT authentication (register, login, refresh, logout, profile)
- Product catalog with search, filter, and pagination
- Database-backed cart and cart items
- Order management with stock deduction
- Stripe payment intent creation and confirmation
- Django Admin dashboard
- SQLite (dev) / PostgreSQL (prod) support

---

## 🗂 Project Structure

```
Vyapara/
├── backend/
│   ├── apps/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── products/
│   │   └── users/
│   ├── config/
│   ├── .env.example
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── context/        # Auth, Cart, Atmosphere contexts
│   │   ├── hooks/          # usePullToRefresh
│   │   ├── pages/          # Route-level pages
│   │   ├── data/           # Mock product sections
│   │   └── styles/         # Global CSS + shimmer animations
│   ├── .env.example
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver
```

Backend runs at → **http://127.0.0.1:8000**  
Admin dashboard → **http://127.0.0.1:8000/admin/**

---

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

### 3. Run on Phone (same WiFi)

```bash
npm run dev -- --host
```

Then visit `http://<your-laptop-ip>:5173` on your phone. Find your IP with:
```bash
hostname -I
```

---

### 4. Stripe Payments (optional)

Add your test keys to the `.env` files:

```env
# backend/.env
STRIPE_SECRET_KEY=sk_test_...

# frontend/.env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Test card: `4242 4242 4242 4242` · any future date · any CVC

---

### 5. PostgreSQL (production)

Update `backend/.env`:

```env
DB_ENGINE=postgres
DB_NAME=vyapara
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
```

---

## 🎨 Atmosphere Themes

Click the **sun icon** in the navbar to switch themes:

| Theme | Vibe |
|-------|------|
| 🌌 Deep Cosmos | Default — dark blue with cyan/violet blobs |
| ⚡ Neon Cyberpunk | Magenta + green glows, aggressive borders |
| ✦ Cosmic Void | Near-pitch black, ghost-white whispers |
| ◻ Studio Glass | Cool ice-blue, ultra-minimal |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 6, Tailwind CSS, Framer Motion |
| Backend | Django 5, Django REST Framework, SimpleJWT |
| Database | SQLite (dev), PostgreSQL (prod) |
| Payments | Stripe |
| Font | Outfit (Google Fonts) |

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | Supabase / Railway Postgres |

Set `DEBUG=False`, update `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` for production.

---

## 📝 License

MIT — feel free to use, fork, and build on this.
