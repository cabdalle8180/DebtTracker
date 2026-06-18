# XisaabDeyn (DebtTracker)

**XisaabDeyn** — Somali for *accounting* (*xisaab*) and *debt* (*deyn*) — is a full-stack debt management app for shops and small businesses. Track customers, record debts, collect payments, and manage customer feedback in one place.

---

## Features

| Module | Capabilities |
|--------|-------------|
| **Overview** | Live stats, debt trend chart, top customers, recent transactions, customers needing attention, recent feedback |
| **Customers** | CRUD, search, email, important business notes, account status (active/warning/blocked), satisfaction rating, feedback log |
| **Debts** | Create, edit, delete, filter, mark as paid, record payments |
| **Payments** | List all payments, record partial/full payments against debts |
| **Reports** | Total debt, collections, outstanding balance, status breakdown |
| **Settings** | Merchant profile (name, email, phone) |
| **Auth** | Register, login, JWT sessions with persistent storage |

---

## Customer Feedback & Important Information

Each customer profile supports:

- **Email** — optional contact email
- **Important Information** — payment terms, credit limits, reminders, special agreements
- **Account Status** — `active`, `warning`, or `blocked`
- **Satisfaction Rating** — 1–5 star rating
- **Feedback Log** — timestamped entries with types:
  - General Feedback
  - Complaint
  - Praise
  - Internal Note

Feedback can be added from the customer detail panel (click a customer name or the eye icon). The dashboard overview highlights customers needing attention and shows recent feedback.

---

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS 4, Redux Toolkit, React Router, Recharts
- **Backend:** Express 5, Mongoose, JWT, bcrypt
- **Database:** MongoDB

---

## Project Structure

```
XisaabDeyn/
├── backend/
│   ├── Auth/              # Login & register
│   ├── config/            # MongoDB connection
│   ├── controllers/       # Business logic
│   ├── Middleware/        # JWT auth guard
│   ├── models/            # User, Customer, Debt, Payment
│   ├── routes/            # API routes
│   └── server.js
└── frontend/
    └── src/
        ├── auth/          # Redux auth slice
        ├── components/    # Overview, Customers, Debts, Payments
        ├── layouts/       # Dashboard layout with sidebar
        ├── pages/         # Login, Signup, Reports, Settings
        └── utils/         # API helper & formatters
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/customers` | List customers |
| GET | `/api/customers/:id` | Get customer details |
| POST | `/api/customers` | Create customer |
| PUT | `/api/customers/:id` | Update customer |
| DELETE | `/api/customers/:id` | Delete customer |
| POST | `/api/customers/:id/feedback` | Add feedback entry |
| GET | `/api/debts` | List debts |
| POST | `/api/debts` | Create debt |
| PUT | `/api/debts/:id` | Update debt |
| DELETE | `/api/debts/:id` | Delete debt |
| GET | `/api/payments` | List payments |
| POST | `/api/payments` | Record payment |

All routes except auth require `Authorization: Bearer <token>`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/xisaabdeyn
JWT_SECRET=your_secret_key_here
PORT=5000
```

```bash
npm run dev
```

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown by Vite (usually `http://localhost:5173`). The frontend proxies `/api` to `http://localhost:5000`.

---

## Debt Status Values

| Status | Meaning |
|--------|---------|
| `pending` | No payment received |
| `partial` | Partially paid |
| `paid` | Fully paid |

---

## Customer Status Values

| Status | Meaning |
|--------|---------|
| `active` | Customer in good standing |
| `warning` | Late payments or issues — needs follow-up |
| `blocked` | Do not extend further credit |

---

## Important Notes

- Each merchant only sees their own customers, debts, and payments (scoped by `userId`).
- Recording a payment automatically updates the linked debt balance and status.
- Customer `importantInfo` and `feedbackLog` are stored per customer and visible in the dashboard overview.
- Passwords are hashed with bcrypt; JWT tokens expire after 7 days.

---

## License

ISC
