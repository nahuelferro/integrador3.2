
import Product from "../models/Product.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProductos = asyncHandler(async (req, res) => {
  const productos = await Product.find();
  res.json(productos);
});

export const getProductoById = asyncHandler(async (req, res) => {
  const producto = await Product.findById(req.params.id);
  if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(producto);
});

export const createProducto = asyncHandler(async (req, res) => {
  const nuevo = await Product.create(req.body);
  res.status(201).json(nuevo);
});

export const updateProducto = asyncHandler(async (req, res) => {
  const actualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!actualizado) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(actualizado);
});

export const deleteProducto = asyncHandler(async (req, res) => {
  const eliminado = await Product.findByIdAndDelete(req.params.id);
  if (!eliminado) return res.status(404).json({ message: "Producto no encontrado" });
  res.json({ message: "Producto eliminado" });
});
