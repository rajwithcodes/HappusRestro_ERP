const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const customerRoutes = require("./routes/customerRoutes");
const foodRoutes = require("./routes/foodRoutes");
const billRoutes = require("./routes/billRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const connectDB = require('./config/db');
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the API'
    });
});
app.use("/api/customers", customerRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});