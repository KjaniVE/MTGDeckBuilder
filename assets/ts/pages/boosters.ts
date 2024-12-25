// _unopenedBoosters: contains the list of booster-packs, opened and/or unopened
// for example: [0, 1, 2, 1, 3, 3] 
// this means: first booster is open and has the version 0 image, second is not open and has the version image, third one is not open and has the version 2 image, ...
// if you have a better/other solution here, you may implement your own!!!

import {getSubscribeForm} from "./subscribe.js";
import {getRandomNumber} from "../utils.js";

let _unopenedBoosters: number[] = [];

const _MAX_BOOSTER_VERSIONS: number = 3;


// ## GIVEN ##

function initBoostersPage(): void {
    const subscribeForm = getSubscribeForm();
    setUnopenedBoosters(subscribeForm);
}

export {initBoostersPage};
// ## YOUR ADDED FUNCTIONS ##

function setUnopenedBoosters(subscribeForm: any) {
    const boosterAmount: number = subscribeForm.boostersAmount;

    for (let i = 0; i < boosterAmount; i++) {
        _unopenedBoosters.push(getRandomNumber(_MAX_BOOSTER_VERSIONS, 1));
    }

    renderUnopenedBoosters(subscribeForm);
}

function renderUnopenedBoosters(subscribeForm: any) {
    const $boosters : Element = document.querySelector("#unopenedBoosters")!;

    $boosters.innerHTML = "";

    _unopenedBoosters.forEach((booster, index) => {
        $boosters.insertAdjacentHTML("beforeend", `
        <li><img src="images/${subscribeForm.selectedSet}/booster_v${booster}.jpg" alt="booster" title="booster" data-index="${index}" data-open="0"></li>
        `);
    });

}