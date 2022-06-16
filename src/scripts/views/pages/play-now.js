/* eslint-disable no-alert */
/* eslint-disable valid-typeof */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* import { isStorageExist, generateQuestion, questions, answers }
 from '../../functions/function'; */
let questionCount = 0;
let score = 0;
let scores = [];
const STORAGE_KEY = 'QUIZ_APPS';

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
  const questionContainer = document.getElementById('questionContainer');
  questionContainer.append(optionA);
  questionContainer.append(optionB);
  questionContainer.append(optionC);
  questionContainer.append(optionD);

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

const questions = (questionPar) => {
  const question = document.createElement('p');
  const questionContainer = document.getElementById('questionContainer');
  question.innerText = `${questionPar[questionCount].question}`;
  questionContainer.append(question);
};

const generateQuestion = () => {
  fetch('https://the-trivia-api.com/api/questions?limit=10')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const questionContainer = document.createElement('div');
      questionContainer.setAttribute('id', 'questionContainer');
      document.getElementById('main').append(questionContainer);
      if (document.getElementById('main').firstElementChild.id === 'play-now') {
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

const nextQuestion = (data) => {
  const questionContainer = document.getElementById('questionContainer');
  if (questionCount < 9) {
    questionCount += 1;
    questionContainer.innerHTML = '';
    questions(data);
    answers(data, data);
  } else {
    console.log('no more question');
    questionContainer.innerHTML = '';
    questionContainer.innerHTML = `<p>Your final score is ${score}</p>`;
    console.log(score);
    if (scores.length < 5) {
      scores.push(score);
    } else {
      scores.splice(0, 1);
      scores.push(score);
    }
    saveData();
    score = 0;
    questionCount = 0;
    console.log(scores);
    const playAgain = document.createElement('p');
    playAgain.innerText = 'Play again';
    questionContainer.append(playAgain);
    playAgain.addEventListener('click', () => {
      questionContainer.innerHTML = '';
      questionContainer.remove();
      generateQuestion();
    });
  }
};

const PlayNow = {
  async render() {
    return `
    <button id="play-now" tabindex="0">Play now</button>
    `;
  },

  async afterRender() {
    /* const hello = 'hellow'; */
    /* let questionCount = 0; */
    /* let score = 0; */
    isStorageExist();
    scores = [];
    loadDataFromStorage();
    const playNow = document.getElementById('play-now');
    playNow.addEventListener('click', () => {
      /* alert(hello); */
      generateQuestion();
    });
  },
};

export default PlayNow;
