let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext("2d");

let maxRadius = 50;
let numberOfCircles = 800;
let colorArray = ["#2C3E50", "#E74C3C", "#E74C3C", "#3498DB", "#2980B9"];

let mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener("mousemove",
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    createCircles();
})
function distance(x1, x2, y1, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function () {

        if (this.x > innerWidth - this.radius || this.x < this.radius) {
            this.dx = -this.dx;
        }

        if (this.y > innerHeight - this.radius || this.y < this.radius) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interaction

        if (distance(mouse.x, this.x, mouse.y, this.y) < 50 && this.radius < maxRadius) {
            this.radius++;
        } else if (this.radius > this.minRadius) {
            this.radius--;
        }
    }
}

let circleArray = [];

function createCircles() {

    circleArray = [];
    for (let i = 0; i < numberOfCircles; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        let y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        let dx = (Math.random() - 0.5) * 3;
        let dy = (Math.random() - 0.5) * 3;

        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
function animate() {
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < circleArray.length; i++) {

        circleArray[i].draw();

        circleArray[i].update();

    }

    window.requestAnimationFrame(animate);
}
createCircles();
animate();
