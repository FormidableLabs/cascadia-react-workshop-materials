// const uuid = require("uuid4");

module.exports = {
  up: function(queryInterface) {
    return queryInterface.bulkInsert("product", [
      { name: "Crayons", price: 399, image_url: "crayons.jpg" },
      { name: "Notebook", price: 229, image_url: "notebook.jpg" },
      { name: "Chair", price: 4999, image_url: "chair.jpg" },
      { name: "Table", price: 12999, image_url: "table.jpg" },
      { name: "Ice Cream", price: 699, image_url: "ice-cream.jpg" },
      { name: "Pizza", price: 1099, image_url: "pizza.jpg" },
    ]);
  },
};
