import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/customers.css";

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [phone, setPhone] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerBills, setCustomerBills] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await api.get("/customers");
            setCustomers(res.data.customers);
        } catch (error) {
            console.error(error);
        }
    };
    const searchCustomer = async () => {
        try {
            const res = await api.get(
                `/customers/search/phone?phone=${phone}`
            );

            setCustomers([res.data.customer]);
        } catch (error) {
            alert("Customer not found");
        }
    };
    const viewBills = async (customerId) => {
        try {
            const res = await api.get(
                `/customers/${customerId}/bills`
            );

            setSelectedCustomer(res.data.customer);
            setCustomerBills(res.data.bills);
        } catch (error) {
            console.error(error);
        }
    };

    const loadAllCustomers = async () => {
        fetchCustomers();
        setPhone("");
    };

    return (
        <div>
            <h1 className="page-title">Customers</h1>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button onClick={searchCustomer}>
                    Search
                </button>

                <button onClick={loadAllCustomers}>
                    Reset
                </button>
            </div>

            <div className="customer-card">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Total Spent</th>
                            <th>Visits</th>
                            <th>Last Visit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer._id}>
                                <td>
                                    <button
                                        className="view-bills-btn"
                                        onClick={() => viewBills(customer._id)}
                                    >
                                        📄View Bills
                                    </button>
                                </td>

                                <td>{customer.name}</td>

                                <td>{customer.phone}</td>

                                <td>₹{customer.totalSpent}</td>

                                <td>{customer.visitCount}</td>

                                <td>
                                    {new Date(
                                        customer.lastVisit
                                    ).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedCustomer && (
                    <div className="history-card">
                        <h2>
                            {selectedCustomer.name}'s Purchase History
                        </h2>

                        <p>
                            Total Spent: ₹{selectedCustomer.totalSpent}
                        </p>

                        <p>
                            Visits: {selectedCustomer.visitCount}
                        </p>

                        <table className="customer-table">
                            <thead>
                                <tr>
                                    <th>Bill No</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customerBills.map((bill) => (
                                    <tr key={bill._id}>
                                        <td>{bill.billNo}</td>

                                        <td>₹{bill.grandTotal}</td>

                                        <td>{bill.paymentMode}</td>

                                        <td>
                                            {new Date(
                                                bill.createdAt
                                            ).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Customers;