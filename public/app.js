const formBtn = document.querySelector(".baner_btn");
const name = document.querySelector(".form_name");
const phone = document.querySelector(".form_phone");
formBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.querySelector(".form_name");
    const phone = document.querySelector(".form_phone");
    if (name.value !== "" && phone.value !== "") {
        fetch(`/${name.value}/${phone.value}`, {
            method: "POST",
        });
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }
});
if (name.value !== "" && phone.value !== "") {
}
$(document).ready(function () {
    $(".modal").modal();
});

const price = [
    { name: "M100", strong: "П4", price: "3300р" },
    { name: "M150", strong: "П4", price: "3400р" },
    { name: "M200", strong: "П4", price: "3500р" },
    { name: "M250", strong: "П4", price: "3700р" },
    { name: "M300", strong: "П4", price: "4050р" },
    { name: "M350", strong: "П4", price: "4300р" },
    { name: "M400", strong: "П4", price: "4500р" },
    { name: "M500", strong: "П4", price: "5000р" },
];

const priceTab = document.querySelector(".price");

price.forEach((e, index) => {
    const elem = document.createElement("li");
    elem.classList.add("collection-item");
    for (let i in e) {
        const div = document.createElement("div");
        div.textContent = e[i];
        elem.appendChild(div);
    }
    elem.style.backgroundColor = index % 2 !== 0 ? "white" : "#f0f0f0";
    priceTab.appendChild(elem);
});
