//Калькулятор

$(document).ready(function () {
    $("select").formSelect();
});

import { price } from "/price.js";

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
        // console.log(e.value.split(",").join("."));
        const value = (
            +count.value.split(",").join(".") *
            +height.value.split(",").join(".") *
            +width.value.split(",").join(".")
        )
            .toString()
            .split(".");
        // .split(".");

        if (value.length < 2) {
            value[1] = "0";
        }
        console.log(value);

        endSize.value = value[0] + "." + value[1].slice(0, 1) + " м3";
        endPrice.value =
            +count.value.split(",").join(".") *
                +height.value.split(",").join(".") *
                +width.value.split(",").join(".") *
                select.value +
            " р";
    });
});
select.addEventListener("change", () => {
    endPrice.value =
        +count.value.split(",").join(".") *
            +height.value.split(",").join(".") *
            +width.value.split(",").join(".") *
            select.value +
        " р";
});
