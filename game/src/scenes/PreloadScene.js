import { SCENES } from '../GameConfig.js';
import SpriteGenerator from '../systems/SpriteGenerator.js';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.PRELOAD });
  }

  preload() {
    this.createProgressBar();
  }

  createProgressBar() {
    const { width, height } = this.scale;
    const cx = width / 2;
    const cy = height / 2;

    this.add.rectangle(0, 0, width, height, 0x0a0a1a).setOrigin(0, 0);

    this.add.text(cx, cy - 60, 'LE PARCOURS DE SWANN', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#FF6B9D',
    }).setOrigin(0.5);

    const barBg = this.add.rectangle(cx, cy, 300, 20, 0x333355).setOrigin(0.5);
    this.barFill = this.add.rectangle(cx - 150, cy, 0, 18, 0xFF6B9D).setOrigin(0, 0.5);
    this.barFill.x = cx - 150;

    this.loadText = this.add.text(cx, cy + 30, '', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#888899',
    }).setOrigin(0.5);

    this.load.on('progress', (value) => {
      this.barFill.width = 300 * value;
    });

    this.load.on('fileprogress', (file) => {
      this.loadText.setText('Chargement: ' + file.key);
    });
  }

  create() {
    // Génère les sprites procéduralement (pixel art généré en code)
    const gen = new SpriteGenerator(this);
    gen.generateAll();

    this.time.delayedCall(300, () => {
      this.scene.start(SCENES.MENU);
    });
  }
}
