const BaseModel = require('../../../config/db');

class CartModel extends BaseModel {

  static get tableName() {
    return 'dbo.cart';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    const product_model = require("./product.model")
    return {
      product_detail:{
        relation: BaseModel.HasManyRelation,
        modelClass: product_model,
        join: {
          from: 'dbo.cart.product_id',
          to: 'dbo.product.id'
        }
      },
    };
  }
}

module.exports = CartModel;
