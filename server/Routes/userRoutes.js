const express = require("express")

const userController = require("../Controllers/userController")
const authController = require("../Controllers/userAuth")


const router = express.Router()

router.route("/")
      .post(userController.createUser)
router.route("/signup")
      .post(authController.userSignup)
router.route("/login")
      .post(authController.login)
router.route("/forgotPassword")
      .post(authController.forgotPassword)



module.exports = router