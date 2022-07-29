"use strict";
const { MongoClient } = require("mongodb");
let connection;
const dbConnection = async () => {
  if (connection) return connection;
  let client;
  try {
    client = new MongoClient(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = await client.connect();
    console.log("[dbOnline]!!!!!!");
  } catch (error) {
    console.error("[Error in dbConnection]: ", error);
    throw new Error("Filed to connect to data base");
  }
  return connection;
};

module.exports = { dbConnection };
