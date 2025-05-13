let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector("#guessfield");
const submit = document.querySelector("#subt");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastresult");
const lowOrhi = document.querySelector(".lowOrhi");
const startOver = document.querySelector(".resultparas");

const p = document.createElement("p");
let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener("click", function (event) {
    event.preventDefault(); 
    const guess = parseInt(userInput.value);
    validateGuess(guess); // Pass the guess as an argument
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number higher than 1");
  } else if (guess > 100) {
    alert("Please enter a number lower than 100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage("You guessed it right!");
    endGame();
  } else if (guess < randomNumber) {
    displayMessage("You chose too low");
  } else if (guess > randomNumber) {
    displayMessage("You chose too high");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess} ,  `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

  function displayMessage(message){
lowOrhi.innerHTML = `<h2>${message}</h2>`;
  };

  function endGame(){
    userInput.value = "";
    userInput.setAttribute("disabled", "")
    p.classList.add("button")
p.innerHTML = `<h1 id="newgame">Start New Game</h1>`;
startOver.appendChild(p)
playGame = false
newGame()
  };

  function newGame (){
const newGamebtn= document.querySelector("#newgame")
newGamebtn.addEventListener("click", function (){
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = []
    numGuess= 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${11 - numGuess} `;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
})

  };
