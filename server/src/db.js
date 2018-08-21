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
  throw new Error("Could not get the list of products");
};

const getProduct = async function(id) {
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
  throw new Error(`Could not get product for id: ${id}`);
};

const getShoppingCarts = async function({ id, name }) {
  const whereClause = name
    ? `shopping_cart.name = '${name.toLowerCase()}'`
    : `shopping_cart.id = ${id}`;
  const response = await sequelize.query(
    `
    SELECT
      quantity,
      product.id,
      product.name, product.price, product.image_url,
      shopping_cart_product.shopping_cart_id as shopping_cart_id
    FROM shopping_cart_product
    LEFT JOIN shopping_cart
      ON shopping_cart.id = shopping_cart_product.shopping_cart_id
    LEFT JOIN product
      ON product.id = shopping_cart_product.product_id
    WHERE ${whereClause};
    SELECT id, purchased, purchased_timestamp FROM shopping_cart
    WHERE ${whereClause}
    GROUP BY id;
  `,
    { raw: true }
  );
  const results = response[1];
  const products = results[0].rows;
  const carts = results[1].rows;
  if (carts.length === 0) {
    throw new Error("No valid shopping carts found!");
  } else if (carts.length === 1 && !name) {
    /**
     * Return a single cart when looking up by ID
     */
    return { ...carts[0], products };
  }
  /**
   * Return a list of carts each with products when looking up
   * orders (purchased carts) by name.
   */
  return carts.map(cart => ({
    ...cart,
    products: products.filter(product => product.shopping_cart_id === cart.id),
  }));
};

const createShoppingCart = async function() {
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
  throw new Error("Could not create shopping cart.");
};

const addProductToShoppingCart = async function({
  shoppingCartId,
  productId,
  quantity,
}) {
  await sequelize.query(
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
};

const removeProductFromShoppingCart = async function({
  shoppingCartId,
  productId,
}) {
  await sequelize.query(
    `
    DELETE FROM shopping_cart_product
    WHERE shopping_cart_id = ${shoppingCartId}
      AND product_id = ${productId}
  `,
    {
      raw: true,
      type: sequelize.QueryTypes.DELETE,
    }
  );
};

const purchaseShoppingCart = async function({ id, name }) {
  await sequelize.query(`
    UPDATE shopping_cart
    SET name = '${name.toLowerCase()}', purchased = true, purchased_timestamp = NOW()
    WHERE id = ${id};
  `);
};

const setProductQuantityInCart = async function(options) {
  if (options.quantity <= 0) {
    return removeProductFromShoppingCart(options);
  }
  return addProductToShoppingCart(options);
};

module.exports = {
  getShoppingCarts,
  getProducts,
  getProduct,
  createShoppingCart,
  setProductQuantityInCart,
  purchaseShoppingCart,
};
