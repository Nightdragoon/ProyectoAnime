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
app.get("/obtenerAnimes", async (req, res) => {
    try {
    const animeRef = ref(db, "anime"); // <--- Tu ruta real
    const snapshot = await get(animeRef);//se espera 

    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.json({ mensaje: "No se encontró la ruta 'anime'" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener datos de Firebase" });
  }
});
//cread
app.post("/crearAnime", async (req, res) => {
  /*
     Espera un JSON como:
     {
        "nombre": "Bleach",
        "descripcion": "Ichigo obtiene poderes..."
     }
  */

  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    await set(ref(db, "anime/" + nombre), descripcion);

    res.json({ mensaje: "Anime creado", nombre, descripcion });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear anime" });
  }
});
//update
app.post("/modificarAnime", async (req, res) => {
  /*
     Espera:
     {
        "nombre": "One Piece",
        "descripcion": "Actualización del anime"
     }
  */

  const { nombre, descripcion } = req.body;

  if (!nombre || !descripcion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const animeRef = ref(db, "anime/" + nombre);

    await update(animeRef, descripcion);

    res.json({
      mensaje: "Anime actualizado",
      nombre,
      descripcion
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar anime" });
  }
});

app.get("/eliminarAnime", async (req, res) => {
  /*
     Espera:
     {
        "nombre": "Attack on Titan"
     }
  */

  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }

  try {
    await remove(ref(db, "anime/" + nombre));

    res.json({ mensaje: "Anime eliminado", nombre });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar anime" });
  }
});


// Levantar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
