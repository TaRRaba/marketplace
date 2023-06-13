const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasOne(models.Carts, { foreignKey: 'user_id' });
      this.hasOne(models.Favourites, { foreignKey: 'user_id' });
      this.hasMany(models.Orders, { foreignKey: 'user_id' });
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
