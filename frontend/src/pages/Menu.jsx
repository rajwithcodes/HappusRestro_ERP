import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/menu.css";

function Menu() {
    const [foods, setFoods] = useState([]);

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState("Veg");

    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const res = await api.get("/foods");

            setFoods(res.data.foods);
        } catch (error) {
            console.error(error);
        }
    };

    const addFood = async () => {
        try {
            if (
                !name ||
                !category ||
                !price
            ) {
                alert(
                    "Please fill all fields"
                );
                return;
            }

            await api.post("/foods", {
                name,
                category,
                price,
                type,
            });

            setName("");
            setCategory("");
            setPrice("");
            setType("Veg");

            fetchFoods();

            alert(
                "Food Added Successfully"
            );
        } catch (error) {
            console.error(error);
        }
    };

    const deleteFood = async (id) => {
        const confirmDelete =
            window.confirm(
                "Delete this food?"
            );

        if (!confirmDelete) return;

        try {
            await api.delete(
                `/foods/${id}`
            );

            fetchFoods();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredFoods =
        foods.filter((food) =>
            food.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div className="menu-page">

            <h1>Menu Management</h1>

            {/* Add Food */}

            <div className="menu-card">

                <h3>Add Food Item</h3>

                <div className="food-form">

                    <input
                        type="text"
                        placeholder="Food Name"
                        value={name}
                        onChange={(e) =>
                            setName(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) =>
                            setCategory(
                                e.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) =>
                            setPrice(
                                e.target.value
                            )
                        }
                    />

                    <select
                        value={type}
                        onChange={(e) =>
                            setType(
                                e.target.value
                            )
                        }
                    >
                        <option value="Veg">
                            Veg
                        </option>

                        <option value="Non-Veg">
                            Non-Veg
                        </option>
                    </select>

                    <button
                        className="add-btn"
                        onClick={addFood}
                    >
                        Add Food
                    </button>

                </div>

            </div>

            {/* Search */}

            <input
                className="search-food"
                type="text"
                placeholder="Search Food..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

            {/* Table */}

            <table className="food-table">

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Available</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredFoods.map(
                        (food) => (

                            <tr
                                key={
                                    food._id
                                }
                            >
                                <td>
                                    {
                                        food.name
                                    }
                                </td>

                                <td>
                                    {
                                        food.category
                                    }
                                </td>

                                <td>
                                    ₹
                                    {
                                        food.price
                                    }
                                </td>

                                <td>
                                    {
                                        food.type
                                    }
                                </td>

                                <td
                                    className={
                                        food.availability
                                            ? "available"
                                            : "not-available"
                                    }
                                >
                                    {food.availability
                                        ? "Available"
                                        : "Not Available"}
                                </td>

                                <td>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            deleteFood(
                                                food._id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}

export default Menu;