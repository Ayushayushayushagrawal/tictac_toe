console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    let hasWon = false;
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true;
            hasWon = true;
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.display = "block"; // Add this line before setting transform
            document.querySelector(".line").style.transform = `translate(${e[3]-5}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").classList.add("laser-line");
            document.querySelector(".line").style.width = "30vw";
            music.play();
        }
    })
    return hasWon;
}
const checkTie = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    return Array.from(boxtext).every(box => box.innerText !== '');
}

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
        if(boxtext.innerText === '' && !isgameover){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            let won = checkWin();
            if(!won){
                if(checkTie()) {
                    document.getElementsByClassName("info")[0].innerText = "Game Tied!";
                    isgameover = true;
                } else {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                }
            }
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.transition = "all 0.2s ease"; // Add this line for faster transition
    document.querySelector(".line").style.width = "0vw";
    document.querySelector(".line").classList.remove("laser-line");
    document.querySelector(".line").style.display = "block"; // Change from 'none' to 'block'
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
    
    music.pause(); // Add this line to stop the gameover music
})
