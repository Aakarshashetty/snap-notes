const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongdb connected: ${conn.connection.host}`);
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};
module.exports = connectDB;
