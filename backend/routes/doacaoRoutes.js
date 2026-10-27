import { Router } from "express";

import { criarDoacaoController, listarDoacoesController } from "../controllers/doacaoController.js";

const router = Router();

router.post("/", criarDoacaoController);
router.get("/", listarDoacoesController);

export default router;
