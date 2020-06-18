const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/kontakts.hbs", {
        title: "Контакты",
        isKontakts: true,
    });
});

module.exports = router;
