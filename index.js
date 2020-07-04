const express = require("express");
const path = require("path");

const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongodb-session")(session);
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");

const mainRout = require("./routs/main");
const kontaktsRout = require("./routs/kontakts");
const calcRout = require("./routs/calc");
const todoRout = require("./routs/todo");
const feedBackRout = require("./routs/feedback");

const MONGO_URI =
    "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/SimfBeton?retryWrites=true&w=majority";

const store = new MongoStore({
    uri: MONGO_URI,
    collection: "sessions",
});

const PORT = 80;

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views", "img")));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: "hgydl dsjg,da17",
        resave: true,
        saveUninitialized: true,
        store,
    })
);

app.use("/", mainRout);
app.use("/kontakts", kontaktsRout);
app.use("/calc", calcRout);
app.use("/todo", todoRout);
app.use("/feedback", feedBackRout);

const User = require("./models/user");
const bcrypt = require("bcrypt");

const start = async () => {
    try {
        mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        const admin = await User.findOne();
        if (!admin) {
            const user = new User({
                login: "admin",
                password: await bcrypt.hash("admin", 12),
            });
            await user.save();
        }
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}.`);
        });
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
};
start();
