
import ImageSlider from "../components/ImageSlider";
import ProductoCard from "../components/ProductoCard";
import { useFetchProductos } from "../hooks/useFetchProductos";
import { useState } from "react";

const categorias = ["Todos", "Postre", "Torta", "Bebida"];

export default function Home() {
  const [cat, setCat] = useState("Todos");
  const { productos, loading, error } = useFetchProductos(
    cat === "Todos" ? undefined : cat
  );

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos.</p>;

  return (
    <section className="section">
      {/* Carrusel arriba */}
      <ImageSlider />

      <h2>Catálogo</h2>
      <div className="chips">
        {categorias.map((c) => (
          <button
            key={c}
            className="chip"
            onClick={() => setCat(c)}
            style={{ fontWeight: cat === c ? 800 : 500 }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {productos.map((p) => (
          <ProductoCard key={p._id} producto={p} />
        ))}
      </div>
    </section>
  );
}
