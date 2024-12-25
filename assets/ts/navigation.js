// ## GIVEN ##
import { getRandomNumber } from "./utils.js";
import { initBoostersPage } from "./pages/boosters.js";
const NR_OF_BACKGROUNDS = 3;
const initPages = {
    boosters: initBoostersPage,
};
function initNavigation() {
    randomBackground();
    document.querySelectorAll(".nav").forEach((button) => {
        button.addEventListener("click", e => navigate(e));
    });
}
function navigate(e) {
    var _a;
    e.preventDefault();
    const target = (_a = e.target.dataset.target) !== null && _a !== void 0 ? _a : "";
    navigateToPage(target);
}
function navigateToPage(targetId) {
    document.querySelectorAll(".page").forEach(page => {
        var _a;
        if (page.id === targetId) {
            page.classList.remove("hidden");
            (_a = initPages[targetId]) === null || _a === void 0 ? void 0 : _a.call(initPages);
        }
        else {
            page.classList.add("hidden");
        }
    });
    randomBackground();
}
export { initNavigation, navigateToPage };
// ## YOUR ADDED FUNCTIONS ##
function randomBackground() {
    let $body = document.querySelector("body");
    $body.className = "";
    $body.classList.add(`background-0${getRandomNumber(NR_OF_BACKGROUNDS, 1)}`);
}
