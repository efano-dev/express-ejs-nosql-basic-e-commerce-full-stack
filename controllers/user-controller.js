import Product from "../models/product-model.js";
import User from "../models/user-model.js";

const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find({
			deletedAt: null,
		}).populate("user");

		res.render("user/products", {
			products: products,
		});
	} catch (error) {
		console.error(error);
	}
};

const getSubscribeSeller = (req, res, next) => {
	res.render("user/subscribe-seller");
};

const subscribeSeller = async (req, res, next) => {
	const user = req.session.user;

	try {
		await User.updateOne(
			{
				_id: user._id,
			},
			{
				role: "seller",
			}
		);

		req.session.user.role = "seller";

		res.redirect("/seller");
	} catch (error) {
		console.error(error);
	}
};

export { getSubscribeSeller, subscribeSeller, getProducts };
