
import express from 'express';
import fs from 'fs';
import axios from 'axios';

const app = express();
app.use(express.json());

const PRODUCTS_FILE = './products.json';

type Product = {
  code: string;
  name: string;
  price: number;
  quantity: number;
  totalValue: number;
};

const readProducts = (): Product[] => {
  const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
  return JSON.parse(data);
};

const writeProducts = (products: Product[]) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

app.post('/products', async (req, res) => {
  const { code, name, price, quantity } = req.body;
  try {
    const { data: totalValue } = await axios.post('http://calculation-service:5000/calculate', {
      price,
      quantity
    });

    const newProduct: Product = { code, name, price, quantity, totalValue };
    const products = readProducts();
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular valor total' });
  }
});

app.get('/products/:code', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.code === req.params.code);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

app.put('/products/:code', async (req, res) => {
  const { price, quantity } = req.body;
  const products = readProducts();
  const product = products.find(p => p.code === req.params.code);
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

  try {
    const { data: totalValue } = await axios.post('http://calculation-service:5000/calculate', {
      price,
      quantity
    });

    product.price = price;
    product.quantity = quantity;
    product.totalValue = totalValue;
    writeProducts(products);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular valor total' });
  }
});

app.listen(3000, () => console.log('Product Service corriendo en puerto 3000'));
