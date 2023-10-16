import { Router } from "express";
import ProductModel from "../models/products.js"; 

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

productRouter.post("/", async (req, res) => {
  const { producto, descripcion, valor } = req.body;
  try {
    const newProduct = new ProductModel({
      producto,
      descripcion,
      valor,
    });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error al crear un nuevo producto" });
  }
});

productRouter.put("/:id", async (req, res) => {
  const { producto, descripcion, valor } = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        producto,
        descripcion,
        valor,
      },
      { new: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndRemove(req.params.id);
    if (deletedProduct) {
      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default productRouter;
