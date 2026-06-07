import Debt from "../models/Debt.js";

export const getDebts = async (req, res) => {
  try {
    const debts = await Debt.find({
      userId: req.user._id,
    }).populate("customerId");

    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDebt = async (req, res) => {
  try {
    const { customerId, amount, description } = req.body;

    const debt = await Debt.create({
      customerId,
      amount,
      description,
      userId: req.user._id,
      remainingAmount: amount,
    });

    res.status(201).json(debt);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDebt = async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);

    if (!debt) {
      return res.status(404).json({
        message: "Debt not found",
      });
    }

    await debt.deleteOne();

    res.status(200).json({
      message: "Debt deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};