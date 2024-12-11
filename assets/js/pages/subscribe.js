import {config} from "../config.js";
import {navigateToPage} from "../navigation.js";

const subscribeForm = {}

function initSubscribePage() {
    insertForm();
    document.querySelector("#subscribe form").addEventListener("submit", submitFrom);
}


// ## YOUR ADDED FUNCTIONS ##

function insertForm() {
    const form = document.querySelector("#subscribe form");

    addInputsToForm(form);
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
    `)
}

function addRadioButtonsToForm() {
    const radioButtons = document.querySelector("#radioButtons");

    for (const property in config.sets) {
        if (property === config.default_set) {
            radioButtons.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}" checked>
            <label for="${property}">${config.sets[property]}</label>
            `)
        } else {
            radioButtons.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}">
            <label for="${property}">${config.sets[property]}</label>
            `)
        }
    }
    document.addEventListener("change", radioChangeDetect);
}

function radioChangeDetect(e) {
    if (e.target.type === "radio") {
        console.log(e.target.value);
        subscribeForm.selectedSet = e.target.value
    }
}

function submitFrom(e) {
    e.preventDefault();
    const entries = document.querySelectorAll("form input");
    const target = document.querySelector("form input[type='submit']").dataset.target;

    entries.forEach(entry => {
        console.log(entry.name);
        subscribeForm[entry.name] = entry.value;
    });

    if (!subscribeForm.set) {
        subscribeForm.selectedSet = config.default_set;
    }

    console.log(subscribeForm);
    navigateToPage(target);
}

function getSubscribeForm() {
    return subscribeForm;
}


export {initSubscribePage, getSubscribeForm };