const getDashboard = (req, res, next) => {
    res.render("seller/dashboard");
}

const getProducts = (req, res, next) => {
    res.render("seller/products", {
        products: []
    });
}

export {
    getDashboard,
    getProducts
};
