let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
  playerState = e.target.value;
});
console.log(playerState);

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "img/shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
////// moved to line below to line 1
// let playerState = "idle";
///////// deleted in refactor for advanced method
// let frameX = 0;
// let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;
// added for use with advanced animation
const spriteAnimations = [];
const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ///////// advanced animation method
  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );
  ///////// instructor refactored out code below after simple version completed
  //ctx.fillRect(100, 50, 100, 100);
  // sx (etc) is what we want to cut out for use, and dx (etc) is destination for what cut out
  //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
  //ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  /////////// this was the simple version (but required changing the "6" as well as the frameY every time)
  //   if (gameFrame % staggerFrames == 0) {
  //     if (frameX < 6) {
  //       frameX++;
  //     } else {
  //       frameX = 0;
  //     }
  //   }

  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
