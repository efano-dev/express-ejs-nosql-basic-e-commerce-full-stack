import Product from "../models/product-model.js";

const getProducts = async (req, res, next) => {
    const user = req.session.user;

    try {
        const products = await Product.find({
            user: user._id
        }).populate("user");

        res.render("seller/products", {
            products: products
        });
    } catch (error) {
        console.error(error);
    }
}

const createProduct = async (req, res, next) => {
    const { title, details, price } = req.body;
    const user = req.session.user;

    try {
        await Product.create({
            title: title,
            imageSource: "",
            details: details,
            price: price,
            user: user._id
        });

        res.redirect("/seller/products");
    } catch (error) {
        console.error(error);
    }
}

export {
    getProducts,
    createProduct
};
