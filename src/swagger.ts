import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import * as core from "express-serve-static-core";
import path from "path";

const swaggerDocument = YAML.load(path.resolve(__dirname, "./docs/swagger.yaml"));

export const setupSwagger = (app: core.Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
