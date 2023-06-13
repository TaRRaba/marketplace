const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'user_id' });
      this.belongsTo(models.PickPoints, { foreignKey: 'pickpoint_id' });
      this.hasMany(models.Entries, { foreignKey: 'order_id' });
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    delivery: DataTypes.BOOLEAN,
    delivery_address: DataTypes.STRING,
    pickpoint_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
