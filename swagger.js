import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation using Swagger UI",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./router/**/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
