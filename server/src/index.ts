import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// require('./dbs/init.mongodb')
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOBD_URL;

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
