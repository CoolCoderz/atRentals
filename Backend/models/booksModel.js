import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: {type: String, required:true},
        author: {type: String, required:true},
        comment: {type: String,required: false},
        rating: {type: Number, required: true},
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const bookSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name :{
            type: String,
            required: true,
        },
        image: {
            type: Buffer,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        category:[
            {
            Name : {type:String, required:true},
            }
    ],
        description:{
            type: String,
            required: true,
        },
        reviews: [reviewSchema],
        rating:{
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
)

const Book = mongoose.model('Book', bookSchema)

export default Book