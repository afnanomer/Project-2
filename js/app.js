/*
* Create a list that holds all of your cards
*/
let cardClassesList = [
    'fa-diamon',
    'fa-diamon',
    'fa-paper-plane-o',
    'fa-paper-plane-o',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-anchor',
    'fa-anchor',
    'fa-leaf',
    'fa-leaf',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bomb',
    'fa-bomb',
]

// Display the cards on the page
//let cardElements = [...cardElements];

let openCards = []; //empty array where values of open cards are pushed to compare
let matches = [];

//////////////////// addd code
var test;
var second = 0;
var minute = 0;
var interval1;
var starflag = false;   
let starElements = document.getElementsByClassName("stars")[0].children;          
let starElements_dialog = document.getElementsByClassName("stars_dialog")[0].children;   
var numOfmoves = 0;
var modal = document.getElementById("myModal");
var btn_ok = document.getElementById("btn_ok");
var btn_cancel = document.getElementById("btn_cancel");

/////   model diaglog defination
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
btn_ok.onclick = function() {
    modal.style.display = "none";
    startGame();
}

btn_cancel.onclick = function() {
  modal.style.display = "none";
}

//start timer
//start timer on first click
function startTimer(){
    var setTimeFunction = function() {
        document.getElementById("time").innerHTML=minute+" mins "+second+" secs";
        document.getElementById("mistake").innerHTML=numOfmoves;
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    }
    interval1 = setInterval(setTimeFunction,1000);
}

// open and show to display cards
var displayCard = function(element){
    element.classList.toggle('open');
    element.classList.toggle('show');
}

// close and hide to display cards
var hideCard = function(element){           //// addd code
    element.classList.remove('open');       //// addd code
    element.classList.remove('show');       //// addd code
}

// - shuffle the list of cards using the provided "shuffle" method below
// Shuffle function from http://stackoverflow.com/a/2450976
//below codes for shuffle card when starting or restart the game
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// note 1 : You have to append the items from js to the html using .appendChild(item) method after you generate them using document.createElement(element).
const deck = document.querySelector(".deck"); //start the game function, go through and shuffle all cards.
function startGame(){
    deck.innerHTML = "";
    var shuffledArray = shuffle(cardClassesList);
    for (var i= 0; i < shuffledArray.length; i++){
        let item = document.createElement("li");
        item.classList.add("card");
        item.innerHTML = `<i class="fa ${shuffledArray[i]}"></i>`;
        deck.appendChild(item);
    }
    // note 2: You have to call the open Method wich you will create to loop over the cards and add the click method and all the comparing logic will be inside it.
    open();
    /////   added code
    if(interval1 != null){
        /// initial part
        clearInterval(interval1);
        document.getElementById("time").innerHTML="0 mins 0 secs";
        starflag = false;
        second = 0;
        minute = 0;
        numOfmoves = 0;
        openCards = [];
        for(var i = 0; i < 3; i++){
            starElements[i].style.color = "black";
            starElements[i].style.opacity = 1;
        }
        document.getElementById("mistake").innerHTML=numOfmoves;
    }
};

// note 3: Here I copied your code for looping then after clicking you have to check if the openedCard is empty then its first click.
// So insert
// - loop through each card and create its HTML until full looplength covered
function open(){
    let arr = [...document.querySelectorAll(".card")];
    for(let i = 0 ; i < arr.length ; i++){
        arr[i].addEventListener('click', function(){
            if(arr[i].classList.contains("open"))
                return;
            
            displayCard(arr[i]);
            if(starflag == false){      //// addd code
                starflag = true;        //// addd code
                startTimer();           //// addd code
            }

            openCards.push(arr[i]);
            
            //// addd code
            if(openCards.length % 2 == 0 && openCards.length >= 2){     
                var length = openCards.length;
                if(!(openCards[length-1].children[0].classList[1] == openCards[length-2].children[0].classList[1])){

                    setTimeout(() => {
                    	numOfmoves++;
                        hideCard(openCards[length-1]);
                        hideCard(openCards[length-2]);
                        openCards.pop();
                        openCards.pop();
                      }, 300);
                }
            }
            setTimeout(() => {
                if(openCards.length >= 16){
                    clearInterval(interval1); 
                    // alert("congratulations !!!");
                    document.getElementById("dlg_time").innerHTML="Time is "+minute+" mins "+second+" secs";
                    document.getElementById("dlg_mistake").innerHTML="Your mistakes is "+numOfmoves;
                    modal.style.display = "block";
                    var mark = parseInt(second) + parseInt(minute) * 60;
                    if(mark > 0){
                        calculateRateView();
                    }
                }
            }, 300);
        })
    }
};

/// add code
function calculateRateView(){
    for(var i = 0; i < 3; i++){
        starElements[i].style.color = "red";
        starElements_dialog[i].style.color = "red";
    }
    if(numOfmoves > 8 && numOfmoves <= 12) {
        for(let i=0; i<3; i++) {
            starElements[i].style.color = "red";
            starElements_dialog[i].style.color = "red";
        }
    } else if(numOfmoves > 12 && numOfmoves <= 16) {
        for(let i=0; i<3; i++) {
            if(i > 1) {
                starElements[i].style.color = "black";
                starElements_dialog[i].style.color = "black";
            }
        }
    } else if(numOfmoves > 16 && numOfmoves <= 20) {
        for(let i=0; i < 5; i++) {
            if(i > 0) {
                starElements[i].style.color = "black";
                starElements_dialog[i].style.color = "black";
            }
        }
    } else{
        for(let i=0; i < 5; i++) {
            starElements[i].style.color = "black";
            starElements_dialog[i].style.color = "black";
        }
    }
}

startGame(); 

