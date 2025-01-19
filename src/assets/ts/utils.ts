// @ts-ignore

@suppress("ALL")
// ## GIVEN ##

function getRandomNumber(max: number, min = 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
function getRandomListItem(list){
     
}
*/

// ## YOUR ADDED FUNCTIONS ##

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

export {getRandomNumber, Card};