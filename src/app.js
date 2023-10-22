import express from "express"; //importación de express
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import { engine } from "express-handlebars"; /*importación de módulo express-handlebars, osea la biblio para usar motores de plantillas handlebars con express */
import * as path from "path" /*importación del módulo path de node.js, entrega utilidades para trabajar con rutas de archivos y directorios */
import __dirname from "./utils.js"; /*importación de la variable __dirname desde el archivo utils.js*/
import ProductManager from "./controllers/ProductManager.js";
import CartManager from "./controllers/CartManager.js";
import mongoose from "mongoose";







const app = express(); //aquí la creación de la instancia de la apli express
const httpServer = app.listen(8080, () => console.log( "servidor en el puerto 8080" )); //definición del puerto http

const product = new ProductManager(); /*esta variable es la copia de product.routes, pero es de ProductManager y
todas sus funcionalidades. averiguar + */
const carts = new CartManager();


// const enviroment = async () => {
//     await mongoose.connect('mongodb+srv://soliskarem:8ZCtHpFdS5efORKR@coder.akmkbke.mongodb.net/?retryWrites=true&w=majority')
//     console.log("Atlas conectado")

    
// }
// enviroment()
// //middleware

mongoose.connect('mongodb+srv://soliskarem:yHO8pYSTC6sFsoi1@coder.9lutzzn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conexión a MongoDB Atlas exitosa");
  })
  .catch((error) => {
    console.error("Error de conexión a MongoDB Atlas: ", error);
  });


//analizarán solicitudes HTTP entrantes y los convertirán en formato json o url
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//estos middlewars son toda la extructura de handlebars
app.engine("handlebars", engine());  /*acá le digo al servidor que usaremos M.P.handlebars para el uso de express y que será a
través de engine()*/
app.set("view engine", "handlebars"); /*acá le digo al server que los archivos de view terminaran con la extensión .handlebars, se establece la vista
como handlebars, eso significa que express usará handlebars para renderizar las vistas*/
app.set("views", path.resolve(__dirname + "/views")); /*y además obvio debo decirle donde encontrar esos archivos, estableciendo la ubicación de las vistas
es una ruta absoluta al directorio de vistas que utiliza __dirname que he importado desde utils.js, así que express buscará en ese directorio las*/


//middleware para archivos estáticos
app.use("/", express.static(__dirname + "/public")) /*con __dirname le índico que en puclic estarán los archivos estáticos como el 
style.css y realtimeproduct.js dentro de public*/


//ruta a la página principal
app.get("/", async(req, res) =>{
    let products = await product.getProducts()/*gracias a la constante product copiada y pegada desde product.router puedo reutilizar funciones de rutas hechas ahí */
    res.render("products", { /*este render nos renderizará el archivo handlebars en main, pero a través de lo que hagamos en home */
        title: "Productos",
        products: products,
    })
})

app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;  // Obtiene el ID del producto desde la URL
  const products = await product.getProductById(productId);  // Busca el producto por ID
  res.render("details", { products });  // Pasa el producto encontrado a la vista
});

app.get("/carts", async (req, res) => {
  const cart = await carts.readCarts(); // Usa cartManager en lugar de carts
  const productsInCart = await carts.getProductsForCart(cart.products); // Usa cartManager para llamar a getProductsForCart
  console.log("Datos del carrito:", cart);
  res.render("carts", { cart, productsInCart }); // Pasa productsInCart a la vista
});


app.use("/api/productos", productRouter)
app.use("/api/carritos", CartRouter);






