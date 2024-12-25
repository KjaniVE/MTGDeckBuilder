import {config} from "../config.js";
import {navigateToPage} from "../navigation.js";

const subscribeForm: { selectedSet: string | undefined, [key: string]: any } = {
    selectedSet: undefined
}

function initSubscribePage() {
    insertForm();
    document.querySelector("#subscribe form")!.addEventListener("submit", (e) => submitFrom(e as SubmitEvent));
}


// ## YOUR ADDED FUNCTIONS ##

function insertForm() {
    const form = document.querySelector("#subscribe form");

    if (form instanceof HTMLFormElement) {
        addInputsToForm(form);
    }
    addRadioButtonsToForm();
}

function addInputsToForm(form: HTMLFormElement) {
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
    const radioButtons = document.querySelector("#radioButtons") as HTMLElement;

    for (const property in config.sets) {
        if (property === config.default_set) {
            radioButtons.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}" checked>
            <label for="${property}">${(config.sets as Record<string, string>)[property]}</label>
            `)
        } else {
            radioButtons?.insertAdjacentHTML("beforeend", `
            <input type="radio" id="${property}" name="set" value="${property}">
            <label for="${property}">${(config.sets as Record<string, string>)[property]}</label>
            `)
        }
    }
    document.addEventListener("change", (e) => radioChangeDetect(e));
}

function radioChangeDetect(e: Event) {
    if (e.target instanceof HTMLInputElement && e.target.type === "radio") {
        subscribeForm.selectedSet = e.target.value;
    }
}

function submitFrom(e: SubmitEvent) {
    e.preventDefault();
    const entries = document.querySelectorAll("form input");
    const submitButton = document.querySelector("form input[type='submit']") as HTMLInputElement;
    const target = submitButton?.dataset.target ?? null;

    entries.forEach(entry => {
        subscribeForm[(entry as HTMLInputElement).name] = (entry as HTMLInputElement).value;
    });

    if (!subscribeForm.set) {
        subscribeForm.selectedSet = config.default_set;
    }

    navigateToPage(target!);
}

function getSubscribeForm() {
    return subscribeForm;
}


export {initSubscribePage, getSubscribeForm };