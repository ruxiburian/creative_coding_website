let balls = [];
let gravity = 0.1; 
let friction = 0.99; 
let customFont;

function preload() {
  customFont = loadFont("Emblema.ttf");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 10);
  
  fill(255);
  textSize(30);
  textAlign(CENTER, TOP);
  textFont(customFont);
  text("Did you drop your ball?", width / 2, 25); 

  textSize(16);
  textAlign(RIGHT, BOTTOM);
  textFont(customFont);
  fill(255, 255, 255);
  text("I want to fish some more", width - 15, height - 15);
  
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    
    ball.dy += gravity; 
    ball.x += ball.dx;
    ball.y += ball.dy;
    
    if (ball.x < 0 || ball.x > width) {
      ball.dx = -ball.dx * friction;
    }
    if (ball.y < 0 || ball.y > height) {
      ball.dy = -ball.dy * friction;
      if (ball.y > height) ball.y = height;
    }
    
    fill(ball.color);
    noStroke();
    ellipse(ball.x, ball.y, 30, 30);
  }
}

function mousePressed() {
  let newBall = {
    x: mouseX,
    y: mouseY,
    dx: random(-3, 3),
    dy: random(-3, 3),
    color: color(180, 250, 255)
  };
  balls.push(newBall);

  let textWidthValue = textWidth("I want to fish some more");
  if (
    mouseX > width - textWidthValue - 10 &&
    mouseX < width - 15 &&
    mouseY > height - 30 &&
    mouseY < height - 10
  ) {
    window.location.href = "index.html"; 
  }
}
