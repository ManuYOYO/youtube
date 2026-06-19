import BaseEnemy from './BaseEnemy.js';

export default class PigeonParc extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'pigeon', { hp: 1, damage: 1, speed: 120, points: 10 });
    this.body.setAllowGravity(false);
    this.body.setSize(14, 10);
    this._startY = y;
    this._time = Math.random() * Math.PI * 2;
    this._aggroRange = 80;
    this._charging = false;
    this.play('pigeon_fly');
  }

  patrol() {
    const player = this.scene.player;
    if (!player) return;

    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (dist < this._aggroRange && !this._charging) {
      this._charging = true;
      const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
      this.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
      this.scene.time.delayedCall(600, () => {
        this._charging = false;
        this.setVelocity(0, 0);
      });
    } else if (!this._charging) {
      this._time += 0.03;
      this.setVelocityX(this.speed * this.direction);
      this.y = this._startY + Math.sin(this._time) * 15;
      if (this.x > this.scene.scale.width + 20) this.direction = -1;
      if (this.x < -20) this.direction = 1;
      this.setFlipX(this.direction < 0);
    }
  }
}
