const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors=require('cors')
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const savingRoutes = require('./routes/savingRoutes');
const loanRoutes = require('./routes/loanRoute');
const newsRoutes = require('./routes/newsRoutes');



const app = express();

// Connect to MongoDB Atlas
mongoose.connect(process.env.mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/saving', savingRoutes);
app.use('/api/loan', loanRoutes);
app.use('/api/news', newsRoutes);

// Start server

app.listen(process.env.PORT , () => console.log(`Server is running on port ${process.env.PORT}`));
