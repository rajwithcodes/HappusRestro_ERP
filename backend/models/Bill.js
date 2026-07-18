const mongoose = require("mongoose");

const billSchema = new mongoose.Schema(
    {
        // Bill Number
        billNo: {
            type: String,
            unique: true,
        },

        // Customer Snapshot
        customer: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Customer",
            },

            name: {
                type: String,
                required: true,
            },

            phone: {
                type: String,
                required: true,
            },
        },

        // Visit Type
        visitType: {
            type: String,
            enum: ["Dine-In", "Takeaway", "Online"],
            default: "Dine-In",
        },

        // Bill Items
        items: [
            {
                foodId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Food",
                    required: false,
                },

                customItem: {
                    type: Boolean,
                    default: false,
                },

                name: {
                    type: String,
                    required: true,
                },

                category: {
                    type: String,
                    default: "Custom",
                },

                type: {
                    type: String,
                    default: "Custom",
                },

                qty: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },

                total: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        // Billing Calculation
        subTotal: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPercent: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        discountAmount: {
            type: Number,
            default: 0,
            min: 0,
        },

        taxableAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        gst: {
            type: Number,
            default: 0,
            min: 0,
        },

        grandTotal: {
            type: Number,
            required: true,
            min: 0,
        },

        // Payment
        paymentMode: {
            type: String,
            enum: ["Cash", "Card", "UPI", "Other"],
            default: "Cash",
        },
        edited: {
            type: Boolean,
            default: false,
        },

        editedAt: {
            type: Date,
        },

        // Bill Status
        status: {
            type: String,
            enum: ["Paid", "Cancelled"],
            default: "Paid",
        },

        // Offline / Online Source
        source: {
            type: String,
            default: "Offline",
        },
    },
    {
        timestamps: true,
    }
);

// Auto Generate Bill Number
billSchema.pre("save", async function () {
    if (!this.billNo) {
        const Bill = mongoose.model("Bill");

        const lastBill = await Bill.findOne().sort({
            createdAt: -1,
        });

        const nextNumber = lastBill
            ? parseInt(lastBill.billNo.split("-")[1]) + 1
            : 1;

        this.billNo = `HAPPUS-${String(nextNumber).padStart(4, "0")}`;
    }
});

module.exports = mongoose.model("Bill", billSchema);