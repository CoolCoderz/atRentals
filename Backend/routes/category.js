const express =  require('express');
const router = express.Router();

const {getUserById} = require("../controllers/user");
const {getCategoryId, createCategory} = require("../controllers/category");
const {
    isSignedIn,
    isAdmin, 
    isAuthenticated
} = require("../controllers/auth");

// PARAMS
router.param("userId",getUserById);
router.param("categoryId",getCategoryId);

// Actual Routes
// create
router.post("category/create/:userId",isSignedIn, isAuthenticated, isAdmin, createCategory);

module.exports = router;



