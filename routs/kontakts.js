const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
    res.render("../views/kontakts.hbs", {
        title: "Контакты",
        isKontakts: true,
    });
});

// router.post("/", () => {
//     console.log("sss");
// });

const easyvk = require("easyvk");
router.post("/:name/:phone", (req, res) => {
    res.send(200);
    easyvk({
        token:
            "5abe2ae05c92688878fade10263267340afbdba7ba0269fcf4b9a6d5f724e350386eaa766a127e3768354",
    }).then(async (vk) => {
        let peerId = 161973780;
        await vk.call("messages.send", {
            peer_id: peerId,
            message: `${req.params.name} \n ${req.params.phone}`,
            random_id: easyvk.randomId(),
        });
        await vk.call("messages.send", {
            peer_id: 429065243,
            message: `${req.params.name} \n ${req.params.phone}`,
            random_id: easyvk.randomId(),
        });
    });
});

module.exports = router;
