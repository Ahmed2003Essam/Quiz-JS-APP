/*Start Loader*/
setTimeout(function(){
    $('.pre-loader').fadeToggle();
}, 1500);

/*End Loader*/







/*Start question js */
// Array of objects

const quiz = [
    {
        q:'Which month comes right before June ?',
        options:['May','September','July','August'],
        answer:0
    },

    {
        q:'What color is a banana ?',
        options:['Red','Yellow','White','Blue'],
        answer:1
    },

    {
        q:'3 + 4 = 7 ?',
        options:['True','False'],
        answer:0
    },

    {
        q:'What time of the day do we have breakfast ?',
        options:['In the afternoon','In the evening','In the morning'],
        answer:2
    },
    
    {
        q:'What is 22 + 6 ?',
        options:['99','56','16','28'],
        answer:3
    },

    {
        q:'How many squares are there in the following figure?',
        options:['35','30','40','50'],
        answer:2,
        img:'images/square.jpg'
    },

    {
        q:'Count the trinagles in the image below.',
        options:['7','9','12','13'],
        answer:3,
        img:'images/triangle.jpg'
    },
]
/*End Question Js*/

//Start application js

const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.cohices');
const answerIndicatorContainer = document.querySelector('.all-circle');
const homeBox = document.querySelector(".home-page");
const quizBox = document.querySelector(".quiz-choices-page");
const resultBox = document.querySelector(".reuslts-page");
const questionLimit = 5; // The number of questions that will be displayed in each quiz  

let questionCounter = 0;
let currentQuestion;
let avaliableQuestions = [];
let avaliableOptions = [];

let correctAnswers = 0;
let attempt = 0;


//Push the questions into the avaliable Questions Array 
function setAvaliableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        avaliableQuestions.push(quiz[i])
    }
    
}

//set the question number and question and options 
function getNewQuestion(){
   
    //set the question number 
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;
    
    //set the question text
    //random question
    const questionIndex = avaliableQuestions[Math.floor(Math.random() * avaliableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    //get the position of questionIndex from the avaliableQuestions array
    const index1 = avaliableQuestions.indexOf(questionIndex);
    //remove questionIndex from the avaliableQuestions array, so that the question came one time only 
    avaliableQuestions.splice(index1,1);
    
    // show question image if 'img' property exits

    if(currentQuestion.hasOwnProperty("img")){
      
        const img = document.createElement("img");

        img.src = currentQuestion.img;

        questionText.appendChild(img);
    }

    //set the options (choices)

    // get the length of options 

    const optionLen = currentQuestion.options.length;
    
    //push options (choices) into avaliableOptions Array

    for(let i = 0; i<optionLen; i++){
        avaliableOptions.push(i)
    }

    // to empty the optioncontainer so that every question appears wioth its choices only
    optionContainer.innerHTML = '';
    let animationDelay = 0.1; 
    // put the options in the web page 

    for(let i = 0; i<optionLen; i++){
        // random option 
        const optonIndex = avaliableOptions[Math.floor(Math.random() * avaliableOptions.length)]
        // get the position of optonIndex from the avaliableOtions
        const index2 = avaliableOptions.indexOf(optonIndex);
        // remove the optonIndex from the avaliable options, so that every question has its own choices only 
        avaliableOptions.splice(index2, 1)
        // create the options div in the html page 
        const option = document.createElement("div");
        // put the option div in th html page 
        option. innerHTML = currentQuestion.options[optonIndex];
        // give every option an id
        option.id = optonIndex;
        
        // the bottom two line purpose is for putting the animation for option (chocice)
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.1;

        // give all options class name of option
        option.className = "option";
        // make the container in html page conatin all of the options
        optionContainer.appendChild(option)

        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}

// get the result function for the attenmpt question 
function getResult(element){
    const id = parseInt(element.id);
   
    //get the answer by comparing the id of clicked option
    if(id === currentQuestion.answer ){
        // to add the correct class to the right choice 
        element.classList.add("correct");

        // to green the answer indicator which the the circle 

        updateAnswerIndicator("correct");

        correctAnswers++;
        console.log(correctAnswers);
    }
    else{
        // to add the false class to the false choice 
        element.classList.add("false");

        // to add the red color to the indicator 
        updateAnswerIndicator("false");
        
        // if the selected option is false so show the user the right choice
        const optionLen = optionContainer.children.length;
        
        for(let i = 0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct")
            }
        }
    }
    attempt++;
    UnclickableOptions();
}
// make all options unclickable after the use choose one option (choice)
function  UnclickableOptions(){
    const optionLen = optionContainer.children.length;

    for(let i = 0; i < optionLen; i++){

        optionContainer.children[i].classList.add("already-answered");
    }
}

// to create the indicator of the answers whether they are right or wrong 
function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    
    for(let i = 0; i < totalQuestion; i++){

        const indicator = document.createElement("div");

        indicator.classList.add("circle-indicator");

        answerIndicatorContainer.appendChild(indicator);
      

    }
}

function  updateAnswerIndicator(markType){

    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType); 
}



// to do the next button to work properply 
function next(){
    if(questionCounter === questionLimit){
        
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
   // hide  quiz quizBox after ending the test
   quizBox.classList.add("hide");
   //Show the result Box 
   resultBox.classList.remove("hide");
   //to show the quizResult 
   quizResult();
}

// to show the quiz result 
function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML = questionLimit;
    resultBox.querySelector(".total-attempts").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percenatge = (correctAnswers/ questionLimit) *100;
    resultBox.querySelector(".total-percenatge").innerHTML = percenatge.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + questionLimit;
}


function resetQuiz(){
     questionCounter = 0;
     correctAnswers = 0;
     attempt = 0;
     avaliableQuestions = [];
}


// this function for the try again quiz button 
function tryAgainQuiz(){

    // to hide the resultBox 
    resultBox.classList.add("hide");
    
    // to the quiz again
    quizBox.classList.remove("hide");

    resetQuiz();
    startQuiz()
}

//To activate the Go to home button 

function goToHome(){
    // hide the result Box
    resultBox.classList.add("hide");

    // Show home box 
    homeBox.classList.remove("hide");
    resetQuiz();
}


/// the Starting Point for the quiz 
function startQuiz(){

    // hide the home box 
    homeBox.classList.add("hide");
    
    //Show the quiz box
    quizBox.classList.remove("hide");

    //first we will set all questions in avaliableQuestions array
    setAvaliableQuestions();

    //Second we will call getNewQuestion function
    getNewQuestion();

    // to create the indicator of the answers 
    answerIndicator();
}
window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = questionLimit;
}
//End Application js