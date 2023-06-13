const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PickPoints extends Model {
    static associate(models) {
      this.hasMany(models.Orders, { foreignKey: 'pickpoint_id' });
    }
  }
  PickPoints.init({
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'PickPoints',
  });
  return PickPoints;
};
