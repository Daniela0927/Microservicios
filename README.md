
# Inventario Distribuido con Microservicios

Este proyecto implementa una solución distribuida con microservicios para la gestión de productos y el cálculo de valores derivados usando Node.js (TS) y Python.

## 🧱 Estructura

- **Product Service (Node.js + TS):**
  - Permite crear, consultar y actualizar productos.
  - Persistencia en archivo `products.json`.
  - Se comunica con el Calculation Service por HTTP.

- **Calculation Service (Python + Flask):**
  - Calcula el valor total de inventario (`precio * cantidad`).

## 🚀 Cómo ejecutar

### 1. Clona el repositorio

```bash
git clone <url>
cd inventario-microservicios
```

### 2. Levanta los servicios

```bash
docker-compose up --build
```

- `localhost:3000`: Product Service
- `localhost:5000`: Calculation Service

## 🧪 Pruebas

```bash
# En product-service
npm install
npm test

# En calculation-service
python -m unittest discover
```

## 🔁 Ejemplos de uso

### Crear producto

```http
POST /products
Content-Type: application/json

{
  "code": "A001",
  "name": "Producto A",
  "price": 100,
  "quantity": 3
}
```

### Consultar producto

```http
GET /products/A001
```

## 🐳 Docker

Incluye `Dockerfile` para cada servicio y `docker-compose.yml` para orquestación.
