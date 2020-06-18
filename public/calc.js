//Калькулятор

$(document).ready(function () {
    $("select").formSelect();
});

import price from "./app.js";

const names = document.querySelector("select");

price.forEach((e, index) => {
    const elem = document.createElement("option");
    elem.value = +e.price.slice(0, -1);
    elem.textContent = e.name;
    names.appendChild(elem);
});

const endPrice = document.querySelector(".calc-body_price input");
const endSize = document.querySelector(".calc-body_size input");

const count = document.querySelector("#count");
const height = document.querySelector("#height");
const width = document.querySelector("#width");

const select = document.getElementById("select");

[count, height, width].forEach((e) => {
    e.addEventListener("keyup", () => {
        endSize.value = count.value * height.value * width.value + " м3";
        endPrice.value =
            count.value * height.value * width.value * select.value + " р";
    });
});
select.addEventListener("change", () => {
    endPrice.value =
        count.value * height.value * width.value * select.value + " р";
});

const buttonCalcCall = document.querySelector(".calc button");
const form = document.querySelector(".form-call-me");

buttonCalcCall.addEventListener("click", () => {
    form.scrollIntoView();
    // window.scrollTo(0, Math.floor(form.getBoundingClientRect().y) * -1);
});
