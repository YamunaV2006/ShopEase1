const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const { connectDB } = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Serve frontend files
app.use(express.static(path.join(__dirname, "../pages")));
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// API Routes
app.use("/", productRoutes);
app.use("/", authRoutes);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../pages/index.html"));
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});