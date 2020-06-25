const { Schema, model } = require("mongoose");

const clientSchema = new Schema({
    name: {
        type: String,
        default: "0",
    },
    phone: {
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    count: {
        type: Number,
        default: 0,
    },
    stamp: {
        type: Number,
        default: 250,
    },
    distance: {
        type: Number,
        default: 0,
    },
    truck: {
        type: String,
        default: "mix",
    },
    call: {
        type: Date,
        default: new Date(),
    },
    callBack: {
        type: Date,
    },
    whenDel: {
        type: Date,
    },
    description: {
        type: String,
    },
});

module.exports = model("Client", clientSchema);
