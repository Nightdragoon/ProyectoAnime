// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, get , remove , update } = require("firebase/database");
const cors = require("cors");


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

app.use(cors());

app.use(express.json());

// Ruta básica
app.get("/", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});

//read
app.get("/obtenerAnimes", async (req, res) => {
   try {
    const animeRef = ref(db, "anime");
    const snapshot = await get(animeRef);

    if (!snapshot.exists()) {
      return res.json([]);
    }

    const data = snapshot.val();

    // Convertir el objeto en una lista de JSONs
    const lista = Object.keys(data).map(nombre => ({
      nombre: nombre,
      descripcion: data[nombre]
    }));

    res.json(lista);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los animes" });
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
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: "Faltan datos" });
    }

    try {
        const animeRef = ref(db, "anime/" + nombre);

        await set(animeRef, descripcion); // <-- reemplaza correctamente

        res.json({
            mensaje: "Anime actualizado",
            nombre,
            descripcion
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al actualizar anime" });
    }
});

app.post("/eliminarAnime", async (req, res) => {
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

app.get("/buscarAnime", async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ error: "Debes enviar el nombre en la query ?nombre=" });
    }

    const animeRef = ref(db, "anime/" + nombre);
    const snapshot = await get(animeRef);

    if (!snapshot.exists()) {
      return res.status(404).json({ mensaje: "Anime no encontrado" });
    }

    res.json({
      nombre: nombre,
      descripcion: snapshot.val()
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar el anime" });
  }
});


// Levantar el servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
