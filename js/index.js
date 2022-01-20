window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

// Basic canvas data //

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 500;
  canvas.height = 700;



// Background image code //
  const background = new Image();
  background.src = '../images/road.png';
  background.onload = () => {
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  }


  //car image file//
  const car = new Image();
  car.src = "../images/car.png";

// Player Object //

class Player{
  constructor () {
    this.w = 40;
    this.h = 80;
    this.x = canvas.width/2;
    this.y = canvas.height - 100;
    this.image = car
  }

  move(direction){
    switch(direction){
      case "ArrowLeft":
        if(this.x < 0){
          this.x = 0;
        } else {
          this.x -=10
        }
        break;
      case "ArrowRight":
        if(this.x > canvas.width-this.w){
          this.x = canvas.width-this.w;
        } else {
          this.x +=10
        }
        break;
    }
  }
}


// declare player character //

const driver = new Player ();


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



// Start Game Fnction //
  function startGame() {
    animate();
  }

function animate () {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(car, driver.x, driver.y, driver.w, driver.h);  
}
}

