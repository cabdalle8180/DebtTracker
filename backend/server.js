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