import Debt from "../models/Debts.js";

// GET ALL DEBTS
export const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user._id })
      .populate("customerId")
      .sort({ createdAt: -1 });

    res.json({
      message: "Debts retrieved successfully",
      total: debts.length,
      debts,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE DEBT
export const createDebt = async (req, res) => {
  try {
    const { customerId, amount, description } = req.body;

    const debt = await Debt.create({
      customerId,
      amount,
      description,
      userId: req.user._id,
      paidAmount: 0,
      remainingAmount: amount,
      status: "pending",
    });

    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE DEBT
export const updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);

    if (!debt) return res.status(404).json({ message: "Debt not found" });

    if (debt.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { amount, description } = req.body;

    if (amount !== undefined) debt.amount = amount;
    if (description !== undefined) debt.description = description;

    // recompute
    debt.remainingAmount = Math.max(0, debt.amount - debt.paidAmount);

    if (debt.remainingAmount === 0) debt.status = "paid";
    else if (debt.paidAmount > 0) debt.status = "partial";
    else debt.status = "pending";

    const updated = await debt.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE DEBT
export const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);

    if (!debt) return res.status(404).json({ message: "Debt not found" });

    if (debt.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await debt.deleteOne();

    res.json({ message: "Debt deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};