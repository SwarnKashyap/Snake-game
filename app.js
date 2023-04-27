const gam = document.querySelector(".game")
const score = document.querySelector(".score")
let foodX,foodY;
let headX=12,headY=12;
let snakeBody = [];
let scores=0;
let velocityX=0,velocityY=0;
function genrateFood(){
    foodX = Math.floor(Math.random()*25)+1
    foodY = Math.floor(Math.random()*25)+1
    for(let i=0;i<snakeBody.length;i++){
        if(snakeBody[i][1]==foodY && snakeBody[i][0] == foodX){
            genrateFood()
        }
    }
}

function gameOver(){
    headX=12
    headY=12
    genrateFood()
    velocityX=0
    velocityY=0
    scores=0
    snakeBody = []
    alert("Game Over")
    
}

function renderGame(){
    
    let updateGame = `<div class="food" style="grid-area: ${foodX}/${foodY}"></div>`
    if(foodX==headX && foodY===headY){
        scores+=10
        score.innerText = `Score:${scores}`
        snakeBody.push([foodX,foodY])
        genrateFood()
    }
    snakeBody.pop()
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY])

    if(headX == 0 || headY == 0 || headX == 26 || headY == 26){
        gameOver()
    }

    for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0]==snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver()
        }
    }

    for(let i=0;i<snakeBody.length;i++){
        updateGame += `<div class="snake" style="grid-area: ${snakeBody[i][0]}/${snakeBody[i][1]}"></div>`
    }
    
    gam.innerHTML = updateGame
}
genrateFood()
setInterval(renderGame,150)
document.addEventListener("keydown",function(e){
    console.log(e.key)
    let key = e.key
    if(key === 'ArrowUp' && velocityX!=1){
        velocityX = -1
        velocityY = 0
    }
    else if(key === 'ArrowLeft' && velocityY!=1){
        velocityX = 0
        velocityY = -1
    }
    else if(key === 'ArrowRight' && velocityY!=-1){
        velocityX = 0
        velocityY = 1
    }
    else if(key === 'ArrowDown' && velocityX!=-1){
        velocityX = 1
        velocityY = 0
    }
})
