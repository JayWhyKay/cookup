"use strict";

const { Op } = require("sequelize");

const demoVenues = [
  {
    groupId: 1,
    address: "8000 Othello Ave",
    city: "San Diego",
    state: "CA",
    lat: 32.816359203405426,
    lng: -117.15203367633025,
  },
  {
    groupId: 1,
    address: "123 Disney Drive",
    city: "Anaheim",
    state: "CA",
    lat: 33.810019744304206,
    lng: -117.91489655447164,
  },
  {
    groupId: 1,
    address: "123 Universal Drive",
    city: "Los Angeles",
    state: "CA",
    lat: 34.13707598223554,
    lng: -118.35340822136011,
  },
  {
    groupId: 2,
    address: "123 San Francisco Lane",
    city: "San Francisco",
    state: "CA",
    lat: 37.761464077212906,
    lng: -122.42363754538711,
  },
  {
    groupId: 2,
    address: "2 Harrison St",
    city: "New York",
    state: "NY",
    lat: 40.71881258019233,
    lng: -74.00907541681045,
  },
  {
    groupId: 2,
    address: "47 E Houston St",
    city: "New York",
    state: "NY",
    lat: 40.72468877453926,
    lng: -73.99472809101349,
  },
  {
    groupId: 1,
    address: "229 Flatbush Ave",
    city: "New York",
    state: "NY",
    lat: 40.68134475898397,
    lng: -73.97515874348807,
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
    await queryInterface.bulkInsert("Venues", demoVenues);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Venues", {
      address: {
        [Op.in]: [
          "123 Disney Lane",
          "321 Universal Lane",
          "123 San Francisco Lane",
          "123 New York Lane",
          "No Venue",
        ],
      },
    });
  },
};
