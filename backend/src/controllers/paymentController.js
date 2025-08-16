
import { asyncHandler } from "../utils/asyncHandler.js";
import Order from "../models/Order.js";
import mercadopago from "mercadopago";

// Inicializar MP con Access Token del .env
function initMP() {
  if (!process.env.MP_ACCESS_TOKEN) {
    throw new Error("Falta MP_ACCESS_TOKEN en variables de entorno");
  }
  mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });
}

export const crearPreferencia = asyncHandler(async (req, res) => {
  initMP();
  const { orderId } = req.body;
  if (!orderId) return res.status(400).json({ message: "orderId es requerido" });

  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: "Pedido no encontrado" });

  const items = order.items.map((it) => ({
    id: String(it.productId || ""),
    title: it.nombre,
    quantity: it.cantidad,
    unit_price: Number(it.precio),
    currency_id: "ARS"
  }));

  const preference = {
    items,
    back_urls: {
      success: `${process.env.FRONTEND_URL}/pago/exito`,
      failure: `${process.env.FRONTEND_URL}/pago/error`,
      pending: `${process.env.FRONTEND_URL}/pago/pendiente`
    },
    auto_return: "approved",
    metadata: { orderId: String(order._id) }
  };

  const resp = await mercadopago.preferences.create(preference);
  order.mpPreferenceId = resp.body.id;
  await order.save();

  res.json({
    init_point: resp.body.init_point,
    sandbox_init_point: resp.body.sandbox_init_point,
    preference_id: resp.body.id
  });
});

// Webhook para notificaciones de Mercado Pago
export const webhookMP = asyncHandler(async (req, res) => {
  const data = req.query || {};
  console.log("🔔 Webhook Mercado Pago:", data);
  // Aquí podrías consultar el pago por ID y actualizar el estado del pedido
  res.sendStatus(200);
});
