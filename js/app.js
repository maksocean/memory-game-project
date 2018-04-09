/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let allCards = [...card]
console.log(allCards);
const board = document.getElementById("board");
let opened = [];
const matched = document.getElementsByClassName("match");
let moves = 0;
const counter = document.querySelector(".moves");
let interval;
const time = document.querySelector(".time");
let minute = 0;
let second = 0;
const restart = document.querySelector(".restart");
const modal = document.getElementById("scoreboard");
const playmore = document.querySelector(".playmore");
const quit = document.querySelector(".quit");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

document.body.onload = start();

function start() {
    allCards = shuffle(allCards);
    for (var i = 0; i < allCards.length; i++) {
        board.innerHTML = "";
        Array.prototype.forEach.call(allCards, function(item) {
            board.appendChild(item);
        });
        allCards[i].classList.remove("show", "open", "match"); // remove the listed classes to clear the gameboard
    }
    moves = 0;
    counter.innerHTML = moves;
    time.innerHTML = "0m 0s";
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const show = function() {
    this.classList.toggle("open"); // open card
    this.classList.toggle("show"); // display the card's symbol
};

for (var i = 0; i < allCards.length; i++) {
    card = allCards[i];
    card.addEventListener("click", show);
    card.addEventListener("click", choose);
    card.addEventListener("click", finalScore); // activate the final scoreboard when all cards have matched
}

function choose() {
    opened.push(this);
    const pair = opened.length;
    if (pair === 2) {
        if (opened[0].type === opened[1].type) {
            doMatch();
        } else {
            doNotMatch();
        }
    }
    startTimer();
}

function doMatch() {
    movesCounter();
    opened[0].classList.add("match");
    opened[1].classList.add("match");
    opened[0].classList.remove("open", "show");
    opened[1].classList.remove("open", "show");
    opened = [];
}

function doNotMatch() {
    setTimeout(function() {
        movesCounter();
        opened[0].classList.remove("open", "show");
        opened[1].classList.remove("open", "show");
        opened = [];
    }, 300);
}

function movesCounter() {
    moves++;
    counter.innerHTML = moves;
    if (moves > 5) {
        document.getElementById("star1").style.color = "#f2f2f2";
        document.getElementById("star3-2").style.visibility = "collapse"; // for the final scoreboard
    }
    if (moves > 10) {
        document.getElementById("star2").style.color = "#f2f2f2";
        document.getElementById("star2-2").style.visibility = "collapse";
    }
}

function startTimer() {
    interval = setInterval(function() {
        time.innerHTML = minute + "m " + second + "s";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
    }, 1000);
    startTimer = function() {};
}

restart.addEventListener("click", start);
restart.addEventListener("click", resetTime);
restart.addEventListener("click", starColor);
restart.addEventListener("click", playAgain);

function resetTime() {
    clearInterval(interval);
    second = 0;
    minute = 0;
    time.innerHTML = "0m 0s";
}

function starColor() {
    document.getElementById("star1").style.color = "#E9C77B";
    document.getElementById("star2").style.color = "#E9C77B";
    document.getElementById("star3").style.color = "#E9C77B";
}

function finalScore() {
    if (matched.length == 16) {
        clearInterval(interval);
        timeFix = time.innerHTML;
        document.getElementById("final-moves").innerHTML = moves;
        document.getElementById("final-time").innerHTML = timeFix;
        modal.classList.add("show-results");
    }
}

/* Buttons */
function playAgain() { 
    modal.classList.remove("show-results");
}

playmore.addEventListener("click", start); // "Play Again!" button
playmore.addEventListener("click", resetTime);
playmore.addEventListener("click", starColor);
playmore.addEventListener("click", playAgain);

function quitGame() {
    modal.classList.remove("show-results");
}

quit.addEventListener("click", quitGame); // "I'm off!" button (just closes the scoreboard)