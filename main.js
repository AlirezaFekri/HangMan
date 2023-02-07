
const letter = document.getElementById("letters");
const words = ["Aardvark",
    "Albatross",
    "Alligator",
    "Alpaca",
    "Ant",
    "Anteater",
    "Antelope",
    "Ape",
    "Armadillo",
    "Donkey",
    "Baboon",
    "Badger",
    "Barracuda",
    "Bat"];
const answer = document.getElementById("clue");
const image = document.getElementById("image");
const gameOver = document.getElementById("gameover").children[0];
let randomSelected = "";
let wrongType = 1;

document.addEventListener("keypress", hoverKey);
document.addEventListener("keyup", usedByKey);
document.addEventListener("keyup", validateAnswer);
letter.addEventListener("click", usedByClick);

function usedByKey(event) {
    const key = event.key;
    const keypressed = document.getElementById(key.toUpperCase());
    keypressed.classList.remove("press");
    if (event.keyCode >= 65 && event.keyCode <= 90 && !validateAnswer()) {
        if (keypressed.classList.value === "used") {
            event.preventDefault();
        } else {
            keyValid(keypressed.innerText);
            keypressed.classList.add("used");
        }
        if (validateAnswer()) {
            resetGame();
        }
    } else {
        console.log("INVALID");
        event.preventDefault();
    }
};

function usedByClick(event) {
    const letterClicked = document.getElementById(event.target.id);
    if (letterClicked.classList == "used" || validateAnswer()) {
        event.preventDefault();
    } else {
        keyValid(letterClicked.innerText);
        letterClicked.classList.add("used");
    }

    if (validateAnswer()) {
        resetGame();
    }
};

function hoverKey(event) {
    const key = String(event.key);
    const keypressed = document.getElementById(key.toUpperCase());
    keypressed.classList.add("press");
};

function keyValid(keypressed) {

    if (randomSelected.indexOf(keypressed) === -1) {

        image.setAttribute("src", `./assets/hangman${wrongType}.png`);

        if (wrongType == 6) {
            answer.innerHTML = `Random word is: ${randomSelected}`;
            resetGame();
            return;

        } else {

            wrongType += 1;

        }
    } else {
        let index = randomSelected.indexOf(keypressed);

        for (let i = 0; i < randomSelected.length; i++) {

            if (randomSelected.indexOf(keypressed, randomSelected.indexOf(keypressed) + 1) != -1) {

                answer.children[index].innerText = keypressed;
                index = randomSelected.indexOf(keypressed, randomSelected.indexOf(keypressed) + 1);
                continue;

            } else {
                answer.children[index].innerText = keypressed;
                break;
            }
        }

    }
};

function selectRandomItem() {
    randomSelected = words[Math.floor(Math.random() * words.length)].toUpperCase();
    console.log(randomSelected)
    wrongType = 1;
};

function insertClue() {
    for (let i = 0; i < randomSelected.length; i++) {
        if (randomSelected[i] == " ") {
            answer.innerHTML += "<sapn> </span>";
        } else {
            answer.innerHTML += "<sapn>_</span>";
        }
    }
};

function letterDefault() {
    const letterReset = letter.children;
    for (let i = 0; i < letterReset.length; i++) {
        letterReset[i].classList = "";
    }
};

function validateAnswer() {

    if (answer.innerText == randomSelected) {
        image.setAttribute("src", "./assets/winner.png");   
        gameOver.style.display = "block";
        gameOver.style.color = "green";
        gameOver.innerHTML = "You Win! <br> click image to restart";
        return true;
    } else if (image.getAttribute("src") == "./assets/hangman6.png") {
        gameOver.style.display = "block";
        gameOver.innerHTML = "You loss! <br> click image to restart";
        gameOver.style.color = "red";
        return true;
    } else {
        return false;
    }
};

function validateForReset() {
    const imageStatus = ["winner", "hangman6"];


    for (const key in imageStatus) {
        if (image.getAttribute("src") === `./assets/${imageStatus[key]}.png`) {
            image.src = "./assets/hangman0.png";
            gameOver.style.display = "none";
            answer.innerHTML = "";
            letterDefault();
            selectRandomItem();
            insertClue();
        }
    }

};

function resetGame() {
    image.addEventListener("click", validateForReset);

};
selectRandomItem();
insertClue();