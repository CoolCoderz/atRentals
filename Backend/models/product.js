const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;
const schema  = mongoose.Schema;

const productSchema = new schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 1500
    },
    price:{
        type: Number,
        required: true,
        maxlength: 32,
        trim: true

    },
    category:{
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type:Number,
    },
    sold:{
        type: Number,
        default: 0
    },
    photo: {
        type: Buffer,
        contentType: String
    }

},{
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);