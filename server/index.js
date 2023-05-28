import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import cors from 'cors';
import apiRouter from './routes/api.routes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ error: 'Internal Server Error' });
});

const startServer = async () => {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(process.env.MONGO_URL);

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start the server:', err);
    process.exit(1); // Terminate the application if the server fails to start
  }
};

startServer();
