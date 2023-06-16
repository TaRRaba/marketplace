/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PickPoints",
      [
        {
          address: "Смоленский бульвар, 22/14, Москва",
        },
        {
          address: "Газетный переулок, 13, Москва",
        },
        {
          address: "Большая Серпуховская улица, 46с34, Москва,",
        },
        {
          address: "Рязанский проспект, 2/1к5Т, Москва",
        },
        {
          address: "Ленинский проспект, 44, Москва",
        },
        {
          address: "улица Сергея Макеева, 4, Москва",
        },
        {
          address: "5-й проезд Марьиной Рощи, 15А, Москва",
        },
        {
          address: "Семёновский переулок, 18, Москва",
        },
        {
          address: "Дорогобужская улица, 3, Москва",
        },
        {
          address: "Ленинградское шоссе, 13к1, Москва",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PickPoints", null, {});
  },
};
