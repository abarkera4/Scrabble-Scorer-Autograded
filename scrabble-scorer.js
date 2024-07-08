// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let wordToScore;
   
   console.log(`Let's play some scrabble! \n`);

   wordToScore = input.question("Enter a word to score: ")
   wordToScore = wordToScore.toUpperCase()

   return wordToScore
};

let vowelPointStructure = {
   1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
   3: ['A', 'E', 'I', 'O', 'U'],
};

let newPointStructure = transform(oldPointStructure)
newPointStructure[" "] = 0

let simpleScorer = function(word) { return word.length};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      for (const pointValue in vowelPointStructure) {
         if (vowelPointStructure[pointValue].includes(word[i])) {
            totalScore += Number(pointValue);
         }
      }
   }
   return totalScore
};

let scrabbleScorer = function (word) {
   word = word.toUpperCase()
   let totalScore = 0;
   for (let i = 0; i < word.length; i++) {
      totalScore += newPointStructure[word[i].toLowerCase()]
   }
   return totalScore
};

const scoringAlgorithms = [
{
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer,
},
{
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer,
},
{
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer,

},
];

function scorerPrompt(word1) {
   let scorerChoice;

   console.log(`Which scoring algorithm would you like to use? \n`)
   console.log(`0 - ${scoringAlgorithms[0].name}: ${scoringAlgorithms[0].description}`)
   console.log(`1 - ${scoringAlgorithms[1].name}: ${scoringAlgorithms[1].description}`)
   console.log(`2 - ${scoringAlgorithms[2].name}: ${scoringAlgorithms[2].description}`)
   while (scorerChoice < 0 || scorerChoice > 2 || isNaN(scorerChoice))
   scorerChoice = input.question("Enter 0, 1, or 2: ")

   console.log(`Score for ${word1} : `, scoringAlgorithms[scorerChoice].scorerFunction(word1))

   return
}

function transform(oldPointStructure) {

   let newPointStructure = {};

   for (const pointValue in oldPointStructure) {
      oldPointStructure[pointValue].forEach(letter => {
         newPointStructure[letter.toLowerCase()] = Number(pointValue)
      })
   }
   return newPointStructure
};

function runProgram() {
   scorerPrompt(initialPrompt())
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};