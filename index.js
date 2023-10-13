let playText= document.getElementById("playText");
let restartbtn= document.getElementById("restartbtn");
let boxs = Array.from(document.getElementsByClassName("box"));

let winnercolor=getComputedStyle(document.body).getPropertyValue("--winnercolor");

const x_text ="X";
const o_text ="O";

let currentPlayer = x_text;
let spaces = Array(9).fill(null);

const start = ()=>{
    boxs.forEach(box => box.addEventListener("click", boxClick));
}

function boxClick(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id]=currentPlayer;
        e.target.innerHTML=currentPlayer;

        if(playerHasWon() !== false){
            playText.innerHTML = `${currentPlayer} Won`;
            let winnercolor = playerHasWon();

            winnercolor.map(box => boxs[box].computedStyleMap.backgroundColor = winnercolor);
            return;
        }
        currentPlayer = currentPlayer == x_text? o_text:x_text;
    }
}
function playerHasWon(){
    for(const condition of winnerComb){
        let[a, b, c]=condition;

        if(spaces[a] && (spaces[a]==spaces[b] && spaces[a]== spaces[c])){
            return [a, b, c];
        }
    }
    return false;
}
const winnerComb=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8]
];

restartbtn.addEventListener("click", restart);
function restart(){
    spaces.fill(null);
    boxs.forEach(box=>{
        box.innerHTML="";
        box.style.backgroundColor="";
    });
    playText.innerHTML="Tic Tac Toe";
    currentPlayer =x_text;
}
start();