const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Favourites extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'user_id' });
      this.hasMany(models.Entries, { foreignKey: 'favourite_id' });
    }
  }
  Favourites.init({
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Favourites',
  });
  return Favourites;
};
