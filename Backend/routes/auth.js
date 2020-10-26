var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout,signin signup } = require("../controllers/auth");

router.post("/signup",[
    check("name","Name should be at least Three characters").isLength({min:3}),
    check("email","Email is Required").isEmail(),
    check("password","Password should be at least 3 characters").isLength({min:3})
], signup);

router.post("/signin",[
    check("email","Email is Required").isEmail(),
    check("password","Password is Required").isLength({min:1})
], signin);
router.get("/signout", signout);

module.exports = router;
