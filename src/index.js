import "./style/style.css";

//var a;
const playNow = document.getElementById('play-now');
const next = document.getElementById('next');
const main = document.getElementById('main');
let questionCount = 0;
let score = 0;

const generateQuestion = () => {
    fetch('https://the-trivia-api.com/api/questions?limit=10')
.then(res => {
    return res.json()
})
.then(data => {
    console.log(data);
    
    /* const questions = () => { */
        /* const question = document.createElement('p');
        question.innerText = `${data[questionCount].question}`;
        questionContainer.append(question); */
        const questionContainer = document.createElement('div');
        questionContainer.setAttribute('id', 'questionContainer');
        main.append(questionContainer);
        playNow.remove();
        questions(data);
        answers(data,data);
        /* next.addEventListener('click', () =>{ */
            /* questionCount++;
            questions(data);
            answers(data); */
            /* nextQuestion(data); */
        /* }); */
        /* questionCount++; */
   /*  }; */
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
        score = 0;
        questionCount = 0;
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


playNow.addEventListener('click', () => {
    generateQuestion();
});

/* next.addEventListener('click', () =>{
    questionCount++;
    questions(data);
    answers(data);
}); */


//Drawer Script
const hamburgerButtonElement = document.querySelector("#menu");
const drawerElement = document.querySelector("#drawer");

hamburgerButtonElement.addEventListener("click", event => {
    drawerElement.classList.toggle("open");
    event.stopPropagation();
   });

