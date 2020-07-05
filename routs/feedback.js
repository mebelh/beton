const { Router } = require("express");
const feedback = require("../models/feedback");

const router = Router();

const changeDate = (date) => {
    return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}-${
        date.getMonth() < 11 ? "0" + (date.getMonth() + 1) : date.getMonth()
    }-${date.getFullYear()}`;
};

router.post("/", async (req, res) => {
    const { name, content } = req.body;
    const feedb = new feedback({
        name,
        content,
    });
    await feedb.save();
    res.redirect("/feedback/all");
});

router.get("/random", async (req, res) => {
    feedback.count().exec(function (err, count) {
        var random = Math.floor(Math.random() * count);
        feedback
            .findOne()
            .skip(random)
            .exec(function (err, result) {
                const { name, date, content } = result;
                res.json(
                    {
                        name,
                        date: changeDate(date),
                        content,
                    } || {}
                );
            });
    });
});

router.get("/all", async (req, res) => {
    const all = await feedback.find();
    res.render("../views/feedbacks.hbs", {
        title: "Отзывы",
        isFeedbacks: true,
        feedBacks: all.map((e) => {
            const { name, date, content } = e;
            return {
                name,
                date: changeDate(date),
                content,
            };
        }),
    });
});

module.exports = router;
