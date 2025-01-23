const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

let paddle1Y = 250, paddle2Y = 250;
let ballX = 400, ballY = 300;
let ballSpeedX = 5, ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, "#fff");
    }
}

function movePaddles() {
    if (wPressed && paddle1Y > 0) paddle1Y -= 5;
    if (sPressed && paddle1Y < canvas.height - paddleHeight) paddle1Y += 5;
    if (arrowUpPressed && paddle2Y > 0) paddle2Y -= 5;
    if (arrowDownPressed && paddle2Y < canvas.height - paddleHeight) paddle2Y += 5;
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < paddleWidth && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballRadius > canvas.width - paddleWidth && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        resetBall();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawNet();
    drawRect(0, paddle1Y, paddleWidth, paddleHeight, "#fff");
    drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, "#fff");
    drawCircle(ballX, ballY, ballRadius, "#fff");
}

function update() {
    movePaddles();
    moveBall();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

let wPressed = false, sPressed = false;
let arrowUpPressed = false, arrowDownPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.key === "w") wPressed = true;
    if (e.key === "s") sPressed = true;
    if (e.key === "ArrowUp") arrowUpPressed = true;
    if (e.key === "ArrowDown") arrowDownPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "w") wPressed = false;
    if (e.key === "s") sPressed = false;
    if (e.key === "ArrowUp") arrowUpPressed = false;
    if (e.key === "ArrowDown") arrowDownPressed = false;
});

gameLoop();