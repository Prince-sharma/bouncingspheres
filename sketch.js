let angle = 0;
let side = 400;

let b = [];
let N = 5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // colorMode(HSB);
  for (i = 0; i < N; i++) {
    let ptz = createVector(random(-100,100), random(-100,100), random(-100,100));
    let vel = createVector(random(1, 2), random(1.5, 2.5), random(1, 1.5));
    let r = random(30, 50);
    b[i] = new Ball(ptz, vel, r);
  }
}

function draw() {
  background(220);
  fill(200, 255, 255);
  noFill();
  rotateX(angle);
  rotateY(angle);
  rotateZ(angle);
  box(side);

  for (i = 0; i < b.length; i++) {
    for (j = 0; j < b.length; j++) {
      if (i != j) {
        b[i].checkCollision(b[j]);
        // b[i].vel = b[i].vel.mult(-1);
      }
    }
    push();
    b[i].move();
    b[i].render();
    pop();
  }

  angle += 0.01;
}

class Ball {
  constructor(ptz, vel, r) {
    this.ptz = ptz;
    this.vel = vel;
    this.r = r;
  }

  move() {
    if (this.ptz.x > side / 2 - this.r || this.ptz.x < -side / 2 + this.r) {
      this.vel.x = -1 * this.vel.x;
    }
    if (this.ptz.y > side / 2 - this.r || this.ptz.y < -side / 2 + this.r) {
      this.vel.y = -1 * this.vel.y;
    }
    if (this.ptz.z > side / 2 - this.r || this.ptz.z < -side / 2 + this.r) {
      this.vel.z = -1 * this.vel.z;
    }
    translate(this.ptz);

    this.ptz.add(this.vel);
  }

  render() {
    sphere(this.r);
  }

  checkCollision(a) {
    if (this.ptz.dist(a.ptz) < this.r + a.r) {
      this.vel.mult(-1);
      a.vel.mult(-1);
    }
  }
}
