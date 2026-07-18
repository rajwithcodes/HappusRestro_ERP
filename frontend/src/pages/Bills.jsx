import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/bills.css";

function Bills() {

    const [bills, setBills] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const fetchBills = async () => {
        try {

            const res = await api.get("/bills");

            setBills(res.data.bills);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {
        fetchBills();
    }, []);



    const filteredBills = bills.filter(
        (bill) =>
            bill.billNo
                .toLowerCase()
                .includes(search.toLowerCase()) ||

            bill.customer.name
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    return (

        <div className="bills-page">

            <h1>Bill History</h1>

            <input
                type="text"
                className="search-input"
                placeholder="Search Bill No or Customer Name..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <p className="bill-count">
                Total Bills : {filteredBills.length}
            </p>

            <table className="bills-table">

                <thead>

                    <tr>

                        <th>Bill No</th>

                        <th>Customer</th>

                        <th>Phone</th>

                        <th>Total</th>

                        <th>Payment</th>

                        <th>Date</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredBills.map((bill) => (

                        <tr key={bill._id}>

                            <td>{bill.billNo}</td>

                            <td>{bill.customer.name}</td>

                            <td>{bill.customer.phone}</td>

                            <td>₹{bill.grandTotal}</td>

                            <td>{bill.paymentMode}</td>

                            <td>
                                {new Date(
                                    bill.createdAt
                                ).toLocaleDateString()}
                            </td>

                            <td
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        navigate(`/bill/${bill._id}`)
                                    }
                                >
                                    View
                                </button>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        navigate(`/billing/edit/${bill._id}`)
                                    }
                                >
                                    ✏ Edit
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Bills;