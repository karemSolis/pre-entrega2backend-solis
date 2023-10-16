import cartModel from '../models/cart.js';
import ProductManager from "./ProductManager.js";

const ProductALL = new ProductManager();

class CartManager {
    async readCarts() {
        return await cartModel.find();
    }

    async exist(id) {
        return await cartModel.findById(id);
    }

    async addCarts() {
        const newCart = await cartModel.create({ products: [] });
        return "Carrito Agregado";
    }

    async getCartsById(id) {
        const cart = await this.exist(id);
        if (!cart) return "Carrito no existe";
        return cart;
    }

    async addProductInCart(cartId, productId) {
        const cart = await this.exist(cartId);
        if (!cart) return "Carrito no existe";

        const product = await ProductALL.exist(productId);
        if (!product) return "No se encuentra el producto";

        if (cart.products.some((prod) => prod.id.equals(productId))) {
            const existingProduct = cart.products.find((prod) => prod.id.equals(productId));
            existingProduct.quantity++;
            await cart.save();
            return "Producto sumado en el carrito";
        }

        cart.products.push({ id: productId, quantity: 1 });
        await cart.save();
        return "Producto en el carrito :)";
    }
}

export default CartManager;
