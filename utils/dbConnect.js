const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        return;
      } else {
        await mongoose.connect(process.env.DB_URI);
        console.log("Connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

module.exports = connectDB
  