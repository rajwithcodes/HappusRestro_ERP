import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/billDetails.css";

function BillDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [bill, setBill] = useState(null);

    useEffect(() => {
        fetchBill();
    }, []);

    const fetchBill = async () => {
        try {

            const res = await api.get(
                `/bills/${id}`
            );

            setBill(res.data.bill);

        } catch (error) {

            console.error(error);

        }
    };

    if (!bill) {
        return <h2>Loading...</h2>;
    }

    return (
        <div
            className="bill-details-page"
        >
            <h1>Bill Details</h1>

            <div
                className="bill-card"
            >

                <h2>
                    {bill.billNo}
                </h2>

                <p className="bill-info">
                    <strong>
                        Customer:
                    </strong>{" "}
                    {bill.customer.name}
                </p>

                <p className="bill-info">
                    <strong>
                        Phone:
                    </strong>{" "}
                    {bill.customer.phone}
                </p>

                <p className="bill-info">
                    <strong>
                        Payment:
                    </strong>{" "}
                    {bill.paymentMode}
                </p>

                <p className="bill-info">
                    <strong>
                        Date:
                    </strong>{" "}
                    {new Date(
                        bill.createdAt
                    ).toLocaleString()}
                </p>

                <hr />

                <h3>Items</h3>

                <table
                    className="items-table"
                >
                    <thead>
                        <tr>
                            <th>
                                Item
                            </th>
                            <th>
                                Qty
                            </th>
                            <th>
                                Price
                            </th>
                            <th>
                                Total
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {bill.items.map(
                            (item) => (
                                <tr
                                    key={
                                        item._id
                                    }
                                >
                                    <td>
                                        {
                                            item.name
                                        }
                                    </td>

                                    <td>
                                        {
                                            item.qty
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            item.price
                                        }
                                    </td>

                                    <td>
                                        ₹
                                        {
                                            item.total
                                        }
                                    </td>
                                </tr>
                            )
                        )}

                    </tbody>
                </table>

                <hr />

                <p>
                    <strong>
                        Sub Total:
                    </strong>{" "}
                    ₹
                    {
                        bill.subTotal
                    }
                </p>

                <p>
                    <strong>
                        Discount:
                    </strong>{" "}
                    ₹
                    {
                        bill.discountAmount
                    }
                </p>

                <p>
                    <strong>
                        GST:
                    </strong>{" "}
                    ₹
                    {bill.gst}
                </p>

                <h2 className="grand-total">
                    Grand Total:
                    ₹
                    {
                        bill.grandTotal
                    }
                </h2>

                <div
                    className="bill-actions"
                >
                    <button
                        onClick={() =>
                            navigate(
                                `/bill/${bill._id}/print`
                            )
                        }
                    >
                        Reprint Bill
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                "/bills"
                            )
                        }
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BillDetails;