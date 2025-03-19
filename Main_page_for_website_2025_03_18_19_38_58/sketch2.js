let customFont1;
let customFont2;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
}

function preload() {
  customFont1 = loadFont("Font3.ttf");
  customFont2 = loadFont("angryFont.ttf")
}

function draw() {
  let numLines = int(random(5, 15)); 
  for (let i = 0; i < numLines; i++) {
    let angle = random(TWO_PI); 
    let length = random(100, 300); 
    let r = random(100, 255); 
    let g = random(100, 255); 
    let b = random(100, 255);

    stroke(r, g, b);

    let xEnd = mouseX + cos(angle) * length;
    let yEnd = mouseY + sin(angle) * length;

    line(mouseX, mouseY, xEnd, yEnd);
  }
  
  if (mouseIsPressed) {
    background(0); 
  }


  noStroke();
  fill(0);  
  textSize(125);  
  textFont(customFont1);
  textAlign(CENTER, CENTER);  
  text("Having Fun?", width / 2, height / 2);

  textSize(16);
  textAlign(RIGHT, BOTTOM);
  textFont(customFont2);
  fill(0);
  textFont
  text("Get me out!", width - 15, height - 15);
}

function mousePressed() {
  let textWidthValue = textWidth("Get me out!");
  
  if (
    mouseX > width - textWidthValue - 20 && 
    mouseX < width - 15 &&
    mouseY > height - 30 &&
    mouseY < height - 5
  ) {
    window.open("index.html", "_self"); 
  }
}
