const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGOOSE_URI}`);
    console.log(`Database connected ${conn.connection.host}`.bgBlue.bold);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
