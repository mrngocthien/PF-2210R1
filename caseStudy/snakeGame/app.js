// board
let blockSize = 25,
    rows = 20,
    cols = 30,
    score = 0,
    board,
    context;

// snake
let snakeX = blockSize * 5,
    snakeY = blockSize * 5,
    velocityX = 0,
    velocityY = 0,
    snakeBody = [];

// food
let foodX,
    foodY;
// game
let gameOver = false,
    speedS;

window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); //used for drawing on the board

    getPlaceFood();
    document.addEventListener('keyup', changeDirection);
    
}

/* functions */

function startGame() {
    getTimer();
    getLevel();
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (foodX == snakeX && foodY == snakeY) {
        snakeBody.push([foodX, foodY]);
        getPlaceFood();
        score++;
        getScore();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        alert('Game Over');
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('Game Over');
        }
    }
}

function changeDirection(e) {
    // check velocity value to avoid snake eats it's body
    if (e.code == 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    
}

function getPlaceFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function getScore() {
    document.getElementById('score').innerHTML = score + '$';
}

function getTimer() {
    var sec = 0;
    function pad (val) { return val > 9 ? val : "0" + val; };
    setInterval(() => {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec/60, 10));
        document.getElementById("hours").innerHTML = pad(parseInt(sec/3600, 10));
    }, 10000);
}

function getLevel() {
    let a = document.getElementById('cost');
    difficulty = a.options[a.selectedIndex].value;
    speedS = difficulty;
    console.log(speedS);
    setInterval(update, speedS);
}
