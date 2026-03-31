let food = { x: 300, y: 200 };
let score=0;
let run =document.getElementById('score');




let snake = [
  { x: 160, y: 200 },
  { x: 140, y: 200 },
  { x: 120, y: 200 }
];
  const arena = document.getElementById("arena");
  let dx =20;
  let dy =0;

function initiateGame() {
    const scoreBoard = document.createElement('div');
  scoreBoard.id = 'score-board';

  const startButton = document.createElement('button');
  startButton.textContent = 'Start Game';
  startButton.classList.add('start-button');

 // make sure this exists

  document.body.appendChild(startButton);
  document.body.insertBefore(scoreBoard, arena);

  startButton.addEventListener("click", function () {
    startButton.style.display = 'none';
    rungame();
     
    
  });
}
initiateGame();
function drawDiv(x,y,className)
{
    const divElement =document.createElement('div');
    divElement.classList.add(className);
    
    divElement.style.top =`${y}px`;
    divElement.style.left =`${x}px`;
    return divElement;
}
function updatefood()
{
    let x1 = Math.floor(Math.random() * 30)*20;
    let y1 = Math.floor(Math.random()*30)*20;

    food.x = x1;
    food.y = y1;
}
function drawFoodandSnake()
{
arena.innerHTML='';
snake.forEach((snakecell)=>{
    const snakeElement =drawDiv(snakecell.x,snakecell.y,'snake');
    arena.appendChild(snakeElement);


})
 const foodElement=drawDiv(food.x,food.y,'food');
arena.appendChild(foodElement);

}

function changedirection(e)
{
    const isGoingDown =dy===20;
    const isGoingUp =dy==-20;
    const isGoingLeft =dx===-20;
    const isGoingRight=dx==20;
    if(e.key=='ArrowUp'&&!isGoingDown)
    {
        dx= 0;
        dy =-20;
    }
    else if(e.key=='ArrowDown'&&!isGoingUp){
        dx =0;
        dy =20;
    }
     else if(e.key=='ArrowLeft'&&!isGoingRight){
        dx =-20;
        dy =0;
    }
     else if(e.key=='ArrowRight'&&!isGoingLeft){
        dx =20;
        dy =0;
    }

}
function updateSnake()
{
    const newHead ={x:snake[0].x+dx,y:snake[0].y+dy};
    snake.unshift(newHead);
    if(newHead.x===food.x && newHead.y===food.y)
    {
        score+=10;
        run.innerText=`score:${score}`;
        
        updatefood();
       
        
    }
    else{
        snake.pop(); 
    }

}
function check()
{
    let head =snake[0];
    if(head.x<0) return true;
    else if(head.x>=600)return true;
     else if(head.y>=600)return true;
      else if(head.y<0)return true;
      return false;

    }
function gameloop()
{
    let id =setInterval(()=>
        {
            
            updateSnake();
            drawFoodandSnake();
            
            if(check())
                {
                    arena.innerHTML='';
                    clearInterval(id);
                }



    },300)
}
function rungame()
{
    drawFoodandSnake();
    document.addEventListener('keydown',changedirection);
    gameloop();
    
    

    
    

}
