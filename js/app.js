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
}

function doMatch() {
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
      }
      if (moves > 10) {
        document.getElementById("star2").style.color = "#f2f2f2";
      }
}