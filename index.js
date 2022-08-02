"use strict";
const dotenv = require("dotenv").config();
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const app = express();
const { resolvers } = require("./lib/resolvers");
const PORT = process.env.PORT || 3001;
const isDev = process.env.NODE_ENV.trimEnd() !== "production";
console.log("eston vale process.env.NODE_ENV ", process.env.NODE_ENV);
console.log("eston vale process.env.NODE_ENV ", isDev);
// initial Schema
const typeDefs = readFileSync(
  join(__dirname, "lib", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  "/api/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: isDev,
  })
);

app.listen(PORT, () => {
  console.log("[appListen]: ", PORT);
});
