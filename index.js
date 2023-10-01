var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
userClickedPattern = [];
level = 0;

$("body").on("keypress", function(){
    nextSequence();
})

$("h1").on("click", function(){
    nextSequence();
})

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            userClickedPattern = [];
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        console.log("Wrong");
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    play_animation_auto(randomChosenColour);
    playSound(randomChosenColour);

    $("h1").text("Level "+ (++level));
}

function play_animation_auto(randomChosenColour){
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(randomChosenColour)
{
    console.log(randomChosenColour);
    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    let id = "#"+currentColour;
    $(id).addClass("pressed");
    setTimeout(function(){
        $(id).removeClass("pressed");
    }, 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
