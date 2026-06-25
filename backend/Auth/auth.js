import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import { sendSMS } from "../utils/sendSMS.js";

export const register = async (req, res) => {
  try {
    const { username, fullName, email, phone, password } = req.body;

    const exists = await User.findOne({
      $or: [{ email }, { username }, { phone }],
    });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      fullName,
      email,
      phone,
      password: hashedPassword,
    });

    // Send SMS asynchronously without blocking
    sendSMS(
      phone,
      `Ku soo dhawoow ${fullName}. Akoonkaaga si guul leh ayaa loo sameeyay.`
    ).catch((err) => {
      console.error("Failed to send SMS (non-blocking error):", err.message);
    });

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,

      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
