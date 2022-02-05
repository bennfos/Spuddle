//DOM references
const answerGrid = $("#answer-grid");
const letterBank = $("#letter-bank");
const buttonsContainer = $("#button-container");

//Render methods
const renderAnswerGrid = (html) => {
  answerGrid.html(html);
}

const renderLetterBank = (html) => {
  letterBank.html(html);
}

const renderButtons = (html) => {
  buttonsContainer.html(html);
}

