const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://dhanushmass371:mass123@chart0.0rfacfz.mongodb.net/chartplotter';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;