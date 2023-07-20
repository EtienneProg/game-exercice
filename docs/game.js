export let state = {};

const buttonValid = document.querySelector('#validButton');
const resultat = document.querySelector('#Resultat');

export function newGame(maxTries, maxNumber) {
  state.maxTries = maxTries;
  state.awnser = generateNumber(maxNumber);
  state.currTries = 0;
}

export function nextGuess(userNumber) {
  if (userNumber === state.awnser) {
    resultatMsg('GAGNER !!!', 'text-color-win', true);
  } else if (state.currTries + 1 >= state.maxTries) {
    updateHeart();
    resultatMsg('PERDU :/', 'text-color-lose', true);
  } else {
    resultatMsg(state.awnser > userNumber ? 'Trop Petit ...' : 'Trop Grand ...');
    updateHeart();
  }
}

function resultatMsg(msg, classe = null, isEnd = false) {
  if (classe) {
    resultat.classList.replace('text-color-white', classe);
  }
  if (isEnd) {
    buttonValid.setAttribute('disabled', 'disabled');
    const restartButton = document.querySelector('#RestartMenu');
    restartButton.addEventListener('click', function () {
      location.reload();
    });
    restartButton.classList.toggle('hidden');
  }
  resultat.innerHTML = msg;
}

export function generateNumber(maxNumber) {
  //+1 pour inclure le nombre max
  // donc genere un nombre entre 0 (inclue) et maxNumber (inclue)
  return Math.floor(Math.random() * maxNumber + 1);
}

export function updateHeart() {
  const nbHeart = document.querySelector('#nbHeart');

  if (nbHeart) {
    nbHeart.innerHTML = parseInt(nbHeart.innerHTML) - 1;
    if (nbHeart.innerHTML === '0') {
      document.querySelector(`#heart`).classList.toggle('active');
    }
  } else {
    const heart = document.querySelector(`#heart${state.currTries}`);
    heart.classList.toggle('active');
  }
  state.currTries++;
}
