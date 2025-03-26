import { config } from "dotenv";

config();

import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoDBSession from "connect-mongodb-session";
import flash from 'connect-flash';
import sellerRoute from "./routes/seller-route.js";
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";

const app = express();
const mongooseConnect = mongoose.connect(process.env.MONGODB_URI);
const MongoDBStore = MongoDBSession(session);
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
    res.locals.url = req.url;
    res.locals.user = req.session.user;

    next();
});
app.use("/seller", sellerRoute);
app.use("/", userRoute);
app.use("/", authRoute);

mongooseConnect.then((result) => {
    app.listen(process.env.PORT);
}).catch((error) => {
    console.error(error);
});
