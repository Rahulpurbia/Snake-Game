const board = document.getElementById('board');
let directions = { x: 0, y: 0 };
let foodpos = { x: 2, y: 3 };
let snakeArr = [{ x: 3, y: 4 }];
let lastrefresh = 0;
let rate = 5;
const foodsound = new Audio('food.mp3');
const gameover = new Audio('gameover.mp3');
const gamesound = new Audio('music.mp3');
let score = 0;

const move = new Audio('move.mp3')

function main(frames) {
    window.requestAnimationFrame(main);

    //to slow down frames per second
    if ((frames - lastrefresh) / 1000 <= (1 / rate)) {
        return;//means don't refresh
    }
    lastrefresh = frames;
    gamefunc();
}
//conditions for snake getting collided
function iscollided(snakeArr) {

    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y) {

            console.log(snakeArr[i].x, snakeArr[i].y, snakeArr[0].x, snakeArr[0].y, i);

            return true;
        }
    }
    if (snakeArr[0].x > 18 || snakeArr[0].y <= 0 || snakeArr[0].y > 18 || snakeArr[0].x <= 0) {
        return true;
    }
    return false;
}


function gamefunc() {
    //updating the snake's position
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += directions.x;
    snakeArr[0].y += directions.y;


    //if snake gets collided
    if (iscollided(snakeArr)) {
        gameover.play();
        gamesound.pause();
        alert(`Game Over..
        Score:${score}`);
        score = 0;
        directions = { x: 0, y: 0 };
        foodpos = { x: 2, y: 3 };
        snakeArr = [{ x: 3, y: 4 }];
    }


    //if snake eats the food;;;
    if ((snakeArr[0].x === foodpos.x) && (snakeArr[0].y === foodpos.y)) {
        score++;
        foodsound.play();
        foodpos = { x: Math.round(2 + (18 - 2) * Math.random()), y: Math.round(2 + (18 - 2) * Math.random()) }

        snakeArr.unshift({ x: directions.x + snakeArr[0].x, y: directions.y + snakeArr[0].y });
    }


    //displaying the snake and the food and the score
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeelem = document.createElement("div");
        snakeelem.style.gridRowStart = e.y;
        snakeelem.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeelem.classList.add('head');
        }
        else {
            snakeelem.classList.add('tail');
        }
        board.appendChild(snakeelem);
    });


    //displaying food
    let newfood = document.createElement("div");
    newfood.style.gridColumnStart = foodpos.x;
    newfood.style.gridRowStart = foodpos.y;
    newfood.classList.add('food');
    board.appendChild(newfood);

    //displaying the score
    let newscore = document.getElementById('score');
    newscore.innerHTML = `<b>Score: ${score}</b>`


    //displaying the high score....
    let hiscore = localStorage.getItem("hiscore");
    hiscore = JSON.parse(hiscore);
    if (hiscore === null) {
        hiscoreval = 0;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));//only string can be stored so json.stringify
    }
    else if (hiscore < score) {
        hiscore = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscore));
    }
    let newhiscore = document.getElementById('hiscore');
    hiscore = localStorage.getItem("hiscore");
    newhiscore.innerHTML = `<b>Hiscore: ${hiscore}</b>`
}


//main code
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    if (directions.x === 0 && directions.y === 0) {
        directions.x = 0;
        directions.y = 1;
    }
    gamesound.play();
    move.play();

    if (e.code === "Space" && (directions.x !== 0 || directions.y !== 0)) {
        gamesound.pause();
        alert('game paused press any key to Resume')
        gamesound.play();
    }
    switch (e.key) {
        case "ArrowUp":
            if (directions.x === 0 && directions.y === 1) {
                console.log(directions);
            }
            else {
                directions.x = 0;
                directions.y = -1
            }
            break;

        case "ArrowDown":

            if (directions.x === 0 && directions.y === -1) {
                console.log(directions);
            }
            else {
                directions.x = 0;
                directions.y = 1
            }
            break;
        case "ArrowLeft":
            if (directions.x === 1 && directions.y === 0) {
                console.log(directions);
            }
            else {
                directions.x = -1;
                directions.y = 0
            }
            break;
        case "ArrowRight":
            if (directions.x === -1 && directions.y === 0) {
                console.log(directions);
            }
            else {
                directions.x = 1;
                directions.y = 0
            }
            break;
    }
})



