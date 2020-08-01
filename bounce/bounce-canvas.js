let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

// let maxRadius = 50;
let numberOfBalls = 100;
let colorArray = ["#023059", "#D5E5F2", "#0477BF", "#049DD9", "#F23005"];

// let mouse = {
//     x: undefined,
//     y: undefined
// }

// window.addEventListener("mousemove",function (event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
// });

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createBalls();
})

window.addEventListener("click", function () {
    createBalls();
})

// function distance(x1, x2, y1, y2) {
//     return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
// }

let accelerationDueToGravity = 1;
let coefficientOfRestitution = 0.8;

function randint(m, n){
    return Math.floor(Math.random() * (n - m) + m);
}
function Balls(x, y, radius) {
    this.x = x;
    this.y = y;
    this.dx = randint(-2, 2);
    this.dy = 1;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
        c.closePath();
    }

    this.update = function () {

        if (this.y + this.dy + this.radius > innerHeight) {
            this.dy = -this.dy * coefficientOfRestitution;
        } else {
            this.dy += accelerationDueToGravity;
        }
        if(this.x + this.radius > innerWidth || this.x < radius){
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}

let ballArray = [];

function createBalls() {

    ballArray = [];
    for (let i = 0; i < numberOfBalls; i++) {
        let radius = 30;
        let x = randint(radius, innerWidth - radius);

        let y = randint(radius, innerHeight/3);

        ballArray.push(new Balls(x, y, radius));
    }
}
function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < ballArray.length; i++) {

        ballArray[i].update();

    }

    window.requestAnimationFrame(animate);
}
createBalls();
animate();
