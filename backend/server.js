// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/dbs.js';
// import authRoutes from './routes/AuthRoutes.js';
// import paymentRoutes from './routes/paymentRoutes.js';
// import debtRoutes from './routes/debtRoutes.js';
// import customerRoutes from './routes/customerRoutes.js';
// import cors from "cors";

// dotenv.config();
// const app = express();
// app.use(
//   cors({
//     origin: [
//       "https://debt-tracker-theta-beryl.vercel.app/",
//       "http://localhost:5173"
//     ],
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") return res.sendStatus(200);
//   next();
// });
// app.use('/api/auth',authRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/debts', debtRoutes);
// app.use('/api/customers', customerRoutes);

// app.get('/', (req, res) =>{
//     res.status(200).json("hello")
// })

// const PORT = process.env.PORT || 5000;
// connectDB();
// app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });



























import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/dbs.js";
import authRoutes from "./routes/AuthRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import debtRoutes from "./routes/debtRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";

dotenv.config();

const app = express();

/* ✅ CORS FIX */
app.use(
  cors({
    origin: [
      "https://debt-tracker-theta-beryl.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

/* ✅ BODY PARSER */
app.use(express.json());

/* ✅ ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/debts", debtRoutes);
app.use("/api/customers", customerRoutes);

/* ✅ TEST ROUTE */
app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});

/* ✅ CONNECT DB */
connectDB();

/* ✅ START SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});