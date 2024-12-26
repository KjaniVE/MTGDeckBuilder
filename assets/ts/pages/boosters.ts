// _unopenedBoosters: contains the list of booster-packs, opened and/or unopened
// for example: [0, 1, 2, 1, 3, 3] 
// this means: first booster is open and has the version 0 image, second is not open and has the version image, third one is not open and has the version 2 image, ...
// if you have a better/other solution here, you may implement your own!!!

import {getSubscribeForm} from "./subscribe.js";
import {getRandomNumber} from "../utils.js";
import {getBooster, loadSet} from "../services/cardService.js";

let _unopenedBoosters: number[] = [];

const _MAX_BOOSTER_VERSIONS: number = 3;


// ## GIVEN ##

function initBoostersPage(): void {
    const subscribeForm = getSubscribeForm();
    document.querySelector("#openedBooster")!.innerHTML = "";
    setUnopenedBoosters(subscribeForm);
    loadSet(subscribeForm.selectedSet);
}

export {initBoostersPage};

// ## YOUR ADDED FUNCTIONS ##

function setUnopenedBoosters(subscribeForm: any): void {
    const boosterAmount: number = subscribeForm.boostersAmount;

    for (let i = 0; i < boosterAmount; i++) {
        _unopenedBoosters.push(getRandomNumber(_MAX_BOOSTER_VERSIONS, 1));
    }

    renderUnopenedBoosters(subscribeForm);
}

function renderUnopenedBoosters(subscribeForm: any): void {
    const $boosters: Element = document.querySelector("#unopenedBoosters")!;

    $boosters.innerHTML = "";

    _unopenedBoosters.forEach((booster, index) => {
        $boosters.insertAdjacentHTML("beforeend", `
        <li><img src="images/${subscribeForm.selectedSet}/booster_v${booster}.jpg" alt="booster" title="booster" data-index="${index}" data-open="0"></li>
        `);
    });

    $boosters.querySelectorAll("li img").forEach(booster => {
        booster.addEventListener("click", (e) => openBooster(e));
    })
}

function openBooster(e: Event): void {
    const target = e.target as HTMLImageElement;

    target.dataset.open = "1";
    target.src = `images/${getSubscribeForm().selectedSet}/booster_v0.jpg`;
    target.dataset.open = "1";
    target.removeEventListener("click", openBooster);

    renderBoosters(getBooster());
}

function renderBoosters(booster: { id: string, image: string, name: string }[]): void {

    const $boosterCards: HTMLElement = document.querySelector("#openedBooster")!;
    $boosterCards.innerHTML = "";

    booster.forEach((card, index) => {
        $boosterCards.insertAdjacentHTML("beforeend", `
        <li class="card">
            <img src="${card.image}" alt="${card.name}" title="${card.name}" data-id="${card.id}" data-sequence-id="${index}">
        </li>
        `);
    });
}
