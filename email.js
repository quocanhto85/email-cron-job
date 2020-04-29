const express = require("express");
const app = express();
const sendMail = require("./API/sendMail");

app.use("/sendMail", sendMail);
