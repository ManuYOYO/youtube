import { EVENTS } from '../GameConfig.js';

export default class BaseBoss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.bossId = config.id || 'boss';
    this.maxHP = config.maxHP || 6;
    this.currentHP = this.maxHP;
    this.phases = config.phases || [{ hpThreshold: 0 }];
    this.currentPhase = 0;
    this._alive = true;
    this._vulnerable = true;
    this._actionTimer = 0;
    this._actionInterval = config.actionInterval || 120;

    this.setScale(config.scale || 3);
    this.setDepth(8);
    this.setCollideWorldBounds(true);

    // Barre de vie
    this._createHealthBar(scene, config);
    this._createNameTag(scene, config.name || 'BOSS');
  }

  _createHealthBar(scene, config) {
    const barW = 200;
    const barH = 12;
    const cx = scene.scale.width / 2;
    const y = 24;

    this._hpBarBg = scene.add.rectangle(cx, y, barW + 4, barH + 4, 0x333333)
      .setScrollFactor(0).setDepth(100);
    this._hpBar = scene.add.rectangle(cx - barW / 2, y, barW, barH, 0xFF4444)
      .setScrollFactor(0).setDepth(101).setOrigin(0, 0.5);
    this._hpText = scene.add.text(cx, y - 14, '', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#FFFFFF',
    }).setScrollFactor(0).setDepth(101).setOrigin(0.5);
  }

  _createNameTag(scene, name) {
    const cx = scene.scale.width / 2;
    this._nameTag = scene.add.text(cx, 10, name, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0).setDepth(101).setOrigin(0.5);
  }

  _updateHealthBar() {
    const ratio = this.currentHP / this.maxHP;
    const barW = 200;
    const cx = this.scene.scale.width / 2;
    this._hpBar.width = barW * ratio;
    this._hpBar.x = cx - barW / 2;
    const color = ratio > 0.6 ? 0x44FF44 : ratio > 0.3 ? 0xFFAA00 : 0xFF4444;
    this._hpBar.setFillStyle(color);
    this._hpText.setText(`${this.currentHP} / ${this.maxHP}`);
  }

  update() {
    if (!this._alive) return;
    this._actionTimer++;
    if (this._actionTimer >= this._actionInterval) {
      this._actionTimer = 0;
      this.doAction();
    }
    this._updateHealthBar();
  }

  doAction() {
    // Override dans les sous-classes
  }

  takeDamage(amount = 1) {
    if (!this._alive || !this._vulnerable) return;
    this.currentHP = Math.max(0, this.currentHP - amount);
    this._updateHealthBar();

    // Flash
    this.setTintFill(0xFFFFFF);
    this.scene.time.delayedCall(100, () => {
      if (this.active) this.clearTint();
    });
    this.scene.cameras.main.shake(150, 0.006);
    this._playHitSound();

    // Phase suivante ?
    const nextPhase = this.phases[this.currentPhase + 1];
    if (nextPhase && this.currentHP <= nextPhase.hpThreshold * this.maxHP) {
      this.currentPhase++;
      this._onPhaseChange(this.currentPhase);
    }

    if (this.currentHP <= 0) {
      this._defeat();
    }
  }

  _onPhaseChange(phase) {
    // Shake + flash rouge
    this.scene.cameras.main.shake(400, 0.015);
    this.setTintFill(0xFF0000);
    this.scene.time.delayedCall(300, () => {
      if (this.active) this.clearTint();
    });
    // Accélérer les actions
    this._actionInterval = Math.max(60, this._actionInterval - 20);
  }

  _defeat() {
    this._alive = false;
    this._vulnerable = false;
    this.disableBody(true, false);

    // Destruction spectaculaire
    this.scene.cameras.main.shake(600, 0.02);
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      angle: 720,
      alpha: 0,
      duration: 800,
      ease: 'Back.easeIn',
      onComplete: () => {
        this._cleanUI();
        this.scene.events.emit(EVENTS.BOSS_DEFEATED, this.bossId);
        this.destroy();
      },
    });

    // Explosion de particules
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const star = this.scene.add.circle(
        this.x + Math.cos(angle) * 10,
        this.y + Math.sin(angle) * 10,
        4, 0xFFD700
      );
      this.scene.tweens.add({
        targets: star,
        x: star.x + Math.cos(angle) * 80,
        y: star.y + Math.sin(angle) * 80,
        alpha: 0,
        scaleX: 0, scaleY: 0,
        duration: 600,
        ease: 'Power2',
        delay: i * 30,
        onComplete: () => star.destroy(),
      });
    }

    this._playDefeatSound();
  }

  _cleanUI() {
    [this._hpBarBg, this._hpBar, this._hpText, this._nameTag].forEach(obj => {
      if (obj) obj.destroy();
    });
  }

  _playHitSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = 220;
      osc.frequency.exponentialRampToValueAtTime(110, actx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.15);
      osc.start();
      osc.stop(actx.currentTime + 0.15);
    } catch (e) {}
  }

  _playDefeatSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523, 659, 784, 1047, 784, 659, 523];
      notes.forEach((freq, i) => {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        const t = actx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    } catch (e) {}
  }
}
