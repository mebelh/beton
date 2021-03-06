const { Router } = require("express");

const router = Router();

const easyvk = require("easyvk");

router.post("/form", (req, res) => {
    const { name, phone } = req.body;
    res.redirect("/");
    easyvk({
        token:
            "5abe2ae05c92688878fade10263267340afbdba7ba0269fcf4b9a6d5f724e350386eaa766a127e3768354",
    }).then(async (vk) => {
        let peerId = 161973780;

        await vk.call("messages.send", {
            peer_id: peerId,
            message: `
                Заявка!\nИмя: ${name}\nТелефон: ${phone}
            `,
            random_id: easyvk.randomId(),
        });
    });
});

router.get("/", (req, res) => {
    res.render("../views/main.hbs", {
        title: "Бетон в симферополе",
        isMain: true,
    });
});

module.exports = router;
