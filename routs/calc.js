const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
    res.render("../views/calc.hbs", {
        title: "Калькулятор",
        isCalc: true,
    });
});

module.exports = router;
