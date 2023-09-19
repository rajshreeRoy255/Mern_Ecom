import dotenv from "dotenv";
dotenv.config()
import express from "express";
import cors from 'cors';
import colors from "colors"
import connectToMongo from "./config/db.js";
import morgan from "morgan";
// ALL ROUTES
import authRouter from "./routes/authRoute.js";
import categoryRouter from './routes/categoryRoute.js'
import ProductRouter from './routes/productRoute.js'
import CartRouter from "./routes/cartRoute.js"
import OrderRouter from "./routes/orderRoute.js"
// ALL ROUTES
const app = express()

app.use(cors());
connectToMongo();
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static("uploads"))

const PORT = process.env.Port || 8080;

app.get("/", (req, res) => {
    res.send("hi hello")
})

// API routes
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/product", ProductRouter)
app.use("/api/v1/cart", CartRouter)
app.use("/api/v1/order", OrderRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} on ${process.env.MODE} mode`.bgYellow.red);
})

