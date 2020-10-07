const BaseModel = require('../../../config/db');

class ProductModel extends BaseModel {

  static get tableName() {
    return 'dbo.product';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
    };
  }
}

module.exports = ProductModel;
