const formBtn = document.querySelector(".baner_btn");
const name = document.querySelector(".form_name");
const phone = document.querySelector(".form_phone");
formBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (name.value !== "" && phone.value !== "") {
        fetch(`/form/${name.value}/${phone.value}`, {
            method: "POST",
            headers: {
                inf: `${navigator.userAgent}`,
            },
        });
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }
});

$(document).ready(function () {
    $(".collapsible").collapsible();
});

// Feedback

let feedBackAnimTime = 25000;

const changeFeedBackCard = async () => {
    if (document.querySelector(".feedBack-card_arr")) {
        const newDiv = document.createElement("div");
        const feedback = await (await fetch("/feedback/random")).json();
        const { name, date, content } = feedback;

        newDiv.className = "feedBack-card";
        newDiv.innerHTML = `<h5>${name}</h5>
            <div class="feedBack-card_date">${date}</div>
            <hr>
            <div class="feedBack-card_text">${content}</div>`;

        feedBackAnimTime = Math.floor(
            (content.split(" ").length / 130) * 60 * 1000
        );

        await document.querySelector(".feedBack-card_arr").appendChild(newDiv);
        document.querySelector(".feedBack-card_arr").style.height =
            document.querySelector(".feedBack-card_arr :first-child")
                .scrollHeight +
            10 +
            "px";
    }
};

changeFeedBackCard();

// Получаем нужный элемент
if (document.querySelector(".feedBack-card_arr")) {
    const element = document.querySelector(".feedBack-card_arr");
    const Visible = function (target) {
        // Все позиции элемента
        const targetPosition = {
                top: window.pageYOffset + target.getBoundingClientRect().top,
                left: window.pageXOffset + target.getBoundingClientRect().left,
                right:
                    window.pageXOffset + target.getBoundingClientRect().right,
                bottom:
                    window.pageYOffset + target.getBoundingClientRect().bottom,
            },
            // Получаем позиции окна
            windowPosition = {
                top: window.pageYOffset,
                left: window.pageXOffset,
                right:
                    window.pageXOffset + document.documentElement.clientWidth,
                bottom:
                    window.pageYOffset + document.documentElement.clientHeight,
            };

        if (
            targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
            targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
            targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
            targetPosition.left < windowPosition.right
        ) {
            // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
            // Если элемент полностью видно, то запускаем следующий код
            return true;
        } else {
            // Если элемент не видно, то запускаем этот код
            return false;
        }
    };

    const changeFeedBackFunc = async function () {
        if (Visible(element)) {
            await document
                .querySelector(".feedBack-card_arr :first-child")
                .remove();

            await changeFeedBackCard();
        }
        setTimeout(changeFeedBackFunc, feedBackAnimTime);
    };

    setTimeout(changeFeedBackFunc, feedBackAnimTime);
}
// add feedback

const addFeedbackAddBtn = document.querySelector(".feedBack-add_btn");
let addFeedbackCanselBtn;

addFeedbackAddBtn.addEventListener("click", () => {
    const feedbackAddForm = document.createElement("div");
    feedbackAddForm.className = "feedBack-add-wrapper";
    feedbackAddForm.innerHTML = `<form class="col s12" action="/feedback" method="POST">
                                    <div class="feedBack-add-bg">
                                        <div class="row">
                                            <div class="input-field col s6">
                                                <input id="first_name" type="text" class="validate" name="name" required>
                                                <label for="first_name">Ваше имя</label>
                                            </div>
                                            <div class="input-field col s12">
                                                <textarea id="textarea1" class="materialize-textarea" name="content" required></textarea>
                                                <label for="textarea1">Ваш отзыв</label>
                                            </div>
                                        </div>
                                        <div class="feedback-add-btns">
                                            <button type="submit" class="btn green">Отправить</button>
                                            <button type="button" class="btn red">Закрыть</button>
                                        </div>
                                    </div>
                                </form>`;
    document.querySelector(".feedBack-wrapper").appendChild(feedbackAddForm);
    document.querySelector("body").style.overflow = "hidden";

    addFeedbackCanselBtn = document.querySelector("button.red");

    addFeedbackCanselBtn.addEventListener("click", () => {
        document.querySelector(".feedBack-add-wrapper").remove();
        document.querySelector("body").style.overflow = "scroll";
    });
});

// Price

const price = [
    { name: "M100", strong: "B7.5", price: "3300р" },
    { name: "M150", strong: "B12.5", price: "3400р" },
    { name: "M200", strong: "B15", price: "3500р" },
    { name: "M250", strong: "B20", price: "3700р" },
    { name: "M300", strong: "B22.5", price: "4050р" },
    { name: "M350", strong: "B25", price: "4300р" },
    { name: "M400", strong: "B30", price: "4600р" },
    { name: "M450", strong: "B35", price: "5150р" },
    { name: "M500", strong: "B40", price: "6000р" },
];

export default price;

// modal
const modalWrap = document.querySelector(".modal-wrapper");

document.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("modal-trigger") &&
        name.value !== "" &&
        phone.value !== ""
    ) {
        modalWrap.style.display =
            modalWrap.style.display === "flex" ? "none" : "flex";
    }
    if (e.target.classList.contains("Blondie")) {
        fetch(`/clic/phone`, {
            method: "POST",
            headers: {
                inf: `${navigator.userAgent}`,
            },
        });
    }
});
