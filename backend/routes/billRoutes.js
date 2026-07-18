const express = require("express");

const {
    createBill,
    getBills,
    getBillById,
    updateBill,
    searchBill,
} = require("../controllers/billController");

const router = express.Router();

router.post("/", createBill);

router.get("/", getBills);

router.get("/search", searchBill);

router.get("/:id", getBillById);
router.put("/:id", updateBill);

module.exports = router;