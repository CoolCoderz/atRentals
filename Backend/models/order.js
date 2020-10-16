const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const productCartSchema = mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    // What we want to see in the cart itself
    name: String,
    count: Number,
    price: Number
    // we can also mention a lot of thing here
    // like when the product will be delivered coups etc.

});

const ProductCart = mongoose.model("ProductCart", productCartSchema);


const orderSchema = mongoose.Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCart};