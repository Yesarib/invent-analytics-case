'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Borrows', 'score',{
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('Borrows', 'status',{
      type: Sequelize.STRING,
      defaultValue:'borrowed'
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Borrows','score')
    await queryInterface.removeColumn('Borrows','status')
  }
};
