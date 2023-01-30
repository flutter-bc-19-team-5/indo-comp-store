'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.hasOne(models.transaction)
    }
  }
  payment.init({
    pay_total: DataTypes.INTEGER,
    pay_method: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'payment',
  });
  return payment;
};