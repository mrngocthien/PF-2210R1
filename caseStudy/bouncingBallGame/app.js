const main = document.querySelector('.main');
const ball = document.querySelector('.ball');
const bar = document.querySelector('.bar');

let leftRight = Math.floor(Math.random() * 2);
let right = leftRight ? true : false;
let upDown = Math.floor(Math.random() * 2);
let up = upDown ? true : false;
let velocity = 3;

let ballMove = setInterval(() => {
    let ballBounds = ball.getBoundingClientRect();
    let boardBounds = main.getBoundingClientRect();
    let ballBoundsLeft = parseInt(ballBounds.left);
    let ballBoundsRight = parseInt(ballBounds.right);
    let ballBoundsTop = parseInt(ballBounds.top);
    let ballBoundsBottom = parseInt(ballBounds.bottom);
    let ballTop = Math.floor(parseInt(window.getComputedStyle(ball).getPropertyValue('top')));
    let ballLeft = Math.floor(parseInt(window.getComputedStyle(ball).getPropertyValue('left')))

    if (right && up) {
        ball.style.top = ballTop - velocity + 'px';
        ball.style.left = ballLeft + velocity + 'px';
    }

    if (!right && up) {
        ball.style.top = ballTop - velocity + 'px';
        ball.style.left = ballLeft - velocity + 'px';
    }

    if (right && !up) {
        ball.style.top = ballTop + velocity + 'px';
        ball.style.left = ballLeft + velocity + 'px';
    }

    if (!right && !up) {
        ball.style.top = ballTop + velocity + 'px';
        ball.style.left = ballLeft - velocity + 'px';
    }

    if (ballBoundsTop <= boardBounds.top) {
        leftRight = Math.floor(Math.random() * 2);
        right = leftRight ? true : false;
        up = false;
    }
    if (ballBoundsBottom >= boardBounds.bottom) {
        leftRight = Math.floor(Math.random() * 2);
        right = leftRight ? true : false;
        up = true;
    }
    if (ballBoundsRight >= boardBounds.right) {
        right = false;
        upDown = Math.floor(Math.random() * 2);
        up = upDown ? true : false;
    }
    if (ballBoundsLeft <= boardBounds.left) {
        right = true;
        upDown = Math.floor(Math.random() * 2);
        up = upDown ? true : false;
    }
},1);


// let barMove = setInterval(() => {
    
    
// },1);

window.addEventListener('keydown', (k) => {
    let speedX = 100;
    if (k.key == 'd') {
        speedX = speedX;
        bar.style.left = parseInt(window.getComputedStyle(bar).getPropertyValue('left')) + speedX + "px";
    }
    if (k.key == 'a') {
        speedX = -speedX;
        bar.style.left = parseInt(window.getComputedStyle(bar).getPropertyValue('left')) + speedX + "px";
    }
});
