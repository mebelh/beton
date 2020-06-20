setTimeout(function () {
    let viewheight = $(window).height();
    let viewwidth = $(window).width();
    let viewport = document.querySelector("meta[name=viewport]");
    viewport.setAttribute(
        "content",
        "height=" +
            viewheight +
            "px, width=" +
            viewwidth +
            "px, initial-scale=1.0"
    );
}, 300);

const formBtn = document.querySelector(".baner_btn");
const name = document.querySelector(".form_name");
const phone = document.querySelector(".form_phone");
formBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (name.value !== "" && phone.value !== "") {
        fetch(`/${name.value}/${phone.value}`, {
            method: "POST",
        });
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }
});

const price = [
    { name: "M100", strong: "B7.5", price: "3300р" },
    { name: "M150", strong: "B10", price: "3400р" },
    { name: "M200", strong: "B12.5", price: "3500р" },
    { name: "M250", strong: "B15", price: "3700р" },
    { name: "M300", strong: "B20", price: "4050р" },
    { name: "M350", strong: "B22.5", price: "4300р" },
    { name: "M400", strong: "B25", price: "4500р" },
    { name: "M500", strong: "B30", price: "5000р" },
];

export default price;

// modal
const modalWrap = document.querySelector(".modal-wrapper");
const modal = document.querySelector(".modal");

const modalTrig = document.querySelector(".modal-trigger");

document.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("modal-trigger") &&
        name.value !== "" &&
        phone.value !== ""
    ) {
        modalWrap.style.display =
            modalWrap.style.display === "flex" ? "none" : "flex";
    }
});
