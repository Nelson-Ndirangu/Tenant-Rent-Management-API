// cron/reminder.js
const cron = require("node-cron");
const mongoose = require("mongoose");
const { sendRentReminders } = require("../models/notification");

// Database connection

mongoose.connect(process.env.MONGO_URI);

// Schedule daily rent reminders at 8 AM every day
cron.schedule("0 8 * * *", async () => {
  console.log("\n... Running daily rent reminder schedule....");
  await sendRentReminders;
});
module.exports = cron;
