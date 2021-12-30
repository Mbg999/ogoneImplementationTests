"use strict";

const express = require("express");
const app = express();
const { OgoneController } = require("../../../app/controllers/ogone-controller");

app.route("/hosted").post(OgoneController.hosted);

module.exports = app;
