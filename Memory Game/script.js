const game = document.querySelector(".game_cards");
const moveCounter = document.getElementById("move_counter");
let scoreCount=document.getElementById("score")

const emojis = ["⚡","🔥","💧","🌍","🪐","🌊"];
let cards = [...emojis, ...emojis];

let turnedCards = [];
let moves = 0;
let matchedPairs = 0;
let score=0;
let time = 60; 
let timeInterval;

function shuffle() {
    cards.sort(() => 0.5-Math.random() );
}

function createGame() {
    game.innerHTML = "";
    shuffle();
    cards.forEach(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("emoji", emoji);
        card.innerHTML = "❗";
        card.addEventListener("click", turnCard);
        game.appendChild(card);
        // console.log(emoji)
    });
}

function turnCard() {
    if (turnedCards.length < 2 && !this.classList.contains("turned")) {
        this.classList.add("turned");
        this.innerHTML = this.getAttribute("emoji");
        turnedCards.push(this);

        if (turnedCards.length === 2) {
            setTimeout(matchCard, 300);
        }
    }
}

function matchCard() {
    moves++;
    moveCounter.textContent = moves;

    const [card1, card2] = turnedCards;

    if (card1.getAttribute("emoji") === card2.getAttribute("emoji")) {
        matchedPairs++;
        turnedCards[0].style.visibility = "hidden";
        turnedCards[1].style.visibility = "hidden";
        score++
        scoreCount.innerHTML=`${score}/${emojis.length}`
        turnedCards = [];

        if (matchedPairs === emojis.length) {
            clearInterval(timeInterval);
            setTimeout(() => alert("You Won!!"), 100);
            game.innerHTML="You Won"
            game.style.display="block"
        }
    } else {
        turnedCards.forEach(card => {
            card.classList.remove("turned");
            card.innerHTML = "❗";
        });
        turnedCards = [];
    }
}


const countdownDisplay = document.getElementById("timer");
function countdown(){ 
    clearInterval(timeInterval);
        timeInterval=setInterval(() => { 

        const minutes = Math.floor(time / 60);
        let seconds = time % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownDisplay.textContent = `${minutes}:${seconds}`;

        time--;

        if (time < 0) {
            clearInterval(timeInterval);
            alert( "Time's up!"); 
            // turnedCards.style.disabled
            document.querySelectorAll(".card").forEach(card=>{
                card.style.pointerEvents = "none";
            });
        }
    }, 500)}; 
    // clearInterval(countdownInterval); 


function startGame() {
    moves = 0;
    moveCounter.textContent = moves;
    matchedPairs = 0;
    turnedCards = [];
    createGame();
    time=60;
    countdown();
}

const restartBtn = document.querySelector(".restart_btn");
restartBtn.style.cursor="pointer"
restartBtn.addEventListener("click", startGame)

startGame();
