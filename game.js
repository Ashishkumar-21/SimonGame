var gamePattern = [];
// var userClickedPattern = [];

var buttonColours = ["red" , "blue" , "green" , "yellow"]

var start=false;
var level = 0;
$(document).keydown(function(){
    if(start===false)
    {
        start = true;
        $("#level-title").text("Level "+level);
        nextSequence();
    }
});


function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor( Math.random() * 4 ); 
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    var n = gamePattern.length;

    // for(var i=0;i<n;i++)
    // {
        // var r = gamePattern[i];
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        animatePress(randomChosenColour);
        playSound(randomChosenColour);
        
        // for(var j =0; j<1; j++)
        // {
        //     setTimeout(function(){},10000);
        // }
    // }

    
}




$(".btn").click(function(){
    // alert("Button got clicked");
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

    // makeSound(buttonHTML);
    // buttonAnimation(buttonHTML);


});

function playSound(name)
{
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).add("pressed");
    
    setTimeout(function() {
        $("#"+currentColour).remove("pressed");
    }, 800);
}



function checkAnswer(currenLevel)
{
    if(gamePattern[currenLevel] === userClickedPattern[currenLevel])
    {
        // console.log("Success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    else{
        // console.log("wrong");
        playSound("wrong");

        $("body").add("game-over");
        setTimeout(function(){
            $("body").remove("game-over");
        },200);

        $("#level-title").text("Game Over, Press any key yo Restart");

        $(document).keydown(function(){
            startOver();
        });
    }
}

function startOver()
{
    level=0;
    gamePattern = [];
    start=false;
}