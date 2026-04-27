const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    tokenNumber: Number,

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" 
    },

    queueId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Queue" 
    },

    status: {
        type: String,
        default: "waiting"
    }
});

module.exports = mongoose.model("Token", TokenSchema);