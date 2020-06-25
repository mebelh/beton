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
        default: "Миксер",
    },
    call: {
        type: Date,
        default: new Date(),
    },
    callBack: {
        type: String,
    },
    whenDel: {
        type: String,
    },
    description: {
        type: String,
    },
    id: {
        type: String,
    },
});

module.exports = model("Client", clientSchema);