'use strict';

const Student = require("../src/models/Student");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("students",{
      rollno: {
        type: Sequelize.INTEGER(11),
        allowNull : false,
        primaryKey : true,
    },
    name :Sequelize.STRING(50),
    dob:Sequelize.STRING(20),
    score:Sequelize.INTEGER(6),
    })

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("students");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
