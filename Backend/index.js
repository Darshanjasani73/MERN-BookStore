import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import booksRoute from './routes/booksRoute.js';
import gridfsRouter from './routes/gridfsRouter.js';

dotenv.config(); // Load environment variables

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for handling CORS
app.use(cors());

// Routes
app.use('/books', booksRoute);
app.use('/files', gridfsRouter); // Use GridFS route for serving files

app.get('/', (req, res) => {
  res.status(200).send('Welcome To MERN Stack Tutorial');
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3000; // Default to port 3000 if PORT is not set
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

export default app; // Export app for Vercel
