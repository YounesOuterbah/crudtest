import express from "express";
import userRoutes from "./routes/userRoutes.js";
import "dotenv/config";
import { connectDB } from "./database/db.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

connectDB();

const corsOptions = {
  origin: "https://crudtest-sigma.vercel.app", // Specify your frontend origin
  credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/user", userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7005;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
