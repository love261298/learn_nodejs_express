import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { signIn, signUp } from "./controllers/auth.js";
import { update } from "./controllers/player.js";
dotenv.config()

const app = express();
mongoose.connect(process.env.URI_DB)

app.use(express.json())

app.get('/test', async (req, res) => {
  res.send("HELLO WORD")
})

app.post('/signup', signUp);
app.post('/signin', signIn);
app.put('/', update);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})