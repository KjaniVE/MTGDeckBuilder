import {config} from "../config.js";
import {getRandomNumber, Card} from "../utils.js";
import {_allCards as allCardsData} from "../data/cards.js";
import {addCardsToCardPool} from "./deckService.js";

const importedAllCards: AllCards = allCardsData;

type AllCards = { [key: string]: Card[] };

// ## GIVEN ##
const _cards: Card[] = [];

let _rarityList: { [key: string]: Card[] } = {};

const _basicLands: Card[] = [];


// Loads a set of cards into the _cards array
function loadSet(set: string) :void {
    for (const card of importedAllCards[set as keyof typeof importedAllCards]) {
        _cards.push(card);
    }
    getCardListByRarity();
    getBasicLands();
}

// Searches for a card by its ID in the _cards array. If found, returns the card object; otherwise, returns null.
function findCardById(id: string): Card | null {
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
function getRandomCards(rarity: string, nrOfCards: number, currentBooster: { id: string; }[]) :Card[] {
    const randomCards :Card[] = [];
    const cardIds = new Set(currentBooster.map(card => card.id)); // Track all IDs, including already added cards.

    const cardList :Card[] = rarity === "wildcard"
        ? getCardListByRarity()[getRandomRarity()] // Get any rarity card for wildcards
        : getCardListByRarity()[rarity];          // Get cards of specific rarity

    while (randomCards.length < nrOfCards) {
        const randomCard :Card = cardList[getRandomNumber(cardList.length - 1, 0)];

        // Ensure no duplicates, no basic lands, and no re-additions
        if (!cardIds.has(randomCard.id) && !isBasicLand(randomCard)) {
            randomCards.push(randomCard);
            cardIds.add(randomCard.id); // Mark card as used
        }
    }

    return randomCards;
}

function getRandomRarity() :string {
    // Logic for picking a random rarity for wildcards
    const rarities :string[] = Object.keys(config.booster.structure).filter(r => r !== "wildcard");
    return rarities[getRandomNumber(rarities.length - 1, 0)];
}

// Organizes all cards from _cards by their rarity. If this has been done before, it returns the previously created list.
function getCardListByRarity() :{ [key: string]: Card[] } {
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

function isBasicLand(card: Card) :boolean{
    return _basicLands.includes(card)
}


//  Retrieves all basic land cards from _cards.
function getBasicLands() :Card[] {
    for (const card of _cards) {
        if (config.basic_lands.includes(card.name)) {
            _basicLands.push(card);
        }
    }
    return _basicLands;
}

function showBasicLands() :Card[] {
    return _basicLands;
}

export {loadSet, getBooster, findCardById, showBasicLands, isBasicLand };

// ## YOUR ADDED FUNCTIONS ##
