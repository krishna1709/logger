const mongoose = require("mongoose");


const UserTradeSchema = new mongoose.Schema({
    id: Number,
    type: String,
    user: {
        id: Number,
        name: String,
    },
    symbol: String,
    shares: Number,
    price: Number,
    timestamp: {
        type: Date
    }
}, { versionKey: false });

export const UserTradeModel = mongoose.model("user_trade", UserTradeSchema);