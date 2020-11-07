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

