const { Schema, model } = require("mongoose");

const feedBackSchema = new Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    text: {
        type: String,
    },
});

module.exports = model("feedback", feedBackSchema);
