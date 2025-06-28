const mongoose = require("mongoose");

const database = async () => {
    try {   
            const connection = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = database; 