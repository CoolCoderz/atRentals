const express = require('express');
const router = express.Router();
const {isSignedIn, isAuthenticated} = require('../controllers/auth');

module.exports = router;