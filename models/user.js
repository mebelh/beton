const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    clients: {
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: "Client",
                required: true,
            },
        ],
    },
});

userSchema.methods.addToCallList = function (client) {
    const items = [...this.clients.items, client];
    this.clients.items = items;
    return this.save();
};

userSchema.methods.removeFromCallList = function (id) {
    const items = [...this.clients.items];
    items = [...items].filter((e) => e._id.toString() !== id.toString());
    this.clients.items = items;
    return this.save();
};

module.exports = model("User", userSchema);
