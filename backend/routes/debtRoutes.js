import express from "express";
import {
  getDebts,
  createDebt,
  deleteDebt,
} from "../controllers/debtController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getDebts)
  .post(protect, createDebt);

router.route("/:id")
  .delete(protect, deleteDebt);

export default router;