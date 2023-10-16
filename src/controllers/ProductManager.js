//import {promises as fs} from 'fs'
//import {nanoid} from "nanoid"
import productModel from "../models/products.js";

class ProductManager {
    async addProduct(product) {
      try {
        const newProduct = new productModel.create(product);
        await newProduct.save();
        return "Producto agregado correctamente";
    } catch (error) {
        return "Error al agregar el producto";
    }
  }
  // async addProduct(product){
  //   await productModel.create({
  //       producto:"Serrucho pro",
  //       descripcion :"Mango plástico",
  //       valor: 10000,
  //   })}

  async getProducts() {
    try {
      const products = await productModel.find();
      return products;
    } catch (error) {
      return "Error al obtener productos";
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      if (!product) return "Producto no encontrado";
      return product;
    } catch (error) {
      return "Error al obtener el producto";
    }
  }

  async updateProduct(id, product) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, product, { new: true });
      if (!updatedProduct) return "Producto no encontrado";
      return "Producto actualizado";
    } catch (error) {
      return "Error al actualizar el producto";
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await productModel.findByIdAndRemove(id);
      if (!deletedProduct) return "Producto no encontrado";
      return "Producto eliminado";
    } catch (error) {
      return "Error al eliminar el producto";
    }
  }
}

export default ProductManager;


