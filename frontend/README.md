# Capri · Frontend React (Vite)

Frontend listo para catálogo de **Postres, Tortas y Bebidas** con carrito, usando **Context API** y **Axios**.

## 🚀 Cómo correr
1. Instalar deps: `npm i`
2. Desarrollo: `npm run dev`
3. Build: `npm run build` y `npm run preview`

> Por defecto, el listado de productos usa un **mock local** (`/public/data/products.json`).
> Para conectarlo a tu backend, crea un `.env` con `VITE_API_URL=http://localhost:3000/api`
> y asegurate de que existan los endpoints:
> - GET `/productos`
> - GET `/productos/:id`
> - POST `/carrito`

Si `VITE_API_URL` está definida, **Axios** usará el backend real. Si no, el servicio entra en **modo mock** para que el catálogo funcione sin servidor.

## 🧱 Estructura
```
/src
  /components      → ProductoCard, Carrito, Navbar
  /pages           → Home, ProductoDetalle, CarritoPage, Pago
  /services        → axios con endpoints definidos (modo real y mock)
  /contexts        → contexto global para carrito
  /hooks           → hooks personalizados
```

## 🛒 Flujo clave
- Listado → Detalle → Agregar al carrito → Carrito → Confirmar pedido
- Envío del carrito como JSON: `{ productos: [...], total: 12345 }`
- Carrito se vacía tras POST exitoso

## 🎨 Estilos
Se incluye un `styles.css` minimalista y responsive estilo cafetería.
