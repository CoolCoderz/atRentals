const express = require('express');
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {updateInventory} = require('../controllers/product')
const {getOrderById, createOrder, getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order")

// params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
// Routes
router.post(
    "/orer/create/:userId",
    isSignedIn,
    isAuthenticated, 
    pushOrderInPurchaseList, 
    updateInventory, 
    createOrder
    );

router.get("/order/all/:userId",isSignedIn, isAuthenticated,isAdmin, getAllOrders);
router.get("/order/status/:userId",isSignedIn, isAuthenticated,getOrderStatus);
router.put("order/:orderId/status/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);
module.exports = router;    