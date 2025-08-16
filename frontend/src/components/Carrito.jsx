import { useCarrito } from '../contexts/CarritoContext'

export default function Carrito(){
  const { carrito, incrementar, decrementar, quitar } = useCarrito()
  const total = carrito.reduce((acc, p)=> acc + p.precio * (p.cantidad || 1), 0)

  if(carrito.length === 0) return <p className="muted">Tu carrito está vacío.</p>

  return (
    <div className="section">
      <ul className="clean">
        {carrito.map((p)=> (
          <li key={p._id} className="card" style={{marginBottom:'.8rem'}}>
            <div className="row">
              <div style={{display:'flex',gap:'.8rem',alignItems:'center'}}>
                <img src={p.imagen} alt={p.nombre} width="64" height="64" style={{borderRadius:'10px',objectFit:'cover'}}/>
                <div>
                  <div style={{fontWeight:700}}>{p.nombre}</div>
                  <div className="muted">{p.categoria}</div>
                </div>
              </div>
              <div className="qty">
                <button className="btn secondary" onClick={()=>decrementar(p._id)}>-</button>
                <strong>{p.cantidad || 1}</strong>
                <button className="btn secondary" onClick={()=>incrementar(p._id)}>+</button>
              </div>
              <div style={{minWidth:100,textAlign:'right'}}>
                <div className="price">${'{'}(p.precio * (p.cantidad||1)).toLocaleString('es-AR'){'}'}</div>
                <button className="btn secondary" onClick={()=>quitar(p._id)}>Quitar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="row" style={{marginTop:'.8rem'}}>
        <h3>Total: ${'{'}total.toLocaleString('es-AR'){'}'}</h3>
      </div>
    </div>
  )
}
