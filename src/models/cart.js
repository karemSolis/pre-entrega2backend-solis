import mongoose from "mongoose";

const cartCollection = "carritos";

const cartSchema = mongoose.Schema({
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    }],
    quantity: Number
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
