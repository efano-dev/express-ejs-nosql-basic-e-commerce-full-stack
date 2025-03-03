require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT);