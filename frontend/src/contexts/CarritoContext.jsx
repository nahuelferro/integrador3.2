import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }){
  const [carrito, setCarrito] = useState(()=>{
    const saved = localStorage.getItem('capri_carrito')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(()=>{
    localStorage.setItem('capri_carrito', JSON.stringify(carrito))
  },[carrito])

  const agregarProducto = (producto)=> {
    setCarrito(prev=>{
      const exists = prev.find(p=> p._id === producto._id)
      if(exists){
        return prev.map(p=> p._id === producto._id ? {...p, cantidad:(p.cantidad||1)+1} : p)
      }
      return [...prev, {...producto, cantidad:1}]
    })
  }
  const quitar = (id)=> setCarrito(prev=> prev.filter(p=> p._id !== id))
  const incrementar = (id)=> setCarrito(prev=> prev.map(p=> p._id===id ? {...p, cantidad:(p.cantidad||1)+1} : p))
  const decrementar = (id)=> setCarrito(prev=> prev.map(p=> {
    if(p._id!==id) return p
    const qty = (p.cantidad||1)-1
    return qty<=0 ? null : {...p, cantidad:qty}
  }).filter(Boolean))
  const vaciarCarrito = ()=> setCarrito([])

  const value = useMemo(()=>({ carrito, agregarProducto, quitar, incrementar, decrementar, vaciarCarrito }), [carrito])
  return <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
}

export const useCarrito = ()=> useContext(CarritoContext)
