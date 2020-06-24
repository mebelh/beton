const { Router } = require("express");

const router = Router();

const easyvk = require("easyvk");
router.post("/:name/:phone", (req, res) => {
    res.send(200);
    easyvk({
        token:
            "5abe2ae05c92688878fade10263267340afbdba7ba0269fcf4b9a6d5f724e350386eaa766a127e3768354",
    }).then(async (vk) => {
        let peerId = 161973780;

        if (req.params.name === "clic") {
            await vk.call("messages.send", {
                peer_id: peerId,
                message: `${req.params.name} \n ${req.headers.inf}`,
                random_id: easyvk.randomId(),
            });
        } else {
            await vk.call("messages.send", {
                peer_id: peerId,
                message: `${req.params.name} \n ${req.params.phone} \n ${req.headers.inf}`,
                random_id: easyvk.randomId(),
            });
        }

        // await vk.call("messages.send", {
        //     peer_id: 429065243,
        //     message: `${req.params.name} \n ${req.params.phone}`,
        //     random_id: easyvk.randomId(),
        // });
    });
});

router.get("/", (req, res) => {
    res.render("../views/main.hbs", {
        title: "Бетон в симферополе",
        isMain: true,
    });
});

module.exports = router;
