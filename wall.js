export default class Wall {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  render(ctx) {
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y);
    ctx.lineTo(this.b.x, this.b.y);
    ctx.closePath();
    ctx.stroke();
  }
}