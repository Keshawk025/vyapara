# Vyapara Commerce

Full-stack mini-Amazon e-commerce platform built with Django REST Framework, JWT auth, Stripe test payments, and React.

## Folder Structure

```text
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
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Backend Features

- JWT authentication with register, login, refresh, logout, and profile endpoints
- Product catalog with pagination, search, filtering, and admin CRUD
- Database-backed cart and cart items
- Order creation from cart with stock deduction and history
- Stripe payment intent creation and payment confirmation
- Django admin for products, carts, orders, and payments
- Basic DRF test coverage for auth, product listing, and order creation

## Frontend Features

- React + Vite frontend with routed pages
- Auth and cart state via Context API
- Axios client with JWT attach and refresh flow
- Product listing, detail page, cart, checkout, login/register, and orders
- Responsive custom styling

## Setup Instructions

### 1. Backend setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at `http://127.0.0.1:8000`.

### 2. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at `http://127.0.0.1:5173`.

### 3. Stripe test mode

Set these before checkout works:

- `backend/.env`: `STRIPE_SECRET_KEY=sk_test_...`
- `frontend/.env`: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

Use Stripe test card `4242 4242 4242 4242`, any future date, any CVC, any ZIP.

### 4. PostgreSQL instead of SQLite

Set:

```env
DB_ENGINE=postgres
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
```

## Example API Requests

### Register

```http
POST /api/auth/register/
Content-Type: application/json

{
  "username": "alice",
  "email": "alice@example.com",
  "first_name": "Alice",
  "last_name": "Doe",
  "password": "strongpass123"
}
```

### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "alice",
  "password": "strongpass123"
}
```

### Product list with search/filter

```http
GET /api/products/?search=headphones&category=Electronics&min_price=50&max_price=300
```

### Add to cart

```http
POST /api/cart/items/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "product_id": 1,
  "quantity": 2
}
```

### Create order

```http
POST /api/orders/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "shipping_address": "221B Baker Street, London"
}
```

### Create payment intent

```http
POST /api/payments/create-intent/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "order_id": 1
}
```

## Postman Testing Checklist

- Register a new user
- Login and store JWT tokens
- Create products from admin or admin-authenticated API
- Add and update cart items
- Create an order from the cart
- Create and confirm Stripe payment
- Verify the order appears in order history

## Deployment Notes

- Backend can be deployed on Render or Railway
- Frontend can be deployed on Vercel or Netlify
- Set production `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and Stripe keys
- Use PostgreSQL in production
