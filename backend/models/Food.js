const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    type: {
        type: String,
        enum: ["Veg", "Non-Veg"],
        required: true,
    },

    description: {
        type: String,
        default: "",
    },

    image: {
        type: String,
        default: "",
    },

    availability: {
        type: Boolean,
        default: true,
    },

    onOrder: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Food", foodSchema);