import Payment from "../models/Payment.js";
import Debt from "../models/Debt.js";

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const { debtId, customerId, amount } = req.body;

    const debt = await Debt.findById(debtId);

    if (!debt) {
      return res.status(404).json({
        message: "Debt not found",
      });
    }

    const payment = await Payment.create({
      debtId,
      customerId,
      amount,
      userId: req.user._id,
    });

    debt.paidAmount += amount;
    debt.remainingAmount = debt.amount - debt.paidAmount;

    if (debt.remainingAmount <= 0) {
      debt.status = "paid";
      debt.remainingAmount = 0;
    } else {
      debt.status = "partial";
    }

    await debt.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};