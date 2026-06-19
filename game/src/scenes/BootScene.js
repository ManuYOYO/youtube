import { SCENES } from '../GameConfig.js';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT });
  }

  preload() {
    // Chargement minimal pour l'écran de chargement
    this.createLoadingScreen();
  }

  createLoadingScreen() {
    const { width, height } = this.scale;
    const bg = this.add.rectangle(0, 0, width, height, 0x0a0a1a).setOrigin(0, 0);

    this.loadingText = this.add.text(width / 2, height / 2, 'CHARGEMENT...', {
      fontFamily: 'monospace',
      fontSize: '24px',
      color: '#FF6B9D',
      align: 'center',
    }).setOrigin(0.5);

    this.dotTimer = this.time.addEvent({
      delay: 400,
      callback: this.animateDots,
      callbackScope: this,
      loop: true,
    });
  }

  animateDots() {
    const dots = (this.dotCount || 0) % 4;
    this.loadingText.setText('CHARGEMENT' + '.'.repeat(dots));
    this.dotCount = (this.dotCount || 0) + 1;
  }

  create() {
    this.dotTimer.destroy();
    this.scene.start(SCENES.PRELOAD);
  }
}
