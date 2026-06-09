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

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    if (!name || !phone || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if customer with the same phone number already exists for the user
    const existingCustomer = await Customer.findOne({
      phone,
      name,
      userId: req.user._id,
    });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer with this phone number and name already exists" });
    }

    const customer = await Customer.create({
      name,
      phone,
      address,
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

    customer.name = req.body.name || customer.name;
    customer.phone = req.body.phone || customer.phone;
    customer.address = req.body.address || customer.address;

    const updated = await customer.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "Customer deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};