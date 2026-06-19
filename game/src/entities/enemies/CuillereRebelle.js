import BaseEnemy from './BaseEnemy.js';

export default class CuillereRebelle extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'cuillere', { hp: 1, damage: 1, speed: 70, points: 10 });
    this.body.setSize(8, 14);
    this.play('cuillere_walk');
  }

  patrol() {
    this.setVelocityX(this.speed * this.direction);
    if (this.body.blocked.right || this.body.blocked.left) {
      this.direction *= -1;
      this.setFlipX(this.direction < 0);
    }
    // Saute aléatoirement
    if (this.body.blocked.down && Math.random() < 0.005) {
      this.setVelocityY(-300);
    }
  }
}
