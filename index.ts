import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
// import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth';

import env from './env.config';

const app = express();
const port = env.PORT || 8000;

// mongoose.connect(env.MONGODB_URI || 'mongodb://localhost:27017/PehchanVerify', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_req, res) => res.send('Express + TypeScript Server'));

app.use('/auth', authRouter);

let http = require('http').Server(app);

const server = http.listen(port, function() {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
