
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "1mb" }));

  const allowed = process.env.FRONTEND_URL || "*";
  app.use(cors({ origin: allowed, credentials: true }));

  app.use(morgan("dev"));

  app.get("/", (req, res) => {
    res.json({ status: "ok", message: "API tienda backend activo" });
  });

  app.use("/api/productos", productRoutes);
  app.use("/api/carrito", cartRoutes);
  app.use("/api/pagos", paymentRoutes);

  return app;
}
