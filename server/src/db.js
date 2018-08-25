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

const isResponseValid = function(response) {
  return Array.isArray(response) && response.length > 0;
};

const getProducts = async function() {
  try {
    const [response] = await sequelize.query(
      `
      SELECT name, id, price, image_url
      FROM product;
      `,
      { raw: true }
    );
    if (isResponseValid(response)) {
      return response;
    }
    throw new Error();
  } catch (e) {
    return [];
  }
};

const getProduct = async function(id) {
  try {
    const [response] = await sequelize.query(
      `
      SELECT name, id, price, image_url
      FROM product
      WHERE id='${id}';
      `,
      { raw: true }
    );
    if (isResponseValid(response)) {
      return response[0];
    }
    throw new Error();
  } catch (e) {
    return null;
  }
};

const getShoppingCart = async function(id) {
  try {
    const [response] = await sequelize.query(
      `
      SELECT
        quantity,
        product.id,
        product.name, product.price, product.image_url
      FROM shopping_cart_product
      INNER JOIN shopping_cart
        ON shopping_cart.id = shopping_cart_product.shopping_cart_id
      INNER JOIN product
        ON product.id = shopping_cart_product.product_id
      WHERE shopping_cart.id = ${id};
      SELECT id, purchased FROM shopping_cart
      WHERE shopping_cart.id = ${id};
    `,
      { raw: true }
    );
    if (isResponseValid(response)) {
      const shoppingCart = response.pop();
      const products = response;
      return { ...shoppingCart, products };
    }
    throw new Error();
  } catch (e) {
    return null;
  }
};

const createShoppingCart = async function() {
  try {
    const [response] = await sequelize.query(
      `
      INSERT INTO shopping_cart(purchased)
      VALUES(false)
      RETURNING id, purchased;
      `,
      {
        raw: true,
        type: sequelize.QueryTypes.INSERT,
      }
    );
    if (isResponseValid(response)) {
      return { ...response[0], products: [] };
    }
    throw new Error();
  } catch (e) {
    return null;
  }
};

const addProductToShoppingCart = async function({
  shoppingCartId,
  productId,
  quantity,
}) {
  try {
    const [response] = await sequelize.query(
      `
    INSERT INTO shopping_cart_product(shopping_cart_id, product_id, quantity)
    VALUES(${shoppingCartId}, ${productId}, ${quantity})
    ON CONFLICT (shopping_cart_id, product_id)
    DO UPDATE SET quantity = ${quantity};
    `,
      {
        raw: true,
        type: sequelize.QueryTypes.UPSERT,
      }
    );

    if (response) {
      return true;
    }
    throw new Error();
  } catch (e) {
    return null;
  }
};

const removeProductFromShoppingCart = async function({
  shoppingCartId,
  productId,
}) {
  try {
    const [response] = await sequelize.query(
      `
      DELETE FROM shopping_cart_product
      WHERE shopping_cart_id=${shoppingCartId}
        AND product_id=${productId}
    `,
      {
        raw: true,
        type: sequelize.QueryTypes.DELETE,
      }
    );

    if (response) {
      return true;
    }
    throw new Error();
  } catch (e) {
    return null;
  }
};

const setProductQuantityInCart = async function(options) {
  if (options.quantity <= 0) {
    return removeProductFromShoppingCart(options);
  }
  return addProductToShoppingCart(options);
};

module.exports = {
  getShoppingCart,
  getProducts,
  getProduct,
  createShoppingCart,
  setProductQuantityInCart,
};
