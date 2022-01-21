window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  // Basic canvas data //

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 700;

  // Background image code //
  const background = new Image();
  background.src = "../images/road.png";
  background.onload = () => {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  };

  //car image file//
  const car = new Image();
  car.src = "../images/car.png";

  // wall object //

  class Item {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = -40;
      this.w = 120;
      this.h = 40;
      this.color = "brown";
    }

    move() {
      this.y = this.y + 3;
    }

    pointsEarned() {
      if (this.y === canvas.height + this.h) {
        // gameScore += 50;
        return true;
      }
    }
  }

  // Player Object //

  class Player {
    constructor() {
      this.w = 40;
      this.h = 80;
      this.x = canvas.width / 2;
      this.y = canvas.height - 100;
      this.image = car;
    }

    move(direction) {
      switch (direction) {
        case "ArrowLeft":
          if (this.x < 0) {
            this.x = 0;
          } else {
            this.x -= 15;
          }
          break;
        case "ArrowRight":
          if (this.x > canvas.width - this.w) {
            this.x = canvas.width - this.w;
          } else {
            this.x += 15;
          }
          break;
      }
    }
  }

  // declare player character //

  const driver = new Player();

  const obstcl = new Item();

  let obstclArr = [];

  // movement event listener //
  document.addEventListener("keydown", function (e) {
    switch (e.code) {
      case "ArrowLeft":
        driver.move("ArrowLeft");
        break;
      case "ArrowRight":
        driver.move("ArrowRight");
        break;
    }
  });

  function createObj() {
    obstclArr.push(new Item());
  }

  // Start Game Fnction //
  function startGame() {
    setInterval(createObj, 4000);
    animate();
  }

  let gameScore = 0;
  let life = 3;
  let game;

  // Animate function//

  function animate() {
    game = window.requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, driver.x, driver.y, driver.w, driver.h);
    ctx.font = "bold 48px arial";
    ctx.fillText(`Score = ${gameScore}`, 50, 100);

    // for loop //
    for (let i = 0; i < obstclArr.length; i++) {
      ctx.fillStyle = obstclArr[i].color;
      obstclArr[i].move();
      ctx.fillRect(
        obstclArr[i].x,
        obstclArr[i].y,
        obstclArr[i].w,
        obstclArr[i].h
      );
      didCollide = detectCollision(driver, obstclArr[i]);
      if (didCollide) {
        life--;
        console.log("COLLISION");
        obstclArr.splice(i, 1);
      }
      pointTaker = obstclArr[i].pointsEarned();
      if (pointTaker) {
        obstclArr.splice(i, 1);
        gameScore += 50;
      }
    }

    if (life === 0) {
      console.log("Game Over!");
      window.cancelAnimationFrame(game);
    }
  }

  function detectCollision(player, obj) {
    if (
      player.x < obj.x + obj.w &&
      player.x + player.w > obj.x &&
      player.y < obj.y + obj.h &&
      player.y + player.h > obj.y
    ) {
      return true;
    } else {
      return false;
    }
  }
};
