import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()

const app = express();
mongoose.connect(process.env.URI_DB)

app.get('/test', (req, res) => {
  res.send('Hello World!')
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})