const express = require("express");

const {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerBills,
    searchCustomerByPhone,
} = require("../controllers/customerController");
console.log("getCustomerBills =", getCustomerBills);

const router = express.Router();

router.post("/", createCustomer);

router.get("/", getCustomers);

router.get("/search/phone", searchCustomerByPhone);

router.get("/:id/bills", getCustomerBills);

router.get("/:id", getCustomerById);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);



module.exports = router;