import { showBasicLands} from './cardService.js';

// important: never use the variable directly in other javascript files!!!!
let _cardPool :any[] = [];

// important: never use the variable directly in other javascript files!!!!
let _deck :any[] = [];

/*
// Retrieves a sorted list of cards from the card pool, filtered by a search string and types.
function getFilteredCardPool(search, types){
    
}

// Retrieves a sorted list of cards from the deck, filtered by a search string and types.
function getFilteredDeck(search, types){
    
}
*/
// Retrieves the complete deck.
function getDeck(): any[]{
    return _deck;
}

// Retrieves the complete CardPool.
function getCardPool(): any[]{
    return _cardPool;
}

 
/*
function defaultSort(cards){
    const order = ["A", "B", "G", "R", "U", "W"];
}

 */

function addCardsToCardPool(cards: any[]){
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

function moveCardFromPoolToDeck(cardId){
    
    
}

function moveCardFromDeckToPool(cardId){
    
}

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

export { addCardsToCardPool, getCardPool, getDeck, addLandsToCardPool };

// ## YOUR ADDED FUNCTIONS ##

function addLandsToCardPool(): void {
    const basicLands = showBasicLands();
    addCardsToCardPool(basicLands);
}