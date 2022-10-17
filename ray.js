export default class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    // this.dir = dir;
    this.angle = angle;
  }

  touch(wall) {
    const x1 = wall.a.x,
          x2 = wall.b.x,
          x3 = this.pos.x,
          x4 = this.pos.x + Math.cos(this.angle / Math.PI * 180),
          y1 = wall.a.y,
          y2 = wall.b.y,
          y3 = this.pos.y,
          y4 = this.pos.y + Math.sin(this.angle / Math.PI * 180);

    const den = ((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4));

    if (den == 0) {
      return;
    }
          
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      const x = x1 + t * (x2 - x1);
      const y = y1 + t * (y2 - y1);
      return {x, y};
    } else {
      return;
    }
 }

  lookAt(angle) {
    this.angle = angle;
  }

  update(newPos) {
    this.pos = newPos;
  }

  render(ctx) {
    const dx = this.pos.x + Math.cos(this.angle * Math.PI / 180) * 50,
          dy = this.pos.y + Math.sin(this.angle * Math.PI / 180) * 50;
          
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.pos.x, this.pos.y);
    ctx.lineTo(dx, dy);
    ctx.closePath();
    ctx.stroke();
  }
}