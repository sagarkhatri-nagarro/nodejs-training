const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "javatraining",
    "root","root",
    {
        host:'127.0.0.1',
        dialect:"mysql"
});

module.exports = sequelize;
global.sequelize  = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
