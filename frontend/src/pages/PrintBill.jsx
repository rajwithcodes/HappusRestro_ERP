import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/receipt.css";

function PrintBill() {
    const { id } = useParams();

    const [bill, setBill] = useState(null);

    useEffect(() => {
        fetchBill();
    }, []);

    const fetchBill = async () => {
        try {
            const res = await api.get(`/bills/${id}`);

            setBill(res.data.bill);
        } catch (error) {
            console.error(error);
        }
    };

    if (!bill) {
        return <h2>Loading Bill...</h2>;
    }

    return (
        <div className="receipt"
            style={{
                maxWidth: "500px",
                margin: "30px auto",
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow:
                    "0 2px 10px rgba(0,0,0,0.1)",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                }}
            >
                HAPPUS RESTAURANT
            </h2>

            <hr />

            <p>
                <strong>Bill No:</strong>{" "}
                {bill.billNo}
            </p>

            <p>
                <strong>Customer:</strong>{" "}
                {bill.customer.name}
            </p>

            <p>
                <strong>Phone:</strong>{" "}
                {bill.customer.phone}
            </p>

            <p>
                <strong>Payment:</strong>{" "}
                {bill.paymentMode}
            </p>

            <hr />

            <h3>Items</h3>

            {bill.items.map((item) => (
                <div
                    key={item._id}
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginBottom: "8px",
                        
                    }}
                >
                    <span>
                        {item.name} × {item.qty}
                    </span>

                    <span>
                        ₹{item.total}
                    </span>
                </div>
            ))}

            <hr />

            <p>
                <strong>Sub Total:</strong> ₹
                {bill.subTotal}
            </p>

            <p>
                <strong>Discount:</strong> ₹
                {bill.discountAmount}
            </p>

            <p>
                <strong>GST:</strong> ₹
                {bill.gst}
            </p>

            <h2>
                Total: ₹
                {bill.grandTotal}
            </h2>

            <button
                className="print-btn"
                onClick={() => window.print()}
            >
                Print Bill
            </button>
        </div>
    );
}

export default PrintBill;