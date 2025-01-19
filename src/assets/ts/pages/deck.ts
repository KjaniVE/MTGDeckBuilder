// ## GIVEN ##

import {addLandsToCardPool, defaultSort, getCardPool, getDeck} from "../services/deckService.js";
import {getUnopenedBoosters} from "./boosters.js";
import {getBooster} from "../services/cardService.js";
import {Card} from "../utils.js";

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
    renderDeck();
}

function renderCardPool():void {
    const cardPool: Card[] = getCardPool();
    const $cardPool:HTMLElement = document.querySelector("#deck-building .card-pool ul")!;
    $cardPool.innerHTML = "";

    cardPool.forEach((card :Card, index:number) :void => {
        $cardPool.insertAdjacentHTML("beforeend", `
        <li>
            <img src="${card.image}" alt="${card.name}" title="${card.name}" data-id="${card.id}" data-index="${index}">
        </li>
        `);
    });
}

function renderDeck():void {
    const deck:Card[] = getDeck();
    const $deck = document.querySelectorAll("#deck-building .deck ol li[data-cmc]");
    $deck.forEach($deck => {
        $deck.querySelector("ul")!.innerHTML = "";
    });

    for (const $deckElement of $deck) {
        $deckElement.querySelector("ul")!.innerHTML = "";
    }

    for (const card of deck) {
        const $deckElement = document.querySelector(`#deck-building .deck ol li[data-cmc="${card.cmc}"] ul`)!;
        $deckElement.insertAdjacentHTML("beforeend", `
        <li>
            <img src="${card.image}" alt="${card.name}" title="${card.name}" data-id="${card.id}">
        </li>
        `);
    }
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