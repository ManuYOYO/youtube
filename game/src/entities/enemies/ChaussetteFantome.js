import BaseEnemy from './BaseEnemy.js';

export default class ChaussetteFantome extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'chaussette', { hp: 1, damage: 1, speed: 50, points: 10 });
    this.body.setAllowGravity(false);
    this.body.setSize(12, 10);
    this._startY = y;
    this._time = Math.random() * Math.PI * 2;
    this.play('chaussette_float');
  }

  patrol() {
    this._time += 0.04;
    // Vol en zigzag
    this.setVelocityX(this.speed * this.direction);
    this.y = this._startY + Math.sin(this._time) * 20;

    if (this.body.blocked.right || this.x > this.scene.scale.width + 50) {
      this.direction = -1;
      this.setFlipX(true);
    }
    if (this.body.blocked.left || this.x < -50) {
      this.direction = 1;
      this.setFlipX(false);
    }
  }
}
