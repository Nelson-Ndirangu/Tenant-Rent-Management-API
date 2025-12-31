// services/notification.service.js
const Notification = require("../models/notification");
const Payment = require("../models/payment");
const Tenant = require("../models/tenant");
const User = require("../models/user");
const nodemailer = require("nodemailer");

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Reminder stages mapping
const REMINDER_STAGES = {
  "-5": "5-DAYS BEFORE",
  "-1": "1-DAY BEFORE",
  0: "ON-DUE-DATE",
  3: "3-DAYS AFTER",
  6: "6-DAYS AFTER",
};

// Helper Functions
const getMonthlyDueDate = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 30, 0, 0, 0);
};

const getTodayDiffFromDueDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = getMonthlyDueDate();
  return Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
};

// Core Function to send rent reminders
const sendRentReminders = async () => {
  const diff = getTodayDiffFromDueDate();
  const reminderStage = REMINDER_STAGES[diff];

  if (!reminderStage) {
    console.log("\nNo rent reminders scheduled today");
    return;
  }

  console.log(`Sending reminders: ${reminderStage}`);

  const dueDate = getMonthlyDueDate();

  const payments = await Payment.find({
    dueDate,
    status: { $in: ["pending", "overdue"] },
  }).populate("tenantId propertyId");

  const landlordBuckets = {};

  for (const payment of payments) {
    const tenant = await Tenant.findById(payment.tenantId).populate("userId");
    if (!tenant || !tenant.userId) continue;

    // Check if notification already sent
    const exists = await Notification.findOne({
      tenantId: tenant._id,
      paymentId: payment._id,
      reminderStage,
      type: "EMAIL",
    });

    if (exists) continue;

    // Send email to tenant
    await transporter.sendMail({
      to: tenant.userId.email,
      subject: "Rent Payment Reminder",
      text: `Dear ${tenant.userId.name},

This is a reminder that your rent payment of Ksh ${payment.amount}
is ${reminderStage.replace("-", " ").toLowerCase()}.

Due Date: 30th of this month.

Please ensure payment is made on time.

Thank you,
Tenant Rent Management Team`,
    });

    // Save notification record
    await Notification.create({
      tenantId: tenant._id,
      paymentId: payment._id,
      reminderStage,
      type: "EMAIL",
    });

    console.log(`Tenant notified: ${tenant.userId.email}`);

    // Landlord bucket preparation
    const landlordId = payment.propertyId?.landlordId;
    if (landlordId) {
      landlordBuckets[landlordId] ??= [];
      landlordBuckets[landlordId].push({
        tenant: tenant.userId.name,
        amount: payment.amount,
        property: payment.propertyId.name,
      });
    }
  }

  // Send summary to landlords
  for (const landlordId in landlordBuckets) {
    const landlord = await User.findById(landlordId);
    if (!landlord) continue;

    const summary = landlordBuckets[landlordId]
      .map((p) => `• ${p.tenant} | ${p.property} | $${p.amount}`)
      .join("\n");

    await transporter.sendMail({
      to: landlord.email,
      subject: "Monthly Rent Payment Summary",
      text: `Dear ${landlord.name},

Here is a summary of tenant payments (${reminderStage}):

${summary}

Tenant Rent Management Team`,
    });

    console.log(`Landlord summary sent: ${landlord.email}`);
  }
};

module.exports = {
  sendRentReminders,
};
