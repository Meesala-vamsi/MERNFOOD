const express = require("express")
const cartController = require('../Controllers/cartController')
const authController = require('../Controllers/userAuth')
const router = express.Router()

router.route("/")
       .post(authController.authProtectedRoute,cartController.createCart) 
       .get(authController.authProtectedRoute,cartController.getCart)
router.route("/remove")
       .post(authController.authProtectedRoute,cartController.deleteCart) 




module.exports = router