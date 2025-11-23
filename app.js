import express from "express";
import { swaggerUi, specs } from "./swagger.js";

const app = express();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});
app.post("/", (req, res) => {
  res.send("Hola, este es mi primer servidor Node.js 🚀");
});

// Levantar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

export default app;
