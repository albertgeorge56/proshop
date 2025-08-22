import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import swaggerUi from "swagger-ui-express";
import { Request, Response, NextFunction, Router } from "express";

const router = Router();
const swaggerPath = path.join(__dirname, "../../swagger.yaml");

router.use(
  "/",
  swaggerUi.serve,
  (req: Request, res: Response, next: NextFunction) => {
    const swaggerDocument = yaml.load(
      fs.readFileSync(swaggerPath, "utf8")
    ) as swaggerUi.JsonObject;
    if (swaggerDocument) {
      swaggerUi.setup(swaggerDocument)(req, res, next);
    } else {
      res.status(500).send("Error loading Swagger document");
    }
  }
);

export default router;
