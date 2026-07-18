const Bill = require("../models/Bill");
const Customer = require("../models/Customer");

const getDashboard = async (req, res) => {
    try {

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const todayBills = await Bill.find({
            createdAt: {
                $gte: startOfDay,
            },
        });

        const allBills =
            await Bill.find();

        const todaySales =
            todayBills.reduce(
                (sum, bill) =>
                    sum +
                    bill.grandTotal,
                0
            );

        const totalSales =
            allBills.reduce(
                (sum, bill) =>
                    sum +
                    bill.grandTotal,
                0
            );

        const cashSales =
            todayBills
                .filter(
                    (bill) =>
                        bill.paymentMode ===
                        "Cash"
                )
                .reduce(
                    (sum, bill) =>
                        sum +
                        bill.grandTotal,
                    0
                );

        const upiSales =
            todayBills
                .filter(
                    (bill) =>
                        bill.paymentMode ===
                        "UPI"
                )
                .reduce(
                    (sum, bill) =>
                        sum +
                        bill.grandTotal,
                    0
                );

        const cardSales =
            todayBills
                .filter(
                    (bill) =>
                        bill.paymentMode ===
                        "Card"
                )
                .reduce(
                    (sum, bill) =>
                        sum +
                        bill.grandTotal,
                    0
                );

        const averageBillValue =
            todayBills.length > 0
                ? (
                    todaySales /
                    todayBills.length
                ).toFixed(2)
                : 0;

        const topCustomers =
            await Customer.find()
                .sort({
                    totalSpent: -1,
                })
                .limit(5);

        console.log("Today Bills Count:", todayBills.length);

        todayBills.forEach((bill) => {
            console.log(
                bill.billNo,
                bill.paymentMode,
                bill.grandTotal
            );
        });

        console.log("UPI Sales:", upiSales);

        res.status(200).json({
            success: true,

            dashboard: {
                todaySales,
                totalSales,

                todayBills:
                    todayBills.length,

                cashSales,
                upiSales,
                cardSales,

                averageBillValue,

                topCustomers,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                error.message,
        });

    }
};

module.exports = {
    getDashboard,
};