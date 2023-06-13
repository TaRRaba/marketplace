const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      this.hasMany(models.SubCategories, { foreignKey: 'category_id' });
    }
  }
  Categories.init({
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};
