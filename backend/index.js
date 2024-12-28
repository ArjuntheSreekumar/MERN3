import express from 'express';
import dotenv from 'dotenv'; // .env file to keep sensitive information as db connection info
import mongoose from 'mongoose';
import cors from 'cors'; // cors -> cross site resource sharing (csrf) forgery protection
import cookieParser from 'cookie-parser';

import authRoute from './routes/auth.js';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Hardcoded MongoDB URI (for demonstration purposes only, NOT RECOMMENDED)
const MONGO_URI = 'mongodb+srv://akarshjkalathil:arjun2004@cluster0.gwf09.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Database connection
mongoose.set('strictQuery', false);
const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected..');
  } catch (err) {
    console.log('MongoDB database connection failed..');
  }
};

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/auth', authRoute);
app.use('/tours', tourRoute);
app.use('/users', userRoute);
app.use('/review', reviewRoute);
app.use('/booking', bookingRoute);

// Start the server
app.listen(port, () => {
  connect();
  console.log('Server listening on port', port);
});
