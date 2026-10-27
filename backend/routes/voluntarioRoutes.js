import { Router } from "express";

import { criarVoluntarioController, listarVoluntariosController } from "../controllers/voluntarioController.js";

const router = Router();

router.post("/", criarVoluntarioController);
router.get("/", listarVoluntariosController);

export default router;
