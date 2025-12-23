// Reminder cron job to send payment reminders to tenants
const cron = require("node-cron");
const mongoose = require("mongoose");
const Payment = require("../models/payment");
const User = require("../models/user");
const Tenant = require("../models/tenant");
const nodemailer = require("nodemailer");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for cron jobs");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectDB();

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Schedule cron job to run daily at 8 AM
cron.schedule("* * * *", async () => {
  console.log("Running daily payment reminder cron job");
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const paymentsDue = await Payment.find({
      dueDate: {
        $gte: new Date(tomorrow.setHours(0, 0, 0, 0)),
        $lt: new Date(tomorrow.setHours(23, 59, 59, 999)),
      },
      status: "pending",
    }).populate("tenantId");

    for (const payment of paymentsDue) {
      const tenant = await Tenant.findById(payment.tenantId).populate("userId");
      const user = await User.findById(tenant.userId);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Rent Payment Reminder",
        text: `Dear ${user.name},\n\nThis is a reminder that your payment of $${
          payment.amount
        } is due on ${payment.dueDate.toDateString()}.
        \n\nPlease ensure that the payment is made on time to avoid any late fees.\n\nThank you,
        \nTenant Rent Management Team`,
      };
      await transporter.sendMail(mailOptions);
      console.log(
        `Reminder sent to ${user.email} for payment ID: ${payment._id}`
      );
    }
  } catch (error) {
    console.error("Error in payment reminder cron job:", error);
  }
});

module.exports = cron;
