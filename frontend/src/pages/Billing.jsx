import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../styles/billing.css";

function Billing() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);
    const [phone, setPhone] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [isNewCustomer, setIsNewCustomer] =
        useState(false);

    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFood, setSelectedFood] = useState("");
    const [qty, setQty] = useState(1);
    const [paymentMode, setPaymentMode] =
        useState("Cash");
    const fetchFoods = async () => {
        try {
            const res = await api.get("/foods");

            setFoods(res.data.foods);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchBill = async () => {
        try {

            const res = await api.get(`/bills/${id}`);

            const bill = res.data.bill;

            setPhone(bill.customer.phone);

            setCustomerName(
                bill.customer.name
            );

            setDiscountPercent(
                bill.discountPercent
            );

            setPaymentMode(
                bill.paymentMode
            );

            setCart(
                bill.items.map((item) => ({
                    _id: item.customItem
                        ? item._id
                        : item.foodId,
                    foodId: item.foodId,
                    customItem: item.customItem,
                    name: item.name,
                    category: item.category,
                    type: item.type,
                    qty: item.qty,
                    price: item.price,
                }))
            );

        } catch (error) {

            console.error(error);

        }
    };
    const [discountPercent, setDiscountPercent] = useState(0);
    useEffect(() => {
        fetchFoods();

        if (id) {
            fetchBill();
        }
    }, [id]);
    const [customName, setCustomName] =
        useState("");

    const [customPrice, setCustomPrice] =
        useState("");

    const [customQty, setCustomQty] =
        useState(1);
    const [showSuccess, setShowSuccess] =
        useState(false);

    const [generatedBill, setGeneratedBill] =
        useState(null);


    const searchCustomer = async () => {
        try {
            const res = await api.get(
                `/customers/search/phone?phone=${phone}`
            );

            setCustomerName(res.data.customer.name);

            setIsNewCustomer(false);
        } catch (error) {

            setCustomerName("");

            setIsNewCustomer(true);
        }
    };
    const filteredFoods = foods.filter(
        (food) =>
            food.name
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )
    );
    const addSelectedFood = () => {
        if (!selectedFood) {
            alert("Select a food item");
            return;
        }

        const food = foods.find(
            (f) => f._id === selectedFood
        );

        if (!food) return;

        const existing = cart.find(
            (item) => item._id === food._id
        );

        if (existing) {
            setCart(
                cart.map((item) =>
                    item._id === food._id
                        ? {
                            ...item,
                            qty:
                                item.qty + qty,
                        }
                        : item
                )
            );
        } else {
            setCart([
                ...cart,
                {
                    ...food,
                    qty,
                },
            ]);
        }

        setSelectedFood("");
        setSearchTerm("");
        setQty(1);
    };
    const increaseQty = (id) => {
        setCart(
            cart.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        qty: item.qty + 1,
                    }
                    : item
            )
        );
    };
    const decreaseQty = (id) => {
        setCart(
            cart
                .map((item) =>
                    item._id === id
                        ? {
                            ...item,
                            qty: item.qty - 1,
                        }
                        : item
                )
                .filter(
                    (item) => item.qty > 0
                )
        );
    };
    const subTotal = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.qty,
        0
    );

    const discountAmount =
        (subTotal * discountPercent) /
        100;

    const taxableAmount =
        subTotal - discountAmount;

    const gst = taxableAmount * 0.05;

    const grandTotal = Math.round(
        taxableAmount + gst
    );

    const generateBill = async () => {
        try {

            if (!customerName) {
                alert("Enter customer name");
                return;
            }

            if (!phone) {
                alert("Enter phone number");
                return;
            }

            if (cart.length === 0) {
                alert("Add at least one item");
                return;
            }

            const billData = {
                customerName,
                customerPhone: phone,

                visitType: "Dine-In",

                items: cart.map((item) => ({
                    foodId: item.customItem
                        ? null
                        : item._id,

                    customItem:
                        item.customItem || false,

                    name: item.name,

                    category: item.category,

                    type: item.type,

                    qty: item.qty,

                    price: item.price,
                })),

                discountPercent,

                paymentMode,
            };

            const res = await api.post(
                "/bills",
                billData
            );
            const billId = res.data.bill._id;

            navigate(`/bill/${billId}/print`);

            setGeneratedBill(res.data.bill);
            setShowSuccess(true);
            setCart([]);
            setPhone("");
            setCustomerName("");
            setDiscountPercent(0);
            setPaymentMode("Cash");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to generate bill"
            );
        }
    };
    const updateBill = async () => {
        try {

            if (!customerName) {
                alert("Enter customer name");
                return;
            }

            if (!phone) {
                alert("Enter phone number");
                return;
            }

            if (cart.length === 0) {
                alert("Add at least one item");
                return;
            }

            const billData = {
                customerName,
                customerPhone: phone,
                visitType: "Dine-In",

                items: cart.map((item) => ({
                    foodId: item.customItem ? null : item._id,
                    customItem: item.customItem || false,
                    name: item.name,
                    category: item.category,
                    type: item.type,
                    qty: item.qty,
                    price: item.price,
                })),

                discountPercent,
                paymentMode,
            };

            await api.put(`/bills/${id}`, billData);

            alert("Bill updated successfully");

            navigate("/bills");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update bill"
            );
        }
    };

    const addCustomItem = () => {

        if (!customName) {
            alert("Enter item name");
            return;
        }

        if (!customPrice) {
            alert("Enter item price");
            return;
        }

        const customItem = {
            _id: Date.now().toString(),

            name: customName,

            price: Number(customPrice),

            qty: Number(customQty),

            category: "Custom",

            type: "Custom",

            customItem: true,
        };

        setCart([
            ...cart,
            customItem,
        ]);

        setCustomName("");
        setCustomPrice("");
        setCustomQty(1);
    };
    const removeItem = (id) => {
        setCart(
            cart.filter(
                (item) => item._id !== id
            )
        );
    };



    return (
        <div className="billing-page">
            <h1>Billing</h1>
            <div
                className="customer-info"
            >
                <h3>Customer Information</h3>

                <input className="billing-input"
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                        setPhone(e.target.value)
                    }
                />

                <button className="billing-btn"
                    onClick={searchCustomer}
                    style={{
                        marginLeft: "10px",
                    }}
                >
                    Search
                </button>

                <br />
                <br />

                <input className="billing-input"
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) =>
                        setCustomerName(
                            e.target.value
                        )
                    }
                />
                {isNewCustomer && (
                    <p
                        className="new-customer"
                    >
                        New customer. Enter name and continue billing.
                    </p>
                )}
            </div>
            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            >
                <h3>Add Food Item</h3>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                    }}
                >
                    <input className="billing-input"
                        type="text"
                        placeholder="Search Food..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                    />

                    <select className="billing-select"
                        value={selectedFood}
                        onChange={(e) =>
                            setSelectedFood(
                                e.target.value
                            )
                        }
                    >
                        <option value="">
                            Select Food
                        </option>

                        {filteredFoods.map(
                            (food) => (
                                <option
                                    key={
                                        food._id
                                    }
                                    value={
                                        food._id
                                    }
                                >
                                    {food.name} -
                                    ₹
                                    {
                                        food.price
                                    }
                                </option>
                            )
                        )}
                    </select>

                    <input className="billing-input"
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) =>
                            setQty(
                                Number(
                                    e.target
                                        .value
                                )
                            )
                        }
                        style={{
                            width: "80px",
                        }}
                    />

                    <button className="billing-btn"
                        onClick={
                            addSelectedFood
                        }
                    >
                        Add Item
                    </button>
                </div>
            </div>
            <div
                style={{
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "10px",
                    marginBottom: "20px",
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <h3>Add Custom Item</h3>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <input className="billing-input"
                            type="text"
                            placeholder="Item Name"
                            value={customName}
                            onChange={(e) =>
                                setCustomName(
                                    e.target.value
                                )
                            }
                        />

                        <input className="billing-input"
                            type="number"
                            placeholder="Price"
                            value={customPrice}
                            onChange={(e) =>
                                setCustomPrice(
                                    e.target.value
                                )
                            }
                        />

                        <input
                            type="number"
                            min="1"
                            value={customQty}
                            onChange={(e) =>
                                setCustomQty(
                                    Number(
                                        e.target.value
                                    )
                                )
                            }
                            style={{
                                width: "80px",
                            }}
                        />

                        <button className="billing-btn"
                            onClick={
                                addCustomItem
                            }
                        >
                            Add Custom Item
                        </button>
                    </div>
                </div>
                <h3>Cart</h3>

                {cart.length === 0 ? (
                    <p>
                        No Items Added
                    </p>
                ) : (
                    cart.map((item) => (
                        <div
                            key={
                                item._id
                            }
                            style={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom:
                                    "10px",
                            }}
                        >
                            <div className="cart-item">
                                {item.name}
                            </div>

                            <div>
                                <button
                                    onClick={() =>
                                        decreaseQty(
                                            item._id
                                        )
                                    }
                                >
                                    -
                                </button>

                                <span
                                    style={{
                                        margin:
                                            "0 10px",
                                    }}
                                >
                                    {
                                        item.qty
                                    }
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQty(
                                            item._id
                                        )
                                    }
                                >
                                    +
                                </button>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <div>
                                    ₹{item.qty * item.price}
                                </div>

                                <button className="remove-btn"
                                    onClick={() =>
                                        removeItem(item._id)
                                    }

                                >
                                    🗑 Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div
                className="bill-summary"
            >
                <h3>Bill Summary</h3>

                <label>
                    Discount %
                </label>

                <br />

                <input
                    type="number"
                    value={
                        discountPercent
                    }
                    onChange={(e) =>
                        setDiscountPercent(
                            Number(
                                e.target
                                    .value
                            )
                        )
                    }
                />

                <hr />
                <br />
                <br />


                <label>
                    Payment Mode
                </label>

                <br />

                <select className="billing-select"
                    value={paymentMode}
                    onChange={(e) =>
                        setPaymentMode(
                            e.target.value
                        )
                    }
                >
                    <option value="Cash">
                        Cash
                    </option>

                    <option value="UPI">
                        UPI
                    </option>

                    <option value="Card">
                        Card
                    </option>

                    <option value="Other">
                        Other
                    </option>
                </select>

                <p>
                    Sub Total : ₹
                    {subTotal.toFixed(
                        2
                    )}
                </p>

                <p>
                    Discount : ₹
                    {discountAmount.toFixed(
                        2
                    )}
                </p>

                <p>
                    GST (5%) : ₹
                    {gst.toFixed(2)}
                </p>

                <h2>
                    Grand Total : ₹
                    {grandTotal}
                </h2>

                <button
                    className="generate-btn"
                    onClick={
                        isEditMode
                            ? updateBill
                            : generateBill
                    }
                >
                    {
                        isEditMode
                            ? "Update Bill"
                            : "Generate Bill"
                    }
                </button>
                {
                    showSuccess &&
                    generatedBill && (
                        <div

                        >
                            <div
                                style={{
                                    background:
                                        "white",
                                    padding:
                                        "30px",
                                    borderRadius:
                                        "12px",
                                    width: "400px",
                                }}
                            >

                            </div>


                        </div>

                    )
                }
            </div>
        </div>

    );
}

export default Billing;