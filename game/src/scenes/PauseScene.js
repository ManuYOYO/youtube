import { SCENES } from '../GameConfig.js';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PAUSE });
  }

  init(data) {
    this.gameData = data || {};
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    // Overlay sombre
    this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0, 0);

    // Boîte pause
    this.add.rectangle(cx, cy, 160, 120, 0x1A1A3A).setOrigin(0.5);
    this.add.rectangle(cx, cy, 158, 118, 0x000000, 0).setOrigin(0.5)
      .setStrokeStyle(2, 0xFF6B9D);

    this.add.text(cx, cy - 50, '— PAUSE —', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#FF6B9D',
    }).setOrigin(0.5);

    const items = [
      { label: 'CONTINUER', action: () => this._resume() },
      { label: 'MENU PRINCIPAL', action: () => this._toMenu() },
    ];

    items.forEach((item, i) => {
      const btn = this.add.text(cx, cy - 15 + i * 22, item.label, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: i === 0 ? '#FFD700' : '#AAAACC',
      }).setOrigin(0.5).setInteractive();

      btn.on('pointerover', () => btn.setColor('#FFFFFF'));
      btn.on('pointerout', () => btn.setColor(i === 0 ? '#FFD700' : '#AAAACC'));
      btn.on('pointerdown', item.action);
    });

    this.input.keyboard.once('keydown-P', () => this._resume());
    this.input.keyboard.once('keydown-ESC', () => this._resume());
  }

  _resume() {
    this.scene.resume(SCENES.GAME);
    this.scene.stop();
  }

  _toMenu() {
    this.scene.stop(SCENES.GAME);
    this.scene.stop();
    this.scene.start(SCENES.MENU);
  }
}
