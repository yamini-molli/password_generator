"use strict";

/* =================================
   ELEMENTS
================================= */

const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const copyMessage = document.getElementById("copyMessage");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");

const strengthText = document.getElementById("strengthText");
const strengthBar = document.getElementById("strengthBar");


/* =================================
   CHARACTER SETS
================================= */

const CHARACTERS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};


/* =================================
   SECURE RANDOM NUMBER
================================= */

function secureRandom(max) {

    const array = new Uint32Array(1);

    crypto.getRandomValues(array);

    return array[0] % max;
}


/* =================================
   GENERATE PASSWORD
================================= */

function generatePassword() {

    const length = Number(lengthSlider.value);

    let characterPool = "";

    if (uppercaseCheckbox.checked) {
        characterPool += CHARACTERS.uppercase;
    }

    if (lowercaseCheckbox.checked) {
        characterPool += CHARACTERS.lowercase;
    }

    if (numbersCheckbox.checked) {
        characterPool += CHARACTERS.numbers;
    }

    if (symbolsCheckbox.checked) {
        characterPool += CHARACTERS.symbols;
    }

    /* No character type selected */

    if (characterPool.length === 0) {

        passwordInput.value = "";

        alert(
            "Please select at least one character type."
        );

        return;
    }

    let password = "";

    /* Generate password */

    for (let i = 0; i < length; i++) {

        const randomIndex =
            secureRandom(characterPool.length);

        password += characterPool[randomIndex];
    }

    passwordInput.value = password;

    updateStrength();
}


/* =================================
   UPDATE LENGTH
================================= */

lengthSlider.addEventListener("input", () => {

    lengthValue.textContent =
        lengthSlider.value;

    generatePassword();
});


/* =================================
   PASSWORD STRENGTH
================================= */

function updateStrength() {

    const length =
        Number(lengthSlider.value);

    let types = 0;

    if (uppercaseCheckbox.checked) {
        types++;
    }

    if (lowercaseCheckbox.checked) {
        types++;
    }

    if (numbersCheckbox.checked) {
        types++;
    }

    if (symbolsCheckbox.checked) {
        types++;
    }


    let strength = 0;

    /*
        Calculate strength
        based on length + character types
    */

    if (length >= 12) {
        strength += 2;
    } else if (length >= 8) {
        strength += 1;
    }

    strength += types;


    /* Weak */

    if (strength <= 2) {

        strengthText.textContent = "Weak";

        strengthText.style.color =
            "#ef4444";

        strengthBar.style.width = "30%";

        strengthBar.style.background =
            "#ef4444";
    }

    /* Medium */

    else if (strength <= 4) {

        strengthText.textContent = "Medium";

        strengthText.style.color =
            "#f59e0b";

        strengthBar.style.width = "60%";

        strengthBar.style.background =
            "#f59e0b";
    }

    /* Strong */

    else {

        strengthText.textContent = "Strong";

        strengthText.style.color =
            "#22c55e";

        strengthBar.style.width = "100%";

        strengthBar.style.background =
            "#22c55e";
    }
}


/* =================================
   CHARACTER OPTION EVENTS
================================= */

const checkboxes = [
    uppercaseCheckbox,
    lowercaseCheckbox,
    numbersCheckbox,
    symbolsCheckbox
];

checkboxes.forEach((checkbox) => {

    checkbox.addEventListener(
        "change",
        () => {

            generatePassword();

        }
    );

});


/* =================================
   GENERATE BUTTON
================================= */

generateBtn.addEventListener(
    "click",
    generatePassword
);


/* =================================
   COPY PASSWORD
================================= */

copyBtn.addEventListener(
    "click",
    async () => {

        const password =
            passwordInput.value;

        if (!password) {

            return;
        }

        try {

            await navigator.clipboard.writeText(
                password
            );

            copyMessage.textContent =
                "✓ Password copied to clipboard";

            setTimeout(() => {

                copyMessage.textContent = "";

            }, 2000);

        } catch (error) {

            copyMessage.textContent =
                "Unable to copy password.";

        }

    }
);


/* =================================
   INITIAL PASSWORD
================================= */

generatePassword();