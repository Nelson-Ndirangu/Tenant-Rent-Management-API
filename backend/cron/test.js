let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

let mailOptions = {
  from: process.env.EMAIL_USER,
  to: "nelsonmaina690@gmail.com",
  subject: "Rent Payment Reminder",
  text: `Dear Nelson,\n\nThis is a reminder that your payment of ks 10,000 is due on 15th January, 2026.\n\nPlease ensure that the payment is made on time to avoid any late fees.\n\nThank you,\nTenant Rent Management Team`,
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
