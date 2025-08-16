import { Link } from 'react-router-dom'
import { useCarrito } from '../contexts/CarritoContext'

export default function ProductoCard({ producto }){
  const { agregarProducto } = useCarrito()
  return (
    <div className="card">
      <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
      <h3>{producto.nombre}</h3>
      <p className="muted">{producto.categoria}</p>
      <div className="row">
        <span className="price">${'{'}producto.precio.toLocaleString('es-AR'){'}'}</span>
        <div className="row">
          <button className="btn secondary">
            <Link to={`/producto/${producto._id}`}>Detalles</Link>
          </button>
          <button className="btn" onClick={()=>agregarProducto(producto)}>Agregar</button>
        </div>
      </div>
    </div>
  )
}
