const firebaseConfig = {
  apiKey: "AIzaSyBuDElM7Szet23DkCTBUo54P2iaNNLUX1w",
  authDomain: "quizz-app-b9de6.firebaseapp.com",
  projectId: "quizz-app-b9de6",
  storageBucket: "quizz-app-b9de6.firebasestorage.app",
  messagingSenderId: "182468573574",
  appId: "1:182468573574:web:6321a4c7361b6cd2e19407"
};


const frb = firebase.initializeApp(firebaseConfig);

// console.log(frb);



// function signup(){
//   // var name = document.getElementById("name");
//   var email = document.getElementById("email");
//   var password = document.getElementById("pass");

//   firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     console.log(user);
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorMessage);
//   });
// }

// function Login() {
//   var email = document.getElementById("emaillogin");
//   var password = document.getElementById("passlogin");

//   firebase.auth().signInWithEmailAndPassword(email.value, password.value)
//   .then((userCredential) => {
//     var user = userCredential.user;
//     console.log(user);
    
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorMessage);
    
//   });
// }



// var questions = [
//     {
//       question: "HTML Stands for",
//       option1: "Hyper Text Markup Language",
//       option2: "Hyper Tech Markup Language",
//       option3: "Hyper Touch Markup Language",
//       option4: "Hyber Text Markup Language",
//       corrAnswer: "Hyper Text Markup Language",
//     },
//     {
//       question: "CSS Stands for",
//       option1: "Cascoding Style Sheets",
//       option2: "Cascading Style Sheets",
//       option3: "Cascating Style Sheets",
//       option4: "Cases Style Sheets",
//       corrAnswer: "Cascading Style Sheets",
//     },
//     {
//       question: "Which tag is used for most large heading",
//       option1: "<h6>",
//       option2: "<h2>",
//       option3: "<h1>",
//       option4: "<h7>",
//       corrAnswer: "<h1>",
//     },
//     {
//       question: "Which tag is used to make element unique ",
//       option1: "id",
//       option2: "class",
//       option3: "label",
//       option4: "Name",
//       corrAnswer: "id",
//     },
//     {
//       question: "Any element assigned with id, can be get in css ",
//       option1: "by # tag",
//       option2: "by @ tag",
//       option3: "by & tag",
//       option4: "by $ tag",
//       corrAnswer: "by # tag",
//     },
//   ];


// var ques = document.getElementById("ques");
//  var opt1 = document.getElementById("opt1");
//  var opt2 = document.getElementById("opt2");
//  var opt3 = document.getElementById("opt3");
//  var btn = document.getElementById("btn");
//  var timer = document.getElementById("timer")
//  var index = 0;
//  var score = 0;
//  var min = 1;
//  var sec = 29;

//  setInterval(function () {
//     timer.innerHTML = `${min}:${sec}`;
//     sec--;
//     if (sec == 0){
//         min--;
//         sec = 59;
//         if(min < 0){
//             min = 1;
//             sec = 59;
//             nextQuestion();
//         }
//     }
//  },1000);

//  function nextQuestion(){
//     var getOptions = document.getElementsByName("option");

//  for (var i = 0; i < getOptions.length; i++) {
//     if (getOptions[i].checked) {
//         var selectedAns = getOptions[i].value;
//         // var selectedQues = questions[index - 1].question;
//         var selectedOpt = questions[index - 1][`option${selectedAns}`];
//         var correctAns = questions[index - 1]["corrAnswer"];

//         if (selectedOpt == correctAns) {
//             score++
//             console.log(score);
//         }
//     }

//     getOptions[i].checked = false;
//  }

//  btn.disabled = true;

//  if (index > questions.length - 1){
//     swal.fire({
//      title: "Good job!",
//      text: ((score / questions.length) * 100).toFixed(2),
//      icon: "success",
//     })
//  } else {
//     ques.innerText = questions[index].question;
//     opt1.innerText = questions[index].option1;
//     opt2.innerText = questions[index].option2;
//     opt3.innerText = questions[index].option3;
//     opt4.innerText = questions[index].option4;
//     index++;
//  }
// }

// function target() {
//     btn.disabled = false;
// }





var db = firebase.database();

// Unique user ID (replace with dynamic auth later)
var userId = "user1";
var quizId = "quiz1";

// ------------------ Quiz Data ------------------
var initialQuizData = [
  {
    question: "What does HTML stand for?",
    options: ["High Tech Machine Language","Hyper Text Markup Language","Hyper Tabular Markup Language","None of these"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style System","Cascading Style Sheets","Color and Style Sheets","Computer Style Sheet"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which tag is used to include JavaScript?",
    options: ["<code>","<js>","<javascript>","<script>"],
    answer: "<script>"
  },
  {
    question: "Which company originally created JavaScript?",
    options: ["Sun Microsystems","Microsoft","Netscape","IBM"],
    answer: "Netscape"
  },
  {
    question: "Which CSS property changes the text color?",
    options: ["color","text-color","font-color","foreground"],
    answer: "color"
  },
  {
    question: "Which array method adds an element to the end?",
    options: ["shift()","pop()","push()","unshift()"],
    answer: "push()"
  },
  {
    question: "toFixed() in JavaScript is used for:",
    options: ["Rounding up to nearest integer","Formatting number of decimals","Converting number to string only","Parsing an integer"],
    answer: "Formatting number of decimals"
  },
  {
    question: "Which selector targets an id in CSS?",
    options: ["#id",".class","tag","*"],
    answer: "#id"
  }
];

// ------------------ Global Variables ------------------
var quizData = [];
var currentIndex = 0;
var score = 0;
var timer = null;
var timeLeft = 120;

var questionEl = document.querySelector(".question-box p");
var optionsEl = document.querySelector(".options-box");
var nextBtn = document.querySelector("#nextBtn");
var timerEl = document.querySelector("#quizTimer");

// ------------------ Functions ------------------

// Seed questions if not exist
function seedQuestionsToDB(callback) {
  db.ref('quizzes/' + quizId + '/questions').once('value')
    .then(function(snapshot) {
      if (!snapshot.exists()) {
        initialQuizData.forEach(function(q, idx) {
          db.ref('quizzes/' + quizId + '/questions/q' + (idx + 1)).set(q);
        });
      }
      callback();
    });
}

// Load quiz
function loadQuizFromDB(callback) {
  db.ref('quizzes/' + quizId + '/questions').once('value')
    .then(function(snapshot) {
      var data = snapshot.val();
      if (data) {
        quizData = Object.keys(data).map(function(key) {
          return { id: key, ...data[key] };
        });
      }
      callback();
    });
}

// Timer
function startTimer() {
  clearInterval(timer);
  timeLeft = 120;
  updateTimerUI();
  timer = setInterval(function() {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleNext(true);
    }
  }, 1000);
}

function updateTimerUI() {
  var minutes = Math.floor(timeLeft / 60);
  var seconds = timeLeft % 60;
  timerEl.textContent = minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

// Render question
function renderQuestion() {
  if (currentIndex >= quizData.length) {
    finishQuiz();
    return;
  }

  var item = quizData[currentIndex];
  questionEl.textContent = (currentIndex + 1) + ". " + item.question;
  optionsEl.innerHTML = "";

  item.options.forEach(function(opt, i) {
    var radioId = "opt-" + currentIndex + "-" + i;
    var wrapper = document.createElement("div");
    wrapper.className = "option-row";

    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz-option";
    radio.id = radioId;
    radio.value = opt;
    radio.addEventListener("change", function() {
      nextBtn.disabled = false;
    });

    var label = document.createElement("label");
    label.setAttribute("for", radioId);
    label.textContent = opt;

    wrapper.appendChild(radio);
    wrapper.appendChild(label);
    optionsEl.appendChild(wrapper);
  });

  nextBtn.disabled = true;
  nextBtn.textContent = (currentIndex === quizData.length - 1) ? "Finish" : "Next";
  startTimer();
}

// Save answer with question, options, selected & correct answer
function saveAnswerToDB(questionId, questionText, optionsArray, selected, correct) {
  db.ref("attempts/" + userId + "/" + quizId + "/answers/" + questionId).set({
    question: questionText,
    selectedAnswer: selected,
    correctAnswer: correct,
    timestamp: Date.now()
  }).catch(function(error) {
    console.error("Error saving answer:", error);
  });
}

// Handle next question
function handleNext(auto) {
  clearInterval(timer);
  auto = auto || false;

  var selectedInput = document.querySelector("input[name='quiz-option']:checked");
  var selectedValue = selectedInput ? selectedInput.value : null;
  var currentQ = quizData[currentIndex];

  if (selectedValue && selectedValue === currentQ.answer) {
    score++;
  }

  saveAnswerToDB(
    currentQ.id || currentIndex,
    currentQ.question,
    currentQ.options,
    selectedValue,
    currentQ.answer
  );

  currentIndex++;
  if (currentIndex < quizData.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

nextBtn.addEventListener("click", function() {
  handleNext(false);
});

// Finish quiz
function finishQuiz() {
  clearInterval(timer);
  var total = quizData.length;
  var percent = ((score / total) * 100).toFixed(1);

  Swal.fire({
    title: "Quiz Completed",
    html:
      '<div style="text-align:left">' +
      '<p><strong>Correct:</strong> ' + score + ' / ' + total + '</p>' +
      '<p><strong>Percentage:</strong> ' + percent + '%</p>' +
      '</div>',
    icon: percent >= 60 ? "success" : "info",
    confirmButtonText: "Restart Quiz",
    showCancelButton: true,
    cancelButtonText: "Close",
    confirmButtonColor: "#28a745",
    background: "#ffffff"
  }).then(function(result) {
    if (result.isConfirmed) {
      currentIndex = 0;
      score = 0;
      renderQuestion();
    }
  });
}

// ------------------ Start Quiz ------------------
window.onload = function() {
  seedQuestionsToDB(function() {
    loadQuizFromDB(function() {
      renderQuestion();
    });
  });
};
