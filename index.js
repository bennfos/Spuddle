let wordOftheDay = '';
let shuffledWord = '';
let shuffledArray = '';
let answerNum = 0;
let answerCharArray = [];
let answerWord = '';

//on document ready, render game
$(document).ready(() => {
  $('#main').html(createBaseHtml());
  //get data from local storage

  //event handlers
  $('#enter-btn').click(function() {
    console.log("word: ")
  })

  $('.letter-box').click(function() {
    console.log($(this).attr('id'));
    const id = $(this).attr('id');
    selectLetter(id);
  })

  //start a new game
  newGame()
});



function newGame () {

  console.log("new game");
  wordOftheDay = getWord();
  console.log(`word of the day: ${wordOftheDay}`);
  shuffledWord = wordOftheDay.shuffle();
  console.log(`shuffled: ${shuffledWord}`);
  shuffledArray = shuffledWord.split('');
  for (i = 0; i < 6; i++) {
    $(`#L${i} > p`).text(shuffledArray[i]);
  }
}

//create the html that won't change game to game
function createBaseHtml() {
  let html = '<div id="answer-grid" class="d-flex flex-column">';
  for (var i = 0; i < 5; i++) {
    html += `<div id="A${i}" class="d-flex flex-row justify-content-center">`;
    for (var j = 0; j < 6; j++) {
      html += `<div id='A${i}L${j}' class='letter-box border border-secondary rounded'><p></p></div>`;
    }
    html += '</div>';
  }
  html += '</div><div id="letter-bank" class="d-flex flex-row justify-content-center">';
  for (var i = 0; i < 6; i++) {
    html += `<button id='L${i}' class='letter-box border border-secondary rounded'>
              <p></p>
            </button>`;
  }
  html += `</div><div id="submit" class="d-flex flex-row justify-content-center">
            <button class="btn btn-secondary">
              <i class="bi bi-shuffle"></i>
            </button>
            <button id="enter-btn" class="btn btn-custom">
              ENTER
            </button>
            <button class="btn btn-secondary">
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
function selectLetter(id) {
  //1. determine which answer box this letter goes in using answerNumber and the answerCharArray;
  const letterNum = answerCharArray.length;
  const letter = $(`#${id} > p`).text();
  //2. add the letter by id to that letter box
  $(`#A${answerNum}L${letterNum} > p`).text(letter)
  //3. delete the letter from the letter-bank array and rerender
  $(`#${id} > p`).text('');
}

//put letter back when user de-selects it
function deselectLetter() {

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
  return a.join("");
}