//disable tslint for this file
// @ts-nocheck
import {config} from "../config.js";
import {getRandomNumber} from "../utils.js";
import {_allCards} from "../data/cards.js";
import {addCardsToCardPool} from "./deckService.js";

// ## GIVEN ##
@suppresWarnings("unused")
// important: never use the variable directly in other javascript files!!!!
const _cards = [];

// important: never use the variable directly in other javascript files!!!!
let _rarityList = {};

const _basicLands = [];


// Loads a set of cards into the _cards array
function loadSet(set) {
    for (const card in _allCards[set]) {
        _cards.push(_allCards[set][card]);
    }
    getCardListByRarity();
    getBasicLands();
    console.log("basic lands: " + _basicLands);
}

/*
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
 */


// Generates a booster pack of cards based on a predefined structure from the config object. It selects unique and random cards based on rarity and adds them to the booster pack.
// An array of (unique and random) card objects representing a booster pack.
function getBooster() {
    const currentBooster = [];

    for (const structure in config.booster.structure) {
        const nrOfCards = config.booster.structure[structure];

        // For both normal cards and wildcards, fetch via getRandomCards
        for (const card of getRandomCards(structure, nrOfCards, currentBooster)) {
            currentBooster.push(card);
            addCardsToCardPool([card]);
        }
    }

    return currentBooster;
}

// Selects a random set of cards based on rarity. It ensures that no duplicates or basic land  are included .
function getRandomCards(rarity, nrOfCards, currentBooster) {
    const randomCards = [];
    const cardIds = new Set(currentBooster.map(card => card.id)); // Track all IDs, including already added cards.

    const cardList = rarity === "wildcard"
        ? getCardListByRarity()[getRandomRarity()] // Get any rarity card for wildcards
        : getCardListByRarity()[rarity];          // Get cards of specific rarity

    while (randomCards.length < nrOfCards) {
        const randomCard = cardList[getRandomNumber(cardList.length - 1, 0)];

        // Ensure no duplicates, no basic lands, and no re-additions
        if (!cardIds.has(randomCard.id) && !isBasicLand(randomCard)) {
            randomCards.push(randomCard);
            cardIds.add(randomCard.id); // Mark card as used
        }
    }

    return randomCards;
}

function getRandomRarity() {
    // Logic for picking a random rarity for wildcards
    const rarities = Object.keys(config.booster.structure).filter(r => r !== "wildcard");
    return rarities[getRandomNumber(rarities.length - 1, 0)];
}

// Organizes all cards from _cards by their rarity. If this has been done before, it returns the previously created list.
function getCardListByRarity() {
    if (Object.keys(_rarityList).length !== 0) {
        return _rarityList;
    }

    _cards.forEach(card => {
        if (!config.basic_lands.includes(card.name)) {
            if (_rarityList[card.rarity]) {
                _rarityList[card.rarity].push(card);
            } else {
                _rarityList[card.rarity] = [card];
            }
        }
    });
    return _rarityList;
}

function isBasicLand(card) {
    return _basicLands.includes(card)
}


//  Retrieves all basic land cards from _cards.
function getBasicLands() {
    for (const card of _cards) {
        if (config.basic_lands.includes(card.name)) {
            _basicLands.push(card);
        }
    }
    return _basicLands;
}

export {loadSet, getBooster};

// ## YOUR ADDED FUNCTIONS ##
