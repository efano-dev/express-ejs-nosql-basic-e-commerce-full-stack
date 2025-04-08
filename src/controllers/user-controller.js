import Product from "../models/product-model.js";
import User from "../models/user-model.js";

const getSubscribeSeller = (req, res, next) => {
	res.render("user/subscribe-seller");
};

const subscribeSeller = async (req, res, next) => {
	try {
        const user = req.session.user;

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

const getProducts = async (req, res, next) => {
	try {
        const user = req.session.user;
        let query = {
			deletedAt: null,
        };

        if (user) {
            query.user = {
                $ne: user._id
            };
        }

		const products = await Product.find(query).populate("user");

		res.render("user/products", {
			products: products,
		});
	} catch (error) {
		console.error(error);
	}
};

export { getSubscribeSeller, subscribeSeller, getProducts };
