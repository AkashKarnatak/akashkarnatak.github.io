let canvas = document.querySelector("canvas");
canvas.height = innerHeight * 3 / 4;
canvas.width = innerWidth * 3 / 4;
let c = canvas.getContext("2d");

let a1 = 0;
let a2 = 0;
let b1 = 0;
let b2 = 0;
let c1 = 0;
let c2 = 0;

let x0 = xs(0);
let y0 = ys(0);

let mouse = { x: innerWidth * 3 / 4 / 2, y: innerHeight * 3 / 4 / 2 };

let use_method = "gauss";
let method = "gauss";

function xs(num) {
    num *= 30;
    num += innerWidth * 3 / 4 / 2;
    return num
}

function ys(num) {
    num *= -30;
    num += innerHeight * 3 / 4 / 2;
    return num
}

function sx(num) {
    num -= innerWidth * 3 / 4 / 2;
    num /= 30;
    return num
}

function sy(num) {
    num -= innerHeight * 3 / 4 / 2;
    num /= -30;
    return num
}

function xticks() {
    for (let i = 1; i < sx(innerWidth * 3 / 4); i++) {
        c.beginPath();
        c.moveTo(xs(i), innerHeight * 3 / 4 / 2 - 5);
        c.lineTo(xs(i), innerHeight * 3 / 4 / 2 + 5);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
        c.closePath();


        c.beginPath();
        c.moveTo(xs(i), 0);
        c.lineTo(xs(i), innerHeight * 3 / 4);
        c.strokeStyle = "grey";
        c.lineWidth = 1;
        c.stroke();
        c.closePath();
    }
    for (let i = -1; i > sx(0); i--) {
        c.beginPath();
        c.moveTo(xs(i), innerHeight * 3 / 4 / 2 - 5);
        c.lineTo(xs(i), innerHeight * 3 / 4 / 2 + 5);
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(xs(i), 0);
        c.lineTo(xs(i), innerHeight * 3 / 4);
        c.strokeStyle = "grey";
        c.lineWidth = 1;
        c.stroke();
        c.closePath();
    }
}

function yticks() {
    console.log(sy(innerHeight * 3 / 4))
    for (let i = 1; i < sy(0); i++) {
        c.beginPath();
        c.moveTo(innerWidth * 3 / 4 / 2 - 5, ys(i));
        c.lineTo(innerWidth * 3 / 4 / 2 + 5, ys(i));
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
        c.closePath();


        c.beginPath();
        c.moveTo(0, ys(i));
        c.lineTo(innerWidth * 3 / 4, ys(i));
        c.lineWidth = 1;
        c.strokeStyle = "grey";
        c.stroke();
        c.closePath();
    }
    for (let i = -1; i > sy(innerHeight * 3 / 4); i--) {
        c.beginPath();
        c.moveTo(innerWidth * 3 / 4 / 2 - 5, ys(i));
        c.lineTo(innerWidth * 3 / 4 / 2 + 5, ys(i));
        c.strokeStyle = "black";
        c.lineWidth = 2;
        c.stroke();
        c.closePath();

        c.beginPath();
        c.moveTo(0, ys(i));
        c.lineTo(innerWidth * 3 / 4, ys(i));
        c.lineWidth = 1;
        c.strokeStyle = "grey";
        c.stroke();
        c.closePath();
    }
}

function grid() {
    c.beginPath();
    c.moveTo(innerWidth * 3 / 4 / 2, 0);
    c.lineTo(innerWidth * 3 / 4 / 2, innerHeight * 3 / 4);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.moveTo(0, innerHeight * 3 / 4 / 2);
    c.lineTo(innerWidth * 3 / 4, innerHeight * 3 / 4 / 2);
    c.strokeStyle = "black";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

    c.beginPath()
    c.moveTo(100, 0)
    c.lineTo(100, 100);
    c.strokeStyle = "black";
    c.lineWidth = 1;
    c.stroke();
    c.closePath()

    c.beginPath()
    c.moveTo(0, 100)
    c.lineTo(100, 100);
    c.strokeStyle = "black";
    c.lineWidth = 1;
    c.stroke();
    c.closePath();
}

function wait_seidel(){
    method = "wait";
}

function gauss_seidel(){
    method = "gauss";
}

let count = 0;

console.log('sdfsd')
window.addEventListener("mousedown", function () {
    if(use_method == "wait"){
        if (mouse.x > window.innerWidth * 3 / 4 || mouse.y > window.innerHeight * 3 / 4) return false;
        let x = xs((c1 - b1 * sy(y0)) / a1);
        let y = ys((c2 - a2 * sx(x0)) / b2);
        console.log(x + "< " + y);
        console.log(sx(x) + " " + sy(y));
        c.beginPath();
        c.moveTo(x0, y0);
        console.log(x + " " + y)
        c.lineTo(x, y);
        c.strokeStyle = "blue";
        c.lineWidth = 1;
        c.stroke();
        c.closePath();
        x0 = x;
        y0 = y;
    } else {
        if (mouse.x > window.innerWidth * 3 / 4 || mouse.y > window.innerHeight * 3 / 4) return false;
        let x = x0;
        let y = y0;
        if(count % 2 == 0){
            x = xs((c1 - b1 * sy(y0)) / a1);
            c.beginPath();
            c.moveTo(x0, y0);
            console.log(x + " " + y)
            c.lineTo(x, y);
            c.strokeStyle = "blue";
            c.lineWidth = 1;
            c.stroke();
            c.closePath();
            x0 = x;
        } else {
            y = ys((c2 - a2 * sx(x0)) / b2);
            c.beginPath();
            c.moveTo(x0, y0);
            console.log(x + " " + y)
            c.lineTo(x, y);
            c.strokeStyle = "blue";
            c.lineWidth = 1;
            c.stroke();
            c.closePath();
            y0 = y;
        }
        count++;
    }

});

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

function plot() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    xticks();
    yticks();
    grid();
    count = 0;
    use_method = method;
    try {
        a1 = parseFloat(document.getElementById("a1").value);
        a2 = parseFloat(document.getElementById("a2").value);
        b1 = parseFloat(document.getElementById("b1").value);
        b2 = parseFloat(document.getElementById("b2").value);
        c1 = parseFloat(document.getElementById("c1").value);
        c2 = parseFloat(document.getElementById("c2").value);
        x0 = xs(parseFloat(document.getElementById("x0").value));
        y0 = ys(parseFloat(document.getElementById("y0").value));
    } catch (e) {
        console.log("Invalid input");
    }

    //draw the lines

    c.beginPath();
    c.moveTo(xs(-100), ys((c1 + 100 * a1) / b1));
    console.log(ys((c1 + 00 * a1) / b1));
    c.lineTo(xs(100), ys((c1 - 100 * a1) / b1));
    c.strokeStyle = "green";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

    c.beginPath();
    c.moveTo(xs(-100), ys((c2 + 100 * a2) / b2));
    c.lineTo(xs(100), ys((c2 - 100 * a2) / b2));
    c.strokeStyle = "orange";
    c.lineWidth = 2;
    c.stroke();
    c.closePath();

}

function animate() {
    c.clearRect(0, 0, 100, 100);
    c.font = "15pt Times New Roman";
    c.fillText("x : " + sx(mouse.x).toFixed(3), 10, 50);
    c.fillText("y : " + sy(mouse.y).toFixed(3), 10, 70);
    requestAnimationFrame(animate);
}

animate();
xticks();
yticks();
grid();