'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Entries.init({
    order_id: DataTypes.INTEGER,
    good_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    favourite_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Entries',
  });
  return Entries;
};