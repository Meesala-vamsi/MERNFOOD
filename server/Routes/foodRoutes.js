const express = require("express")
const foodController = require("../Controllers/foodControllers")
const upload = require('../Storage/Storage')
const authController = require("../Controllers/userAuth")

const router = express.Router()

router.route("/")
      .post(upload.single("image") , foodController.addFoodDetails)

router.route("/list")
      .get(foodController.getAllFoodList)

router.route("/:id")
      .delete(foodController.deleteFoodDetails)  


module.exports = router 