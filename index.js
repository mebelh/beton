const express = require("express");
const path = require("path");

const app = express();
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");

const mainRout = require("./routs/main");
const kontaktsRout = require("./routs/kontakts");
const calcRout = require("./routs/calc");

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

const start = async () => {
    try {
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
