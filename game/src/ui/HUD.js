import { EVENTS, GAME_CONFIG } from '../GameConfig.js';

export default class HUD {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this._elements = [];
    this._heartSprites = [];
    this._woolDots = [];
    this._reflectDots = [];
    this._worldText = null;
    this._levelText = null;
    this._timerText = null;
    this._timerActive = false;
    this._timerValue = 0;

    this._build();
    this._bindEvents();
  }

  _build() {
    const sx = 0; // scrollFactor = 0 (HUD fixe)
    const depth = 150;

    // Fond du HUD
    this._hudBg = this.scene.add.rectangle(0, 0, this.scene.scale.width, 28, 0x000000, 0.6)
      .setScrollFactor(0).setDepth(depth - 1).setOrigin(0, 0);

    // Cœurs
    this._heartLabel = this._txt(8, 4, '♥', '#FF6B9D', 10, depth);
    for (let i = 0; i < this.player.stats.maxHearts; i++) {
      const h = this.scene.add.sprite(22 + i * 14, 10, 'heart', 0)
        .setScrollFactor(0).setDepth(depth).setScale(1.5);
      this._heartSprites.push(h);
    }

    // Étoiles
    this._starIcon = this.scene.add.sprite(90, 10, 'star_rose', 0)
      .setScrollFactor(0).setDepth(depth).setScale(1.5);
    this._starIcon.play('star_spin');
    this._starText = this._txt(101, 4, '000', '#FFD700', 9, depth);

    // Pelotes de laine
    this._woolLabel = this._txt(148, 4, '🧶', '#9B59B6', 9, depth);
    for (let i = 0; i < 5; i++) {
      const dot = this.scene.add.circle(163 + i * 10, 10, 3, 0x9B59B6)
        .setScrollFactor(0).setDepth(depth);
      this._woolDots.push(dot);
    }

    // Réflexion Éclair
    this._reflectLabel = this._txt(220, 4, '⚡', '#4FC3F7', 9, depth);
    for (let i = 0; i < 3; i++) {
      const dot = this.scene.add.circle(234 + i * 10, 10, 3, 0x4FC3F7)
        .setScrollFactor(0).setDepth(depth);
      this._reflectDots.push(dot);
    }

    // Bonnes Actions
    this._baIcon = this.scene.add.sprite(272, 10, 'bonne_action', 0)
      .setScrollFactor(0).setDepth(depth).setScale(1.5);
    this._baText = this._txt(282, 4, 'BA:0', '#FFE135', 9, depth);

    // Monde / Niveau (en bas)
    this._worldLabel = this._txt(8, this.scene.scale.height - 16, '', '#AAAACC', 8, depth);

    // Timer (visible dans le monde 6)
    this._timerText = this._txt(
      this.scene.scale.width / 2, 4,
      '', '#FF6B9D', 10, depth
    ).setOrigin(0.5, 0).setVisible(false);
  }

  _txt(x, y, text, color, size, depth) {
    return this.scene.add.text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: `${size}px`,
      color,
    }).setScrollFactor(0).setDepth(depth);
  }

  _bindEvents() {
    this.scene.events.on(EVENTS.PLAYER_HURT, (hearts) => this._updateHearts(hearts));
    this.scene.events.on(EVENTS.HEART_COLLECT, (hearts) => this._updateHearts(hearts));
    this.scene.events.on(EVENTS.STAR_COLLECT, (count) => this._updateStars(count));
    this.scene.events.on(EVENTS.BA_COLLECT, (count) => this._updateBA(count));
    this.scene.events.on(EVENTS.WOOL_COLLECT, (count) => this._updateWool(count));
    this.scene.events.on(EVENTS.REFLECT_ACTIVATE, () => this._updateReflect());
    this.scene.events.on(EVENTS.REFLECT_END, () => this._updateReflect());
  }

  _updateHearts(count) {
    this._heartSprites.forEach((h, i) => {
      h.setFrame(i < count ? 0 : 1);
      if (i < count) {
        h.setTint(0xFF4444);
      } else {
        h.setTint(0x444444);
      }
    });
  }

  _updateStars(count) {
    this._starText.setText(String(count).padStart(3, '0'));
    // Petit flash
    this.scene.tweens.add({
      targets: this._starText,
      scaleX: 1.3, scaleY: 1.3,
      duration: 100,
      yoyo: true,
    });
  }

  _updateBA(count) {
    this._baText.setText(`BA:${count}`);
    this.scene.tweens.add({
      targets: this._baIcon,
      angle: 360,
      duration: 300,
    });
  }

  _updateWool(count) {
    this._woolDots.forEach((d, i) => {
      d.setFillStyle(i < count ? 0x9B59B6 : 0x444444);
    });
  }

  _updateReflect() {
    const charges = this.scene.player.stats.reflectCharges;
    this._reflectDots.forEach((d, i) => {
      d.setFillStyle(i < charges ? 0x4FC3F7 : 0x224455);
    });
  }

  setWorldInfo(world, level) {
    this._worldLabel.setText(`MONDE ${world} - NIVEAU ${level}`);
  }

  showTimer(seconds) {
    this._timerActive = true;
    this._timerValue = seconds;
    this._timerText.setVisible(true);
    this._updateTimer();
  }

  _updateTimer() {
    if (!this._timerActive) return;
    const mins = Math.floor(this._timerValue / 60);
    const secs = this._timerValue % 60;
    this._timerText.setText(`⏱ ${mins}:${String(secs).padStart(2, '0')}`);
    const color = this._timerValue > 30 ? '#FFFFFF' : '#FF4444';
    this._timerText.setColor(color);
  }

  tickTimer() {
    if (!this._timerActive || this._timerValue <= 0) return;
    this._timerValue--;
    this._updateTimer();
    if (this._timerValue <= 0) {
      this._timerActive = false;
      this.scene.events.emit('timer_expired');
    }
  }

  update() {
    // Mise à jour en continu si nécessaire
  }

  destroy() {
    [this._hudBg, this._heartLabel, ...this._heartSprites,
     this._starIcon, this._starText, this._woolLabel, ...this._woolDots,
     this._reflectLabel, ...this._reflectDots, this._baIcon, this._baText,
     this._worldLabel, this._timerText].forEach(e => { if (e) e.destroy(); });
  }
}
