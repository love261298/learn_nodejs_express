import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './router.js';

dotenv.config();

const app = express();
mongoose.connect(process.env.URI_DB);

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
