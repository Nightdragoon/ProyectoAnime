import express from "express";
import { swaggerUi, specs } from "./swagger.js";

const app = express();

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Middlewares
app.use(express.json());

export default app;
