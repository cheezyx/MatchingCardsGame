const cards = document.querySelectorAll('.card');
const restartBtn = document.querySelector('button');

let Flippedd = false;
let firstCard, secondCard;
let lockBoard = false; //helping to prevent player from clicking more than 2 cards
let tryCounter = 0;

cards.forEach(card => card.addEventListener('click', flipped));
shuffelipuffeli();

function flipped() {
    if(lockBoard) return; //if board is locked, function returns
    if (this=== firstCard) return; //helping to prevent player from clicking the same card twice

    this.classList.add('flip');

    if(!Flippedd) { 
        Flippedd = true;
        firstCard = this;
    } else {
       // Flippedd = false;
        secondCard = this;
        tryCounter++;
        checkCardMatch();
        updateTries();
    }
}
function checkCardMatch(){

    if (firstCard.querySelector('.front-view').dataset.id === secondCard.querySelector('.front-view').dataset.id) {
        //console.log("Cards match"); debugging
        disableCards();
    } else {
        //console.log("No") debugging
        unflippediCards();
    }
}
function disableCards() {
    firstCard.removeEventListener('click', flipped);
    secondCard.removeEventListener('click', flipped);
    resetBoard();
}
function unflippediCards() { //flipping cards back to back view
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}
function resetBoard() {
    Flippedd = false;
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}
function updateTries() {
    const tryCounterEl = document.getElementById('try-counter');
    if (tryCounterEl) {
        tryCounterEl.textContent = tryCounter;
    }
}
restartBtn.addEventListener('click', () => { //reseting the game with button
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipped);
    });
    resetBoard();
    shuffelipuffeli();
    tryCounter = 0;
    updateTries();
});

function shuffelipuffeli () { //shuffling the cards
    cards.forEach(card => {
        let shuffeloitu = Math.floor(Math.random() * 12);
        card.style.order = shuffeloitu;
    });
}


