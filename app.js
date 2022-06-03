const express = require("express");
const axios = require("axios").default;
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const dbName = "jgorosito";

async function startup() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  //aca de
  const collection_personas = db.collection("personas");
  const collection_cursos = "cursos";
  const collection_inscripcoiones = "inscripcoiones";

  const response = await axios.get(
    "https://weblogin.muninqn.gov.ar/api/Examen"
  );
  let values = response.data.value;

  if( await collection_personas.find({}).count() === 0 ) {
    const insertResult = await collection_personas.insertMany([...values]);
    console.log("Inserted documents =>", insertResult);
  }
  return "done.";
}

main().then(console.log).catch(console.error);

// -----------------------

app.get("/", async (req, res) => {});

app.post("/curso", validateDuplicado,validateModalidad,create);

app.post("/inscripcion", validateCursoExista,validatePersonaExista,validateInscripcionNorepitaModalidad,create);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
