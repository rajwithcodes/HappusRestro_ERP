const Bill = require("../models/Bill");
const Customer = require("../models/Customer");

const createBill = async (req, res) => {
    try {
        const {
            customerName,
            customerPhone,
            visitType,
            items,
            discountPercent = 0,
            paymentMode,
        } = req.body;

        // Validation
        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Bill must contain at least one item",
            });
        }

        // Calculate Subtotal
        const subTotal = items.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );

        // Discount Calculation
        const discountAmount = Number(
            ((subTotal * discountPercent) / 100).toFixed(2)
        );

        // Amount after discount
        const taxableAmount = Number(
            (subTotal - discountAmount).toFixed(2)
        );

        // GST (5%)
        const gst = Number(
            (taxableAmount * 0.05).toFixed(2)
        );

        // Final Total
        const totalBeforeRound =
            taxableAmount + gst;

        const grandTotal =
            Math.round(totalBeforeRound);

        // Find Existing Customer
        let customer = await Customer.findOne({
            phone: customerPhone,
        });

        // Create Customer if Not Found
        if (!customer) {
            customer = await Customer.create({
                name: customerName,
                phone: customerPhone,
            });
        }

        // Update Customer Statistics
        customer.totalSpent += grandTotal;
        customer.visitCount += 1;
        customer.lastVisit = new Date();

        await customer.save();

        // Create Bill
        const bill = await Bill.create({
            customer: {
                id: customer._id,
                name: customer.name,
                phone: customer.phone,
            },

            visitType,

            items: items.map((item) => ({
                foodId: item.foodId || null,

                customItem: item.customItem || false,

                name: item.name,

                category: item.category || "Custom",

                type: item.type || "Custom",

                qty: item.qty,

                price: item.price,

                total: item.price * item.qty,
            })),

            subTotal,
            discountPercent,
            discountAmount,
            taxableAmount,
            gst,
            grandTotal,
            paymentMode,
        });

        return res.status(201).json({
            success: true,
            message: "Bill generated successfully",
            bill,
        });
    } catch (error) {
        console.error("Create Bill Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getBills = async (req, res) => {
    try {
        const bills = await Bill.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bills.length,
            bills,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }

        res.status(200).json({
            success: true,
            bill,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateBill = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            customerName,
            customerPhone,
            visitType,
            items,
            discountPercent = 0,
            paymentMode,
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Bill must contain at least one item",
            });
        }

        const oldBill = await Bill.findById(id);

        if (!oldBill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }

        // ============================
        // Remove old bill amount
        // ============================

        const oldCustomer =
            await Customer.findById(
                oldBill.customer.id
            );

        if (oldCustomer) {

            oldCustomer.totalSpent -=
                oldBill.grandTotal;

            if (oldCustomer.totalSpent < 0) {
                oldCustomer.totalSpent = 0;
            }

            await oldCustomer.save();

        }

        // ============================
        // Find/Create Customer
        // ============================

        let customer =
            await Customer.findOne({
                phone: customerPhone,
            });

        if (!customer) {

            customer =
                await Customer.create({
                    name: customerName,
                    phone: customerPhone,
                });

        }

        // ============================
        // Calculate Bill
        // ============================

        const subTotal = items.reduce(
            (sum, item) =>
                sum +
                item.price * item.qty,
            0
        );

        const discountAmount =
            Number(
                (
                    (subTotal *
                        discountPercent) /
                    100
                ).toFixed(2)
            );

        const taxableAmount =
            Number(
                (
                    subTotal -
                    discountAmount
                ).toFixed(2)
            );

        const gst = Number(
            (
                taxableAmount * 0.05
            ).toFixed(2)
        );

        const grandTotal =
            Math.round(
                taxableAmount + gst
            );

        // ============================
        // Update Customer Total
        // ============================

        customer.totalSpent +=
            grandTotal;

        customer.lastVisit =
            new Date();

        await customer.save();

        // ============================
        // Update Bill
        // ============================

        oldBill.customer = {
            id: customer._id,
            name: customer.name,
            phone: customer.phone,
        };

        oldBill.visitType =
            visitType;

        oldBill.items = items.map(
            (item) => ({
                foodId:
                    item.foodId ||
                    null,

                customItem:
                    item.customItem ||
                    false,

                name: item.name,

                category:
                    item.category ||
                    "Custom",

                type:
                    item.type ||
                    "Custom",

                qty: item.qty,

                price: item.price,

                total:
                    item.price *
                    item.qty,
            })
        );

        oldBill.subTotal =
            subTotal;

        oldBill.discountPercent =
            discountPercent;

        oldBill.discountAmount =
            discountAmount;

        oldBill.taxableAmount =
            taxableAmount;

        oldBill.gst = gst;

        oldBill.grandTotal =
            grandTotal;

        oldBill.paymentMode =
            paymentMode;

        oldBill.edited = true;

        oldBill.editedAt =
            new Date();

        await oldBill.save();

        res.status(200).json({
            success: true,
            message:
                "Bill updated successfully",
            bill: oldBill,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
const searchBill = async (req, res) => {
    try {
        const { billNo } = req.query;

        const bill = await Bill.findOne({ billNo });

        if (!bill) {
            return res.status(404).json({
                success: false,
                message: "Bill not found",
            });
        }

        res.status(200).json({
            success: true,
            bill,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createBill,
    getBills,
    getBillById,
    updateBill,
    searchBill,
};