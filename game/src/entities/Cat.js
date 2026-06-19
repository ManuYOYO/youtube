import { EVENTS } from '../GameConfig.js';

export default class Cat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    super(scene, player.x - 20, player.y, 'moustache');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.player = player;
    this.setScale(2);
    this.setDepth(9);
    this.body.setSize(12, 10);
    this.body.setOffset(2, 2);
    this.body.setGravityY(-400); // Suit le joueur sans trop de gravité
    this.setCollideWorldBounds(true);

    this._following = true;
    this._attacking = false;
    this._projectile = null;

    this.play('moustache_idle');

    scene.events.on(EVENTS.CAT_ATTACK, this.launch, this);
  }

  update() {
    if (this._attacking) return;

    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 40) {
      // Rattraper le joueur
      this.setVelocityX(dx * 3);
      this.setVelocityY(dy * 3);
      this.setFlipX(dx < 0);
      this.play('moustache_run', true);
    } else {
      this.setVelocity(0);
      this.setFlipX(!this.player.state.facingRight);
      this.play('moustache_idle', true);
    }
  }

  launch(facingRight) {
    if (this._attacking) return;
    this._attacking = true;

    const direction = facingRight ? 1 : -1;
    const startX = this.player.x + direction * 20;
    const startY = this.player.y - 5;

    // Pelote de laine projectile
    this._projectile = this.scene.add.circle(startX, startY, 5, 0x9B59B6, 1);
    this._projectile.setDepth(11);
    this.scene.physics.add.existing(this._projectile);
    this._projectile.body.setGravityY(-700);
    this._projectile.body.velocity.x = direction * 400;

    // Traîne lumineuse
    const trail = this.scene.add.circle(startX, startY, 3, 0xC39BD3, 0.6);
    this.scene.tweens.add({
      targets: trail,
      scaleX: 0, scaleY: 0,
      alpha: 0,
      duration: 300,
      onComplete: () => trail.destroy(),
    });

    // Joue l'animation d'attaque
    this.play('moustache_attack', true);

    // Notifie la GameScene que le projectile existe
    this.scene.events.emit('cat_projectile', this._projectile);

    // Nettoie après 800ms si pas de collision
    this.scene.time.delayedCall(800, () => {
      this._cleanProjectile();
    });
  }

  _cleanProjectile() {
    if (this._projectile) {
      this._projectile.destroy();
      this._projectile = null;
    }
    this._attacking = false;
    this.play('moustache_idle', true);
    this.scene.time.delayedCall(300, () => {
      this.play('moustache_happy', true);
    });
  }

  hitEnemy() {
    this._cleanProjectile();
    // Petit effet de succès
    this.play('moustache_happy', true);
    this.scene.time.delayedCall(600, () => {
      this.play('moustache_idle', true);
    });
  }

  destroy() {
    this.scene.events.off(EVENTS.CAT_ATTACK, this.launch, this);
    super.destroy();
  }
}
