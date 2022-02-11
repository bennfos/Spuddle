//get word for game
const getWord = () => {
  //call to api
  return fetch(`https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&excludePartOfSpeech=pronoun%2Cabbreviation%2Caffix%2Cfamily-name%2Cgiven-name%2Cidiom%2Cphrasal-prefix%2Cproper-noun%2Cproper-noun-plural%2Cproper-noun-possessive%2Cconjunction%2Csuffix&minCorpusCount=800&maxCorpusCount=-1&minDictionaryCount=4&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=${api_key}`)
  .then(response => response.json())
}

const getScore = (letter) =>{
  return scores[letter];
}

const getWordData = (word) => {
  return fetch(`https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${api_key}`)
  .then(response => response.json())
};

const scores = {
  A: 1, E: 1, I: 1, O: 1, U: 1, L: 1, N: 1, S: 1, T: 1, R: 1,
  D: 2, G: 2,
  B: 3, C: 3, M: 3, P: 3,
  F: 4, H: 4, V: 4, W: 4, Y: 4,
  K: 5,
  J: 8, X: 8,
  Q: 10, Z: 10
}
