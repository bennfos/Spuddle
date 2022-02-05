//The html that won't change game to game

const createAnswerGrid = () => {
  let html = '';
  for (var i = 0; i < 5; i++) {
    html += `<div id="A${i}" class="d-flex flex-row justify-content-center">`;
    for (var j = 0; j < 6; j++) {
      html += `<button id="A${i}L${j}" class="box answer-box border border-secondary rounded">
                <div class="letter-tile">
                  <p class="letter"></p>
                  <p class="score"></p>
                </div>
              </button>`;
    }
    html += '</div>';
  }
  return html;
}

const createLetterBank = () => {
  let html = '';
  for (var i = 0; i < 6; i++) {
    html += `<button id='L${i}' class='box letter-box border border-secondary rounded'>
              <div class="letter-tile">
                <p class="letter"></p>
                <p class="score"></p>
              </div>
            </button>`;
  }
  return html;
}

const createButtons = () => {
  return `
          <button id="shuffle-btn" class="btn btn-secondary">
            <i class="bi bi-shuffle"></i>
          </button>
          <button id="enter-btn" class="btn btn-custom">
            ENTER
          </button>
          <button id="undo-btn" class="btn btn-secondary">
            <i class="bi bi-arrow-counterclockwise"></i>
          </button>
        `;
}