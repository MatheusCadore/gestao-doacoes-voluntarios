import { Router } from "express";

import {
    listarCampanhasController,
    buscarCampanhaController
} from "../controllers/campanhaController.js";

const router = Router();

router.get("/", listarCampanhasController);

router.get("/:id", buscarCampanhaController);

export default router;