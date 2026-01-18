import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import cors from "cors"; // Installed CORS
import UtkarshRoutes from "./routes/UtkarshRoutes.js";
import DayLogRoutes from "./routes/DayLogRoutes.js";
import PostRoutes from "./routes/PostRoutes.js";


dotenv.config();

connectDB();

const app = express();
app.set("trust proxy", 1);

// Use CORS middleware
app.use(cors({
  origin:["https://portfolio-c7t1.onrender.com", "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get("/api/v1", (req, res) => {
    res.send("Server is running!");
});

app.use('/api/v1/auth', UtkarshRoutes);
app.use('/api/v1/worklog', DayLogRoutes);
app.use('/api/v1/post',PostRoutes);


const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';
app.listen(PORT,HOST, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
