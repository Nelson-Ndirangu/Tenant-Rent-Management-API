const axios = require("axios");
const Payment = require("../models/payment");
const { getTimestamp, getPassword, getAccessToken } = require("./mpesa.utils");

const formatPhone = (phone) => {
  if (phone.startsWith("0")) return `254${phone.slice(1)}`;
  if (phone.startsWith("+254")) return phone.slice(1);
  return phone;
};

const initiateStkPush = async ({
  tenantId,
  unitId,
  amount,
  month,
  year,
  dueDate,
  phoneNumber,
}) => {
  const formattedPhone = formatPhone(phoneNumber);

  // 1. Create payment record (PENDING)
  const payment = await Payment.create({
    tenantId,
    unitId,
    amount,
    month,
    year,
    dueDate,
    phoneNumber: formattedPhone,
    status: "pending",
  });

  const accessToken = await getAccessToken();
  const timestamp = getTimestamp();
  const password = getPassword(timestamp);

  const payload = {
    BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: formattedPhone,
    PartyB: process.env.BUSINESS_SHORT_CODE,
    PhoneNumber: formattedPhone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: payment._id.toString(),
    TransactionDesc: "Rent Payment",
  };

  const response = await axios.post(
    `${process.env.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // 2. Save STK identifiers
  payment.checkoutRequestId = response.data.CheckoutRequestID;
  payment.merchantRequestId = response.data.MerchantRequestID;
  await payment.save();

  return response.data;
};

module.exports = { initiateStkPush };
