const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockedBoard = false;
let firstCard, secondCard;

cards.forEach(card => card.addEventListener("click", flipCard));

function flipCard() {
  // IF flipping still happens
  if (lockedBoard) return;

  // IF double click
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
  lockedBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1000);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

function resetBoard() {
  [hasFlippedCard, lockedBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    // random number from 0 to 12
    let randomPos = Math.floor(Math.random() * 12);
    // random order property to card
    card.style.order = randomPos;
  });
})();
