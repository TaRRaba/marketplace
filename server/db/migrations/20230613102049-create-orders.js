/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'set null',
      },
      status: {
        type: Sequelize.BOOLEAN,
      },
      delivery: {
        type: Sequelize.BOOLEAN,
      },
      delivery_address: {
        type: Sequelize.STRING,
      },
      pickpoint_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PickPoints',
          key: 'id',
        },
        onDelete: 'set null',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  },
};
