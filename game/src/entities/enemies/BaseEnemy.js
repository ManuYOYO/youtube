export default class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = config.hp || 1;
    this.maxHP = this.hp;
    this.damage = config.damage || 1;
    this.speed = config.speed || 60;
    this.pointValue = config.points || 10;
    this.direction = config.direction || 1;
    this._alive = true;

    this.setScale(2);
    this.setDepth(8);
    this.setCollideWorldBounds(true);
    this.body.setGravityY(200);
  }

  update() {
    if (!this._alive) return;
    this.patrol();
  }

  patrol() {
    this.setVelocityX(this.speed * this.direction);
    if (this.body.blocked.right || this.body.blocked.left) {
      this.direction *= -1;
      this.setFlipX(this.direction < 0);
    }
  }

  takeDamage(amount = 1) {
    if (!this._alive) return;
    this.hp -= amount;
    this.scene.cameras.main.shake(80, 0.004);

    // Flash blanc
    this.setTintFill(0xFFFFFF);
    this.scene.time.delayedCall(80, () => {
      if (this.scene && this.active) this.clearTint();
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this._alive = false;
    this.disableBody(true, false);

    // Effet de mort : rebond et disparition
    this.scene.tweens.add({
      targets: this,
      y: this.y - 20,
      alpha: 0,
      scaleX: 3,
      scaleY: 0,
      duration: 400,
      ease: 'Back.easeIn',
      onComplete: () => {
        if (this.scene) {
          // Spawn des étoiles
          this._dropItems();
        }
        this.destroy();
      },
    });

    // Petit son de victoire
    this._playDeathSound();
  }

  _dropItems() {
    // 30% de chance de dropper une pelote
    if (Math.random() < 0.3) {
      const wool = this.scene.collectables?.woolGroup?.create(this.x, this.y - 10, 'wool_ball');
      if (wool) {
        wool.setScale(2);
        wool.setVelocity(Phaser.Math.Between(-60, 60), -150);
        wool.body.setGravityY(200);
      }
    }
  }

  _playDeathSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, actx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.06, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.3);
      osc.start();
      osc.stop(actx.currentTime + 0.3);
    } catch (e) {}
  }
}
