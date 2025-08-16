
import Order from "../models/Order.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const recibirCarrito = asyncHandler(async (req, res) => {
  const { items = [], cliente = {} } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "El carrito está vacío o no es válido" });
  }

  // Calcular total del pedido
  const total = items.reduce((acc, it) => acc + (it.precio * it.cantidad), 0);

  // Log de auditoría
  console.log("🛒 Carrito recibido:", JSON.stringify({ items, cliente, total }, null, 2));

  // Guardar opcionalmente en DB
  const order = await Order.create({ items, cliente, total });

  res.status(201).json({
    message: "Carrito recibido correctamente. Vaciar en el frontend.",
    orderId: order._id,
    total
  });
});
