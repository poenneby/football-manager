import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import authenticate from "./routes/authenticate";
import players from "./routes/players";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/authenticate", authenticate);
app.use("/players", players);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Football Manager API",
      version: "1.0.0",
      description: "This is a simple API for managing football players",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Peter Onneby",
        url: "https://onneby.com",
        email: "peter@onneby.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`${__dirname}/routes/*`],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

export default app;
