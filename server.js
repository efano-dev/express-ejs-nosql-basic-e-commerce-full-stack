require("dotenv").config();

const express = require("express");
const userRoute = require("./routes/user-route");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", userRoute);

app.listen(process.env.PORT);
