import { Router } from "express";

import { criarVoluntarioController } from "../controllers/voluntarioController.js";

const router = Router();

router.post("/", criarVoluntarioController);

export default router;
