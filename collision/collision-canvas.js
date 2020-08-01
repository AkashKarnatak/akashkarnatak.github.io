let canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let c = canvas.getContext("2d");

let mouse = {
    x: 0,
    y: 0
}
let numberOfParticles = 100;
let particles = [];
let radius = 20;
let colorPalette = [
    "#ffc0cb",
    "#00B0DF",
    "#00C0ED",
    "#72CF1A",
    "#FFC000"
];

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

function Particle(x, y){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = (Math.random() - 0.5) * 3;
    this.dy = (Math.random() - 0.5) * 3;
    this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    this.opacity = 0;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity/100;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }

    this.update = function() {
        if(this.x + this.dx + this.radius > innerWidth || this.x + this.dx < radius){
            this.dx = -this.dx;
        }

        if(this.y + this.dy + this.radius > innerHeight || this.y + this.dy < radius){
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        console.log(this.opacity);
        if(distance(mouse.x, this.x, mouse.y, this.y) < 150 && this.opacity < 50){
            this.opacity += 1;
        } else if (this.opacity > 0){ 
            this.opacity -= 1;
        }

        for(let i = 0; i < particles.length; i++){
            if(particles[i] === this) continue; 

            if(distance(this.x + this.dx, particles[i].x + particles[i].dx, this.y + this.dy, particles[i].y + particles[i].dy) < 2 * radius){
                let tmp = { dx : this.dx, dy : this.dy};

                this.dx = particles[i].dx;
                particles[i].dx = tmp.dx;

                this.dy = particles[i].dy;
                particles[i].dy = tmp.dy;
                
            }
        }
    }
}

function distance(x1, x2, y1, y2){
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function init() {
    particles = [];
    let x = Math.random() *
            (innerWidth - 2 * radius) + radius;
    let y = Math.random() *
            (innerHeight - 2 * radius) + radius;
    for (let i = 0; i < numberOfParticles; i++){

        particles.push(new Particle(x, y));

        for(let j = 0; j < particles.length; j++){

            if(j == i) continue;

            if(distance(particles[i].x, particles[j].x, particles[i].y, particles[j].y) < 2 * radius){
                particles[i].x = Math.random() * (innerWidth - 2 * radius) + radius;
                particles[i].y = Math.random() * (innerHeight - 2 * radius) + radius;
                j = -1;
            }
        }
    }
}

function animate() {
    c.clearRect(0, 0,
         innerWidth, innerHeight);
    for(let i = 0; i < particles.length; i++){

        particles[i].draw();

        particles[i].update();

    }
    return requestAnimationFrame(animate);
}
init();
animate();

