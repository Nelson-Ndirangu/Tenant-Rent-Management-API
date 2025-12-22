// Tenant model (links tenants to properties they rent)

const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",        // Ref user model
      required: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",    // Ref property model
      required: true,
    },
    unitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Unit",        // Ref unit model
      required: true,
    },
    leaseStartDate: {
      type: Date,
      required: true,
    },
    leaseEndDate: {
      type: Date,
      required: true,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Tenant", TenantSchema);
