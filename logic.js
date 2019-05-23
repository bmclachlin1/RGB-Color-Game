//*******************************************************************
// Game Logic for RGB guessing game
//*******************************************************************
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset")
var modeButtons = document.querySelectorAll(".mode");

init();

resetButton.addEventListener("click", function(){
    reset();
});

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        })
    }
}

function setUpSquares(){
    for(var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset(){
    //Change button text back to New Colors
    resetButton.textContent = "New Colors";
    //generate all new colors
    colors = generateColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color
    colorDisplay.textContent = pickedColor;
    //change message to empty string
    messageDisplay.textContent = "";
    //change colors of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
        
    }
    h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
    //loop through all squares
    //change each color to match given color
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateColors(numColors){
    //make an array
    var arr = [];
    //add num random colors to array
    for(var i = 0; i < numColors; i++) {
        //get random color and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

//helper function for generateColors
function randomColor(){
    //pick a "red" from 0-255
    var red = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    var green = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}