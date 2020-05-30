// Connect to MongoDB
const mongoose = require("mongoose");
import { MONGODB_URI } from "../util/secrets";
const logger = require("../util/logger");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { 
        logger.info("MongoDB connection successfully established.");
    }
).catch(err => {
    logger.error("MongoDB connection error. Please make sure MongoDB is running. ");
    // process.exit();
});

module.exports = mongoose;