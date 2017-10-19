// Load the NPM Package inquirer
var inquirer = require("inquirer");

var requireWord = require("./words.js")

var guessesRemaining = 9;

var words = ["hello", "goodbye", "parkour", "saxophone", "razorback", "anesthesia", "orangutan", "typhoon", "symphony", "tandem", "menace", "nefarious", 
"lasagna", "cartridge", "shotgun", "sick", "undermine", "sadistic", "envelope", "rhetoric", "religion", "ritualistic", "arbitrary", "dominant", "individual"]

var usedWords = []

var randomWord = words[Math.floor(Math.random() * words.length)];

var lettersUsed = []

var correctGuesses = []

//var letters = randomWord.split("")

//console.log(letters)

var currentWord = new requireWord (randomWord)

var tiles = getTiles()

function getTiles()
{
  tiles = [];
  for (var i = 0; i < randomWord.length; i++)
  { 
    
      tiles[i] = '_';
    
  }
  return tiles;
}

//var wordsTest = "r"

function question(){
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Guess a letter " + tiles, 
      //default: tiles,
      name: "words"
    }
  ])
  .then(function(inquirerResponse) {
    //console.log(tiles)
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (currentWord.word.indexOf(inquirerResponse.words) >= 0) {
      
      for (var i = 0; i < randomWord.length; i++)
      {
        // Replace '_' with the letter guessed by user
        if (randomWord.charAt(i) === inquirerResponse.words)
        {
          tiles[i] = inquirerResponse.words;

        }
      }

      //console.log("yay!");
     // console.log(currentWord.length)

      if (tiles.indexOf('_') < 0){
        console.log("You Win! Next Word...")
        randomWord = words[Math.floor(Math.random() * words.length)];
        currentWord = new requireWord (randomWord)
        getTiles();
        guessesRemaining = 9;

      }

      question();

      
      //getTiles();
      
      
    }
    else {
      guessesRemaining--
      console.log("Incorrect");
      console.log(guessesRemaining + "guesses remaining")
      question();

      if(guessesRemaining === 0){
        console.log("Game Over!");
        process.exit();
      }
    }
  });
}
question();

