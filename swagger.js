import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API con Swagger",
      version: "1.0.0",
      description: "Documentación generada automáticamente con Swagger",
    },
  },
  apis: ["./src/routes/*.js"], // <-- donde leerá las rutas documentadas
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
