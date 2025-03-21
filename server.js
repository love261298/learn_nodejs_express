import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { authToken, signIn, signUp } from './controllers/auth.js';
import { update } from './controllers/player.js';
import cors from 'cors';

dotenv.config();

const app = express();
mongoose.connect(process.env.URI_DB);

app.use(express.json());
app.use(cors());

app.get('/test', async (req, res) => {
  res.send('HELLO WORD');
});

app.post('/signup', signUp);
app.post('/signin', signIn);
app.put('/', update);
app.post('/', authToken);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
