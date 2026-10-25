import { Router } from "express";

import { criarDoacaoController } from "../controllers/doacaoController.js";

const router = Router();

router.post("/", criarDoacaoController);

export default router;
