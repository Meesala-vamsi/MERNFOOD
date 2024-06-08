const express = require("express")
const orderController = require("../Controllers/orderController")
const authController = require("../Controllers/userAuth")

const router = express.Router()

router.route("/")
      .post(authController.authProtectedRoute,orderController.placeOrder)
router.route("/verify")
      .post(orderController.verifyOrder)
router.route("/userorders")
      .get(authController.authProtectedRoute,orderController.userOrders)

module.exports = router