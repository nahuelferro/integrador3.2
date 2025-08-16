
import { Router } from "express";
import { crearPreferencia, webhookMP } from "../controllers/paymentController.js";

const router = Router();

router.post("/checkout", crearPreferencia);
router.post("/webhook", webhookMP);

export default router;
