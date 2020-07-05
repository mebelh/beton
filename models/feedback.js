const { Schema, model } = require("mongoose");

const feedBackSchema = new Schema({
    name: {
        type: String,
    },
    date: {
        type: Date,
        default: new Date(),
    },
    content: {
        type: String,
    },
});

module.exports = model("feedback", feedBackSchema);
