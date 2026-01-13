const express = require("express");
const { initiateStkPush } = require("./mpesa.service");
const { mpesaCallback } = require("./mpesa.controller");

const router = express.Router();

router.post("/stk-push", async (req, res) => {
  const response = await initiateStkPush(req.body);
  res.json(response);
});

router.post("/callback", mpesaCallback);

module.exports = router;
