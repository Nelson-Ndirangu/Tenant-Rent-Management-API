// Model for payment records
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },

    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    month: {
      type: String,
      required: true,
      enum: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
    },

    dueDate: {
      type: Date,
      required: true,
    },

    paymentDate: {
      type: Date,
      default: null,
    },
    mpesaReceiptNumber: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate payments for the same tenant, unit, month, and year
PaymentSchema.index(
  { tenantId: 1, unitId: 1, month: 1, year: 1, status: 1, paymentDate: 1 },
  { unique: true }
);


module.exports = mongoose.model("Payment", PaymentSchema);
