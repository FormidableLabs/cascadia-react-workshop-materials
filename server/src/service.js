const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const startApp = function() {
  const app = express();
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(8093, () => console.log("Shopping Service started on port 8093"));
};

module.exports = { startApp };
