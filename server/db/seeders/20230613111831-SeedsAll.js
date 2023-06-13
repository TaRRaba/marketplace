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

    await queryInterface.bulkInsert(
      "Goods",
      [
        {
          name: 'Ноутбук HP14 14s-fq0024ur, 14", 3050U, 4 Гб, SSD 256 Гб, AMD, Win11, чёрный',
          country: "Китай",
          specs: JSON.stringify({
            brand: "HP",
            code: "9291763",
            size: "45 см х 31 см х 6 см",
            weight: "2.1 кг",
            processor: "AMD Athlon",
          }),
          price: 34990,
          rating: 0,
          amount: 55,
          seller_id: 1,
          subcategory_id: 1,
          img_url: "/pics/goods/ноутбук-hp14.jpg",
        },
        {
          name: 'Ноутбук Realme RMNB1002, 14", i5 1135G7, 8 Гб, SSD 512 Гб, Intel Iris, Win11, серый',
          country: "Китай",
          specs: JSON.stringify({
            brand: "Realme",
            code: "9571559",
            size: "34 см х 26 см х 8 см",
            weight: "2.4 кг",
            processor: "Intel Core i5 1135G7",
          }),
          price: 59990,
          rating: 0,
          amount: 30,
          seller_id: 1,
          subcategory_id: 1,
          img_url: "/pics/goods/ноутбук-RMNB1002.jpg",
        },
        {
          name: 'Ноутбук MSI Z16 A12UET-063RU, 16", i7-12700H, 16 Гб, SSD 1 Тб, RTX3060 6GB, Win11, серый',
          country: "Китай",
          specs: JSON.stringify({
            brand: "MSI",
            code: "9502597",
            size: "35,9 см х 1,59 см х 25,6 см",
            weight: "4.4 кг",
            processor: "Intel Core i7 12700H",
          }),
          price: 169830,
          rating: 0,
          amount: 9,
          seller_id: 1,
          subcategory_id: 1,
          img_url: "/pics/goods/ноутбук-MSI.jpg.jpg",
        },
        {
          name: 'Телевизор Topdevice TDTV65BS05U, 65", 3840x2160, DVB-T2/C/S, HDMI 3, USB 2, Smart TV, черный',
          country: "Россия",
          specs: JSON.stringify({
            brand: "Topdevice",
            code: "9646123",
            size: "161 см х 15 см х 92,5 см",
            weight: "22.1 кг",
            processor: "Android TV",
          }),
          price: 33990,
          rating: 0,
          amount: 190,
          seller_id: 1,
          subcategory_id: 2,
          img_url: "/pics/goods/телевизор- Topdevice.jpg",
        },
        {
          name: 'Телевизор LG 65UQ81006LB, 65", 3840x2160, DVB-T2/C/S/S2, HDMI 3, USB 2, Smart TV, черный',
          country: "Польша",
          specs: JSON.stringify({
            brand: "LG",
            code: "9597200",
            size: "158 см х 22 см х 97 см",
            weight: "28.5 кг",
            processor: "webOS",
          }),
          price: 72990,
          rating: 0,
          amount: 108,
          seller_id: 1,
          subcategory_id: 2,
          img_url: "/pics/goods/телевизор-LG.jpg",
        },
        {
          name: 'Телевизор Xiaomi Mi TV Q2, 55", 3840x2160, DVB/T2/C/S2, HDMI 3, USB 2, Smart TV, серый',
          country: "Китай",
          specs: JSON.stringify({
            brand: "XIAOMI",
            code: "9777582",
            size: "135 см х 15 см х 83 см",
            weight: "18.0 кг",
            processor: "Google TV",
          }),
          price: 49990,
          rating: 0,
          amount: 154,
          seller_id: 1,
          subcategory_id: 2,
          img_url: "/pics/goods/телевизор-Xiaomi.jpg",
        },
        {
          name: 'Смартфон Realme 8, 6.4", SAmoled, 2 sim, 6Гб, 128Гб, 64Мп, 16Мп, 5000 мАч, NFC, серебристый',
          country: "Китай",
          specs: JSON.stringify({
            brand: "Realme",
            code: "9293438",
            size: "17,5 см х 9 см х 7 см",
            weight: "493 г",
            processor: "MediaTek Helio G95",
          }),
          price: 23990,
          rating: 0,
          amount: 104,
          seller_id: 1,
          subcategory_id: 3,
          img_url: "/pics/goods/смартфон-Realme.jpg",
        },
        {
          name: 'Смартфон Xiaomi POCO F4 GT NFC RU, 6.67", Amoled, 8 Гб, 128 Гб, 64 Мп, 4700 мАч, серый',
          country: "Китай",
          specs: JSON.stringify({
            brand: "XIAOMI",
            code: "9262939",
            size: "19,5 см х 10 см х 7 см",
            weight: "751 г",
            processor: "Qualcomm Snapdragon 8 Gen 1",
          }),
          price: 65990,
          rating: 0,
          amount: 45,
          seller_id: 1,
          subcategory_id: 3,
          img_url: "/pics/goods/смартфон-Xiaomi.jpg",
        },
        {
          name: 'Смартфон BQ 6051G Soul, 6.09", IPS, 2 sim, 1Гб, 16Гб, 5 Мп, microSD, 3000 мАч, черный',
          country: "Китай",
          specs: JSON.stringify({
            brand: "BQ",
            code: "7786978",
            size: "20,5 см х 12,5 см х 3,5 см",
            weight: "400 г",
            processor: "Spreadtrum SC7731E",
          }),
          price: 4090,
          rating: 0,
          amount: 59,
          seller_id: 1,
          subcategory_id: 3,
          img_url: "/pics/goods/смартфон-BQ.jpg",
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
