// const price = require("/app.js");

import price from "./app.js";

const priceTab = document.querySelector(".price ul");

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
