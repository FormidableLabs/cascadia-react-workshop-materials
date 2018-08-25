const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const { sequelize } = require("./db");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    imageUrl: {
      type: GraphQLString,
      resolve: function(obj) {
        return obj.image_url;
      },
    },
    price: { type: GraphQLInt },
  },
});

const ShoppingCartType = new GraphQLObjectType({
  name: "ShoppingCart",
  fields: {
    id: { type: GraphQLID },
    purchased: { type: GraphQLBoolean },
    products: { type: new GraphQLList(ProductType) },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: function(_, { id }) {
        return sequelize
          .query(`SELECT * FROM product WHERE id='${id}';`, { raw: true })
          .then(([data]) => data[0])
          .catch(() => null);
      },
    },

    getProducts: {
      type: new GraphQLList(ProductType),
      resolve: function() {
        return sequelize
          .query("SELECT * FROM product;", { raw: true })
          .then(([data]) => data)
          .catch(() => []);
      },
    },

    getShoppingCart: {
      type: ShoppingCartType,
      args: { id: { type: GraphQLID } },
      resolve: function(_, { id }) {
        return sequelize
          .query(
            `
            SELECT
              shopping_cart.purchased as shopping_cart_purchased,
              product.id,
              product.name, product.price, product.image_url
            FROM shopping_cart_product
            INNER JOIN shopping_cart
              ON shopping_cart.id = shopping_cart_product.shopping_cart_id
            INNER JOIN product
              ON product.id = shopping_cart_product.product_id
            WHERE shopping_cart.id = ${id}
          `,
            { raw: true }
          )
          .then(([data]) => {
            if (data.length > 0) {
              return {
                id,
                purchased: data[0].shopping_cart_purchased,
                products: data,
              };
            }
            return { id, purchased: false, products: [] };
          })
          .catch(() => null);
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createNewShoppingCart: {
      type: ShoppingCartType,
      resolve: function() {
        return sequelize
          .query(
            "INSERT INTO shopping_cart(purchased) VALUES(false) RETURNING *;",
            {
              raw: true,
              type: sequelize.QueryTypes.INSERT,
            }
          )
          .then(([data]) => ({ ...data[0], products: [] }))
          .catch(() => []);
      },
    },
    addProductToShoppingCart: {
      type: ShoppingCartType,
      args: {
        shoppingCartId: { type: GraphQLID },
        productId: { type: GraphQLID },
      },
      resolve: function(_, { shoppingCartId, productId }) {
        return sequelize
          .query(
            `
            INSERT INTO shopping_cart_product(shopping_cart_id, product_id)
            VALUES(${shoppingCartId}, ${productId});
            `,
            {
              raw: true,
              type: sequelize.QueryTypes.INSERT,
            }
          )
          .then(([data]) => ({ ...data[0], products: [] }))
          .catch(() => []);
      },
    },
  },
});

const AppSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = AppSchema;
