const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    if (!req.session.isAuthentificated) {
        res.render("../views/todo.hbs", {
            title: "Менеджер клиентов",
            isTodo: true,
            layout: "todo",
        });
    } else {
        res.redirect("/todo/login");
    }
});

router.get("/login", (req, res) => {
    res.render("../views/todoLogin.hbs", {
        title: "Менеджер клиентов авторизация",
        isTodo: true,
        layout: "todo",
    });
});

module.exports = router;
