const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    visitCount: {
        type: Number,
        default: 0,
    },

    totalSpent: {
        type: Number,
        default: 0,
    },

    lastVisit: {
        type: Date,
        default: Date.now,
    },

    feedback: {
        type: String,
        default: "",
    },

    loyaltyPoints: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Customer", customerSchema);