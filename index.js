const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const messages = document.getElementsByClassName("message");
const tooHighMessage = document.getElementById("too-high");
const tooLowMessage = document.getElementById("too-low");
const numberLow = document.getElementById("number-low");
const numberHigh = document.getElementById("number-high");
const maxGuessesMessage = document.getElementById("max-guesses");
const numberOfGuessesMessage = document.getElementById("number-of-guesses"); //was call by id but with syntax error "num-of-guesses".6to
const correctMessage = document.getElementById("correct");

let targetNumber;
let attempts = 0; // is not a const variable because is change everytime, so i replace for let. 3ro
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  attempts = attempts + 1;

  hideAllMessages();

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = "";
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = "";

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = "";
    } else {
      tooHighMessage.style.display = ""; //the conditional is repeated,tooLowMessage.style.display, it is changed to tooHighMessage.style.display.8vo
    }

    //optional section
    if (guess <= 0) {
      numberLow.style.display = "";
      attempts = attempts - 1;
    } else if (guess >= 100) {
      numberHigh.style.display = "";
      attempts = attempts - 1;
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = ""; //Uncaught TypeError: Cannot read properties of null (reading 'style').fix with 6to
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }

  if (attempts === maxNumberOfAttempts) {
    // Uncaught SyntaxError: Unexpected token '=', was ==== fix to ===. 1ro
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = "";

  resetButton.style.display = "";
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    //Uncaught TypeError: Cannot read properties of undefined (reading 'style'). <= cause an error because messages[3] do not exist, fix to <. is the size of the array. 5to
    messages[elementIndex].style.display = "none";
  }
}

function setup() {
  //Uncaught SyntaxError: Unexpected identifier 'setup', was funtion fix to function.2do
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; //uncaught TypeError: Assignment to constant variable.  maxNumberOfAttempts replace with attemtps.7mo.

  // Enable the input and submit button
  submitButton.disabled = false; // Uncaught SyntaxError. was write disabeld fix to disabled.4to
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = "none";
}

submitButton.addEventListener("click", checkGuess);
resetButton.addEventListener("click", setup);

setup();
