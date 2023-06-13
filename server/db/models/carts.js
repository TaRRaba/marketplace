const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'user_id' });
      this.hasMany(models.Entries, { foreignKey: 'cart_id' });
    }
  }
  Carts.init({
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};
