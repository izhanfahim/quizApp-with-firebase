import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase,ref ,set,onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyB9f060TP8uKQtbibCFcO5AmDcVML6TxsI",
  authDomain: "quiza-59a06.firebaseapp.com",
  databaseURL: "https://quiza-59a06-default-rtdb.firebaseio.com",
  projectId: "quiza-59a06",
  storageBucket: "quiza-59a06.appspot.com",
  messagingSenderId: "1072264782986",
  appId: "1:1072264782986:web:37b36141a0a5e227873973",
  measurementId: "G-6RJCQ7GMMQ"
};

// Initialize Firebase
var app = initializeApp(firebaseConfig);
var DATABASE = getDatabase(app);
var auth = getAuth(app)

var questionCount = document.getElementById("questionCount")
var questionText = document.getElementById("questionText")
var options = document.getElementById("options")
var page= document.getElementById("page")
var questionIndex = 0
var score = 0
var flag =false

// var questionData = [
//     //QUESTIONS ARRAY
//     {
//       question: "What is the Full Form Of HTML",
//       option: [
//         "HyperText Makeup Language",
//         "HyperText Markup Language",
//         "HyperText Markup Lame",
//         "HyperTate Markup Language",
//       ],
//       correctAnswer: "HyperText Markup Language",
//     },
//     {
//       question: "What does CSS stands for?",
//       correctAnswer: "Cascading Style Sheet",
//       option: [
//         "Common Style Sheet",
//         "Colorful Style Sheet",
//         "Computer Style Sheet",
//         "Cascading Style Sheet",
//       ],
//     },
//     {
//       question: "What does PHP stands for?",
//       correctAnswer: "Hypertext Preprocessor",
//       option: [
//         "Hypertext Preprocessor",
//         "Hypertext Programming",
//         "Hypertext Preprogramming",
//         "Hometext Preprocessor",
//       ],
//     },
//     {
//       question: "What does SQL stands for?",
//       correctAnswer: "Structured Query Language",
//       option: [
//         "Stylish Question Language",
//         "Stylesheet Query Language",
//         "Statement Question Language",
//         "Structured Query Language",
//       ],
//     },
//     {
//       question: "What year was JavaScript launched?",
//       correctAnswer: "1995",
//       option: ["1996", "1995", "1994", "None of the Above"],
//     },
//   ];

//   console.log(questionData)

var username = prompt("enter your username")
var email = prompt("enter your email")
var password = prompt("enter your password")

createUserWithEmailAndPassword(auth, email, password) .then(function(success){

    var questionData = []

function getDataFromDatabase () {
    var reference = ref(DATABASE ,"questiondata/")

    onChildAdded(reference , function(data){
        // console.log(data.val())
        render(data.val())

    })
}

window.onload = getDataFromDatabase() 


function render(data){
    if(data){
        questionData.push(data)
        console.log(questionData)

    }

    if(questionIndex < questionData.length){
            
        questionText.innerHTML = questionData[questionIndex].question
        questionCount.innerHTML = `Question Count ${questionIndex+1} / ${questionData.length}`
        options.innerHTML=""

        for(var i=0 ; i<questionData[questionIndex].option.length ; i++){
            options.innerHTML += `<div class="col-md-6">
            <button class="rounded my-2 p-2 w-100 shadow btn"  onclick="checkAns('${questionData[questionIndex].option[i]}' , '${questionData[questionIndex].correctAnswer}')"> ${questionData[questionIndex].option[i]} </button>
        </div>`
        }   
    }


}

render()


window.nextQuestion= function(){
    questionIndex ++
    render()
    // console.log(questionIndex)
    if(flag == true){
        score++
        // console.log(score)
    }
}

window.checkAns = function(userSelectedAns , correctAns){

    if(userSelectedAns === correctAns){
        flag = true 
        console.log("correct")

    }
    else{
        flag= false 
        console.log("wrong")
    }

    console.log("score===>",score)
    nextQuestion() 
}

window.submitQuiz =function (){
    page.innerHTML = `<div class="container"> <h2> Result </h2> </div>
    <div class="container"> <h4 class="p-2"> your score : ${score} </h4> </div>
    <div class="container"> <h4 class="p-2"> total score : ${questionData.length} </h4> </div>`

    var refer = ref(DATABASE, `Results/${username}`)
    set(refer,`scores ${score}`)
}
}) .catch(function(error){
    console.log(error.code);
})

