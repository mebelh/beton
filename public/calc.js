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

const count = document.querySelector(".count");

const select = document.getElementById("select");

count.addEventListener("keyup", () => {
    endPrice.value = count.value * select.value + "р";
});

select.addEventListener("change", () => {
    endPrice.value = count.value * select.value + "р";
});

const buttonCalcCall = document.querySelector(".calc button");
const form = document.querySelector(".form-call-me");

buttonCalcCall.addEventListener("click", () => {
    // if ($(document).height() < 450) {
    //     window.scrollTo(0, $(document).height() / 4);
    // } else {
    //     window.scrollTo(0, 0);
    // }
    console.log(Math.floor(form.getBoundingClientRect().y));

    window.scrollTo(0, Math.floor(form.getBoundingClientRect().y) * -1);
});
