require("dotenv").config();

const express = require("express");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoute);
app.use("/", userRoute);

app.listen(process.env.PORT);
