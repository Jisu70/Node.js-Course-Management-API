// Dependencies
const mongoose = require('mongoose');
// database connection
const connectDB = () => {
    try {
        const dbName = "fort-mindz-assignment"; 
        const connectionString = process.env.MONGO_CONNECTION_STRING + "/" + dbName;

        mongoose
          .connect(connectionString)
          .then(() => console.log("database connection successful!"))
          .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
