// import express from "express";
// import {
//   getDebts,
//   createDebt,
//   deleteDebt,
// } from "../controllers/debtController.js";
// import { protect } from "../Middleware/authMiddleware.js";

// const router = express.Router();

// router.route("/")
//   .get(protect, getDebts)
//   .post(protect, createDebt);

// router.route("/:id")
//   .delete(protect, deleteDebt);

// export default router;











import express from "express";
import {
  getDebts,
  createDebt,
  deleteDebt,
  updateDebt,
} from "../controllers/debtController.js";
import { protect } from "../Middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getDebts)
  .post(protect, createDebt);

router
  .route("/:id")
  .put(protect, updateDebt)
  .delete(protect, deleteDebt);

export default router;