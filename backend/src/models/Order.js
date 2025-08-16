
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    cantidad: { type: Number, required: true, min: 1 },
    imagen: { type: String, default: "" }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    estado: { type: String, enum: ["pendiente", "pagado", "cancelado"], default: "pendiente" },
    cliente: {
      nombre: { type: String, default: "" },
      email: { type: String, default: "" },
      telefono: { type: String, default: "" },
      direccion: { type: String, default: "" }
    },
    mpPreferenceId: { type: String, default: "" },
    mpPaymentId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
