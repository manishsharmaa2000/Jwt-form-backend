const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");



const connectDB = require("./config/db");


const app = express();
const  authRoutes  = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const contactRoutes =require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      const allowed = [
        process.env.CLIENT_URL,
        "capacitor://localhost",
        "http://localhost",
        "https://localhost",
        "http://localhost:5173",
        "http://localhost:5174",
        "https://localhost:5173",
        "https://localhost:5174",
        "http://10.0.2.2",
      ];
      // Allow requests with no origin (native Android WebView sends null/no origin)
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  }),
);


// database connection
connectDB();

//routes
app.use("/api/auth", authRoutes);
app.use( "/api/user",userRoutes);
app.use("/api/contact",contactRoutes);
app.use("/api/blog",blogRoutes)




// server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});