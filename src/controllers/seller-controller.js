import Product from "../models/product-model.js";

const getProducts = async (req, res, next) => {
	try {
        const user = req.session.user;

		const products = await Product.find({
			user: user._id,
            deletedAt: null
		}).populate("user");

		res.render("seller/products", {
			products: products,
		});
	} catch (error) {
		console.error(error);
	}
};

const createProduct = async (req, res, next) => {
	try {
        const { title, details, price } = req.body;
        const file = req.file;
        const user = req.session.user;

		await Product.create({
			title: title,
			imageSource: `/uploads/${ file.filename }`,
			details: details,
			price: price,
			user: user._id,
		});

		res.redirect("/seller/products");
	} catch (error) {
		console.error(error);
	}
};

export {
    getProducts,
    createProduct
};
