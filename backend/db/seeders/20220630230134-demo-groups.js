"use strict";

const { Op } = require("sequelize");
const groups = [
  {
    organizerId: 1,
    name: "Backyard Grillers",
    about:
      "We are a bunch of dudes that love to grill",
    type: "In person",
    private: true,
    city: "San Diego",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JpbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60",
  },
  {
    organizerId: 1,
    name: "Popup Shop",
    about:
      "Experienced chefs looking to collaborate.",
    type: "In person",
    private: true,
    city: "Los Angeles",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1577106263724-2c8e03bfe9cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hlZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
  },
  {
    organizerId: 2,
    name: "New Cooks on the Block",
    about:
      "Self-taught cooks looking to colab with others. We welcome all levels of expertise!",
    type: "In person",
    private: true,
    city: "Seattle",
    state: "WA",
    previewImage:
      "https://images.unsplash.com/photo-1616669944447-d65d41a222bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njl8fGNoZWZ8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60",
  },
  {
    organizerId: 2,
    name: "Food for thought",
    about:
      "We love to cook and read. All bookworms welcome to come and join us for some great food and reads",
    type: "In person",
    private: true,
    city: "New York",
    state: "NY",
    previewImage:
      "https://images.unsplash.com/photo-1498604558938-d5a4f19274ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTh8fGZvb2QlMjBib29rfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    organizerId: 1,
    name: "Afternoon Delight",
    about:
      "All sweets lovers welcome to join us. We love to make beautiful desserts with wonderful company.",
    type: "In person",
    private: true,
    city: "San Jose",
    state: "CA",
    previewImage:
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGRlc3NlcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Groups", groups);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Groups", {
      name: {
        [Op.in]: [
          "HackDevs",
          "HackCrew",
          "Aspiring Software Engineers",
          "Anime-Lovers",
          "UCDHackers",
        ],
      },
    });
  },
};
