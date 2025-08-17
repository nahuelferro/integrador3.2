import { Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import logo from "../../public/images/logo.png"; // el logo que me pases

export default function Home() {
  return (
    <div className="container">
    
      <div className="home-buttons">
        <Link to="/postres" className="btn">Postres</Link>
        <Link to="/tortas" className="btn">Tortas</Link>
        <Link to="/bebidas" className="btn">Bebidas</Link>
      </div>

      
      <div className="home-logo-container">
        <Link to="/">
          <img src={logo} alt="Capri Logo" className="home-logo" />
        </Link>
      </div>

      
      <section style={{ textAlign: "center", margin: "2rem 0" }}>
        <h1>Bienvenido a Capri</h1>
        <p style={{ maxWidth: "700px", margin: "1rem auto", lineHeight: "1.6" }}>
          Al entrar, te envuelve un cálido aroma a café recién molido y dulces horneados. 
          Las paredes pintadas en tonos suaves, están adornadas con estanterías de madera llenas de tartas, galletas y panecillos. 
          Las mesas de madera rústica, invitan a sentarse y disfrutar de un momento de tranquilidad. 
          La iluminación suave crea un ambiente acogedor, perfecto para relajarse. 
          Un par de plantas verdes en las ventanas añaden un toque de vida, mientras que el suave murmullo de las conversaciones y el tintineo de las tazas hacen que cada visita se sienta como en casa.
        </p>
      </section>

      
      <ImageSlider />
    </div>
  );
}

