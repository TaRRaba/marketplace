/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "electronic",
          fullName: "Электроника",
          img_url: "/pics/электроника.jpg",
        },
        {
          name: "appliances",
          fullName: "Бытовая техника",
          img_url: "/pics/бытовая.jpg",
        },
        {
          name: "sport",
          fullName: "Спорт товары",
          img_url: "/pics/спорт.jpg",
        },
        {
          name: "books",
          fullName: "Книги",
          img_url: "/pics/книги.jpg",
        },
        {
          name: "beauty",
          fullName: "Красота и здоровье",
          img_url: "/pics/красота.jpg",
        },
        {
          name: "other",
          full_name: "Другие товары",
          category_img: "/pics/другие.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "SubCategories",
      [
        {
          name: "laptops",
          fullName: "Ноутбуки",
          img_url: "/pics/ноутбуки.jpg",
          category_id: 1,
        },
        {
          name: "tv",
          fullName: "Телевизоры",
          img_url: "/pics/телевизоры.jpg",
          category_id: 1,
        },
        {
          name: "phones",
          fullName: "Смартфоны",
          img_url: "/pics/смартфоны.jpeg",
          category_id: 1,
        },
        {
          name: "washing",
          fullName: "Стиральные машины",
          img_url: "/pics/стиральная.jpeg",
          category_id: 2,
        },
        {
          name: "fridge",
          fullName: "Холодильники",
          img_url: "/pics/холодильник.png",
          category_id: 2,
        },
        {
          name: "hoover",
          fullName: "Пылесосы",
          img_url: "/pics/пылесос.jpg",
          category_id: 2,
        },
        {
          name: "bicycles",
          fullName: "Велосипеды",
          img_url: "/pics/велосипед.jpg",
          category_id: 3,
        },
        {
          name: "swimming",
          fullName: "Плавание",
          img_url: "/pics/плавание.jpg",
          category_id: 3,
        },
        {
          name: "inventory",
          fullName: "Спортивный инвентарь",
          img_url: "/pics/спортинвентарь.jpg",
          category_id: 3,
        },
        {
          name: "fiction",
          fullName: "Художественная литература",
          img_url: "/pics/худож.jpeg",
          category_id: 4,
        },
        {
          name: "educational",
          fullName: "Учебная литература",
          img_url: "/pics/учебная.jpeg",
          category_id: 4,
        },
        {
          name: "children",
          fullName: "Детские книги",
          img_url: "/pics/детские.jpeg",
          category_id: 4,
        },
        {
          name: "perfume",
          fullName: "Парфюмерия",
          img_url: "/pics/парфюм.jpg",
          category_id: 5,
        },
        {
          name: "body",
          fullName: "Уход для тела",
          img_url: "/pics/уход.jpeg",
          category_id: 5,
        },
        {
          name: "cosmetic",
          fullName: "Косметички и органайзеры",
          img_url: "/pics/косметичка.jpeg",
          category_id: 5,
        },
        {
          name: "stationery",
          fullName: "Канцтовары",
          img_url: "/pics/канцтовары.jpg",
          category_id: 6,
        },
        {
          name: "textile",
          fullName: "Текстиль",
          img_url: "/pics/текстиль.jpg",
          category_id: 6,
        },
        {
          name: "toys",
          fullName: "Игрушки",
          img_url: "/pics/игрушки.jpg",
          category_id: 6,
        },
      
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
