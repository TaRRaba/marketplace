/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "PickPoints",
      [
        {
          address: "Смоленский бульвар, 22/14, Москва",
          coords: JSON.stringify([55.742245, 37.585035]),
        },
        {
          address: "Газетный переулок, 13, Москва",
          coords: JSON.stringify([55.758894, 37.609398]),
        },
        {
          address: "Большая Серпуховская улица, 46с34, Москва",
          coords: JSON.stringify([55.721924, 37.624157]),
        },
        {
          address: "Рязанский проспект, 2/1к5Т, Москва",
          coords: JSON.stringify([55.727425, 37.737695]),
        },
        {
          address: "Ленинский проспект, 44, Москва",
          coords: JSON.stringify([55.701318, 37.567159]),
        },
        {
          address: "улица Сергея Макеева, 4, Москва",
          coords: JSON.stringify([55.759086, 37.550612]),
        },
        {
          address: "5-й проезд Марьиной Рощи, 15А, Москва",
          coords: JSON.stringify([55.798207, 37.620106]),
        },
        {
          address: "Семёновский переулок, 18, Москва",
          coords: JSON.stringify([55.782319, 37.714348]),
        },
        {
          address: "3-й Павелецкий проезд, 4, подъезд 1, Москва",
          coords: JSON.stringify([55.712455, 37.645719]),
        },
        {
          address: "Ленинградский проспект, 5с7, Москва",
          coords: JSON.stringify([55.779266, 37.577766]),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("PickPoints", null, {});
  },
};
