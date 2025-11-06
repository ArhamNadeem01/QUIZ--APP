const firebaseConfig = {
  apiKey: "AIzaSyBuDElM7Szet23DkCTBUo54P2iaNNLUX1w",
  authDomain: "quizz-app-b9de6.firebaseapp.com",
  projectId: "quizz-app-b9de6",
  storageBucket: "quizz-app-b9de6.firebasestorage.app",
  messagingSenderId: "182468573574",
  appId: "1:182468573574:web:6321a4c7361b6cd2e19407"
};


const frb = firebase.initializeApp(firebaseConfig);

console.log(frb);



function signup(){
  // var name = document.getElementById("name");
  var email = document.getElementById("email");
  var password = document.getElementById("pass");

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
}

function Login() {
  var email = document.getElementById("emaillogin");
  var password = document.getElementById("passlogin");

  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    var user = userCredential.user;
    console.log(user);
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    
  });
}



var questions = [
    {
      question: "HTML Stands for",
      option1: "Hyper Text Markup Language",
      option2: "Hyper Tech Markup Language",
      option3: "Hyper Touch Markup Language",
      option4: "Hyber Text Markup Language",
      corrAnswer: "Hyper Text Markup Language",
    },
    {
      question: "CSS Stands for",
      option1: "Cascoding Style Sheets",
      option2: "Cascading Style Sheets",
      option3: "Cascating Style Sheets",
      option4: "Cases Style Sheets",
      corrAnswer: "Cascading Style Sheets",
    },
    {
      question: "Which tag is used for most large heading",
      option1: "<h6>",
      option2: "<h2>",
      option3: "<h1>",
      option4: "<h7>",
      corrAnswer: "<h1>",
    },
    {
      question: "Which tag is used to make element unique ",
      option1: "id",
      option2: "class",
      option3: "label",
      option4: "Name",
      corrAnswer: "id",
    },
    {
      question: "Any element assigned with id, can be get in css ",
      option1: "by # tag",
      option2: "by @ tag",
      option3: "by & tag",
      option4: "by $ tag",
      corrAnswer: "by # tag",
    },
  ];


var ques = document.getElementById("ques");
 var opt1 = document.getElementById("opt1");
 var opt2 = document.getElementById("opt2");
 var opt3 = document.getElementById("opt3");
 var btn = document.getElementById("btn");
 var timer = document.getElementById("timer")
 var index = 0;
 var score = 0;
 var min = 1;
 var sec = 29;

 setInterval(function () {
    timer.innerHTML = `${min}:${sec}`;
    sec--;
    if (sec == 0){
        min--;
        sec = 59;
        if(min < 0){
            min = 1;
            sec = 59;
            nextQuestion();
        }
    }
 },1000);

 function nextQuestion(){
    var getOptions = document.getElementsByName("option");

 for (var i = 0; i < getOptions.length; i++) {
    if (getOptions[i].checked) {
        var selectedAns = getOptions[i].value;
        // var selectedQues = questions[index - 1].question;
        var selectedOpt = questions[index - 1][`option${selectedAns}`];
        var correctAns = questions[index - 1]["corrAnswer"];

        if (selectedOpt == correctAns) {
            score++
            console.log(score);
        }
    }

    getOptions[i].checked = false;
 }

 btn.disabled = true;

 if (index > questions.length - 1){
    swal.fire({
     title: "Good job!",
     text: ((score / questions.length) * 100).toFixed(2),
     icon: "success",
    })
 } else {
    ques.innerText = questions[index].question;
    opt1.innerText = questions[index].option1;
    opt2.innerText = questions[index].option2;
    opt3.innerText = questions[index].option3;
    opt4.innerText = questions[index].option4;
    index++;
 }
}

function target() {
    btn.disabled = false;
}