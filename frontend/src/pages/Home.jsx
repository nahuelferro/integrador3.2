import { useRef } from "react";
import ImageSlider from "../components/ImageSlider";
import ProductoCard from "../components/ProductoCard";
import productos from "../../public/data/products.json";

export default function Home() {
  const postresRef = useRef(null);
  const tortasRef = useRef(null);
  const bebidasRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container">
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          margin: "2rem 0"
        }}
      >
        <button className="btn" onClick={() => scrollTo(postresRef)}>
          Postres
        </button>
        <button className="btn" onClick={() => scrollTo(tortasRef)}>
          Tortas
        </button>
        <button className="btn" onClick={() => scrollTo(bebidasRef)}>
          Bebidas
        </button>
      </div>

     
<div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
  <img
    src="/images/logo.png"
    alt="Capri Logo"
    style={{ height: "150px", cursor: "pointer" }}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  />
</div>


      
      <section style={{ textAlign: "center", margin: "2rem 0" }}>
        <h1>Bienvenido a Capri</h1>
        <p style={{ maxWidth: "700px", margin: "1rem auto", lineHeight: "1.6" }}>
          Al entrar, te envuelve un cálido aroma a café recién molido y dulces
          horneados. Las paredes pintadas en tonos suaves, están adornadas con
          estanterías de madera llenas de tartas, galletas y panecillos. Las
          mesas de madera rústica, invitan a sentarse y disfrutar de un momento
          de tranquilidad. La iluminación suave crea un ambiente acogedor,
          perfecto para relajarse. Un par de plantas verdes en las ventanas
          añaden un toque de vida, mientras que el suave murmullo de las
          conversaciones y el tintineo de las tazas hacen que cada visita se
          sienta como en casa.
        </p>
      </section>

      
      <ImageSlider />

      
      <div ref={postresRef}>
        <h2>Postres</h2>
        <div className="grid">
          {productos
            .filter((p) => p.categoria === "Postre")
            .map((p) => (
              <ProductoCard key={p._id} producto={p} />
            ))}
        </div>
      </div>

      
      <div ref={tortasRef}>
        <h2>Tortas</h2>
        <div className="grid">
          {productos
            .filter((p) => p.categoria === "Torta")
            .map((p) => (
              <ProductoCard key={p._id} producto={p} />
            ))}
        </div>
      </div>

      
      <div ref={bebidasRef}>
        <h2>Bebidas</h2>
        <div className="grid">
          {productos
            .filter((p) => p.categoria === "Bebida")
            .map((p) => (
              <ProductoCard key={p._id} producto={p} />
            ))}
        </div>
      </div>
    </div>
  );
}


