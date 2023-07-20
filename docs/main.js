import * as game from './game.js';

const dificulty = {
  easy: 20,
  soft: 50,
  hard: 100,
};

const heartLine = document.getElementById('heart-line');

const awnser = document.querySelector('.awnser');

const resultat = document.querySelector('#Resultat');

awnser.addEventListener('input', function () {
  const value = this.value;

  if (/\D/.test(value)) {
    this.value = value.replace(/\D/g, '');
  }

  resultat.innerHTML = '';
});

awnser.addEventListener('focus', function () {
  this.value = '';
});

awnser.addEventListener('blur', function () {
  const value = this.value;

  if (value.length < 3 && value.length != 0) {
    this.value = ('000' + value).slice(-3);
  }
});

const slideBar = document.getElementById('slideBar');
slideBar.addEventListener('change', rangeSlide);
slideBar.addEventListener('mousemove', rangeSlide);

function rangeSlide() {
  document.getElementById('rangeValue').innerHTML = slideBar.value + '\u2661';
}

const StartMenu = document.querySelector('#StartMenu');
const buttonsStart = document.querySelectorAll('#StartMenu a');
buttonsStart.forEach((button) => {
  button.addEventListener('click', loading);
});

function loading() {
  StartMenu.classList.add('hidden');
  const gameWindow = document.querySelector('#GameMenu');
  gameWindow.classList.remove('hidden');
  game.newGame(slideBar.value, dificulty[this.id ?? easy]);
  if (game.state.maxTries < 25) {
    for (let index = 0; index < game.state.maxTries; index++) {
      const heart = document.createElement('a');
      heart.setAttribute('href', '#');
      heart.setAttribute('class', 'heart active');
      heart.setAttribute('id', `heart${index}`);
      heart.innerText = '\u2661';
      heartLine.appendChild(heart);
    }
  } else {
    const heart = document.createElement('a');
    heart.setAttribute('href', '#');
    heart.setAttribute('class', 'heart active');
    heart.setAttribute('id', `heart`);
    heart.innerHTML = `<span id="nbHeart">${game.state.maxTries}</span> \u2661`;
    heartLine.appendChild(heart);
  }
}

function webGuess() {
  let awnser = document.getElementById('awnser').value;
  if (awnser.length === 0) {
    awnser = '000';
  }

  try {
    awnser = parseInt(awnser);
  } catch (err) {
    alert("Ceci n'est pas un nombre");
  }

  game.nextGuess(awnser);
}

document.getElementById('validButton').addEventListener('click', webGuess);
