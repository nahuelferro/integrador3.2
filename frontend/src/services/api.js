import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL
const api = baseURL ? axios.create({ baseURL }) : null

// Real endpoints
export const getProductosReal = () => api.get('/productos')
export const getProductoByIdReal = (id) => api.get(`/productos/${id}`)
export const enviarPedidoReal = (pedido) => api.post('/carrito', pedido)

// Mock endpoints (local file)
async function getLocalJSON(path){
  const res = await fetch(path)
  if(!res.ok) throw new Error('No se pudo cargar ' + path)
  return res.json()
}

export const getProductosMock = async () => {
  const data = await getLocalJSON('/data/products.json')
  // simula axios.get().data
  return data
}

export const getProductoByIdMock = async (id) => {
  const data = await getLocalJSON('/data/products.json')
  const found = data.find(p=> String(p._id) === String(id))
  if(!found) throw new Error('Producto no encontrado')
  return found
}

export const enviarPedidoMock = async (pedido) => {
  console.log('[MOCK] Enviando pedido...', pedido)
  // simula latencia y éxito
  await new Promise(r=> setTimeout(r, 600))
  return { ok: true, id: Math.random().toString(36).slice(2,9) }
}

// Export auto (real si hay baseURL)
export const getProductos = baseURL ? getProductosReal : getProductosMock
export const getProductoById = baseURL ? getProductoByIdReal : getProductoByIdMock
export const enviarPedido = baseURL ? enviarPedidoReal : enviarPedidoMock

export default api
