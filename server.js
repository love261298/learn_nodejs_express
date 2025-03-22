import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./router.js";
import connectDB from "./db.js";

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("✅ MongoDB Connected");
});
