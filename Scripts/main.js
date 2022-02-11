let wordOftheDay = '';
let shuffledArray = [];
let answerNum = 0;
let answerCharArray = [' ', ' ', ' ', ' ', ' ', ' '];
let answerWord = '';
let answerWordArray = [];
let answerScoreArray = [];
let doubleLetterBoxId = '';
let tripleLetterBoxId = '';
let totalScore = 0;

//on document ready, render game
$(document).ready(() => {
  getWord().then((data) => {
    console.log(data.word);
    wordOftheDay = data.word.toUpperCase();
    shuffledArray = wordOftheDay.split('')
  }).then(() => {
    renderAnswerGrid(createAnswerGrid())
    renderLetterBank(createLetterBank())
    renderButtons(createButtons())

    //event handlers
    $('#enter-btn').click(function() {
      checkAnswer();
    })

    $('#undo-btn').click(function() {
      deselectAll();
    })

    $('#shuffle-btn').click(function() {
      shuffleWord();
    })

    $('.letter-box').click(function() {
      const id = $(this).attr('id');
      selectLetter(`#${id}`);
    })

    $('.answer-box').click(function() {
      const id = $(this).attr('id');
      deselectLetter(`#${id}`);
    })

    //start a new game
    newGame()
  })
  //get data from local storage
});

function newGame () {
  addRandomBonuses();
  shuffleWord();
}

const addRandomBonuses = () => {
  doubleLetterBoxId = getRandomBoxId();
  tripleLetterBoxId = getRandomBoxId();
  $(doubleLetterBoxId).addClass('double-letter');
  $(tripleLetterBoxId).addClass('triple-letter');
  $(doubleLetterBoxId).children('.letter').text('DOUBLE LETTER SCORE');
  $(tripleLetterBoxId).children('.letter').text('TRIPLE LETTER SCORE');
}

//put letter into box when user selects it
function selectLetter(letterId) {
  //1. determine which answer box this letter goes in using answerNumber and the answerCharArray;
  const blankSpaceIndex = answerCharArray.indexOf(' ');
  const letter = $(`${letterId} .letter`).text();
  const score = $(`${letterId} .score`).text();
  const letterIndex = letterId.split('')[2];
  //2. add the letter to the first blank space in the answer box
  answerCharArray[blankSpaceIndex] = letter;
  var boxId = `#A${answerNum}L${blankSpaceIndex}`
  $(`${boxId} .letter`).text(letter);
  $(`${boxId} .score`).text(score);
  if (boxId == doubleLetterBoxId) {
    $(`${boxId}`).css('background-color', 'lightsteelblue');
  } else if (boxId == tripleLetterBoxId) {
    $(`${boxId}`).css('background-color', 'steelblue');
  } else {
    $(`${boxId}`).css('background-color', '#efeef1');
  }
  $(`${boxId}`).addClass('letter-placed');
  //3. blankify the letter from the letter-bank array and rerender
  shuffledArray[letterIndex] = ' ';
  $(`${letterId} p`).text('');
  //4. disable blank letter button
  $(`${letterId}`).attr('disabled', true);
  $(`${letterId}`).css('background-color', '#fff');
}

//put letter back when user de-selects it
function deselectLetter(answerLetterId) {
  //1. determine which letter box this letter goes in using shuffleArray;
  const blankSpaceIndex = shuffledArray.indexOf(' ');
  const letter = $(`${answerLetterId} .letter`).text();
  const score = $(`${answerLetterId} .score`).text();
  const answerLetterIndex = answerLetterId.split('')[4];
  //2. add the letter by id to that letter box and array
  shuffledArray[blankSpaceIndex] = letter;
  $(`#L${blankSpaceIndex} .letter`).text(letter);
  $(`#L${blankSpaceIndex} .score`).text(score);
  $(`#L${blankSpaceIndex}`).css('background-color', '#efeef1');
  //3. blankify the letter from the answerCharArray and rerender
  answerCharArray[answerLetterIndex] = ' ';
  $(`${answerLetterId} p`).text('');
  if (answerLetterId == doubleLetterBoxId) {
    $(`${answerLetterId}`).css('background-color', '#b0c4de');
    $(doubleLetterBoxId).children('.letter').text('DOUBLE LETTER SCORE');
  } else if (answerLetterId == tripleLetterBoxId) {
    $(`${answerLetterId}`).css('background-color', '#4682b4');
    $(tripleLetterBoxId).children('.letter').text('TRIPLE LETTER SCORE');
  } else {
    $(`${answerLetterId}`).css('background-color', '#fff');
  }
  $(`${answerLetterId}`).removeClass('letter-placed');
  //4. re-enable letter button
  $(`#L${blankSpaceIndex}`).attr('disabled', false);
}

function deselectAll() {
  for (var i = 0; i < 6; i++) {
    deselectLetter(`A${answerNum}L${i}`);
  }
}

function shuffleWord() {
  shuffledArray = shuffledArray.join('').shuffle();
  if (shuffledArray.includes(' ')) {
    const numberOfBlanks = shuffledArray.filter(x => x === ' ').length;
    for (i = 0; i < numberOfBlanks; i++) {
      shuffledArray.push(shuffledArray.splice(shuffledArray.indexOf(' '), 1)[0])
    }
    for (i = 0; i < 6; i++) {
      $(`#L${i} .letter`).text(shuffledArray[i])
      if ($(`#L${i} .letter`).text() != ' ') {
        makeTile(i);
      } else {
        makeBlank(i);
      }
    }
  } else {
    $('.letter-box').attr('disabled', false);
    $('.letter-box').css('background-color', '#efeef1');
    for (i = 0; i < 6; i++) {
      $(`#L${i} .letter`).text(shuffledArray[i]);
      $(`#L${i} .score`).text(getScore(shuffledArray[i]));
    }
  }
}

const makeTile = (i) => {
  $(`#L${i}`).attr('disabled', false);
  $(`#L${i}`).css('background-color', '#efeef1');
  $(`#L${i} .score`).text(getScore(shuffledArray[i]));
}

const makeBlank = (i) => {
  $(`#L${i}`).attr('disabled', true);
  $(`#L${i}`).css('background-color', '#fff');
  $(`#L${i} .score`).text('');
}

const makeSuccessfulWord = () => {
  $(`#A${answerNum} .letter-placed`).css('background-color', '')
  $(`#A${answerNum} .letter-placed`).addClass('btn-custom')
}

const makeFailureWord = () => {
  $(`#A${answerNum} .letter-placed`).css('background-color', '')
  $(`#A${answerNum} .letter-placed`).addClass('btn-failure')
}

//upon entering, reach out to API to see if word is in dicitonary (doesn't matter if it was the original word that was scrambled)
function checkAnswer() {
  const word = answerCharArray.join('').trim().toLowerCase();
  if (answerWordArray.includes(word)) {
    alert("You already tried this word!")
  } else if (answerCharArray[0] == ' ') {
    alert("Enter a valid word at the front of the answer!")
  } else {
    getWordData(word).then(data => {
      if (data.length > 0) {
        answerScore = 0;
        answerCharArray.filter(char => char != ' ').forEach(letter => {
          var score = getScore(letter)
          answerScore += score;
        })
        totalScore += answerScore;
        answerScoreArray.push(answerScore);
        makeSuccessfulWord();
      }
      else {
        makeFailureWord();
      }
      $(`#A${answerNum} .answer-box`).attr('disabled', true);
      answerWordArray.push(word);
      if (answerWordArray.length < 5)
      {
        answerNum++;
        shuffledArray = wordOftheDay.shuffle();
        shuffleWord();
        answerCharArray = [' ', ' ', ' ', ' ', ' ', ' '];
      } else {
        endGame();
      }
    })
  }
}

const endGame = () => {
  $('#today-score').text(totalScore);
  $('#statsModal').modal('show');
}


//helpers
const getRandomBoxId = () => {
  const aNum = Math.floor(Math.random() * 5)
  const lNum = Math.floor(Math.random() * 6)
  return `#A${aNum}L${lNum}`
}

String.prototype.shuffle = function () {
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a;
};

Array.prototype.move = function (from, to) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};

