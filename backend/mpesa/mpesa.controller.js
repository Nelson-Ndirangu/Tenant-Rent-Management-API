const Payment = require("../models/payment");

const mpesaCallback = async (req, res) => {
  try {
    const callback = req.body?.Body?.stkCallback;
    if (!callback) {
      return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    const payment = await Payment.findOne({
      checkoutRequestId: callback.CheckoutRequestID,
    });

    if (!payment) {
      return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
    }

    if (callback.ResultCode === 0) {
      const metadata = {};
      callback.CallbackMetadata.Item.forEach(i => {
        metadata[i.Name] = i.Value;
      });

      payment.status = "paid";
      payment.paymentDate = new Date();
      payment.mpesaReceiptNumber = metadata.MpesaReceiptNumber;
      await payment.save();
    } else {
      payment.status = "overdue";
      await payment.save();
    }

    return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  } catch (error) {
    console.error("Mpesa callback error:", error);
    return res.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }
};

module.exports = { mpesaCallback };
