var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

var started=false;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }

});



function nextSequence() {
  userClickedPattern=[];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.random()*4
  randomNumber = Math.floor(randomNumber)
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
     console.log("success");

       if (userClickedPattern.length == gamePattern.length){
         setTimeout(function () {
           nextSequence();
         }, 1000);

       }
   }
   else{
     console.log("wrong");

     var audio = new Audio("sounds/wrong.mp3");
     audio.play();

     $("body").addClass("game-over");
     setTimeout(function () {
       $("body").removeClass("game-over");
     }, 200);

     $("#level-title").text("Game Over, Press Any Key to Restart");

     startOver();
   }
}

function startOver(){
  started=false;
  level=0;
  gamePattern=[];
}


function animatePress(currentColour) {
  // $("."+ currentColour).addClass("pressed").delay(100).removeClass("pressed");
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name){
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}
