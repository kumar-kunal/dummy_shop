const {
  Model,
  QueryBuilder
} = require('objection');

const knex = require('knex')(require('./knex'));
const moment = require('moment');
const chalk = require('chalk');
const {
  error,
  info
} = require('../utils').logging;



// Test connection
knex
  .raw('select 1+1 as result')
  .then(_ => {
    info(chalk.blue(' [ ✓ ] ') + 'Application - Connected to MSSQL');
    info(chalk.blue(' [ ✓ ] ') + '\x1b[37mPowered by winston@2.x');
  })
  .catch(e => {
    error(chalk.red(' [ x ] ') + 'Application - Error connecting to the Database on %s with error %s', process.env.NODE_ENV == 'test' ? process.env.DATABASE_HOST_TEST : process.env.DATABASE_HOST, e);
    process.exit(1);
  });

Model.knex(knex);

// custom query buidler 
class CustomQueryBuilder extends QueryBuilder {
  constructor(modelClass) {
    super(modelClass)
    if (modelClass.defaultSchema) {
      this.withSchema(modelClass.defaultSchema)
    }
  }

  softDelete(id) {
    if (id) {
      return this.patch({
        status: 3
      }).findById(id)
    }
  }

  async isValid(data) {
    let validity = await this.findOne({
      ...data,
      status: 1
    })
    return !!validity
  }

  upsert(model) {
    if (model.id) {
      return this.update(model).where('id', model.id)
    } else {
      return this.insert(model)
    }
  }
}

class BaseModel extends Model {
  static get defaultSchema() {
    return `${process.env.DB_NAME}`
  }

}

BaseModel.QueryBuilder = CustomQueryBuilder;

module.exports = BaseModel;
