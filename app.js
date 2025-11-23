// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get } = require("firebase/database");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCogfVqOkLzUrkglBeCx_CiWKwwkBG7dDg",
  authDomain: "cosmonautica-98b85.firebaseapp.com",
  databaseURL: "https://cosmonautica-98b85-default-rtdb.firebaseio.com",
  projectId: "cosmonautica-98b85",
  storageBucket: "cosmonautica-98b85.firebasestorage.app",
  messagingSenderId: "459098178302",
  appId: "1:459098178302:web:159361bad8f1c9d0fc1baf",
  measurementId: "G-FP3MHRLXG6"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

const db = getDatabase(fire);


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
