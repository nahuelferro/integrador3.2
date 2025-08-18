import { useCarrito } from "../contexts/CarritoContext";
import { useState } from "react";

export default function ProductoCard({ producto }) {
  const { agregarProducto } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = () => {
    agregarProducto(producto);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1500);
  };

  return (
    <div className="card">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="card-img"
        loading="lazy"
      />
      <h3>{producto.nombre}</h3>
      <p className="muted">{producto.descripcion}</p>
      <p><b>${producto.precio.toLocaleString("es-AR")}</b></p>

      <button className={`btn ${agregado ? "success" : ""}`} onClick={handleAgregar}>
        {agregado ? "✅ Agregado" : "Agregar al carrito"}
      </button>
    </div>
  );
}
