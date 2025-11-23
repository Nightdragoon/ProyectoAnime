


// Importar Express
const express = require("express");

// Crear la app
const app = express();

// Ruta básica
app.get("/", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});

//read
app.get("/obtenerAnimes", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});
//cread
app.post("/crearAnime", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});
//update
app.post("/modificarAnime", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});

app.get("/eliminarAnime", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});


// Levantar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
