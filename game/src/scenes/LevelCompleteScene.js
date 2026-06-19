import { SCENES } from '../GameConfig.js';

// Mapping niveau → niveau suivant
const NEXT_LEVEL = {
  '1-1': { world: 1, level: 'boss', key: '1-boss' },
  '1-boss': { world: 2, level: 1, key: '2-1' },
  '2-1': { world: 2, level: 'boss', key: '2-boss' },
  '2-boss': { world: 3, level: 1, key: '3-1' },
  '3-1': { world: 3, level: 'boss', key: '3-boss', fallback: '4-1' },
  '4-1': { world: 4, level: 'boss', key: '4-boss', fallback: '5-1' },
  '5-1': { world: 5, level: 'boss', key: '5-boss', fallback: '6-1' },
  '6-1': { world: 6, level: 'final', key: 'ending' },
};

export default class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.LEVEL_COMPLETE });
  }

  init(data) {
    this.data = data;
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;

    // Fond
    this.add.rectangle(0, 0, width, height, 0x0a0a1a, 0.9).setOrigin(0, 0);

    // Titre
    const title = this.add.text(cx, 30, '✨ NIVEAU TERMINÉ ! ✨', {
      fontFamily: 'monospace',
      fontSize: '16px',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 3,
    }).setOrigin(0.5);

    this.tweens.add({
      targets: title,
      scaleX: 1.05, scaleY: 1.05,
      duration: 600,
      yoyo: true,
      repeat: -1,
    });

    // Stats
    const stats = [
      `⭐ Étoiles : ${this.data.stars || 0}`,
      `💛 Bonnes Actions : ${this.data.goodActions || 0}`,
      `❤️  Cœurs restants : ${this.data.hearts || 0}`,
    ];

    stats.forEach((stat, i) => {
      this.add.text(cx, 70 + i * 22, stat, {
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#FFFFFF',
      }).setOrigin(0.5);
    });

    // Boutons
    const nextData = NEXT_LEVEL[this.data.levelKey];

    const btnContinue = this._createButton(cx, 155, 'CONTINUER ▶', '#FFD700', () => {
      if (nextData) {
        if (nextData.key === 'ending') {
          this.cameras.main.fadeOut(500);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(SCENES.ENDING, {
              stars: this.data.stars,
              goodActions: this.data.goodActions,
            });
          });
        } else {
          const key = nextData.key;
          const avail = key in (window._LEVELS_AVAILABLE || { '1-1': true, '1-boss': true, '2-1': true, '2-boss': true, '3-1': true, '4-1': true, '5-1': true, '6-1': true });
          this.cameras.main.fadeOut(500);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(SCENES.GAME, {
              world: nextData.world,
              level: nextData.level,
              levelKey: avail ? key : (nextData.fallback || '6-1'),
            });
          });
        }
      }
    });

    this._createButton(cx, 175, 'CARTE DU MONDE', '#AAAACC', () => {
      this.cameras.main.fadeOut(400);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.WORLD_MAP, {
          stars: this.data.stars,
          goodActions: this.data.goodActions,
        });
      });
    });

    // Swann qui danse
    const swann = this.add.sprite(cx, 120, 'swann').setScale(3);
    swann.play('swann_idle');
    const moustache = this.add.sprite(cx + 30, 128, 'moustache').setScale(3);
    moustache.play('moustache_happy');

    // Confettis
    this._spawnConfetti();

    this.cameras.main.fadeIn(400);

    // ENTRÉE pour continuer
    this.input.keyboard.once('keydown-ENTER', () => btnContinue.emit('pointerdown'));
  }

  _createButton(x, y, text, color, action) {
    const btn = this.add.text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: '11px',
      color,
    }).setOrigin(0.5).setInteractive();

    btn.on('pointerover', () => btn.setColor('#FFFFFF'));
    btn.on('pointerout', () => btn.setColor(color));
    btn.on('pointerdown', action);
    return btn;
  }

  _spawnConfetti() {
    const colors = [0xFF6B9D, 0xFFD700, 0x4FC3F7, 0x9B59B6, 0xFF4444];
    for (let i = 0; i < 30; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const color = colors[i % colors.length];
      const c = this.add.rectangle(x, -10, 4, 8, color);
      this.tweens.add({
        targets: c,
        y: this.scale.height + 20,
        x: x + Phaser.Math.Between(-30, 30),
        angle: Phaser.Math.Between(-180, 180),
        duration: Phaser.Math.Between(1500, 3000),
        delay: Phaser.Math.Between(0, 1000),
        repeat: -1,
        ease: 'Linear',
      });
    }
  }
}
