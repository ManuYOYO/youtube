import BaseEnemy from './BaseEnemy.js';

export default class GlaconSauteur extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'glacon', { hp: 1, damage: 1, speed: 0, points: 10 });
    this.body.setSize(8, 12);
    this._jumpTimer = 0;
    this._jumpInterval = Phaser.Math.Between(60, 120);
    this.play('glacon_idle');
  }

  patrol() {
    this._jumpTimer++;
    if (this._jumpTimer >= this._jumpInterval && this.body.blocked.down) {
      this.setVelocityY(-380);
      this.setVelocityX(Phaser.Math.Between(-80, 80));
      this._jumpTimer = 0;
      this._jumpInterval = Phaser.Math.Between(60, 120);
    }
  }
}
