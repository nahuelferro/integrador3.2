import { useEffect, useState } from 'react'
import { getProductos } from '../services/api'

export function useFetchProductos(categoria){
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    getProductos()
      .then(res => {
        let data = res.data || res
        if(categoria){
          data = data.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase())
        }
        if(mounted) setProductos(data)
      })
      .catch(err => setError(err))
      .finally(()=> mounted && setLoading(false))
    return ()=> { mounted = false }
  },[categoria])

  return { productos, loading, error }
}
