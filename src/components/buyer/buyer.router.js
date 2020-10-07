const ctrl = require("./buyer.controller");
// const {sendOTPValidator} = require('./buyer.validators');

function BuyerRoutes() {
	return (openRouter, apiRouter) => {

		apiRouter.route("/buyer/login").post(ctrl.authenticateUser);
		apiRouter.route("/buyer/all-product").get(ctrl.getAllProducts);
		apiRouter.route("/buyer/add-to-cart").post(ctrl.addProductToCart);
		apiRouter.route("/buyer/cart").get(ctrl.getCartByUser);

	};
}

module.exports = BuyerRoutes();
