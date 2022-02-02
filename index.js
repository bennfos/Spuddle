let wordOftheDay = getWord();
let shuffledArray = wordOftheDay.split('');
let answerNum = 0;
let answerCharArray = [' ', ' ', ' ', ' ', ' ', ' '];
let answerWord = '';

//on document ready, render game
$(document).ready(() => {
  $('#main').html(createBaseHtml());
  //get data from local storage
  //renderAnswer();
  //event handlers
  $('#enter-btn').click(function() {
    console.log(answerCharArray);
    console.log(shuffledArray);
  })

  $('#undo-btn').click(function() {
    deselectAll();
  })

  $('#shuffle-btn').click(function() {
    shuffleWord();
  })


  $('.letter-box').click(function() {
    const id = $(this).attr('id');
    selectLetter(id);
  })

  $('.answer-box').click(function() {
    const id = $(this).attr('id');
    deselectLetter(id);
  })



  //start a new game
  newGame()
});



function newGame () {
  shuffleWord();
}

//create the html that won't change game to game
function createBaseHtml() {
  let html = '<div id="answer-grid" class="d-flex flex-column">';
  for (var i = 0; i < 5; i++) {
    html += `<div id="A${i}" class="d-flex flex-row justify-content-center">`;
    for (var j = 0; j < 6; j++) {
      html += `<button id='A${i}L${j}' class='box answer-box border border-secondary rounded'><p></p></button>`;
    }
    html += '</div>';
  }
  html += '</div><div id="letter-bank" class="d-flex flex-row justify-content-center">';
  for (var i = 0; i < 6; i++) {
    html += `<button id='L${i}' class='box letter-box border border-secondary rounded'>
              <p></p>
            </button>`;
  }
  html += `</div><div class="d-flex flex-row justify-content-center">
            <button id="shuffle-btn" class="btn btn-secondary">
              <i class="bi bi-shuffle"></i>
            </button>
            <button id="enter-btn" class="btn btn-custom">
              ENTER
            </button>
            <button id="undo-btn" class="btn btn-secondary">
              <i class="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>`;
  return html;
}

//get word for game
function getWord() {
  //call to api
  //fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=YOURAPIKEY')
  //.then(response => response.json())
  //.then(data => console.log(data));

  return "SURGES";
}

//put letter into box when user selects it
function selectLetter(letterId) {
  //1. determine which answer box this letter goes in using answerNumber and the answerCharArray;
  const blankSpaceIndex = answerCharArray.indexOf(' ');
  const letter = $(`#${letterId} > p`).text();
  const letterIndex = letterId.split('')[1];
  //2. add the letter to the first blank space in the answer box
  answerCharArray[blankSpaceIndex] = letter;
  $(`#A${answerNum}L${blankSpaceIndex} > p`).text(letter)
  $(`#A${answerNum}L${blankSpaceIndex}`).css('background-color', '#efeef1')
  //3. blankify the letter from the letter-bank array and rerender
  shuffledArray[letterIndex] = ' ';
  $(`#${letterId} > p`).text('');
  //4. disable blank letter button
  $(`#${letterId}`).attr('disabled', true);
  $(`#${letterId}`).css('background-color', '#fff');
}

//put letter back when user de-selects it
function deselectLetter(answerLetterId) {
  //1. determine which letter box this letter goes in using shuffleArray;
  const blankSpaceIndex = shuffledArray.indexOf(' ');
  const letter = $(`#${answerLetterId} > p`).text();
  const answerLetterIndex = answerLetterId.split('')[3];
  //2. add the letter by id to that letter box and array
  shuffledArray[blankSpaceIndex] = letter;
  $(`#L${blankSpaceIndex} > p`).text(letter)
  $(`#L${blankSpaceIndex}`).css('background-color', '#efeef1')
  //3. blankify the letter from the answerCharArray and rerender
  answerCharArray[answerLetterIndex] = ' ';
  $(`#${answerLetterId} > p`).text('');
  $(`#${answerLetterId}`).css('background-color', '#fff');
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
  if (!shuffledArray.includes(' '))
  {
    for (i = 0; i < 6; i++) {
      $(`#L${i} > p`).text(shuffledArray[i]);
    }
  } else {
    const numberOfBlanks = shuffledArray.filter(x => x === ' ').length;
    for (i = 0; i < numberOfBlanks; i++)
    {
      shuffledArray.push(shuffledArray.splice(shuffledArray.indexOf(' '), 1)[0])
    }
    for (i = 0; i < 6; i++) {
      $(`#L${i} > p`).text(shuffledArray[i]);

      if (i < 6 - numberOfBlanks) {
        $(`#L${i}`).attr('disabled', false);
        $(`#L${i}`).css('background-color', '#efeef1');
      } else {
        $(`#L${i}`).attr('disabled', true);
        $(`#L${i}`).css('background-color', '#fff');
      }
    }
  }
}

//upon entering, reach out to API to see if word is in dicitonary (doesn't matter if it was the original word that was scrambled)
function checkAnswer() {


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