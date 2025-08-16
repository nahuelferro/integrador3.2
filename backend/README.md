
# Backend MVC - Productos & Carrito (Express + Mongoose)

API REST con patrón MVC que expone CRUD de productos y recepción de carrito/pedidos. Listo para desplegar en Glitch.

## Requisitos
- Node.js 18+
- Cuenta y cluster en **MongoDB Atlas**
- (Opcional) Cuenta de **Mercado Pago** y Access Token

## Configuración
1. Clonar el repo y crear `.env` a partir de `.env.example`:
```
PORT=3000
MONGODB_URI=mongodb+srv://usuario:pass@cluster.xxxx.mongodb.net/miBase
FRONTEND_URL=http://localhost:5173
MP_ACCESS_TOKEN=APP_USR-XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```
2. Instalar dependencias:
```
npm install
```
3. Entorno de desarrollo:
```
npm run dev
```
4. Producción (Glitch usa `npm start`):
```
npm start
```

## Rutas

### Productos (CRUD)
- `GET /api/productos` → lista todos
- `GET /api/productos/:id` → uno por ID
- `POST /api/productos` → crear (JSON body)
- `PUT /api/productos/:id` → actualizar
- `DELETE /api/productos/:id` → eliminar

**Ejemplo JSON Product:**
```json
{
  "nombre": "Café en grano",
  "descripcion": "Tostado medio 1kg",
  "precio": 15999,
  "stock": 20,
  "imagen": "https://...",
  "categoria": "Bebidas"
}
```

### Carrito / Pedido
- `POST /api/carrito` → recibe array de productos desde el frontend y crea un **Order**.
  - Body esperado:
```json
{
  "items": [
    { "productId": "66bcb8b...", "nombre": "Café en grano", "precio": 15999, "cantidad": 2, "imagen": "https://..." }
  ],
  "cliente": { "nombre": "Ana", "email": "ana@mail.com" }
}
```

**Respuesta:** incluye `orderId` y `total`. Al recibir 201 en el frontend, **vacía el carrito**.

### Pagos (Mercado Pago) — opcional
- `POST /api/pagos/checkout` con `{ "orderId": "<id>" }` → crea **preferencia** y devuelve `init_point`.
- `POST /api/pagos/webhook` → endpoint para notificaciones. Configúralo en MP.

## MVC
- `src/models` → esquemas Mongoose (Product, Order)
- `src/controllers` → lógica de negocio
- `src/routes` → definición de rutas
- `src/middlewares` → manejadores de errores
- `src/config` → conexión DB
- `src/app.js` → instancia de Express (CORS, Helmet, JSON, rutas)
- `server.js` → inicio de app + conexión a DB

## Despliegue en Glitch
1. Crea un nuevo proyecto “Import from GitHub” o sube el ZIP.
2. En **Tools → Secrets (.env)** agrega:
   - `MONGODB_URI`
   - `FRONTEND_URL`
   - (opcional) `MP_ACCESS_TOKEN`
3. Glitch instalará dependencias y ejecutará `npm start`.

## Notas
- No incluyas `node_modules` en el zip ni el repo.
- Valida inputs en el frontend. Aquí hay validaciones mínimas.
- Agrega autenticación para admin si lo necesitas (no incluida).
