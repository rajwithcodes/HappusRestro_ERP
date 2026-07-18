const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Food = require("./models/Food");

dotenv.config();

const dbUrl =
    process.env.DB_URL ||
    "mongodb://127.0.0.1:27017/happus_erp";

mongoose
    .connect(dbUrl)
    .then(() =>
        console.log("✅ Connected to MongoDB")
    )
    .catch((err) =>
        console.error(
            "❌ Connection Error:",
            err
        )
    );

const seedFoods = [
    // 🧀 Veg Starters
    {
        name: "Paneer Tikka (Classic)",
        category: "Starters - Veg",
        type: "Veg",
        price: 160,
    },
    {
        name: "Crispy Chilli Potato",
        category: "Starters - Veg",
        type: "Veg",
        price: 120,
    },
    { name: "Mushroom 65", category: "Starters - Veg", type: "Veg", price: 150 },
    {
        name: "Tandoori Momos (6 pcs)",
        category: "Starters - Veg",
        type: "Veg",
        price: 130,
    },
    {
        name: "Corn Cheese Balls",
        category: "Starters - Veg",
        type: "Veg",
        price: 140,
    },

    // 🍗 Non-Veg Starters
    {
        name: "Chicken Tikka",
        category: "Starters - Non-Veg",
        type: "Non-Veg",
        price: 190,
    },
    {
        name: "Chicken Lollipop (6 pcs)",
        category: "Starters - Non-Veg",
        type: "Non-Veg",
        price: 180,
    },
    {
        name: "Chicken Crispy",
        category: "Starters - Non-Veg",
        type: "Non-Veg",
        price: 180,
    },
    {
        name: "Tandoori Chicken (Half)",
        category: "Starters - Non-Veg",
        type: "Non-Veg",
        price: 180,
    },
    {
        name: "Fish Finger (On Order)",
        category: "Starters - Non-Veg",
        type: "Non-Veg",
        price: 220,
        onOrder: true,
    },

    // 🍛 Main Course - Veg
    {
        name: "Paneer Butter Masala",
        category: "Main Course - Veg",
        type: "Veg",
        price: 180,
    },
    {
        name: "Kadai Paneer",
        category: "Main Course - Veg",
        type: "Veg",
        price: 170,
    },
    {
        name: "Dal Makhani",
        category: "Main Course - Veg",
        type: "Veg",
        price: 130,
    },
    {
        name: "Malai Kofta",
        category: "Main Course - Veg",
        type: "Veg",
        price: 160,
    },

    // 🍗 Main Course - Non-Veg
    {
        name: "Butter Chicken (Boneless)",
        category: "Main Course - Non-Veg",
        type: "Non-Veg",
        price: 220,
    },
    {
        name: "Kadai Chicken",
        category: "Main Course - Non-Veg",
        type: "Non-Veg",
        price: 210,
    },
    {
        name: "Mutton Rogan Josh (On Order)",
        category: "Main Course - Non-Veg",
        type: "Non-Veg",
        price: 280,
        onOrder: true,
    },

    // 🫓 Breads
    { name: "Butter Naan", category: "Breads", type: "Veg", price: 40 },
    { name: "Garlic Naan", category: "Breads", type: "Veg", price: 50 },
    { name: "Tandoori Roti", category: "Breads", type: "Veg", price: 25 },
    {
        name: "Stuffed Kulcha (Paneer)",
        category: "Breads",
        type: "Veg",
        price: 60,
    },

    // 🍚 Rice & Biryani
    { name: "Veg Biryani", category: "Rice & Biryani", type: "Veg", price: 160 },
    {
        name: "Chicken Biryani",
        category: "Rice & Biryani",
        type: "Non-Veg",
        price: 200,
    },
    {
        name: "Mutton Biryani (On Order)",
        category: "Rice & Biryani",
        type: "Non-Veg",
        price: 250,
        onOrder: true,
    },
    {
        name: "Paneer Biryani",
        category: "Rice & Biryani",
        type: "Veg",
        price: 190,
    },

    // 🍝 Continental & Fusion
    {
        name: "White Sauce Pasta",
        category: "Continental & Fusion",
        type: "Veg",
        price: 160,
    },
    {
        name: "Pink Sauce Pasta",
        category: "Continental & Fusion",
        type: "Veg",
        price: 170,
    },
    {
        name: "Peri Peri Sandwich",
        category: "Continental & Fusion",
        type: "Veg",
        price: 160,
    },
    {
        name: "Chicken Grilled Burger",
        category: "Continental & Fusion",
        type: "Non-Veg",
        price: 170,
    },

    // 🥡 Chinese
    {
        name: "Veg Manchurian (Gravy)",
        category: "Chinese",
        type: "Veg",
        price: 140,
    },
    { name: "Chilli Paneer", category: "Chinese", type: "Veg", price: 150 },
    { name: "Chilli Chicken", category: "Chinese", type: "Non-Veg", price: 180 },
    { name: "Schezwan Noodles", category: "Chinese", type: "Veg", price: 140 },

    // 🍨 Desserts
    { name: "Gulab Jamun (2 pcs)", category: "Desserts", type: "Veg", price: 80 },
    {
        name: "Hot Chocolate Lava Cake",
        category: "Desserts",
        type: "Veg",
        price: 160,
    },
    {
        name: "Chocolate Brownie with Ice Cream",
        category: "Desserts",
        type: "Veg",
        price: 150,
    },
    { name: "Fruit Custard", category: "Desserts", type: "Veg", price: 99 },

    // 🍹 Beverages
    { name: "Cold Coffee", category: "Beverages", type: "Veg", price: 110 },
    { name: "Mojito (Classic)", category: "Beverages", type: "Veg", price: 120 },
    { name: "Fresh Lime Soda", category: "Beverages", type: "Veg", price: 70 },
    { name: "Milkshake (Oreo)", category: "Beverages", type: "Veg", price: 140 },

    // 🌟 Happus Specials
    {
        name: "Happus Special Platter (Veg)",
        category: "Happus Specials",
        type: "Veg",
        price: 280,
    },
    {
        name: "Happus Special Platter (Non-Veg)",
        category: "Happus Specials",
        type: "Non-Veg",
        price: 350,
    },
    {
        name: "Happus Sizzling Brownie",
        category: "Happus Specials",
        type: "Veg",
        price: 190,
    },
    {
        name: "Happus Special Biryani Bowl",
        category: "Happus Specials",
        type: "Non-Veg",
        price: 260,
    },
];

async function seedDB() {
    try {
        await Food.deleteMany({});

        console.log(
            "🗑️ Cleared existing food data"
        );

        const insertedFoods =
            await Food.insertMany(
                seedFoods
            );

        console.log(
            `✅ Inserted ${insertedFoods.length} food items successfully!`
        );
    } catch (err) {
        console.error(
            "❌ Error while seeding:",
            err
        );
    } finally {
        await mongoose.connection.close();

        console.log(
            "🔒 MongoDB connection closed"
        );
    }
}

seedDB();