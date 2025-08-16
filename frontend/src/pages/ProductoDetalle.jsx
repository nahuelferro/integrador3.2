import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductoById } from '../services/api'
import { useCarrito } from '../contexts/CarritoContext'

export default function ProductoDetalle(){
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [loading, setLoading] = useState(true)
  const { agregarProducto } = useCarrito()

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    Promise.resolve(getProductoById(id))
      .then(res => {
        const data = res.data || res
        if(mounted) setProducto(data)
      })
      .finally(()=> mounted && setLoading(false))
    return ()=> { mounted = false }
  },[id])

  if(loading) return <p>Cargando...</p>
  if(!producto) return <p>No se encontró el producto.</p>

  return (
    <section className="section">
      <div className="row" style={{alignItems:'flex-start', gap:'1.2rem'}}>
        <img src={producto.imagen} alt={producto.nombre} style={{maxWidth:420}} />
        <div style={{flex:1}}>
          <h2>{producto.nombre}</h2>
          <p className="muted">{producto.categoria}</p>
          <p>{producto.descripcion}</p>
          {producto.recomendacion && <p className="muted">Recomendamos beber: <strong>{producto.recomendacion}</strong></p>}
          <h3 className="price">${'{'}producto.precio.toLocaleString('es-AR'){'}'}</h3>
          <div className="row" style={{marginTop:'.8rem'}}>
            <button className="btn" onClick={()=>agregarProducto(producto)}>Agregar al carrito</button>
            <Link to="/" className="btn secondary">Volver</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
