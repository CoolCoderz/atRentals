const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")
const {getProductById, createProduct, getProduct, photo, removeProduct, updateProduct, getAllProducts, getAllUniqueCategories} = require("../controllers/product")

// PARAMETERS
router.param("userId", getUserById);
router.param("productId", getProductById);

// ACTUAL ROUTES
router.post("/product/create/:userId",isSignedIn, isAuthenticated, isAdmin, createProduct);
// read
router.get("/product/:productId",getProduct);
router.get("product/photo/:productId", photo);

router.delete("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, removeProduct);
router.put("/product/:productId/:userId",isSignedIn, isAuthenticated, isAdmin, updateProduct);

router.get("/products",getAllProducts);

router.get("products/categories",getAllUniqueCategories);
module.exports = router;