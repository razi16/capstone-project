/* eslint-disable no-alert */
/* eslint-disable valid-typeof */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
 
let apiUrl = 'https://the-trivia-api.com/api/questions?limit=10';
let questionCount = 0;
let score = 0;
let scores = [];
const STORAGE_KEY = 'QUIZ_APPS';
const playNowPageTemplate = `
<label for="difficulty" id="difficulty-label" tabindex = "0">Difficulty:</label>
<select name="difficulty" id="difficulty">
<option value="mixed">Mixed</option>
<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>
</select>

<label for="categories" id="categories-label" tabindex = "0">Categories:</label>
<select name="categories" id="categories">
<option value="mixed">Mixed</option>
<option value="arts_and_literature">Arts and Literature</option>
<option value="film_and_tv">Film and TV</option>
<option value="food_and_drink">Food and Drink</option>
<option value="general_knowledge">General Knowledge</option>
<option value="geography">Geography</option>
<option value="history">History</option>
<option value="music">Music</option>
<option value="science">Science</option>
<option value="society_and_culture">Society and Culture</option>
<option value="sport_and_leisure">Sport and Leisure</option>
</select>

  <button id="play-now" tabindex="0">Play now</button>
  `;

const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    alert('Browser kamu tidak mendukung local storage');
    return false;
  }
  return true;
};

const saveData = () => {
  if (isStorageExist()) {
    const parsed = JSON.stringify(scores);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
};

const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);

  if (data !== null) {
    for (const parsedScore of data) {
      scores.push(parsedScore);
    }
  }
};

const answers = (answer, question) => {
  const answerRandomizer = Math.floor((Math.random() * 4) + 1);
  const optionA = document.createElement('p');
  optionA.setAttribute('class', 'option');
  optionA.setAttribute('tabindex', '0');
  const optionB = document.createElement('p');
  optionB.setAttribute('class', 'option');
  optionB.setAttribute('tabindex', '0');
  const optionC = document.createElement('p');
  optionC.setAttribute('class', 'option');
  optionC.setAttribute('tabindex', '0');
  const optionD = document.createElement('p');
  optionD.setAttribute('class', 'option');
  optionD.setAttribute('tabindex', '0');
  if (answerRandomizer === 1) {
    optionA.innerText = `A. ${answer[questionCount].correctAnswer}(correct answer)`;
    optionA.setAttribute('id', 'correct-answer');
    optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[0]}`;
    optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[1]}`;
    optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
  } else if (answerRandomizer === 2) {
    optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
    optionB.innerText = `B. ${answer[questionCount].correctAnswer}(correct answer)`;
    optionB.setAttribute('id', 'correct-answer');
    optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[1]}`;
    optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
  } else if (answerRandomizer === 3) {
    optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
    optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[1]}`;
    optionC.innerText = `C. ${answer[questionCount].correctAnswer}(correct answer)`;
    optionC.setAttribute('id', 'correct-answer');
    optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
  } else {
    optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
    optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[1]}`;
    optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[2]}`;
    optionD.innerText = `D. ${answer[questionCount].correctAnswer}(correct answer)`;
    optionD.setAttribute('id', 'correct-answer');
  }
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.append(optionA);
  quizContainer.append(optionB);
  quizContainer.append(optionC);
  quizContainer.append(optionD);

  const correctOption = document.getElementById('correct-answer');
  correctOption.addEventListener('click', () => {
    score += 10;
  });

  const options = document.querySelectorAll('.option');
  for (const option of options) {
    option.addEventListener('keypress', (ev) => {
      if (ev.key === 'Enter' || ev.key === 'Spacebar') {
        ev.preventDefault();
        option.click();
      }
    });
    option.addEventListener('click', () => {
      nextQuestion(question);
    });
  }
};

const questions = (questionParameter) => {
  const question = document.createElement('p');
  const quizContainer = document.getElementById('quiz-container');
  question.innerText = `${questionParameter[questionCount].question}`;
  question.setAttribute('tabindex', '0');
  quizContainer.append(question);
};

const generateQuestion = () => {
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const quizContainer = document.createElement('section');
      quizContainer.setAttribute('id', 'quiz-container');
      document.getElementById('main').append(quizContainer);
      if (document.getElementById('main').firstElementChild.id === 'difficulty-label') {
        document.getElementById('difficulty-label').remove();
        document.getElementById('difficulty').remove();
        document.getElementById('categories-label').remove();
        document.getElementById('categories').remove();
        document.getElementById('play-now').remove();
      }

      questions(data);
      answers(data, data);
    })
    .catch(() => {
      document.getElementById('play-now').remove();
      const errorMessage = document.createElement('p');
      errorMessage.setAttribute('class', 'errorMessage');
      errorMessage.innerText = 'Oops, something wrong happened. Try to refresh this webpage to see if it fix this problem';
      document.getElementById('main').append(errorMessage);
    });
};

const quizPreparation = () => {
  isStorageExist();
  scores = [];
  loadDataFromStorage();
  const playNow = document.getElementById('play-now');
  playNow.addEventListener('click', () => {
    apiUrl = 'https://the-trivia-api.com/api/questions?limit=10';
    const difficulty = document.getElementById('difficulty');
    const categories = document.getElementById('categories');
    const difficultyValue = difficulty.options[difficulty.selectedIndex].value;
    const categoriesValue = categories.options[categories.selectedIndex].value;
    if(categoriesValue !== 'mixed'){
      apiUrl = `${apiUrl}&categories=${categoriesValue}`;
    }
    if(difficultyValue !== 'mixed'){
      apiUrl = `${apiUrl}&difficulty=${difficultyValue}`;
    }
    generateQuestion();
  });
};

const nextQuestion = (data) => {
  const quizContainer = document.getElementById('quiz-container');
  if (questionCount < 9) {
    questionCount += 1;
    quizContainer.innerHTML = '';
    questions(data);
    answers(data, data);
  } else {
    quizContainer.innerHTML = '';
    quizContainer.innerHTML = `<p tabindex="0">Your final score is</p>
                                   <p id="score" tabindex="0">${score}</p>`;
    console.log(score);
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    let currentTime = `${date}, ${time}`;
    if (scores.length < 5) {
      scores.push({'score': score, 'time': currentTime})
    } else {
      scores.splice(0, 1);
      scores.push({'score': score, 'time': currentTime})
    }
    saveData();
    score = 0;
    questionCount = 0;
    console.log(scores);
    const playAgain = document.createElement('button');
    playAgain.innerText = 'Play again';
    playAgain.setAttribute('id', 'play-again');
    playAgain.setAttribute('tabindex', '0');
    playAgain.setAttribute('style', 'cursor: pointer;');
    quizContainer.append(playAgain);
    playAgain.addEventListener('keypress', (ev) => {
      if(ev.key === 'Enter' || ev.key === 'Spacebar') {
        ev.preventDefault();
        playAgain.click();
      }
    });
    playAgain.addEventListener('click', () => {
      document.getElementById('main').innerHTML = '';
      document.getElementById('main').innerHTML = playNowPageTemplate;
      quizPreparation();
    });
  }
};

const PlayNow = {
  async render() {
    return playNowPageTemplate;
  },

  async afterRender() {
    quizPreparation();
  },
};

export default PlayNow;
