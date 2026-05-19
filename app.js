const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

// middleware
app.use(cors({
  origin:[
    'http://localhost:5173',
    'http://localhost:5174',
    'https://jwttokenproject.netlify.app'
  ],
  credentials: true
}));

app.use(express.json());

// database connection
connectDB();

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});