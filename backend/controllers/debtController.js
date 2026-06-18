import Debt from "../models/Debts.js";

export const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find({ userId: req.user._id })
      .populate("customerId", "name phone address")
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

export const createDebt = async (req, res) => {
  try {
    const { customerId, amount, description, ref, date } = req.body;

    if (!customerId || !amount || !description) {
      return res.status(400).json({ message: "Customer, amount, and description are required" });
    }

    const debt = await Debt.create({
      customerId,
      amount: Number(amount),
      description,
      ref: ref || `#INV-${Date.now().toString().slice(-6)}`,
      date: date ? new Date(date) : new Date(),
      userId: req.user._id,
      paidAmount: 0,
      remainingAmount: Number(amount),
      status: "pending",
    });

    const populated = await debt.populate("customerId", "name phone address");
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);

    if (!debt) return res.status(404).json({ message: "Debt not found" });

    if (debt.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { customerId, amount, description, ref, date, status } = req.body;

    if (customerId) debt.customerId = customerId;
    if (description !== undefined) debt.description = description;
    if (ref !== undefined) debt.ref = ref;
    if (date) debt.date = new Date(date);

    if (amount !== undefined) {
      debt.amount = Number(amount);
      debt.remainingAmount = Math.max(0, debt.amount - debt.paidAmount);
    }

    if (status === "paid") {
      debt.paidAmount = debt.amount;
      debt.remainingAmount = 0;
      debt.status = "paid";
    } else {
      debt.remainingAmount = Math.max(0, debt.amount - debt.paidAmount);
      if (debt.remainingAmount === 0) debt.status = "paid";
      else if (debt.paidAmount > 0) debt.status = "partial";
      else debt.status = "pending";
    }

    const updated = await debt.save();
    const populated = await updated.populate("customerId", "name phone address");
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
