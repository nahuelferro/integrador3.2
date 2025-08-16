import { useState } from 'react'
import ProductoCard from '../components/ProductoCard'
import { useFetchProductos } from '../hooks/useFetchProductos'

const categorias = ['Todos', 'Postre', 'Torta', 'Bebida']

export default function Home(){
  const [cat, setCat] = useState('Todos')
  const { productos, loading, error } = useFetchProductos(cat==='Todos'? undefined : cat)

  if(loading) return <p>Cargando productos...</p>
  if(error) return <p>Ocurrió un error al cargar los productos.</p>

  return (
    <section className="section">
      <h2>Catálogo</h2>
      <div className="chips">
        {categorias.map(c=> (
          <button key={c} className="chip" onClick={()=> setCat(c)} style={{fontWeight: cat===c? 800:500}}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {productos.map(p => <ProductoCard key={p._id} producto={p} />)}
      </div>
    </section>
  )
}
