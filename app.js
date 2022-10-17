import Wall from './wall.js';
import Vector from './vector.js';
import Raycasting from './Raycasting.js';

const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d');

const W = canvas.width = 1200,
  H = canvas.height = 600;

const mouse = new Vector(0, 0);

canvas.addEventListener('mousemove', (e) => {
  const offset = canvas.getBoundingClientRect();
  mouse.set(e.pageX - offset.left, e.pageY - offset.top);
  // console.log(mouse);
});

let walls3d = [];

const walls = [
  new Wall(
    new Vector(200, 200),
    new Vector(400, 200),
  ),
  new Wall(
    new Vector(400, 200),
    new Vector(400, 400),
  ),
  new Wall(
    new Vector(400, 400),
    new Vector(200, 400),
  ),
  new Wall(
    new Vector(200, 400),
    new Vector(200, 200),
  ),
];

// for (let i = 0; i < 15; i++) {
//   walls.push(
//     new Wall(
//       new Vector(Math.random() * W, Math.random() * H),
//       new Vector(Math.random() * W, Math.random() * H),
//     )
//   )
// }

const raycasting = new Raycasting(new Vector(300, 300));

function update() {
  raycasting.update(mouse);
  walls3d = raycasting.touch(walls);
}

function render() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  walls.forEach(wall => {
    wall.render(ctx);
  });

  raycasting.render(ctx);

  ctx.fillStyle = '#fff';
  ctx.fillRect(W / 2, 0, 1, H);

  draw3Dwall();
}

function draw3Dwall() {
  ctx.save();
  ctx.translate(W / 2, 0);
  
  const w = W / 2 / walls3d.length;

  walls3d.forEach((wall, i) => {
    ctx.fillRect(i * w + w / 2, 100, w, 100)
  });

  ctx.restore();
}

setInterval(function loop() {
  update();
  render();
}, 1000 / 30);