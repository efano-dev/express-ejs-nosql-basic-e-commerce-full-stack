import Product from "../models/product-model.js";

async function getProducts(req, res, next) {
    try {
        const products = await Product.find({
            deletedAt: null
        }).populate("user");
    
        res.render("user/products", {
            products: products
        });
    } catch (error) {
        console.error(error);
    }
}

export {
    getProducts
};
