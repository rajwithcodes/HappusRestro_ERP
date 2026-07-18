const express = require("express");

const {
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood,
} = require("../controllers/foodController");

const router = express.Router();

router.post("/", createFood);

router.get("/", getFoods);

router.get("/:id", getFoodById);

router.put("/:id", updateFood);

router.delete("/:id", deleteFood);

module.exports = router;