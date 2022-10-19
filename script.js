'use strict';

// Selecting elements
const playerZeroEl = document.querySelector('.player--0');
const playerOneEl = document.querySelector('.player--1');
const scoreZero = document.querySelector('#score--0');
const scoreOne = document.getElementById('score--1');
const playerZero = document.getElementById('current--0');
const playerOne = document.getElementById('current--1');
const getDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scores, activePlayer, isPlaying;
// Starting Conditions
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  scoreZero.textContent = 0;
  scoreOne.textContent = 0;
  playerOne.textContent = 0;
  playerZero.textContent = 0;

  getDice.classList.add('hidden');
  playerZeroEl.classList.remove('player--winner');
  playerOneEl.classList.remove('player--winner');
  playerZeroEl.classList.add('player--active');
  playerOneEl.classList.remove('player--active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZeroEl.classList.toggle('player--active');
  playerOneEl.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    getDice.classList.remove('hidden');
    getDice.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      getDice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
