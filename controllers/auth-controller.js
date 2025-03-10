function getRegister(req, res, next) {
    res.render("user/register");
}

function getLogin(req, res, next) {
    res.render("user/login");
}

module.exports = {
    getRegister,
    getLogin
};
