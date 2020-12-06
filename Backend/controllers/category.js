const Category = require("../models/category");

exports.getCategoryId = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err) {
            return res.status(400).json({
                error: "Category NOT Found",
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "NOT ABLE TO CREATE CATE CATEGORY IN DATABASE",
            });
        }
        req.json(category);
    });
};

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err){
            return res.status(400).json({
                error: "No CATEGORY Found"
            });
        }
        res.json(categories);
    })
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory)=>{
        if(err) {
            return res.status(400).json({
                error: "CATEGORY Not Updated Failed!",
            });
        }
        req.send(updatedCategory);
    });
};

exports.removeCategory = (req, res) => {
    const category = req.category;

    category.remove((err, removedCategory)=>{
        if(err) {
            return res.status(400).json({
                error: `Failed to delete this ${req.removedCategory} category`,
            });
        }
        res.json({
            message: `Successfully Delete ${req.removedCategory} category`
        });
    });
};