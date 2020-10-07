const BaseController = require("../baseController");

const BuyerModel = require("./models/buyer.model");
const ProductModel = require("./models/product.model")
const CartModel = require("./models/cart.model")


import jwt from "jsonwebtoken";

const sharedKey = process.env.SHARED_KEY

const {checkAccessToken} = require("../../utils/authenticate")


class BuyerController extends BaseController {
    constructor() {
        super();
    }

    authenticateUser = async (req, res) => {
        try {

            let {email, password} = req.body;

            let user = await BuyerModel.query().findOne({email,password});

            if(!user){
                return this.errors(req, res, this.status.HTTP_UNAUTHORIZED,this.messageTypes.errorMessages.wrongEmailPassword)
            }

            const payload = { "id": user.id,"name":user.name,"email": user.email }

            const token = jwt.sign(payload, sharedKey);

            return this.success(req, res, this.status.HTTP_OK, token, this.messageTypes.successMessages.successful);

        } catch (e) {
            this.unexpectedError(req, res, e);
        }
    }

    getAllProducts = async (req, res) => {
        try {
            checkAccessToken(req)

            let products = await ProductModel.query().where({deleted_at: null});
            
            return this.success(req, res, this.status.HTTP_OK, products, this.messageTypes.successMessages.successful);

        } catch (e) {
            this.unexpectedError(req, res, e);
        }
    }

    addProductToCart = async (req, res) => {
        try {
            checkAccessToken(req)

            let user_id = req.user.id
            let {product_id} = req.query

            let cartData = await CartModel.query().insertAndFetch({user_id,product_id});
            
            return this.success(req, res, this.status.HTTP_OK, cartData, this.messageTypes.successMessages.successful);

        } catch (e) {
            this.unexpectedError(req, res, e);
        }
    }

    getCartByUser = async (req, res) => {
        try {
            checkAccessToken(req)

            let {user_id} = req.query

            let cartData = await CartModel.query().withGraphFetched({product_detail:true}).where({user_id});
            
            return this.success(req, res, this.status.HTTP_OK, cartData, this.messageTypes.successMessages.successful);

        } catch (e) {
            this.unexpectedError(req, res, e);
        }
    }

}

module.exports = new BuyerController();