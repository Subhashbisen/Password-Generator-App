let inputSlider = document.querySelector("[data-lengthSlider]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");
const generateBtn = document.querySelector(".generateButton");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
let uppercase = document.getElementById("uppercase");
let lowercase = document.getElementById("lowercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
const indicator = document.querySelector("[data-indicator]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

let password = '';
let passwordLength = 10;
handleSlider();
setIndicator("#cc c");

function handleSlider() {
    inputSlider.value = passwordLength;
    console.log(passwordLength, "pass", typeof (passwordLength));
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%"
};

inputSlider.addEventListener("input", (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

function generatePass(passLength) {
    password = '';
    let UpperCaseLetter = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    console.log(UpperCaseLetter);
    let lowerCaseLetter = `abcdefghijklmnopqrstuvwxyz`;
    let numbersLetter = `1234567890`;
    let symbolsLetter = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
    let allChars = ''

    lowercase.checked ? allChars = allChars + lowerCaseLetter : ""
    uppercase.checked ? allChars = allChars + UpperCaseLetter : ""
    numbers.checked ? allChars = allChars + numbersLetter : ""
    symbols.checked ? allChars = allChars + symbolsLetter : ""

    if (allChars == "" || allChars.length == 0) {
        alert("select atleast one checkbox")
    };

    for (let i = 0; i < passLength; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    };

    return password
};


async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch (e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);

};

copyBtn.addEventListener("click", () => {
    if (passwordDisplay.value !== " ")
        copyContent();
})

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calcStrength() {
    if (uppercase.checked && lowercase.checked && numbers.checked && symbols.checked) {
        setIndicator("#0f0");
    }
    else if (lowercase.checked || uppercase.checked && numbers.checked || symbols.checked && passwordLength >= 6) {
        setIndicator("#ff0");
    }
    else {
        setIndicator("#f00");
    }
}

function handleCheckBoxChange() {
    let checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
            console.log(checkCount, "check");
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
};

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange)
})

generateBtn.addEventListener("click", () => {
    passwordDisplay.value = generatePass(passwordLength);
    calcStrength();
})

