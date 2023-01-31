'use strict';
const { encrypt } = require("../helpers/bcrypt")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customer.hasMany(models.transaction)
    }
  }
  customer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: function (customer) {
        customer.password = encrypt(customer.password)
        if (customer.profileImage === undefined)
          customer.profileImage = "https://via.placeholder.com/150"
      },
      beforeUpdate: function (customer, field) {
        if (field.fields.includes("password")) {
          customer.password = encrypt(customer.password)
        }
      }
    },
    sequelize,
    modelName: 'customer',
  });
  return customer;
};