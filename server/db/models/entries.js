const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    static associate(models) {
      this.belongsTo(models.Orders, { foreignKey: 'order_id' });
      this.belongsTo(models.Goods, { foreignKey: 'good_id' });
      this.belongsTo(models.Carts, { foreignKey: 'cart_id' });
      this.belongsTo(models.Favourites, { foreignKey: 'favourite_id' });
      this.belongsTo(models.Sellers, { foreignKey: 'seller_id' });
    }
  }
  Entries.init({
    order_id: DataTypes.INTEGER,
    good_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    favourite_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Entries',
  });
  return Entries;
};
