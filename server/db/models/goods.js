const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Goods extends Model {
    static associate(models) {
      this.belongsTo(models.SubCategories, { foreignKey: 'subcategory_id' });
      this.belongsTo(models.Sellers, { foreignKey: 'seller_id' });
      this.hasMany(models.Entries, { foreignKey: 'good_id' });
    }
  }
  Goods.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    specs: DataTypes.JSON,
    price: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    subcategory_id: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Goods',
  });
  return Goods;
};
