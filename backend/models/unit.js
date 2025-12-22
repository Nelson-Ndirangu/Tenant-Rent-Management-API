// Individual Houses Model
const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
    unitNumber: {
      type: String,
      required: true,
    },
    unitType: {
      type: String,
      required: true,
      enum: [
        "studio",
        "1-bedroom",
        "2-bedroom",
        "3-bedroom",
        "4-bedroom",
        "5-bedroom",
        "business-suite",
        "office-space",
        "retail-space",
        "warehouse",
        "own-compound",
      ],
    },
    rentAmount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


// Indexes for unitNumber and propertyID within a property
UnitSchema.index({ propertyId: 1, unitNumber: 1 }, { unique: true });
module.exports = mongoose.model("Unit", UnitSchema);
