import { Router } from "express";
import { controllers } from "./index.js";
import { middlewares } from "../auth/index.js";
import { middlewares as middlewares2 } from "../middlewares/index.js";

export const routes = Router();

routes
  .get("/", controllers.getUsers)
  .get("/:id", middlewares.authJWT, controllers.getUserById)
  .delete("/:id", middlewares2.routes.checkParams, controllers.deleteUser);
