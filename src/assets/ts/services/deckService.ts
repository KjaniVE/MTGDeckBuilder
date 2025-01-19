import {showBasicLands, isBasicLand, findCardById} from './cardService.js';
import {renderCardPool, renderDeck} from '../pages/deck.js';
import {Card} from '../utils.js';


// important: never use the variable directly in other javascript files!!!!
let _cardPool: any[] = [];

// important: never use the variable directly in other javascript files!!!!
let _deck: any[] = [];

/*
// Retrieves a sorted list of cards from the card pool, filtered by a search string and types.
function getFilteredCardPool(search, types){
    
}

// Retrieves a sorted list of cards from the deck, filtered by a search string and types.
function getFilteredDeck(search, types){
    
}
*/

// Retrieves the complete deck.
function getDeck(): any[] {
    return _deck;
}

// Retrieves the complete CardPool.
function getCardPool(): any[] {
    return _cardPool;
}

function defaultSort(cards: Card[]): Card[] {
    const order = ["A", "B", "G", "R", "U", "W"];

    return cards.sort((a, b) => {
        if (isBasicLand(a) !== isBasicLand(b)) return isBasicLand(a) ? -1 : 1;

        const isLandA = !a.colors.length || a.colors[0] === "";
        const isLandB = !b.colors.length || b.colors[0] === "";

        if (isLandA !== isLandB) return isLandA ? -1 : 1;
        if (a.colors.length !== b.colors.length) return a.colors.length > b.colors.length ? 1 : -1;

        return order.indexOf(a.colors[0]) - order.indexOf(b.colors[0]);
    });
}


function addCardsToCardPool(cards: any[]) {
    for (const card of cards) {
        _cardPool.push(card);
    }
}

/*
function getBiggestManaCostFromCardPool(){    
    
}

function getCardFromPool(cardId){
    
}

function getCardFromDeck(cardId){
    
}
*/
function moveCardFromPoolToDeck(cardId: string): void {
    const card: Card = findCardById(cardId)!;

    if (isBasicLand(card)) {
        _deck.push(card);
    } else {
        _deck.push(card);
        for (let i = 0; i < _cardPool.length; i++) {
            if (_cardPool[i].id === cardId) {
                _cardPool.splice(i, 1);
                break;
            }
        }
    }
    renderCardPool();
    renderDeck();
}

function moveCardFromDeckToPool(cardId: string): void {
    const card :Card = findCardById(cardId)!;

    _cardPool.push(card);
    for (let i = 0; i < _deck.length; i++) {
        if (_deck[i].id === cardId) {
            _deck.splice(i, 1);
        }
    }
    renderCardPool();
    renderDeck();
}

/*

function getCreatureCount(){
    
}

function getLandCount(){
    
}

function getNoneCreatureNoneLandCount(){
    
}

// Counts the occurrence of each mana type in the deck.
function getManasCount(){
    
}

function filterCards(cards, search, types){
    
}

function filterCardsByType(cards, types){

}

function filterCardsBySearch(cards, search){

}
*/

export {
    addCardsToCardPool,
    getCardPool,
    getDeck,
    addLandsToCardPool,
    defaultSort,
    moveCardFromPoolToDeck,
    moveCardFromDeckToPool
};

// ## YOUR ADDED FUNCTIONS ##

function addLandsToCardPool(): void {
    const basicLands = showBasicLands();
    addCardsToCardPool(basicLands);
}