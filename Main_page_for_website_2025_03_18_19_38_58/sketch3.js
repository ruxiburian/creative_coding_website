let tree = [];
let maxBranches = 1000;
let growthRate = 15;
let iterations = 0;
let maxIterations = 1000;
let myFont1; 
let myFont2;

function preload() {
  myFont1 = loadFont('cursive.ttf'); 
  myFont2 = loadFont('generic.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startNewFractal();
}

function draw() {
  background(10, 10, 10, 50);

  let growingBranches = 0;

  for (let branch of tree) {
    branch.update();
    branch.display();

    if (!branch.fullyGrown && growingBranches < growthRate) {
      branch.grow();
      growingBranches++;
    }
  }

  iterations++;

  if (iterations > maxIterations) {
    startNewFractal();
  }

  noStroke();
  fill(255);
  textFont(myFont1); 
  textSize(35);
  textAlign(CENTER, TOP);
  text("You have chosen the Meditation Fish. Sit and enjoy!", width / 2, 10);

  textSize(16);
  textAlign(RIGHT, BOTTOM);
  textFont(myFont2);
  fill(255);
  text("Enough ZEN for today", width - 15, height - 15);
}

function startNewFractal() {
  tree = [];
  iterations = 0;
  let root = new Branch(createVector(width / 2, height), -PI / 2, 200);
  tree.push(root);
}

class Branch {
  constructor(startPos, angle, length) {
    this.startPos = startPos.copy();
    this.angle = angle;
    this.length = length;
    this.grownLength = 0;
    this.fullyGrown = false;
    this.grown = false;

    this.fullEndPos = p5.Vector.fromAngle(this.angle)
      .mult(this.length)
      .add(this.startPos);

    this.currentEndPos = this.startPos.copy();
  }

  grow() {
    if (this.grownLength < this.length) {
      this.grownLength += 2;
      this.currentEndPos = p5.Vector.fromAngle(this.angle)
        .mult(this.grownLength)
        .add(this.startPos);
    } else if (!this.grown) {
      this.fullyGrown = true;
      this.grown = true;

      if (tree.length < maxBranches) {
        let newLength = this.length * random(0.6, 0.8);
        tree.push(
          new Branch(
            this.fullEndPos,
            this.angle - random(PI / 6, PI / 3),
            newLength
          )
        );
        tree.push(
          new Branch(
            this.fullEndPos,
            this.angle + random(PI / 6, PI / 3),
            newLength
          )
        );

        if (random() < 0.4) {
          tree.push(
            new Branch(
              this.fullEndPos,
              this.angle + random(-PI / 4, PI / 4),
              newLength * 0.75
            )
          );
        }
      }
    }
  }

  update() {}

  display() {
    stroke(
      lerpColor(color(120, 180, 120), color(120, 200, 255), this.length / 200)
    );
    strokeWeight(map(this.length, 10, 350, 1, 5));
    line(
      this.startPos.x,
      this.startPos.y,
      this.currentEndPos.x,
      this.currentEndPos.y
    );
  }
}

function mousePressed() {
  let textWidthValue = textWidth("Enough ZEN for today");

  if (
    mouseX > width - textWidthValue - 20 && 
    mouseX < width - 15 &&
    mouseY > height - 30 &&
    mouseY < height - 10
  ) {
    window.open("index.html", "_self");
  }
}
