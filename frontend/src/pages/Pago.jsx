import { Link } from 'react-router-dom'

export default function Pago(){
  return (
    <section className="section">
      <h2>¡Pedido confirmado!</h2>
      <p className="muted">Nos pondremos en contacto para coordinar el pago y la entrega.</p>
      <Link to="/" className="btn" style={{display:'inline-block',marginTop:'.8rem'}}>Volver al inicio</Link>
    </section>
  )
}
