
import { Router } from "express";
import { recibirCarrito } from "../controllers/cartController.js";

const router = Router();

router.post("/", recibirCarrito);

export default router;
