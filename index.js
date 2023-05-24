var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];


var start = false;
var level = 0;


// Keypress to start game

$(document).keypress(function(){
  if(!start){
      $("#level-title").text("level " + level);
      nextSequence();
      start = true;
  }
  
})

// Sound


function playSound(name){
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}


// Game

function nextSequence(){

    userClickedPattern = [];
    level ++; 
    $("#level-title").text("level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   

}

// User 


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1)
})


// Sound


function playSound(name){
    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();
}


// Animation 



function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");
  },100);
}





// Compare Answers


function checkAnswer(currentIndex){
  if(gamePattern[currentIndex] === userClickedPattern[currentIndex]){
    console.log("success");

    if(gamePattern.length === userClickedPattern.length){

   
    setTimeout(function(){
        nextSequence()},1000)
    } 
  } else {
    console.log("wrong")
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over")
    },200)
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


// Wrong Answer

function startOver(){
level = 0;
gamePattern = [];
start = false;
}