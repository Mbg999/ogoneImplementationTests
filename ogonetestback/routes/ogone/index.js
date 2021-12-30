"use strict";

const express = require("express");
const app = express();
const { OgoneController } = require("../../app/controllers/ogone-controller");

app.get("/test", OgoneController.test);

app.use("/sessions", require("./sessions/index"));
app.use("/payments", require("./payments/index"));

module.exports = app;
