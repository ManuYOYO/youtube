import BaseEnemy from './BaseEnemy.js';

export default class FauteOrthographe extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'faute', { hp: 1, damage: 1, speed: 100, points: 15 });
    this.body.setAllowGravity(false);
    this.body.setSize(10, 10);
    this._time = 0;
    this._startX = x;
    this._startY = y;
    this.play('faute_fly');
  }

  patrol() {
    this._time += 0.06;
    // Trajectoire sinusoïdale
    this.x = this._startX - this._time * this.speed * 0.016;
    this.y = this._startY + Math.sin(this._time) * 30;

    if (this.x < -50) {
      this.x = this._startX;
      this._time = 0;
    }
  }
}
