//get word for game
const getWord = () => {
  //call to api
  //fetch('https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=500&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=YOURAPIKEY')
  //.then(response => response.json())
  //.then(data => console.log(data));

  return "bakers".toUpperCase();
}

const getScore = (letter) =>{
  return scores[letter];
}

const getWordData = (word) => {
  return fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&useCanonical=false&includeTags=false&api_key=YOURAPIKEY`)
  .then(response => response.json());
}

const isAWord = (word) => {
  //const data = getWordData(word).then(r => {
    //if (r.word) return true
    //else return false
  //})
  if (word) return false
  else return false;
}

const scores = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
}
