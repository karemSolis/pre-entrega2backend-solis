import { Router } from "express";
import CartManager from "../controllers/CartManager.js";
import cartModel from "../models/cart.js";


const CartRouter = Router();
const carts = new CartManager();

// POST api/carts
CartRouter.post("/", async (req, res) => {
  res.send(await carts.addCarts());
});

// GET api/carts
CartRouter.get('/', async (req, res) => {
  res.send(await carts.readCarts());
});

// GET api/carts/:cid
CartRouter.get('/:cid', async (req, res) => {
  // Utiliza "populate" para traer los productos completos asociados al carrito
  const cartId = req.params.cid;
  try {
    const cart = await cartModel.findById(cartId).populate("products");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "No se pudo encontrar el carrito" });
  }
});

// PUT api/carts/:cid
CartRouter.put('/:cid', async (req, res) => {
  // Actualiza el carrito con un arreglo de productos
  const cartId = req.params.cid;
  const updatedProducts = req.body.products;
  res.send(await carts.updateCartProducts(cartId, updatedProducts));
});

// PUT api/carts/:cid/products/:pid
CartRouter.put('/:cid/products/:pid', async (req, res) => {
  // Actualiza la cantidad de ejemplares del producto en el carrito
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  res.send(await carts.updateProductQuantity(cartId, productId, quantity));
});

// DELETE api/carts/:cid
CartRouter.delete('/:cid', async (req, res) => {
  // Elimina todos los productos del carrito
  const cartId = req.params.cid;
  res.send(await carts.deleteCartProducts(cartId));
});

// DELETE api/carts/:cid/products/:pid
CartRouter.delete('/:cid/products/:pid', async (req, res) => {
  // Elimina un producto específico del carrito
  const cartId = req.params.cid;
  const productId = req.params.pid;
  res.send(await carts.deleteProductFromCart(cartId, productId));
});

export default CartRouter;
