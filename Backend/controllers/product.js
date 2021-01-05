const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
var _ = require('lodash');

exports.getProductById = (req, res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found",
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err) {
            return res.status(400).json({
                error: "IMAGE NOT VALID",
            });
        }
        // destructuring fields
        const {name,description,price,category,stock,} = fields;

        if(!name || !description ||!price || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields",
            })
        }
       
        let product = new Product(fields);

        // handling file upload
        if(file.photo){
            if(file.photo.length > 3000000){
                return res.status(400).json({
                    error: "File Size is greater than Expected!"
                });
            }
            // see from model the types in photo 
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // To save in DATABASE
        product.save((err, product)=>{
            if(err) {
                return res.status(400).json({
                    error: "Saving Product in DATABASE failed",
                });
            }
            res.json(product);
        })
    })
}

exports.getProduct = (req, res)=>{
    // media fiels are not getting served by get request so 
    req.product.photo = undefined;
    return res.json(req.product);
}
// middleware for sending photo that has bein made undefined in get route
exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

// delete product controller
exports.removeProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct)=>{
        if(err) {
            return res.status(400).json({
                error: "Deletion was unsuccessful."
            });
        }
        res.json({
            message: "Product deleted successfully",
            deletedProduct
        });
    });
};

exports.updateProduct = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err) {
            return res.status(400).json({
                error: "IMAGE NOT VALID",
            });
        }

    //    updation Code
        let product = req.product;
        product = _.extend(product, fields);

        // handling file upload
        if(file.photo){
            if(file.photo.length > 3000000){
                return res.status(400).json({
                    error: "File Size is greater than Expected!"
                });
            }
            // see from model the types in photo 
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // To save in DATABASE
        product.save((err, product)=>{
            if(err) {
                return res.status(400).json({
                    error: "Updation failed",
                });
            }
            res.json(product);
        })
    })   
};
// listing routes
exports.getAllProducts = (req, res) => {
    // select is for selecting things we want or not want -ve sign is used for not wanting
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // queries in the form of string so we have to handle it properly
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
     .select("-photo")
     .populate("category")
     .sort([[sortBy,"asc"]])
     .limit(limit)
     .exec((err, products)=>{
         if(err){
             return res.status(400).json({
                 error: "NO Product Found"
             });
         }
         res.json(products);
     });
};
// Managing stock and sold using middleware
exports.updateInventory = (req, res, next)=>{
    let myOperations = req.body.order.products.map(product => {
        return {
            updateOne:{
                // filter is to find the product
                filter:{_id: product._id},
                // then updating the product
                update: {$inc : {stock: -product.count, sold: +product.count}},
            }
        }

    });
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err) {
            return res.status(400).json({error: "Bulk Operation Failed"});
        }
        next();
    });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category",{},(err,category)=>{
        if(err) {
            return res.status(400).json({error: "Category not Found"});
        }
        res.json(category);
    })
};