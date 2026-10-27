import { Router } from "express";

import { criarDoacaoController } from "../controllers/doacaoController.js";
import { listarDoacoes } from "../services/doacaoService.js";

const router = Router();

router.post("/", criarDoacaoController);
router.get("/", listarDoacoes)

export default router;
