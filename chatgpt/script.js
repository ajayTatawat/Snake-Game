const arena = document.getElementById("arena");
const scoreText = document.getElementById("score");

let snake, food, dx, dy, score, highScore, gameInterval;

function startGame() {
    snake = [
        {x: 160, y: 200},
        {x: 140, y: 200},
        {x: 120, y: 200}
    ];
    dx = 20;
    dy = 0;
    score = 0;
    highScore = localStorage.getItem("highScore") || 0;

    generateFood();
    document.addEventListener("keydown", changeDirection);

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150);
}

function draw() {
    arena.innerHTML = "";

    snake.forEach(part => {
        let div = document.createElement("div");
        div.className = "snake";
        div.style.left = part.x + "px";
        div.style.top = part.y + "px";
        arena.appendChild(div);
    });

    let foodDiv = document.createElement("div");
    foodDiv.className = "food";
    foodDiv.style.left = food.x + "px";
    foodDiv.style.top = food.y + "px";
    arena.appendChild(foodDiv);
}

function generateFood() {
    let max = arena.clientWidth / 20;
    food = {
        x: Math.floor(Math.random() * max) * 20,
        y: Math.floor(Math.random() * max) * 20
    };
}

function changeDirection(e) {
    if(e.key === "ArrowUp" && dy === 0) {
        dx = 0; dy = -20;
    }
    else if(e.key === "ArrowDown" && dy === 0) {
        dx = 0; dy = 20;
    }
    else if(e.key === "ArrowLeft" && dx === 0) {
        dx = -20; dy = 0;
    }
    else if(e.key === "ArrowRight" && dx === 0) {
        dx = 20; dy = 0;
    }
}

function updateSnake() {
    let head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    if(head.x === food.x && head.y === food.y) {
        score += 10;
        if(score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        generateFood();
    } else {
        snake.pop();
    }

    scoreText.innerText = `Score: ${score} | High Score: ${highScore}`;
}

function checkCollision() {
    let head = snake[0];

    if(head.x < 0 || head.y < 0 || head.x >= arena.clientWidth || head.y >= arena.clientHeight) {
        return true;
    }

    for(let i = 1; i < snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    updateSnake();

    if(checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over 😢");
        return;
    }

    draw();
}