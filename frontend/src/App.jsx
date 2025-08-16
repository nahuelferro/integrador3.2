import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductoDetalle from './pages/ProductoDetalle'
import CarritoPage from './pages/CarritoPage'
import Pago from './pages/Pago'
import Navbar from './components/Navbar'
import { CarritoProvider } from './contexts/CarritoContext'

export default function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<CarritoPage />} />
          <Route path="/pago" element={<Pago />} />
        </Routes>
      </main>
    </CarritoProvider>
  )
}
