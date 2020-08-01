let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}
let X = innerWidth / 2;
let Y = innerHeight / 2;
let numberOfParticles = 50;
let particles = [];
let colorPalette = [
    "#1C07E6",
    "#0730F0",
    "#045FD9",
    "#07AAF0",
    "#07DCE6"
];
let lastMouse = { x : X, y : Y };

window.addEventListener("mousemove",
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener("resize",
    function () {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

window.addEventListener("touchstart",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        lastPoint.x = event.x;
        lastPoint.y = event.y;
    });

window.addEventListener("touchmove",
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener("touchend" ,
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        lastPoint.x = event.x;
        lastPoint.y = event.y;
    });

function Particle(x, y, radius){
    this.theta = Math.random() * 2 * Math.PI;
    this.R = Math.random() * (120 - 50) + 50;
    this.x = x + this.R * Math.sin(this.theta);
    this.y = y - this.R * Math.cos(this.theta);
    this.radius = radius;
    this.dtheta = 0.05;
    this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

    this.draw = function(lastPoint) {
        c.beginPath();
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.strokeStyle = this.color;
        c.lineWidth = 3;
        c.stroke();
        c.closePath();
    }

    this.update = function() {

        lastPoint = {x : this.x, y : this.y};

        lastMouse.x += (mouse.x - lastMouse.x) * 0.0009;
        lastMouse.y += (mouse.y - lastMouse.y) * 0.0009;

        this.theta += this.dtheta;
        this.x = lastMouse.x + this.R * Math.sin(this.theta);
        this.y = lastMouse.y - this.R * Math.cos(this.theta);

        
        this.draw(lastPoint);

    }
}

function distance(x1, x2, y1, y2){
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function init() {
    particles = [];
    for(let i = 0; i < numberOfParticles; i++){
        let radius = (Math.random() * 2) + 1;
        particles.push(new Particle(X, Y, radius));
    }
}

function animate() {
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    c.fillRect(0, 0,innerWidth, innerHeight);

    for(let i = 0; i < particles.length ; i++){
        particles[i].update();
    }
    return requestAnimationFrame(animate);
}
init();
animate();
