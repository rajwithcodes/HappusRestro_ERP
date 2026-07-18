import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {

            const res =
                await api.get(
                    "/dashboard"
                );

            setDashboard(
                res.data.dashboard
            );

        } catch (error) {

            console.error(error);

        }
    };

    if (!dashboard) {
        return (
            <h2>
                Loading Dashboard...
            </h2>
        );
    }

    return (
        <div className="dashboard-page">

            <h1 className="dashboard-title">
                Dashboard
            </h1>

            {/* Stats Cards */}

            <div className="dashboard-grid">

                <div className="card">
                    <h3>
                        Today's Sales
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.todaySales
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        Total Sales
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.totalSales
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        Cash Sales
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.cashSales || 0
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        UPI Sales
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.upiSales || 0
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        Card Sales
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.cardSales || 0
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        Today's Bills
                    </h3>

                    <h2>
                        {
                            dashboard.todayBills
                        }
                    </h2>
                </div>

                <div className="card">
                    <h3>
                        Avg Bill Value
                    </h3>

                    <h2>
                        ₹
                        {
                            dashboard.averageBillValue || 0
                        }
                    </h2>
                </div>

            </div>

            {/* Most Selling Products */}

            <div className="product-card">

                <h2>
                    Most Selling Products
                </h2>

                <table className="product-table">

                    <thead>
                        <tr>
                            <th>
                                Product
                            </th>

                            <th>
                                Quantity Sold
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {dashboard.mostSellingProducts?.map(
                            (
                                item
                            ) => (
                                <tr
                                    key={
                                        item._id
                                    }
                                >
                                    <td>
                                        {
                                            item._id
                                        }
                                    </td>

                                    <td>
                                        {
                                            item.quantitySold
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

            {/* Top Customers

            <div className="product-card">

                <h2>
                    Top Customers
                </h2>

                <table className="product-table">

                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>

                            <th>
                                Phone
                            </th>

                            <th>
                                Total Spent
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {dashboard.topCustomers?.map(
                            (
                                customer
                            ) => (
                                <tr
                                    key={
                                        customer._id
                                    }
                                >
                                    <td>
                                        {
                                            customer.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            customer.phone
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            customer.totalSpent
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div> */}

        </div>
    );
}

export default Dashboard;