// ## GIVEN ##

import {addLandsToCardPool, defaultSort, getCardPool} from "../services/deckService.js";
import {getUnopenedBoosters} from "./boosters.js";
import {getBooster} from "../services/cardService.js";

let isInitialized = false;

function initDeckBuildingPage() {
    if (isInitialized) {
        return;
    }
    isInitialized = true;
    checkCardPool();
    addLandsToCardPool();
    defaultSort(getCardPool());
    renderCardPool();
}

function renderCardPool() {
    const cardPool = getCardPool();
    const $cardPool = document.querySelector("#deck-building .card-pool ul")!;
    $cardPool.innerHTML = "";

    cardPool.forEach((card, index) => {
        $cardPool.insertAdjacentHTML("beforeend", `
        <li>
            <img src="${card.image}" alt="${card.name}" title="${card.name}" data-id="${card.id}" data-index="${index}">
        </li>
        `);
    });
}

function renderDeck() {

}

function renderDeckZones() {

}

function showCardDetail(e: SubmitEvent) {

}

function moveCardToDeck(e: SubmitEvent) {

}

function moveCardToPool(e: SubmitEvent) {

}

export {initDeckBuildingPage};

// ## YOUR ADDED FUNCTIONS ##

function checkCardPool(): void {
    const unopenedBoosters = getUnopenedBoosters();

    for (const booster of unopenedBoosters) {
        if (booster !== 0) {
            getBooster();
        }
    }
}