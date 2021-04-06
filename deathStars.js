"use strict";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

function DeathStar(x,y,r,img) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vel = {
        x: Math.random()*2-1,
        y: Math.random()*2-1
    }
    this.img = img;
    this.move = function() {
        this.x += this.vel.x;
        this.y += this.vel.y;
    }
    this.render = function() {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.x,this.y,r+1.5,0,Math.PI * 2);
        ctx.fill();
        ctx.drawImage(this.img,this.x-r,this.y-r,this.r*2,this.r*2);
    }
}

//Objects setup
var N = 100;
var R = 20;
var deathStars = [];
var img = new Image();
var deathStar1;
img.onload = function() {
    // Populate array with random starting points inside canvas and radius R
    for (let idx = 0; idx < N; idx++) {
        deathStars.push(new DeathStar(Math.floor(Math.random()*((canvas.width-R-4) - (R+5)) + (R+4)), Math.floor(Math.random()*((canvas.height-R-4) - (R+5)) + (R+4)),R,img));
    }
    startAnimation();
}
img.src = "images/deathstar.png";


function startAnimation() {
    updateGame();
    window.requestAnimationFrame(renderAnimation);
}

function updateGame() {
    for (let idx = 0; idx < deathStars.length; idx++) {
        deathStars[idx].move();
    }
    //Collision
    for (let i = 0; i < deathStars.length; i++) {
        if(deathStars[i].x-deathStars[i].r <= 0 || deathStars[i].x+deathStars[i].r >= canvas.width)
            deathStars[i].vel.x *= -1;
        if(deathStars[i].y-deathStars[i].r <= 0 || deathStars[i].y+deathStars[i].r >= canvas.height)
            deathStars[i].vel.y *= -1;
    }
    setTimeout(updateGame, 12);
}

function renderAnimation() {
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height);
    // Resize canvas to fit screen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    // Render objects
    for (let idx = 0; idx < deathStars.length; idx++) {
        deathStars[idx].render();
    }
    window.requestAnimationFrame(renderAnimation);
}