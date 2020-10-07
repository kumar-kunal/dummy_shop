const BaseModel = require('../../../config/db');

class BuyerModel extends BaseModel {

  static get tableName() {
    return 'dbo.buyer';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
    };
  }
}

module.exports = BuyerModel;
