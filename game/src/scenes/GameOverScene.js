import { SCENES } from '../GameConfig.js';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME_OVER });
  }

  init(data) {
    this.data = data || {};
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;

    this.add.rectangle(0, 0, width, height, 0x0a0a1a).setOrigin(0, 0);

    this.add.text(cx, 40, 'OUPS...', {
      fontFamily: 'monospace',
      fontSize: '20px',
      color: '#FF4444',
      stroke: '#000000',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // Swann triste
    const swann = this.add.sprite(cx - 20, 100, 'swann').setScale(3);
    swann.play('swann_idle');
    swann.setTint(0x8888FF);

    const moustache = this.add.sprite(cx + 30, 108, 'moustache').setScale(3);
    moustache.play('moustache_idle');

    this.add.text(cx, 148, 'Moustache : "Mrrrow..." (= "Réessaye !")', {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#AAAACC',
      align: 'center',
      wordWrap: { width: width - 40 },
    }).setOrigin(0.5);

    this._createButton(cx, 165, '▶ RÉESSAYER', '#FFD700', () => this._retry());
    this._createButton(cx, 178, 'CARTE DU MONDE', '#AAAACC', () => this._toMap());

    this.cameras.main.fadeIn(400);
    this.input.keyboard.once('keydown-ENTER', () => this._retry());
  }

  _createButton(x, y, text, color, action) {
    const btn = this.add.text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color,
    }).setOrigin(0.5).setInteractive();
    btn.on('pointerover', () => btn.setColor('#FFFFFF'));
    btn.on('pointerout', () => btn.setColor(color));
    btn.on('pointerdown', action);
    return btn;
  }

  _retry() {
    this.cameras.main.fadeOut(400);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      const save = JSON.parse(localStorage.getItem('parcours_swann_save') || '{}');
      this.scene.start(SCENES.GAME, {
        world: save.currentWorld || 1,
        level: save.currentLevel || 1,
        levelKey: `${save.currentWorld || 1}-${save.currentLevel || 1}`,
      });
    });
  }

  _toMap() {
    this.cameras.main.fadeOut(400);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.WORLD_MAP);
    });
  }
}
