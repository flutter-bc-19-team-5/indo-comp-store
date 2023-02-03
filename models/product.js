'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.order)
      product.belongsTo(models.category)
      product.belongsTo(models.brand)
    }
  }
  product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: function (product) {
        if (product.image === undefined)
          product.image = "https://via.placeholder.com/150"
      }
    },
    sequelize,
    modelName: 'product',
  });
  return product;
};