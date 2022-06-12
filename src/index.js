import "./style/style.css";

const playNow = document.getElementById('play-now');
const main = document.getElementById('main');
const scores = [];
let questionCount = 0;
let score = 0;
const SAVED_EVENT = 'saved-scores';
const STORAGE_KEY = 'QUIZ_APPS';

const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung local storage');
      return false;
    }
    return true;
  }

const saveData = () => {
    if (isStorageExist()) {
      const parsed = JSON.stringify(scores);
      localStorage.setItem(STORAGE_KEY, parsed);
      document.dispatchEvent(new Event(SAVED_EVENT));
    }
  }

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const score of data) {
        scores.push(score);
      }
    }
   

  }


const generateQuestion = () => {
    fetch('https://the-trivia-api.com/api/questions?limit=10')
.then(res => {
    return res.json()
})
.then(data => {
    console.log(data);
        const questionContainer = document.createElement('div');
        questionContainer.setAttribute('id', 'questionContainer');
        main.append(questionContainer);
        playNow.remove();
        questions(data);
        answers(data,data);
    }
  );
};


//Mungkin bisa dibikin file baru khusus buat fungsi question
const questions = (questionPar) => {
    const question = document.createElement('p');
    const questionContainer = document.getElementById('questionContainer');
    question.innerText = `${questionPar[questionCount].question}`;
    questionContainer.append(question);
};

//Mungkin bisa dibikin file baru khusus buat fungsi answer
const answers = (answer,question) => {
    let answerRandomizer;
    answerRandomizer = Math.floor((Math.random() * 4) + 1);
    const optionA = document.createElement('p');
    optionA.setAttribute('class', "option");
    const optionB = document.createElement('p');
    optionB.setAttribute('class', "option");
    const optionC = document.createElement('p');
    optionC.setAttribute('class', "option");
    const optionD = document.createElement('p');
    optionD.setAttribute('class', "option");
    if(answerRandomizer == 1){
     optionA.innerText = `A. ${answer[questionCount].correctAnswer}(correct answer)`;
     optionA.setAttribute('id', "correct-answer");
     optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[0]}`;
     optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[1]}`;
     optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
    }
    else if(answerRandomizer == 2){
     optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
     optionB.innerText = `B. ${answer[questionCount].correctAnswer}(correct answer)`;
     optionB.setAttribute('id', "correct-answer");
     optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[1]}`;
     optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
    }
    else if(answerRandomizer == 3){
     optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
     optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[1]}`;
     optionC.innerText = `C. ${answer[questionCount].correctAnswer}(correct answer)`;
     optionC.setAttribute('id', "correct-answer");
     optionD.innerText = `D. ${answer[questionCount].incorrectAnswers[2]}`;
    }
    else{
     optionA.innerText = `A. ${answer[questionCount].incorrectAnswers[0]}`;
     optionB.innerText = `B. ${answer[questionCount].incorrectAnswers[1]}`;
     optionC.innerText = `C. ${answer[questionCount].incorrectAnswers[2]}`;
     optionD.innerText = `D. ${answer[questionCount].correctAnswer}(correct answer)`;
     optionD.setAttribute('id', "correct-answer");
    }
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.append(optionA);
    questionContainer.append(optionB);
    questionContainer.append(optionC);
    questionContainer.append(optionD);

    const correctOption = document.getElementById("correct-answer");
    correctOption.addEventListener('click', () => {
        score+=10;
    })    

    const options = document.querySelectorAll('.option');
    for (const option of options) {
        option.addEventListener('click', () => {
            nextQuestion(question)
        })
    }
};

const nextQuestion = (data) => {
    const questionContainer = document.getElementById('questionContainer');
    if(questionCount < 9){
    questionCount++;
    questionContainer.innerHTML = '';
    questions(data);
    answers(data,data); 
    }
    else{ 
        console.log('no more question');
        questionContainer.innerHTML = '';
        questionContainer.innerHTML = `<p>Your final score is ${score}</p>`;
        console.log(score);
        if(scores.length < 5){
            scores.push(score);
        }
        else{
            scores.splice(0,1);
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
        })
    }
    
    
};





document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
  });
  
document.addEventListener('DOMContentLoaded', function () {
   if (isStorageExist()) {
     loadDataFromStorage();
   }
   if(main.firstElementChild.id == 'scoreContainer'){
     const scoreContainer = document.getElementById('scoreContainer');
     for (const score of scores) {
       const scoreElement = document.createElement('p');
       scoreElement.innerText = score;
       scoreContainer.append(scoreElement);
     };
   };
 });

//Drawer Script
const hamburgerButtonElement = document.querySelector("#menu");
const drawerElement = document.querySelector("#drawer");

hamburgerButtonElement.addEventListener("click", event => {
    drawerElement.classList.toggle("open");
    event.stopPropagation();
   });
   
playNow.addEventListener('click', () => {
    generateQuestion();
});
