const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use local MongoDB if no Atlas URI is provided
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/trackify';
    
    const conn = await mongoose.connect(mongoURI, {
      // Remove these options for local MongoDB
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('authentication failed')) {
      console.log('\n🔧 MongoDB Authentication Error Solutions:');
      console.log('1. For local MongoDB: Make sure MongoDB is running locally');
      console.log('2. For MongoDB Atlas: Check your connection string and credentials');
      console.log('3. Create a .env file with: MONGODB_URI=your_connection_string');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB; 