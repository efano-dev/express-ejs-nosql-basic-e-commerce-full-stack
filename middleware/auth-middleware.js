const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        req.flash("error", "You need to Login.");

        return res.redirect("/login");
    }

    next();
};

const isLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/");
    }

    next();
};

export {
    isAuthenticated,
    isLoggedIn
};
