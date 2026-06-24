# 💰 XisaabDeyn

### Smart Debt Management for Shops & Small Businesses

**XisaabDeyn** is a full-stack debt management application built for shops and small businesses. It helps merchants track customers, manage debts, record payments, monitor customer feedback, and generate business reports from a single dashboard.

---

## 🌐 Live Demo

- Frontend: https://debt-tracker-theta-beryl.vercel.app

---

## 📸 Screenshots

### landingPage

![ladinPage](./screenshots/landingPage.png)

### Login

![Login](./screenshots/login.jpeg)

### Dashboard

![Dashboard](./screenshots/dashboard.jpeg)

### Customers

![Customers](./screenshots/customers.jpeg)

### Debts

![Debts](./screenshots/debts.jpeg)

### Payments

![Payments](./screenshots/payments.jpeg)

---

## ✨ Features

| Module            | Capabilities                                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 📊 Overview       | Live statistics, debt trend chart, top customers, recent transactions, customers needing attention, recent feedback              |
| 👥 Customers      | Create, update, delete, search customers, email support, business notes, customer status, satisfaction ratings, feedback history |
| 💳 Debts          | Create debts, edit records, delete debts, filter debts, mark as paid, record payments                                            |
| 💰 Payments       | Record partial/full payments and view payment history                                                                            |
| 📈 Reports        | Debt summaries, collections, outstanding balances, status analytics                                                              |
| ⚙️ Settings       | Merchant profile management                                                                                                      |
| 🔐 Authentication | Secure registration, login, JWT-based authentication                                                                             |

---

## 🌟 Customer Feedback & Account Management

Each customer profile includes:

* Email address
* Important business information
* Credit terms and reminders
* Customer status tracking
* Satisfaction rating (1–5 stars)
* Feedback history

### Customer Status Types

| Status  | Description                                   |
| ------- | --------------------------------------------- |
| Active  | Customer is in good standing                  |
| Warning | Payment delays or issues detected             |
| Blocked | Customer should not receive additional credit |

### Feedback Types

* General Feedback
* Complaint
* Praise
* Internal Note

The dashboard automatically highlights customers who need attention and displays recent feedback activity.

---

## 🚀 Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS 4
* Redux Toolkit
* React Router
* Recharts
* Lucide React

### Backend

* Express 5
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt Password Hashing

### Database

* MongoDB

---

## 📁 Project Structure

```text
XisaabDeyn/
├── backend/
│   ├── Auth/
│   ├── config/
│   ├── controllers/
│   ├── Middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── auth/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       └── utils/
│
├── screenshots/
│   ├── dashboard.png
│   ├── customers.png
│   ├── debts.png
│   └── payments.png
│
└── README.md
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint             | Description    |
| ------ | -------------------- | -------------- |
| POST   | `/api/auth/register` | Create account |
| POST   | `/api/auth/login`    | Login          |

### Customers

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| GET    | `/api/customers`              | List customers       |
| GET    | `/api/customers/:id`          | Get customer details |
| POST   | `/api/customers`              | Create customer      |
| PUT    | `/api/customers/:id`          | Update customer      |
| DELETE | `/api/customers/:id`          | Delete customer      |
| POST   | `/api/customers/:id/feedback` | Add feedback         |

### Debts

| Method | Endpoint         | Description |
| ------ | ---------------- | ----------- |
| GET    | `/api/debts`     | List debts  |
| POST   | `/api/debts`     | Create debt |
| PUT    | `/api/debts/:id` | Update debt |
| DELETE | `/api/debts/:id` | Delete debt |

### Payments

| Method | Endpoint        | Description    |
| ------ | --------------- | -------------- |
| GET    | `/api/payments` | List payments  |
| POST   | `/api/payments` | Record payment |

> All routes except authentication require:
>
> ```http
> Authorization: Bearer <token>
> ```

---

## 🏁 Getting Started

### Prerequisites

Before running the project, ensure you have:

* Node.js 18+
* MongoDB (Local or Atlas)
* Git

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/xisaabdeyn
JWT_SECRET=your_secret_key_here
PORT=5000
```

Run the backend:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

The frontend automatically proxies API requests to:

```text
http://localhost:5000
```

---

## 💳 Debt Status Values

| Status  | Meaning             |
| ------- | ------------------- |
| Pending | No payment received |
| Partial | Partially paid      |
| Paid    | Fully paid          |

---

## 📊 Reports Included

* Total Debt
* Total Collections
* Outstanding Balance
* Paid vs Pending Debts
* Customer Status Breakdown
* Recent Transactions
* Debt Trends

---

## 🔒 Security

* Password hashing using bcrypt
* JWT authentication
* Protected API routes
* User-based data isolation
* Secure token storage

Each merchant can only access their own customers, debts, payments, and reports.

---

## 🌍 Use Cases

Perfect for:

* Grocery Stores
* Retail Shops
* Pharmacies
* Electronics Stores
* Wholesale Businesses
* Small & Medium Enterprises

---

## 🔮 Future Improvements

* Email Reminders
* PDF Report Export
* Multi-user Roles
* Inventory Integration
* Mobile Application
* Dark Mode

---

## 👨‍💻 Author

Developed by **Abdalla Moha**

GitHub:
https://github.com/cabdalle8180

---

## 📄 License

ISC License






























