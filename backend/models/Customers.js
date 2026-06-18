import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Customer phone number is required"],
      trim: true,
    },

    address: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
    },

    importantInfo: {
      type: String,
      default: "",
      trim: true,
    },

    customerStatus: {
      type: String,
      enum: ["active", "warning", "blocked"],
      default: "active",
    },

    satisfactionRating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    feedbackLog: [
      {
        message: {
          type: String,
          required: true,
          trim: true,
        },
        type: {
          type: String,
          enum: ["feedback", "complaint", "praise", "note"],
          default: "feedback",
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;