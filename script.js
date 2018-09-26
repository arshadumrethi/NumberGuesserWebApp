/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');


//Assign Span min and max UI elements
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    console.log(guess);
    
    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    }

    //Check for win
    if (guess === winningNum){
        gameOver(true, `${winningNum} is correct, YOU WIN`, 'green');
    
    } else {
        // Wrong Guess
        guessesLeft -= 1;

        if(guessesLeft === 0){
            //Game over - lost
            gameOver(false, `Game Over, You Lost! The Correct number was ${winningNum}`)
            
        } else {
            //Game Continues
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
            
        }
    }
});

//Random Number Generator
function getRandomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

// Game Over function
function gameOver(won, msg) {
    //Ternary operator to pick color
    let color;
    won === true ? color = 'green' : color = 'red';
    
    //Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Change text color
    message.style.color = color;
    
    // Set message
    setMessage(msg);
    
    //Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className = 'play-again';
    
}