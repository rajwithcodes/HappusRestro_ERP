const Customer = require("../models/Customer");
const Bill = require("../models/Bill");

// Create Customer
const createCustomer = async (req, res) => {
    try {
        const { name, phone } = req.body;

        const existingCustomer = await Customer.findOne({ phone });

        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: "Customer already exists",
            });
        }

        const customer = await Customer.create({
            name,
            phone,
        });

        res.status(201).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get All Customers
const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            count: customers.length,
            customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Single Customer
const getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Update Customer
const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        await customer.deleteOne();

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getCustomerBills = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        const bills = await Bill.find({
            "customer.id": customer._id,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,

            customer: {
                id: customer._id,
                name: customer.name,
                phone: customer.phone,
                visitCount: customer.visitCount,
                totalSpent: customer.totalSpent,
                lastVisit: customer.lastVisit,
            },

            totalBills: bills.length,

            bills,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const searchCustomerByPhone = async (req, res) => {
    try {
        const { phone } = req.query;

        const customer = await Customer.findOne({ phone });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerBills,
    searchCustomerByPhone,
};