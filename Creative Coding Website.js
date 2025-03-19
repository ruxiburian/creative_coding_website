let waves = [];
let numWaves = 10;
let titleSpace = 150;
let circleSize = 60;
let titleText = "G o  F i s h";
let titleAmplitude = 10;
let titleSpeed = 0.05;
let customFont;
let fishes = [];

function preload() {
  customFont = loadFont("Emblema.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont);

  for (let i = 0; i < numWaves; i++) {
    let waveY = map(i, 0, numWaves - 1, 0, height);

    if (
      waveY > height / 2 - titleSpace / 2 &&
      waveY < height / 2 + titleSpace / 2
    ) {
      continue;
    }

    let waveSpeed = random(0.01, 0.02);
    let waveOffset = random(TWO_PI);
    let waveDirection = random([-1, 1]);
    let waveColor = color(random(50, 150), random(100, 200), 255, 170);

    waves.push(new Wave(waveY, waveSpeed, waveOffset, waveColor, waveDirection));
  }

  fishes.push(new Fish(100, 200, color(255, 165, 0), "sketch1.html"));
  fishes.push(new Fish(300, 300, color(230, 255, 0), "sketch2.html"));
  fishes.push(new Fish(500, 400, color(240, 120, 15), "sketch3.html"));
}

function draw() {
  background(0, 0, 80);

  for (let wave of waves) {
    wave.update();
    wave.display();
  }

  drawWavyTitle();

  for (let fish of fishes) {
    fish.update();
    fish.display();
  }
}



class Wave {
  constructor(yPosition, speed, offset, col, direction) {
    this.yPosition = yPosition;
    this.speed = speed * direction;
    this.offset = offset;
    this.color = col;
    this.angle = offset;
    this.amplitude = 20;
    this.frequency = 0.05;
  }

  update() {
    this.angle += this.speed;
  }

  display() {
    let angle = this.angle;
    noStroke();
    fill(this.color);

    for (let x = 0; x <= width + circleSize; x += circleSize) {
      let xPos = x + sin(angle) * this.amplitude;
      ellipse(xPos, this.yPosition, circleSize, circleSize);
      angle += this.frequency;
    }
  }
}

function drawWavyTitle() {
  fill(255);
  textSize(40);
  textAlign(CENTER, CENTER);
  textFont(customFont);

  let xStart = width / 2 - textWidth(titleText) / 2;

  for (let i = 0; i < titleText.length; i++) {
    let charX = xStart + textWidth(titleText.substring(0, i));
    let charY =
      height / 2 + sin(frameCount * titleSpeed + i * 0.6) * titleAmplitude;

    text(titleText[i], charX, charY);
  }
}

class Fish {
  constructor(x, y, fishColor, link) {
    this.x = x;
    this.baseY = y; 
    this.color = fishColor;
    this.size = 50;
    this.speed = 1.7;
    this.direction = random([-1, 1]);  
    this.amplitude = 15; 
    this.frequency = random(0.02, 0.05);
    this.link = link;
  }

  update() {
    this.x += this.speed * this.direction;
    this.y = this.baseY + sin(frameCount * this.frequency) * this.amplitude; 

    if (this.x < 0 || this.x > width) {
      this.direction *= -1;
    }
  }

  display() {
    fill(this.color);
    noStroke();
    
    ellipse(this.x, this.y, this.size, this.size / 2);
    ellipse(this.x, this.y, this.size / 3, this.size / 4);
    
    triangle(this.x - this.size / 2, this.y,
             this.x - this.size, this.y - this.size / 4,
             this.x - this.size, this.y + this.size / 4);
    
    fill(0);
    ellipse(this.x + 10, this.y, this.size / 7, this.size / 6);
  }

  clicked() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      window.location.href = this.link;
    }
  }
}

function mousePressed() {
  for (let fish of fishes) {
    fish.clicked();
  }
}
