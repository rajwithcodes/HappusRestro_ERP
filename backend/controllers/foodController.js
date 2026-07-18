const Food = require("../models/Food");

// Create Food
const createFood = async (req, res) => {
    try {
        const food = await Food.create(req.body);

        res.status(201).json({
            success: true,
            food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Foods
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: foods.length,
            foods,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Food
const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        res.status(200).json({
            success: true,
            food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Food
const updateFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        res.status(200).json({
            success: true,
            food,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Food
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found",
            });
        }

        await food.deleteOne();

        res.status(200).json({
            success: true,
            message: "Food deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createFood,
    getFoods,
    getFoodById,
    updateFood,
    deleteFood,
};