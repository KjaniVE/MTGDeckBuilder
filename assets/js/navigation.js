// ## GIVEN ##

import {getRandomNumber} from "./utils.js";

const NR_OF_BACKGROUNDS = 3;

function initNavigation(){
    randomBackground();
    document.querySelectorAll(".nav").forEach((button) => {
        button.addEventListener("click", navigate);
    });
}

function navigate(e){
    e.preventDefault();
    const target = e.target.dataset.target;
    navigateToPage(target);
}

function navigateToPage(targetId){
    document.querySelectorAll(".page").forEach(page => {
        if (page.id === targetId){
            page.classList.remove("hidden");
        } else {
            page.classList.add("hidden");
        }
    });
    randomBackground();
}

export { initNavigation, navigateToPage };
// ## YOUR ADDED FUNCTIONS ##


function randomBackground() {
    let $body = document.querySelector("body");
    $body.className = "";
    $body.classList.add(`background-0${getRandomNumber(NR_OF_BACKGROUNDS, 1)}`);
}