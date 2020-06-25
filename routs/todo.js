const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

const User = require("../models/user");
const Client = require("../models/client");

router.get("/", async (req, res) => {
    if (req.session.isAuthentificated) {
        const clients = await Client.find().lean();
        res.render("../views/todo/todo.hbs", {
            title: "Менеджер клиентов",
            isTodo: true,
            layout: "todo",
            clients: clients.map((e) => {
                return {
                    ...e,
                    call: Intl.DateTimeFormat("ru-RU", {
                        year: "numeric",
                        day: "numeric",
                        month: "numeric",
                    }).format(e.call),
                };
            }),
        });
    } else {
        res.redirect("/todo/login");
    }
});

router.get("/login", (req, res) => {
    res.render("../views/todo/todoLogin.hbs", {
        title: "Менеджер клиентов авторизация",
        isTodo: true,
        layout: "todo",
    });
});

router.get("/add", (req, res) => {
    res.render("../views/todo/add.hbs", {
        title: "Добавить клиента",
        isTodo: true,
        layout: "todo",
    });
});

router.post("/add", async (req, res) => {
    const {
        name,
        age,
        phone,
        whenDel,
        callBack,
        distance,
        stamp,
        count,
        truck,
        description,
    } = req.body;
    const client = new Client({
        name,
        age,
        phone,
        whenDel: Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            day: "numeric",
            month: "numeric",
        }).format(new Date(whenDel)),
        callBack: Intl.DateTimeFormat("ru-RU", {
            year: "numeric",
            day: "numeric",
            month: "numeric",
        }).format(new Date(callBack)),
        distance,
        stamp,
        count,
        truck,
        description,
        id: uuidv4(),
    });
    await client.save();
    res.redirect("/todo");
});

router.post("/login", async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });

    if (candidate) {
        const areSame = await bcrypt.compare(
            password.toString(),
            candidate.password.toString()
        );
        if (areSame) {
            req.session.user = candidate;
            req.session.isAuthentificated = true;
            req.session.save(() => {
                res.redirect("/todo");
            });
        }
    } else {
        res.redirect("/todo/login");
    }
});

module.exports = router;
