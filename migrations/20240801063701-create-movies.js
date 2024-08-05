'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movieName: {
        type: Sequelize.STRING
      },
      thumpNile: {
        type: Sequelize.STRING
      },
      movieVideo: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      relesedYear: {
        type: Sequelize.INTEGER
      },
      censor: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};