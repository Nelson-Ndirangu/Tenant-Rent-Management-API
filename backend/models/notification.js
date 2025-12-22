// Notification model (for email and mpesa notifications)

const mongoose = require("mongoose");
const NotificationSchema = new mongoose.Schema(
  {
    tenantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
        required: true,
    },  
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true,
    },  
    type: { 
        type: String,
        enum: ['EMAIL', 'MPESA'],
        required: true
    },
   reminderStage: { 
        type: String,
        enum: ['5-DAYS BEFORE', '1-DAY BEFORE', 'ON-DUE-DATE', '3-DAYS AFTER', '6-DAYS AFTER'],    
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['SENT', 'FAILED'],
        default: 'SENT'
    },
  },
  { timestamps: true }
);

// Indexes for tenantId and paymentId
NotificationSchema.index({ tenantId: 1, paymentId: 1, type: 1, reminderStage: 1 }, { unique: true });

module.exports = mongoose.model("Notification", NotificationSchema);

