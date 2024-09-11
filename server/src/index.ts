import express, { Express } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from 'cors';
// require('./dbs/init.mongodb')

import UserRouter from './routers/User.router'
import ProductRouter from './routers/Products.router'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOBD_URL;

app.use(express.json());
app.use(cors());

// router
app.use('/v1/api', UserRouter)
app.use('/v1/api', ProductRouter)


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
