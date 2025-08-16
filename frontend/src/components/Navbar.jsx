import { Link, NavLink } from 'react-router-dom'
import { useCarrito } from '../contexts/CarritoContext'

export default function Navbar(){
  const { carrito } = useCarrito()
  const count = carrito.reduce((acc, item)=> acc + (item.cantidad || 1), 0)

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">Capri · Pastelería Moderna</Link>
        <div className="nav-links">
          <NavLink to="/" className="chip">Inicio</NavLink>
          <NavLink to="/carrito" className="pill">Carrito <span className="cart-badge">{count}</span></NavLink>
        </div>
      </div>
    </nav>
  )
}
