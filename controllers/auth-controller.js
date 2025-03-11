import User from "../models/user-model.js";
import bcrypt from "bcrypt";

function getRegister(req, res, next) {
    res.render("user/register", {
        input: {
            email: req.flash("email"),
            password: req.flash("password"),
            confirmPassword: req.flash("confirmPassword")
        },
        error: req.flash("error"),
        success: req.flash("success")
    });
}

async function postRegister(req, res, next) {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password) {
        req.flash("error", "Email and Password are Required.");
        req.flash("email", email);
        req.flash("password", password);
        req.flash("confirmPassword", confirmPassword);

        return res.redirect("/register");
    }

    if (password !== confirmPassword) {
        req.flash("error", "Password and Confirm Password do not Match.");
        req.flash("email", email);
        req.flash("password", password);
        req.flash("confirmPassword", confirmPassword);

        return res.redirect("/register");
    }

    try {
        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            if (existingUser.deletedAt !== null) {
                req.flash("error", "Email is associated to a Deleted User.");
                req.flash("email", email);
                req.flash("password", password);
                req.flash("confirmPassword", confirmPassword);

                return res.redirect("/register");
            }

            req.flash("error", "Email is associated with an Existing User.");
            req.flash("email", email);
            req.flash("password", password);
            req.flash("confirmPassword", confirmPassword);
            
            return res.redirect("/register");
        }

        const newUser = await User.create({
            email: email,
            password: await bcrypt.hash(password, 12)
        });

        req.flash("success", "User Created Sucessfully.");
        req.flash("email", "");
        req.flash("password", "");
        req.flash("confirmPassword", "");

        res.redirect("/register");
    } catch (error) {
        console.error(error);
    }
}

function getLogin(req, res, next) {
    res.render("user/login", {
        input: {
            email: req.flash("email"),
            password: req.flash("password")
        },
        error: req.flash("error"),
        success: req.flash("success")
    });
}

async function postLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        req.flash("error", "Email and Password are Required.");
        req.flash("email", email);
        req.flash("password", password);

        return res.redirect("/login");
    }

    try {
        const existingUser = await User.findOne({
            email: email
        });

        if (!existingUser) {
            req.flash("error", "Email or Password is Invalid.");
            req.flash("email", email);
            req.flash("password", password);

            return res.redirect("/login");
        }

        if (existingUser.deletedAt !== null) {
            req.flash("error", "Email is associated to a Deleted User.");
            req.flash("email", email);
            req.flash("password", password);

            return res.redirect("/login");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            req.flash("error", "Email or Password is Invalid.");
            req.flash("email", email);
            req.flash("password", password);

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
