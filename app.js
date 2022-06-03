const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios").default;

const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "jgorosito";

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("personas");

  const response = await axios.get(
    "https://weblogin.muninqn.gov.ar/api/Examen"
  );
  let values = response.data.value;
 
    if(await collection.find({}).count() === 0){
  const insertResult = await collection.insertMany([...values]);
  console.log("Inserted documents =>", insertResult);
}
  return "done.";
}

main().then(console.log).catch(console.error);

// -----------------------

app.get("/", async (req, res) => {});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
