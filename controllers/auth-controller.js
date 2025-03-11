import User from "../models/user-model.js";
import bcrypt from "bcrypt";

function getRegister(req, res, next) {
    res.render("user/register", {
        error: req.flash("error"),
        success: req.flash("success")
    });
}

async function postRegister(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
        req.flash("error", "Email and Password are Required.");
        return res.redirect("/register");
    }

    if (password !== confirmPassword) {
        req.flash("error", "Password and Confirm Password do not Match.");
        return res.redirect("/register");
    }

    try {
        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            req.flash("error", "Email is associated with an Existing User.");
            return res.redirect("/register");
        }

        const newUser = await User.create({
            email: email,
            password: await bcrypt.hash(password, 12)
        });

        req.flash("success", "User Created Sucessfully.");
        res.redirect("/register");
    } catch (error) {
        console.error(error);
    }
}

function getLogin(req, res, next) {
    res.render("user/login", {
        error: req.flash("error"),
        success: req.flash("success")
    });
}

async function postLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("error", "Email and Password are Required.");
        return res.redirect("/login");
    }

    try {
        const existingUser = await User.findOne({
            email: email
        });

        if (!existingUser) {
            req.flash("error", "Email or Password is Invalid.");
            return res.redirect("/login");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            req.flash("error", "Email or Password is Invalid.");
            return res.redirect("/login");
        }

        req.session.user = {
            _id: existingUser._id,
            email: existingUser.email,
            __v: existingUser.__v
        };
        res.redirect("/");
    } catch (error) {
        console.error(error);
    }
}

async function postLogout(req, res, next) {
    req.session.destroy((error) => {
        if (!error) {
            return res.redirect("/");
        }

        console.error(error);
    });
}

export {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    postLogout
};
