import Carrito from '../components/Carrito'
import { useCarrito } from '../contexts/CarritoContext'
import { enviarPedido } from '../services/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CarritoPage(){
  const { carrito, vaciarCarrito } = useCarrito()
  const [sending, setSending] = useState(false)
  const navigate = useNavigate()

  const confirmarPedido = async ()=>{
    if(carrito.length===0) return
    setSending(true)
    const payload = {
      productos: carrito.map(p=>({ _id:p._id, nombre:p.nombre, precio:p.precio, cantidad:p.cantidad || 1 })),
      total: carrito.reduce((acc, p)=> acc + p.precio * (p.cantidad || 1), 0)
    }
    try{
      const res = await enviarPedido(payload)
      
      const ok = res?.data?.ok ?? res?.ok ?? true
      if(ok){
        alert('Pedido enviado con éxito. ¡Gracias!')
        vaciarCarrito()
        navigate('/pago')
      }else{
        alert('Hubo un problema al enviar el pedido.')
      }
    }catch(e){
      alert('Error de red al enviar el pedido.')
    }finally{
      setSending(false)
    }
  }

  return (
    <section className="section">
      <h2>Tu carrito</h2>
      <Carrito />
      <div className="row" style={{marginTop:'.8rem'}}>
        <button className="btn secondary" onClick={()=>vaciarCarrito()} disabled={sending}>Vaciar</button>
        <button className="btn" onClick={confirmarPedido} disabled={sending || carrito.length===0}>
          {sending? 'Enviando...' : 'Confirmar pedido'}
        </button>
      </div>
    </section>
  )
}
