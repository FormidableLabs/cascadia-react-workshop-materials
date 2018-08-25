const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "cjs_shopping_cart",
  "formidable",
  "formidable",
  {
    dialect: "postgres",
    operatorsAliases: false,
  }
);

module.exports = {
  sequelize,
};
