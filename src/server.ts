import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
//copilot this code is giving ssl error
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended:true}));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
//copilot add a global catch here.

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

