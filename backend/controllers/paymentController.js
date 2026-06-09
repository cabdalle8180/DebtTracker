import Debt from "../models/Debts.js";
import Payment from "../models/Payments.js";

// GET PAYMENTS
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
  userId: req.user._id,
})
  .populate("customerId", "name phone")
  .populate("debtId", "description amount status")
  .sort({ createdAt: -1 });

    res.json({
      message: "Payments retrieved successfully",
      total: payments.length,
      payments,
    });
  }

   catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE PAYMENT
// export const createPayment = async (req, res) => {
//   try {
//     const { debtId, amount } = req.body;
//     const pay = Number(amount);

//     const debt = await Debt.findById(debtId);

//     if (!debt) return res.status(404).json({ message: "Debt not found" });

//     if (debt.userId.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: "Not allowed" });
//     }

//     if (pay <= 0) {
//       return res.status(400).json({ message: "Invalid amount" });
//     }

//     if (pay > debt.remainingAmount) {
//       return res.status(400).json({ message: "Too much payment" });
//     }

//     const payment = await Payment.create({
//       debtId,
//       customerId: debt.customerId,
//       amount: pay,
//       userId: req.user._id,
//     });

//     debt.paidAmount += pay;
//     debt.remainingAmount = Math.max(0, debt.amount - debt.paidAmount);

//     if (debt.remainingAmount === 0) debt.status = "paid";
//     else debt.status = "partial";

//     await debt.save();

//     res.status(201).json({
//       message: "Payment success",
//       payment,
//       debt,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };



export const createPayment = async (req, res) => {
  try {
    const { debtId, amount } = req.body;
    const pay = Number(amount);

    const debt = await Debt.findById(debtId);

    if (!debt) {
      return res.status(404).json({ message: "Debt not found" });
    }

    if (debt.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (pay <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    if (pay > debt.remainingAmount) {
      return res.status(400).json({ message: "Too much payment" });
    }

    let payment = await Payment.create({
      debtId,
      customerId: debt.customerId,
      amount: pay,
      userId: req.user._id,
    });

    debt.paidAmount += pay;
    debt.remainingAmount = debt.amount - debt.paidAmount;

    debt.status =
      debt.remainingAmount === 0 ? "paid" : "partial";

    await debt.save();

    payment = await Payment.findById(payment._id)
      .populate("customerId", "name phone")
      .populate("debtId", "description amount status");

    res.status(201).json({
      message: "Payment success",
      payment,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};