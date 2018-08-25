module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface
      .createTable("product", {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        name: { type: Sequelize.STRING, field: "name" },
        imageUrl: { type: Sequelize.STRING, field: "image_url" },
        price: { type: Sequelize.INTEGER, price: "price" },
      })
      .then(() =>
        queryInterface.createTable("shopping_cart", {
          id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
          },
          purchased: { type: Sequelize.BOOLEAN, field: "purchased" },
        })
      )
      .then(() =>
        queryInterface.createTable("shopping_cart_product", {
          shoppingCartId: {
            type: Sequelize.BIGINT,
            field: "shopping_cart_id",
          },
          productId: {
            type: Sequelize.BIGINT,
            field: "product_id",
          },
        })
      )
      .then(() =>
        queryInterface.addConstraint(
          "shopping_cart_product",
          ["shopping_cart_id"],
          {
            type: "FOREIGN KEY",
            name: "shopping_cart",
            references: { table: "shopping_cart", field: "id" },
            onDelete: "cascade",
          }
        )
      )
      .then(() =>
        queryInterface.addConstraint("shopping_cart_product", ["product_id"], {
          type: "FOREIGN KEY",
          name: "product",
          references: { table: "product", field: "id" },
          onDelete: "cascade",
        })
      );
  },

  down: function(queryInterface) {
    return queryInterface
      .dropTable("product")
      .then(() => queryInterface.dropTable("shopping_cart"))
      .then(() => queryInterface.dropTable("shopping_cart_product"));
  },
};
