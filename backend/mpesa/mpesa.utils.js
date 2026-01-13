const axios = require("axios");

const getTimestamp = () => {
  const now = new Date();
  return now.toISOString().replace(/[-T:.Z]/g, "").slice(0, 14);
};

const getPassword = (timestamp) => {
  const data =
    process.env.BUSINESS_SHORT_CODE +
    process.env.PASS_KEY +
    timestamp;

  return Buffer.from(data).toString("base64");
};

const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    `${process.env.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${auth}` },
    }
  );

  return response.data.access_token;
};

module.exports = { getTimestamp, getPassword, getAccessToken };
