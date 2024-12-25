// _unopendBoosters: contains the list of boosterpacks, opened and/or unopened
// for example: [0, 1, 2, 1, 3, 3] 
// this means: first booster is open and has the version 0 image, second is not open and has the version image, third one is not open and has the version 2 image, ...
// if you have an better/other solution here, you may implent your own!!!

let _unopendBoosters: number[] = [];

const _MAX_BOOSTER_VERSIONS: number = 3;


// ## GIVEN ##

function initBoostersPage(): void {
    console.log("Boosters page initialized");
}

export {initBoostersPage};
// ## YOUR ADDED FUNCTIONS ##