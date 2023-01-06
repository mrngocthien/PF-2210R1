let context = document.getElementById('board').getContext('2d');

// game object
class Game {
    constructor(gameOver, score) {
        this.gameOver = gameOver;
        this.score = score;
    }
    getScore() {
        return this.score += 1;
    }
} 
// board object
class Board {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    render() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// snake object
class Snake {
    constructor(x, y, width, height, color, velocityX, velocityY, body, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.body = body;
        this.speed = speed;
    }
    getBody() {
        return this.snakeBody = [];
    }
    getPosition() {
        this.x = Math.floor(Math.random() * 20) * 25;
        this.y = Math.floor(Math.random() * 17) * 25;
    }
    render() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

// food object
class Food {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    getPosition() {
        this.x = Math.floor(Math.random() * 20) * 25;
        this.y = Math.floor(Math.random() * 17) * 25;
    }
    render() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}


let game = new Game(false, 0);
let board = new Board(0, 0, 625, 425, 'black');
let snake = new Snake(25, 25, 25, 25, 'lime', 0, 0);
let food = new Food(10, 10, 25, 25, 'red');
let snakeBody = snake.body;
let velocityX = snake.velocityX;
let velocityY = snake.velocityY;
let speed = snake.speed;
let gameOver = game.gameOver;

snakeBody = [];
velocityX = 0;
velocityY = 0;
gameOver = false;

window.onload = function() {
    getTimer();
    document.addEventListener('keyup', changeDirection);
    
}
getLevel();
food.getPosition();
snake.getPosition();

// functions
function getTimer() {
    var sec = 0;
    function pad (val) { return val > 9 ? val : "0" + val; };
    setInterval(() => {
        document.getElementById("seconds").innerHTML = pad(++sec % 60);
        document.getElementById("minutes").innerHTML = pad(parseInt(sec/60, 10));
        document.getElementById("hours").innerHTML = pad(parseInt(sec/3600, 10));
    }, 1000);
}

function getLevel() {
    let a = document.getElementById('cost');
    difficulty = a.options[a.selectedIndex].value;
    speed = parseInt(difficulty) + 40;
    if (speed == 140) {
        setTimeout(() => {
            alert('This is tutorial, please choice more moneys !')
        },1000);
    }
    console.log('Snake moving speed: ' + speed);
    setInterval(update, speed);

    let animationTimer = (difficulty-40)/2;
    let bodyBackground = document.getElementById('body');
    
    if (animationTimer == 25) {
        bodyBackground.style.animation = 'Gradient 4s ease infinite';
    } else if (animationTimer == 15) {
        bodyBackground.style.animation = 'Gradient 6s ease infinite';
    } else if (animationTimer == 5) {
        bodyBackground.style.animation = 'Gradient 8s ease infinite';
    } else {
        bodyBackground.style.animation = 'none';
    }
}


function moveSnake() {
    snake.x += velocityX * 25;
    snake.y += velocityY * 25;
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

function update() {
    if (food.x == snake.x && food.y == snake.y) {
        const music = new Audio('./assets/sounds/eating.wav');
        music.play();
        snakeBody.push([food.x, food.y]);
        food.getPosition();
        game.getScore();
        document.getElementById('score').innerHTML = game.score + '$';
        console.log(game.score);
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snake.x, snake.y];
    }
    
    moveSnake();
    board.render();
    food.render();
    snake.render();
    
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], 25, 25);
    }

    // game over conditions
    if (snake.x < 0 || snake.x > board.width || snake.y < 0 || snake.y > board.height) {
        gameOver = true;
        endGame();
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snake.x == snakeBody[i][0] && snake.y == snakeBody[i][1]) {
            gameOver = true;
            endGame();
        }
    }
    if (gameOver) {
        return
    }
}

function endGame() {
    document.getElementById('endGameImg').style.display = 'block';
    document.getElementById('endGameLogo').style.display = 'block';
    context.fillStyle = 'black';
    context.fillRect(food.x, food.y, 25, 25);
}







