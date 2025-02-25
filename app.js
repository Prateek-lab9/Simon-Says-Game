let body = document.querySelector("body")
let level = document.querySelector("h3")
//To select all boxes
let selectedBoxes = document.querySelectorAll(".box")
let btn = document.querySelector(".help")
let main = document.querySelector(".main")

let start = false;
let memArr = []
let myArr = []
let levelNum = 0
let num = 0
let click = 0
let score = 0


//Starting the game
body.addEventListener("keydown", () => {
    if (start == false) {
        start = true;
        selectBox();
    }
});

//selected box by computer
function selectBox() {
    level.innerText = `Level ${levelNum}`;
    levelNum++;

    let randValue = Math.floor(Math.random() * 4);
    memArr.push(selectedBoxes[randValue].id);
    flash(randValue);

}
//Flashing that box
function flash(randValue) {
    selectedBoxes[randValue].classList.add("boxFlash")
    setTimeout(() => {
        selectedBoxes[randValue].classList.remove("boxFlash")
    }, 250);

}


//Taking user input in form of click
main.addEventListener("click", (e) => {
    if (start) {
        if (e.target.className == "box") {
            click++;
            console.log(click);
            myArr.push(e.target.id);
            check();
            userClick(e.target);
        }
    }
});

//checking if it is a correct click or not
function check() {
    if (myArr[click - 1] != memArr[click - 1]) {
        //Lost Game
        level.innerText = `You lost the game and your score is ${score}`;
        start = false;
        myArr = [];
        memArr = [];
        click = 0;
        score = 0;
        num = 0;
        levelNum = 1;
    }
    else {
        //If the click was correct
        num++;
    }
    //Checking if 1 round is complete then boost score
    //If round is not complete then again go for click
    if (num == memArr.length && num != 0) {
        score += 10;
        myArr = []
        click = 0;
        num = 0;
        setTimeout(selectBox, 300);
    }
}

//To add a shadow effect of clicking while playing
function userClick(box) {
    box.classList.add("myClick");
    setTimeout(() => {
        box.classList.remove("myClick");
    }, 200)
}

//Help button functionality
btn.addEventListener("click", () => {
    if(start){
    let init = level.innerText;
     level.innerText = `The correct order is ${memArr.join(" ")}`
    setTimeout(() => {
        level.innerText=init;
    }, 1500);}
    else{
         let init = level.innerText;
     level.innerText = `Please first start the game`;
     setTimeout(() => {
        level.innerText=init;
    }, 1500);}
    }
    
)

