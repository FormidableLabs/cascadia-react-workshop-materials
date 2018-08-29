const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require("graphql");
const db = require("./db");

const baseProductFields = {
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  imageUrl: {
    type: GraphQLString,
    resolve: function(obj) {
      return obj.image_url;
    },
  },
  price: { type: GraphQLInt },
};

const InCartProductType = new GraphQLObjectType({
  name: "InCartProduct",
  fields: {
    quantity: { type: GraphQLInt },
    ...baseProductFields,
    price: {
      type: GraphQLInt,
      resolve: function({ price, quantity }) {
        return price * quantity;
      },
    },
  },
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    ...baseProductFields,
  },
});

const ShoppingCartType = new GraphQLObjectType({
  name: "ShoppingCart",
  fields: {
    id: { type: GraphQLID },
    purchased: { type: GraphQLBoolean },
    products: { type: new GraphQLList(InCartProductType) },
    purchasedAt: {
      type: GraphQLString,
      resolve: ({ purchased_timestamp }) => purchased_timestamp,
    },
    totalQuantity: {
      type: GraphQLInt,
      resolve: function({ products }) {
        const total = products.reduce((acc, { quantity }) => {
          acc += quantity;
          return acc;
        }, 0);
        return total;
      },
    },
    totalPrice: {
      type: GraphQLInt,
      resolve: function({ products }) {
        const total = products.reduce((acc, { quantity, price }) => {
          acc += quantity * price;
          return acc;
        }, 0);
        return total;
      },
    },
  },
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getProduct: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: function(_, { id }) {
        return db.getProduct(id);
      },
    },

    getProducts: {
      type: new GraphQLList(ProductType),
      resolve: function() {
        return db.getProducts();
      },
    },

    getShoppingCart: {
      type: ShoppingCartType,
      args: { id: { type: GraphQLID } },
      resolve: function(_, { id }) {
        return db.getShoppingCarts({ id });
      },
    },

    getOrders: {
      type: new GraphQLList(ShoppingCartType),
      args: { name: { type: GraphQLString } },
      resolve: function(_, { name }) {
        return db.getShoppingCarts({ name });
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
        return db.createShoppingCart();
      },
    },
    setProductQuantityInCart: {
      type: ShoppingCartType,
      args: {
        id: { type: GraphQLID },
        productId: { type: GraphQLID },
        quantity: { type: GraphQLInt },
      },
      resolve: async function(_, { id, productId, quantity }) {
        if (!id) {
          const shoppingCart = await db.createShoppingCart();
          id = shoppingCart.id;
        }
        await db.setProductQuantityInCart({
          shoppingCartId: id,
          productId,
          quantity,
        });
        return db.getShoppingCarts({ id });
      },
    },
    purchaseShoppingCart: {
      type: ShoppingCartType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
      },
      resolve: async function(_, { id, name }) {
        if (!id || !name) {
          throw new Error(
            "Cannot purchase shopping cart without an ID or name."
          );
        }
        await db.purchaseShoppingCart({ id, name });
        return db.getShoppingCarts({ id });
      },
    },
  },
});

const AppSchema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

module.exports = AppSchema;
