const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sellers extends Model {
    static associate(models) {
      this.hasMany(models.Entries, { foreignKey: 'seller_id' });
      this.hasMany(models.Goods, { foreignKey: 'seller_id' });
    }
  }
  Sellers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    INN: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Sellers',
  });
  return Sellers;
};
