require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require('connect-flash');
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");

const app = express();
const mongooseConnect = mongoose.connect(process.env.MONGODB_URI);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store: store
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.user = req.session.user;

    next();
});
app.use("/", authRoute);
app.use("/", userRoute);

mongooseConnect.then((result) => {
    app.listen(process.env.PORT);
}).catch((error) => {
    console.error(error);
});
