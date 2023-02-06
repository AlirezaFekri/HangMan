
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
    "Bat",
    "Bear",
    "Beaver",
    "Bee",
    "Bison",
    "Boar",
    "Buffalo",
    "Butterfly",
    "Camel",
    "Capybara",
    "Caribou",
    "Cassowary",
    "Cat",
    "Caterpillar",
    "Cattle",
    "Chamois",
    "Cheetah",
    "Chicken",
    "Chimpanzee",
    "Chinchilla",
    "Chough",
    "Clam",
    "Cobra",
    "Cockroach",
    "Cod",
    "Cormorant",
    "Coyote",
    "Crab",
    "Crane",
    "Crocodile",
    "Crow",
    "Curlew",
    "Deer",
    "Dinosaur",
    "Dog",
    "Dogfish",
    "Dolphin",
    "Dotterel",
    "Dove",
    "Dragonfly",
    "Duck",
    "Dugong",
    "Dunlin",
    "Eagle",
    "Echidna",
    "Eel",
    "Eland",
    "Elephant",
    "Elk",
    "Emu",
    "Falcon",
    "Ferret",
    "Finch",
    "Fish",
    "Flamingo",
    "Fly",
    "Fox",
    "Frog",
    "Gaur",
    "Gazelle",
    "Gerbil",
    "Giraffe",
    "Gnat",
    "Gnu",
    "Goat",
    "Goldfinch",
    "Goldfish",
    "Goose",
    "Gorilla",
    "Goshawk",
    "Grasshopper",
    "Grouse",
    "Guanaco",
    "Gull",
    "Hamster",
    "Hare",
    "Hawk",
    "Hedgehog",
    "Heron",
    "Herring",
    "Hippopotamus",
    "Hornet",
    "Horse",
    "Human",
    "Hummingbird",
    "Hyena",
    "Ibex",
    "Ibis",
    "Jackal",
    "Jaguar",
    "Jay",
    "Jellyfish",
    "Kangaroo",
    "Kingfisher",
    "Koala",
    "Kookabura",
    "Kouprey",
    "Kudu",
    "Lapwing",
    "Lark",
    "Lemur",
    "Leopard",
    "Lion",
    "Llama",
    "Lobster",
    "Locust",
    "Loris",
    "Louse",
    "Lyrebird",
    "Magpie",
    "Mallard",
    "Manatee",
    "Mandrill",
    "Mantis",
    "Marten",
    "Meerkat",
    "Mink",
    "Mole",
    "Mongoose",
    "Monkey",
    "Moose",
    "Mosquito",
    "Mouse",
    "Mule",
    "Narwhal",
    "Newt",
    "Nightingale",
    "Octopus",
    "Okapi",
    "Opossum",
    "Oryx",
    "Ostrich",
    "Otter",
    "Owl",
    "Oyster",
    "Panther",
    "Parrot",
    "Partridge",
    "Peafowl",
    "Pelican",
    "Penguin",
    "Pheasant",
    "Pig",
    "Pigeon",
    "Pony",
    "Porcupine",
    "Porpoise",
    "Quail",
    "Quelea",
    "Quetzal",
    "Rabbit",
    "Raccoon",
    "Rail",
    "Ram",
    "Rat",
    "Raven",
    "Red deer",
    "Red panda",
    "Reindeer",
    "Rhinoceros",
    "Rook",
    "Salamander",
    "Salmon",
    "Sand Dollar",
    "Sandpiper",
    "Sardine",
    "Scorpion",
    "Seahorse",
    "Seal",
    "Shark",
    "Sheep",
    "Shrew",
    "Skunk",
    "Snail",
    "Snake",
    "Sparrow",
    "Spider",
    "Spoonbill",
    "Squid",
    "Squirrel",
    "Starling",
    "Stingray",
    "Stinkbug",
    "Stork",
    "Swallow",
    "Swan",
    "Tapir",
    "Tarsier",
    "Termite",
    "Tiger",
    "Toad",
    "Trout",
    "Turkey",
    "Turtle",
    "Viper",
    "Vulture",
    "Wallaby",
    "Walrus",
    "Wasp",
    "Weasel",
    "Whale",
    "Wildcat",
    "Wolf",
    "Wolverine",
    "Wombat",
    "Woodcock",
    "Woodpecker",
    "Worm",
    "Wren",
    "Yak",
    "Zebra"];
const answer = document.getElementById("clue");
const image = document.getElementById("image");
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
        return true;
    } else if (image.getAttribute("src") == "./assets/hangman6.png") {
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