import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import candidateRouter from "./routes/candidateRoutes";
import connectDB from "./config/connectToDB";
import {errorHandler} from "./middlewares/errorHandler";
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
const PORT = process.env.PORT || 5000;

connectDB();

// Routes
app.use("/api/users", userRouter);
app.use("/api/candidates", candidateRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


