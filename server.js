import express from "express";
import cors from "cors";
import router from "./router/index.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
import setupSwagger from "./swagger.js";

dotenv.config();

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/", router);
setupSwagger(app);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
  console.log(`📖 Swagger UI: http://localhost:${process.env.PORT}`);
});
