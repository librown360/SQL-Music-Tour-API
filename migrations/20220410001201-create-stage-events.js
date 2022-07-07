'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stage_events', {
      stage_events_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('stage_events');
  }
};