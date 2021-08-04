import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import players from "./routes/players";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/players", players);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Football Manager API",
      version: "1.0.0",
      description:
        "This is a simple API for managing football players",
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
  },
  apis: [`${__dirname}/routes/players.js`],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);


const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
