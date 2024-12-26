//disable tslint for this file
// @ts-nocheck
import {config} from "../config.js";
import {getRandomNumber} from "../utils.js";
import {_allCards} from "../data/cards.js";
import {addCardsToCardPool} from "./deckService.js";

// ## GIVEN ##

// important: never use the variable directly in other javascript files!!!!
const _cards = [];

// important: never use the variable directly in other javascript files!!!!
let _rarityList = {};


// Loads a set of cards into the _cards array
function loadSet(set) {
    for (const card in _allCards[set]) {
        _cards.push(_allCards[set][card]);
    }
    getCardListByRarity();
}

// Retrieves the current list of cards stored in _cards.
function getCards() {
    return _cards;
}

// Searches for a card by its ID in the _cards array. If found, returns the card object; otherwise, returns null.
function findCardById(id: string): object | null {
    _cards.forEach(card => {
        if (card.id === id) {
            return card;
        }
    });
    return null;
}


// Generates a booster pack of cards based on a predefined structure from the config object. It selects unique and random cards based on rarity and adds them to the booster pack.
// An array of (unique and random) card objects representing a booster pack.
function getBooster() {
    const currentBooster = [];
    for (const structure in config.booster.structure) {
        if (structure === "wildcard") {
            for (const card of getWildCard(structure)) {
                currentBooster.push(card);
                addCardsToCardPool([card]);
            }
        } else {
            for (const card of getRandomCards(structure, config.booster.structure[structure])) {
                currentBooster.push(card);
                addCardsToCardPool([card]);
            }
        }
    }
    return currentBooster;
}

// Selects a random set of cards based on rarity. It ensures that no duplicates or basic land  are included .
function getRandomCards(rarity, nrOfCards) {
    const randomCards = [];
    const cardIds = new Set();

    while (randomCards.length < nrOfCards) {
        const randomCard = getCardListByRarity()[rarity][getRandomNumber(_rarityList[rarity].length - 1, 0)];

        if (!cardIds.has(randomCard.id) || !getBasicLands().some(land => land.id === randomCard.id)) {
            randomCards.push(randomCard);
            cardIds.add(randomCard.id)
        }
    }
    return randomCards;
}

// Organizes all cards from _cards by their rarity. If this has been done before, it returns the previously created list.
function getCardListByRarity() {
    if (Object.keys(_rarityList).length !== 0) {
        return _rarityList;
    }

    _cards.forEach(card => {
        if (_rarityList[card.rarity]) {
            _rarityList[card.rarity].push(card);
        } else {
            _rarityList[card.rarity] = [card];
        }
    });
    return _rarityList;
}

function isBasicLand(card) {
    // if name is in the basic lands list, return true
    return config.basic_lands.includes(card.name);
}

//  Retrieves all basic land cards from _cards.
function getBasicLands() {
    const basicLands = [];
    for (const card in _cards) {
        if (isBasicLand(card)) {
            basicLands.push(card);
        }
    }
    return basicLands;
}

export {loadSet, getBooster};

// ## YOUR ADDED FUNCTIONS ##

function getWildCard(structure: ObjectKey) {
    const randomIdx = getRandomNumber(config.rarities.length - 1, 0);
    return getRandomCards(config.rarities[randomIdx], config.booster.structure[structure]);
}