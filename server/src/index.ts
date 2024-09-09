import express, { Express } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors';
// require('./dbs/init.mongodb')

import UserRouter from './routers/User.router'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOBD_URL;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}));

// router
app.use('/v1/api', UserRouter)


// connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL!);
    console.log('Mongodb connection successful');
  } catch (e) {
    console.log('Mongodb connection error');
  }
}
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log('Mongodb connection error');
  });
