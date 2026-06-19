import BaseBoss from './BaseBoss.js';

export default class GrillePainFurieux extends BaseBoss {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss_grillePain', {
      id: 'grillePain',
      name: 'GRILLE-PAIN FURIEUX',
      maxHP: 5,
      scale: 3,
      actionInterval: 90,
      phases: [
        { hpThreshold: 1.0 },
        { hpThreshold: 0.6 },
        { hpThreshold: 0.3 },
      ],
    });

    this._toasts = [];
    this._startX = x;
    this._jumping = false;
    this.body.setSize(36, 56);
  }

  doAction() {
    switch (this.currentPhase) {
      case 0: this._actionPhase1(); break;
      case 1: this._actionPhase2(); break;
      case 2: this._actionPhase3(); break;
    }
  }

  _actionPhase1() {
    if (Math.random() < 0.7) this._shootToast();
    else this._shootFlame(false);
  }

  _actionPhase2() {
    this._shootToast();
    if (!this._jumping && Math.random() < 0.4) this._jumpToSide();
    if (Math.random() < 0.3) this._shootFlame(false);
  }

  _actionPhase3() {
    this._shootToast(true);
    this._shootFlame(true);
    if (!this._jumping && Math.random() < 0.5) this._jumpToSide();
  }

  _shootToast(flaming = false) {
    const color = flaming ? 0xFF4400 : 0xD4A96A;
    const toast = this.scene.add.rectangle(this.x, this.y - 20, 12, 8, color);
    this.scene.physics.add.existing(toast);
    toast.body.setGravityY(200);
    const dir = this.x > this.scene.scale.width / 2 ? -1 : 1;
    toast.body.velocity.x = dir * Phaser.Math.Between(100, 200);
    toast.body.velocity.y = -300;

    this._toasts.push(toast);

    const coll = this.scene.physics.add.overlap(this.scene.player, toast, () => {
      this.scene.player.takeDamage(flaming ? 2 : 1);
      this._destroyToast(toast);
      coll.destroy();
    });

    this.scene.time.delayedCall(2500, () => {
      this._destroyToast(toast);
    });

    // Flammes si phase 3
    if (flaming) {
      const flame = this.scene.add.circle(toast.x, toast.y, 8, 0xFF6600, 0.7);
      this.scene.tweens.add({
        targets: flame,
        x: `+=${dir * 10}`,
        alpha: 0,
        scaleX: 2,
        scaleY: 2,
        duration: 400,
        onComplete: () => flame.destroy(),
      });
    }
  }

  _destroyToast(toast) {
    if (!toast.active) return;
    // Particules de miettes
    for (let i = 0; i < 5; i++) {
      const crumb = this.scene.add.circle(toast.x, toast.y, 2, 0xD4A96A);
      this.scene.physics.add.existing(crumb);
      crumb.body.velocity.x = Phaser.Math.Between(-80, 80);
      crumb.body.velocity.y = Phaser.Math.Between(-100, -40);
      this.scene.time.delayedCall(500, () => crumb.destroy());
    }
    toast.destroy();
    this._toasts = this._toasts.filter(t => t !== toast);
  }

  _shootFlame(both = false) {
    const dirs = both ? [-1, 1] : [this.x > this.scene.scale.width / 2 ? -1 : 1];
    dirs.forEach(dir => {
      for (let i = 0; i < 4; i++) {
        const flame = this.scene.add.circle(
          this.x + dir * (20 + i * 20),
          this.y + 10,
          10 - i * 2,
          Phaser.Display.Color.Interpolate.ColorWithColor(
            Phaser.Display.Color.ValueToColor(0xFF6600),
            Phaser.Display.Color.ValueToColor(0xFFDD00),
            4, i
          ).color,
          0.8 - i * 0.15
        );

        // Dommage si joueur touche la flamme
        const coll = this.scene.physics.add.overlap(this.scene.player, flame, () => {
          this.scene.player.takeDamage(1);
          coll.destroy();
        });

        this.scene.time.delayedCall(600, () => {
          flame.destroy();
          if (coll.active) coll.destroy();
        });
      }
    });
  }

  _jumpToSide() {
    if (this._jumping) return;
    this._jumping = true;
    const targetX = this.x > this.scene.scale.width / 2
      ? this.scene.scale.width * 0.25
      : this.scene.scale.width * 0.75;
    this.setVelocityY(-350);
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      duration: 600,
      ease: 'Power2',
    });
    this.scene.time.delayedCall(700, () => { this._jumping = false; });
  }
}
