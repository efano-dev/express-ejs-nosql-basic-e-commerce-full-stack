require("dotenv").config();

const express = require("express");
const authRoute = require("./routes/auth-route");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use("/", authRoute);

app.listen(process.env.PORT);