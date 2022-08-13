"use strict";

const { Op } = require("sequelize");

const events = [
  {
    groupId: 1,
    venueId: 2,
    name: "Annual Backyard Grill-off",
    type: "Online",
    capacity: 26,
    price: 25.99,
    description:
      "Come join us as we celebrity another year of fine grilling!",
    startDate: new Date("2023-01-15 14:00:00"),
    endDate: new Date("2023-01-15 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1632158929413-168599fffbf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGdyaWxsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
  },
  {
    groupId: 1,
    venueId: 3,
    name: "Auntie Lee's Korean BBQ",
    type: "Online",
    capacity: 15,
    price: 12.5,
    description:
      "Come join us as Auntie Lee grills up some of her Korean bbq favorites!",
    startDate: new Date("2023-02-02 14:00:00"),
    endDate: new Date("2023-02-02 21:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1640859856457-f619953777f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGtvcmVhbiUyMGJicXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
  },
  {
    groupId: 2,
    venueId: 4,
    name: "Pop-up in NYC",
    type: "Online",
    capacity: 15,
    price: 38.5,
    description:
      "Come join us as we host a 5 course tasting menu. We will have live music!",
    startDate: new Date("2022-08-21 20:00:00"),
    endDate: new Date("2022-08-21 24:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1557499305-0af888c3d8ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dGFzdGluZyUyMG1lbnV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60",
  },
  {
    groupId: 2,
    venueId: 4,
    name: "Wine diner in the heart of NYC",
    type: "Online",
    capacity: 15,
    price: 48.99,
    description:
      "Come join us for an intimate diner. There will be plenty of good eats and wine",
    startDate: new Date("2023-06-10 20:00:00"),
    endDate: new Date("2023-06-10 24:00:00"),
    previewImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d2luZSUyMGRpbm5lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
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

    await queryInterface.bulkInsert("Events", events);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Events", {
      name: {
        [Op.in]: [
          "The Annual Great Hackathon",
          "Web Development Hackathon",
          "HackCrew Pizza Night",
          "National FinTech Hackathon",
        ],
      },
    });
  },
};
