const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    tokenNumber: Number,

    userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   index: true
},
   queueId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Queue",
   index: true
},
    status: {
        type: String,
        default: "waiting"
    }
}, { timestamps: true });
//TokenSchema.index({ queueId: 1 });
//TokenSchema.index({ userId: 1 });
//TokenSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Token", TokenSchema);