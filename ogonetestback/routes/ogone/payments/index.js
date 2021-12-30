"use strict";

const express = require("express");
const app = express();
const {
  OgoneController,
} = require("../../../app/controllers/ogone-controller");

app.route("/hosted").post(OgoneController.hosted);
app.route("/clientsdk").post(OgoneController.createPaymentByClientSDK);

module.exports = app;
