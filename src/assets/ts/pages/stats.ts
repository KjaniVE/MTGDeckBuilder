// ## GIVEN ##
import { getLandCount, getCreatureCount, getNoneCreatureNoneLandCount, getManasCount } from "../services/deckService.js";

function initStatsPage() {
    renderStats();
    renderMana();
}

function renderStats() {
    const $stats = document.querySelector("#type-stats")!;
    $stats.innerHTML = "";
    const creatureCount = getCreatureCount();
    const noneCreatureCount = getNoneCreatureNoneLandCount();
    const landCount = getLandCount();
    const total = creatureCount + noneCreatureCount + landCount;

    $stats.insertAdjacentHTML("beforeend", `
        <li>
            <p><span>Creatures:</span> ${creatureCount}</p>
        </li>
        <li>
            <p><span>None creatures:</span> ${noneCreatureCount}</p>
        </li>
        <li>
            <p><span>Lands:</span> ${landCount}</p>
        </li>
        <li class="total">
            <p><span>Total:</span> ${total}</p>
        </li>
    `);
}

function renderMana() {
    const $mana = document.querySelector("#mana-stats")!;
    $mana.innerHTML = "";
    const manas = getManasCount();
    const manaTypes = ["W", "U", "B", "R", "G", "A"];
    const manaNames = ["white", "blue", "black", "red", "green", "colorless"];

    manaTypes.forEach((type, index) => {
        const count = manas[type];
        const percentage = (count / Object.values(manas).reduce((a, b) => a + b, 0)) * 100 || 0;
        $mana.insertAdjacentHTML("beforeend", `
            <li>
                <div class="mana ${manaNames[index]}" data-mana="${type}"></div>
                <p>${count}<br>${percentage.toFixed(0)}%</p>
            </li>
        `);
    });
}

export { initStatsPage };


// ## YOUR ADDED FUNCTIONS ##

