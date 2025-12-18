import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import userRoute from "./Routes/userRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

// default route
app.get("/", (rea, res) => {
  res
    .status(200)
    .send("<h1 style='text-align:center;'>Welcome to Backend</h1>");
});
// custom Route
app.use("/api/auth", userRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server started at port ", port);
});
