import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import couponRoutes from "./routes/cuponRoutes.js";

const app = express();
const port = process.env.PORT || 4000;


const allowedOrigins = [
  "https://tomato-8chf.onrender.com",           // frontend
  "https://tomato-admin-k2ac.onrender.com"      // admin panel
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//  Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/coupon", couponRoutes);

//  Root route
app.get("/", (req, res) => {
  res.send("API Working Successfully 🚀");
});

// Start Server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
