//import {promises as fs} from 'fs'
//import {nanoid} from "nanoid"
import productModel from "../models/products.js";

class ProductManager {
    async addProduct(product) {
      try {
        const newProduct = new productModel.create(product);
        await newProduct.save();
        return "Producto agregado";
    } catch (error) {
        return "No se puede agregar producto";
    }
  }


  async getProducts() {
    try {
      const products = await productModel.find().lean();
      return products;
    } catch (error) {
      return "No se puede obtener producto";
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean();
      if (!product) return "No se encontró el producto";
      return product;
    } catch (error) {
      return "No se puede obtener producto";
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
      if (!updatedProduct) return "No se encuentra producto";
      return "Producto actualizado";
    } catch (error) {
      return "Error al actualizar el producto";
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productModel.findByIdAndRemove(id);
      if (!deletedProduct) return "No se encontró el producto";
      return "Producto eliminado";
    } catch (error) {
      return "No se puede eliminar producto";
    }
  }
}

export default ProductManager;


