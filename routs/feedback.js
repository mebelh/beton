const { Router } = require("express");
const feedback = require("../models/feedback");

const router = Router();

router.post("/", async (req, res) => {
    const { name, text, date } = req.body;
    const feedb = new feedback({
        name,
        text,
        date,
    });
    await feedb.save();
    res.redirect("/");
});

router.get("/", async (req, res) => {
    feedback.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        feedback
            .findOne()
            .skip(random)
            .exec(function (err, result) {
                res.send(result.toJSON());
            });
    });
});

router.get("/all", async (req, res) => {
    const all = await feedback.find();
    res.send(
        all.map((e) => {
            const { name, date, text } = e;
            return {
                name,
                date: `${
                    date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
                }-${
                    date.getMonth() < 11
                        ? "0" + (date.getMonth() + 1)
                        : date.getMonth()
                }-${date.getFullYear()}`,
                text,
            };
        })
    );
});

module.exports = router;
