import { config } from "../config.js";
import { navigateToPage } from "../navigation.js";
const subscribeForm = {
    selectedSet: undefined
};
function initSubscribePage() {
    insertForm();
    document.querySelector("#subscribe form").addEventListener("submit", (e) => submitFrom(e));
}
// ## YOUR ADDED FUNCTIONS ##
function insertForm() {
    const form = document.querySelector("#subscribe form");
    if (form instanceof HTMLFormElement) {
        addInputsToForm(form);
    }
    addRadioButtonsToForm();
}
function addInputsToForm(form) {
    form.insertAdjacentHTML("afterbegin", `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required value="test">
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required value="99">
    
    <fieldset>
    <div id="radioButtons">
    </div>
    </fieldset>
    
    <label for="boostersAmount">BOOSTERS</label>
    <input type="number" name="boostersAmount" id="boostersAmount" placeholder="Boosters" required value="${config.default_nr_of_boosters}" min="4" max="10">
    `);
}
function addRadioButtonsToForm() {
    const radioButtons = document.querySelector("#radioButtons");
    for (const property in config.sets) {
        if (property === config.default_set) {
            radioButtons.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}" checked>
            <label for="${property}">${config.sets[property]}</label>
            `);
        }
        else {
            radioButtons === null || radioButtons === void 0 ? void 0 : radioButtons.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}">
            <label for="${property}">${config.sets[property]}</label>
            `);
        }
    }
    document.addEventListener("change", (e) => radioChangeDetect(e));
}
function radioChangeDetect(e) {
    if (e.target instanceof HTMLInputElement && e.target.type === "radio") {
        subscribeForm.selectedSet = e.target.value;
    }
}
function submitFrom(e) {
    var _a;
    e.preventDefault();
    const entries = document.querySelectorAll("form input");
    const submitButton = document.querySelector("form input[type='submit']");
    const target = (_a = submitButton === null || submitButton === void 0 ? void 0 : submitButton.dataset.target) !== null && _a !== void 0 ? _a : null;
    entries.forEach(entry => {
        subscribeForm[entry.name] = entry.value;
    });
    if (!subscribeForm.set) {
        subscribeForm.selectedSet = config.default_set;
    }
    navigateToPage(target);
}
function getSubscribeForm() {
    return subscribeForm;
}
export { initSubscribePage, getSubscribeForm };
