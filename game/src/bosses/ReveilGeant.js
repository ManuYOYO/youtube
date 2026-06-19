import BaseBoss from './BaseBoss.js';

export default class ReveilGeant extends BaseBoss {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss_reveil', {
      id: 'reveil',
      name: 'RÉVEIL GÉANT',
      maxHP: 6,
      scale: 3,
      actionInterval: 100,
      phases: [
        { hpThreshold: 1.0 },
        { hpThreshold: 0.67 },
        { hpThreshold: 0.33 },
      ],
    });

    this._projectiles = [];
    this._startX = x;
    this._ringing = false;
    this.body.setSize(42, 50);
    this.setOffset(0, 0);
  }

  doAction() {
    switch (this.currentPhase) {
      case 0: this._actionPhase1(); break;
      case 1: this._actionPhase2(); break;
      case 2: this._actionPhase3(); break;
    }
  }

  _actionPhase1() {
    // Lance des mini-projectiles (aiguilles)
    const r = Math.random();
    if (r < 0.5) {
      this._shootHands();
    } else {
      this._ring();
    }
  }

  _actionPhase2() {
    // Saute
    if (this.body.blocked.down && Math.random() < 0.4) {
      this._jump();
    }
    if (Math.random() < 0.3) this._shootHands();
    this._spawnMiniReveil();
  }

  _actionPhase3() {
    this._shootHands();
    if (this.body.blocked.down && Math.random() < 0.6) this._jump();
    if (Math.random() < 0.4) this._ring();
  }

  _shootHands() {
    const directions = [-1, 1];
    directions.forEach(dir => {
      const proj = this.scene.add.rectangle(this.x + dir * 20, this.y, 8, 4, 0xCC4444);
      this.scene.physics.add.existing(proj);
      proj.body.setGravityY(-700);
      proj.body.velocity.x = dir * 250;
      proj.body.velocity.y = Phaser.Math.Between(-80, 80);
      this._projectiles.push(proj);

      // Collision avec le joueur
      const coll = this.scene.physics.add.overlap(
        this.scene.player, proj,
        () => {
          this.scene.player.takeDamage(1);
          proj.destroy();
          this._projectiles = this._projectiles.filter(p => p !== proj);
          coll.destroy();
        }
      );

      this.scene.time.delayedCall(1500, () => {
        if (proj.active) {
          proj.destroy();
          this._projectiles = this._projectiles.filter(p => p !== proj);
        }
      });
    });
  }

  _ring() {
    if (this._ringing) return;
    this._ringing = true;

    // Onde de choc sonore
    for (let r = 20; r <= 100; r += 20) {
      const ring = this.scene.add.circle(this.x, this.y, r, 0xFFAA00, 0.4);
      this.scene.tweens.add({
        targets: ring,
        scaleX: 2,
        scaleY: 2,
        alpha: 0,
        duration: 600,
        delay: r * 3,
        onComplete: () => ring.destroy(),
      });
    }

    // Onde fait des dégâts si le joueur est proche
    const player = this.scene.player;
    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (dist < 120 * this.scaleX) {
      player.takeDamage(1);
    }

    this._playRingSound();
    this.scene.time.delayedCall(2000, () => { this._ringing = false; });
  }

  _jump() {
    this.setVelocityY(-400);
    this.setVelocityX(Phaser.Math.Between(-100, 100));
  }

  _spawnMiniReveil() {
    if (this._miniReveils >= 2) return;
    const mini = this.scene.add.rectangle(
      this.x + Phaser.Math.Between(-60, 60),
      this.y - 30,
      16, 16, 0xAA3333
    );
    this.scene.physics.add.existing(mini);
    mini.body.velocity.x = Phaser.Math.Between(-80, 80);
    this.scene.physics.add.overlap(
      this.scene.player, mini,
      () => {
        this.scene.player.takeDamage(1);
        mini.destroy();
      }
    );
    this.scene.time.delayedCall(3000, () => { if (mini.active) mini.destroy(); });
    this._miniReveils = (this._miniReveils || 0) + 1;
    this.scene.time.delayedCall(3100, () => { this._miniReveils = Math.max(0, (this._miniReveils || 1) - 1); });
  }

  _playRingSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      osc.frequency.exponentialRampToValueAtTime(440, actx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.12, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.5);
      osc.start();
      osc.stop(actx.currentTime + 0.5);
    } catch (e) {}
  }
}
