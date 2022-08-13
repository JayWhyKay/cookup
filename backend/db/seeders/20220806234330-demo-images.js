"use strict";
const { Op } = require("sequelize");

const demoImages = [
  {
    url: "https://images.unsplash.com/photo-1559847845-2bf3aaabaee4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGFzdGluZyUyMG1lbnV8ZW58MHx8MHx8&auto=format&fit=crop&w=300&q=60",
    userId: 1,
    eventId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1557499305-87bd9049ec2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHRhc3RpbmclMjBtZW51fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    userId: 1,
    eventId: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1611520175743-30ff00129621?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmluZSUyMGRpbmluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=300&q=60",
    userId: 2,
    eventId: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1535230241747-a16dbb9c8b04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHRhc3RpbmclMjBtZW51fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    userId: 2,
    groupId: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1508028209469-933de69c0f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fHRhc3RpbmclMjBtZW51fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=60",
    userId: 2,
    groupId: 2,
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
    await queryInterface.bulkInsert("Images", demoImages);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", {
      eventId: { [Op.in]: [1, 2] },
      groupId: { [Op.in]: [1, 2] },
    });
  },
};
