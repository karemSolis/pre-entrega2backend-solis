//CREANDO EL ESQUEMA O ESTRUCTUR DE LOS DATOS QUE SE GUARDARÁN EN ATLAS
import mongoose from "mongoose";

const productCollection = "Productos" //la colección para atlas 

//el schema
const productSchema = mongoose.Schema({
    producto:String,
    descripcion :String,
    valor: Number, 
})

//se crea la constante para exportar 
const productModel = mongoose.model(productCollection, productSchema) 

export default productModel