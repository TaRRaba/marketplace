const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SubCategories extends Model {
    static associate(models) {
      this.belongsTo(models.Categories, { foreignKey: 'category_id' });
      this.hasMany(models.Goods, { foreignKey: 'subcategory_id' });
    }
  }
  SubCategories.init({
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    img_url: DataTypes.STRING,
    category_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SubCategories',
  });
  return SubCategories;
};
