//disable tslint for this file
import {config} from "../config.js";
import {getRandomNumber} from "../utils.js";
import {_allCards as allCardsData} from "../data/cards.js";
import {addCardsToCardPool} from "./deckService.js";

const importedAllCards: AllCards = allCardsData;

type Card = {
    id: string;
    name: string;
    type_line: string;
    mana_cost: string;
    cmc: number;
    colors: string[];
    rarity: string;
    set: string;
    set_name: string;
    collector_number: string;
    image: string;
    power?: string;
    toughness?: string;
    flavor_text?: string;
    card_face: object
};
type AllCards = { [key: string]: Card[] };

// ## GIVEN ##
// Suppress warnings for unused variable
// important: never use the variable directly in other javascript files!!!!
const _cards: { id: string; name: string; rarity: string }[] = [];

// important: never use the variable directly in other javascript files!!!!
let _rarityList: { [key: string]: { id: string; name: string; rarity: string }[] } = {};

const _basicLands: { id: string; name: string; rarity: string }[] = [];


// Loads a set of cards into the _cards array
function loadSet(set: string) {
    for (const card of importedAllCards[set as keyof typeof importedAllCards]) {
        _cards.push(card);
    }
    getCardListByRarity();
    getBasicLands();
}

// Searches for a card by its ID in the _cards array. If found, returns the card object; otherwise, returns null.
function findCardById(id: string): any  | null {
    return _cards.find(card => card.id === id) || null;
}

// Generates a booster pack of cards based on a predefined structure from the config object. It selects unique and random cards based on rarity and adds them to the booster pack.
// An array of (unique and random) card objects representing a booster pack.
function getBooster(): { id: string }[] {
    const currentBooster: { id: string }[] = [];

    for (const structure of Object.keys(config.booster.structure)) {
        const nrOfCards = config.booster.structure[structure as keyof typeof config.booster.structure];

        // For both normal cards and wildcards, fetch via getRandomCards
        for (const card of getRandomCards(structure, nrOfCards, currentBooster)) {
            currentBooster.push({id: card.id}); // Only add the card ID
            addCardsToCardPool([card]);
        }
    }

    return currentBooster;
}

// Selects a random set of cards based on rarity. It ensures that no duplicates or basic land  are included .
function getRandomCards(rarity: string, nrOfCards: number, currentBooster: { id: string; }[]) {
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

function isBasicLand(card: { id: string; name: string; rarity: string }) {
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

export {loadSet, getBooster, findCardById};

// ## YOUR ADDED FUNCTIONS ##
