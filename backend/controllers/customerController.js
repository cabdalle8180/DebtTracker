import Customer from "../models/Customers.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Customers retrieved successfully",
      total: customers.length,
      customers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      email,
      importantInfo,
      customerStatus,
      satisfactionRating,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const existingCustomer = await Customer.findOne({
      phone,
      name,
      userId: req.user._id,
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer with this phone number and name already exists",
      });
    }

    const customer = await Customer.create({
      name,
      phone,
      address: address || "",
      email: email || "",
      importantInfo: importantInfo || "",
      customerStatus: customerStatus || "active",
      satisfactionRating: satisfactionRating || null,
      userId: req.user._id,
    });

    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const fields = [
      "name",
      "phone",
      "address",
      "email",
      "importantInfo",
      "customerStatus",
      "satisfactionRating",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        customer[field] = req.body[field];
      }
    });

    const updated = await customer.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCustomerFeedback = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const { message, type, rating } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ message: "Feedback message is required" });
    }

    customer.feedbackLog.unshift({
      message: message.trim(),
      type: type || "feedback",
      rating: rating || undefined,
    });

    if (rating) {
      customer.satisfactionRating = rating;
    }

    const updated = await customer.save();
    res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "Customer deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
