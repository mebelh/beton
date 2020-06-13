const express = require("express");
const path = require("path");

const app = express();
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");

const mainRout = require("./routs/main");
const kontaktsRout = require("./routs/kontakts");
const calcRout = require("./routs/calc");

const PORT = 8080;

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
