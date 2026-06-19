import { SCENES, GAME_CONFIG } from '../GameConfig.js';

const LEVEL_MAP = [
  { key: '1-1',    world: 1, level: 1,      label: '1-1\nRéveil',     x: 40,  y: 60 },
  { key: '1-boss', world: 1, level: 'boss',  label: '1-B\nRéveil Boss',x: 80,  y: 45 },
  { key: '2-1',    world: 2, level: 1,       label: '2-1\nCuisine',    x: 120, y: 70 },
  { key: '2-boss', world: 2, level: 'boss',  label: '2-B\nGrille-Pain',x: 160, y: 55 },
  { key: '3-1',    world: 3, level: 1,       label: '3-1\nVaisselle',  x: 200, y: 75 },
  { key: '4-1',    world: 4, level: 1,       label: '4-1\nDevoirs',    x: 240, y: 60 },
  { key: '5-1',    world: 5, level: 1,       label: '5-1\nPapa',       x: 280, y: 50 },
  { key: '6-1',    world: 6, level: 1,       label: '6-1\nCourse !',   x: 300, y: 80 },
];

export default class WorldMapScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.WORLD_MAP });
  }

  init(data) {
    this.playerData = data || {};
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;

    this.add.rectangle(0, 0, width, height, 0x0a0a1a).setOrigin(0, 0);

    this.add.text(cx, 12, 'CARTE DU MONDE', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#FFD700',
    }).setOrigin(0.5);

    const save = JSON.parse(localStorage.getItem('parcours_swann_save') || '{}');
    const completed = save.completedLevels || [];
    const unlocked = save.unlockedWorlds || [1];

    // Lignes entre les niveaux
    const ctx = this;
    for (let i = 0; i < LEVEL_MAP.length - 1; i++) {
      const a = LEVEL_MAP[i], b = LEVEL_MAP[i + 1];
      const line = ctx.add.line(0, 0, a.x, a.y, b.x, b.y, 0x444466, 0.6).setOrigin(0, 0);
    }

    // Nœuds de niveaux
    LEVEL_MAP.forEach(lvl => {
      const isDone = completed.includes(lvl.key);
      const isAvail = unlocked.includes(lvl.world);
      const color = isDone ? 0xFFD700 : isAvail ? 0xFF6B9D : 0x444444;

      const node = this.add.circle(lvl.x, lvl.y, 10, color).setInteractive();
      const label = this.add.text(lvl.x, lvl.y + 14, lvl.label, {
        fontFamily: 'monospace',
        fontSize: '6px',
        color: isDone ? '#FFD700' : isAvail ? '#FFFFFF' : '#666666',
        align: 'center',
      }).setOrigin(0.5, 0);

      if (isDone) {
        this.add.text(lvl.x, lvl.y, '✓', {
          fontFamily: 'monospace',
          fontSize: '8px',
          color: '#001100',
        }).setOrigin(0.5);
      }

      if (isAvail) {
        node.on('pointerover', () => {
          node.setScale(1.2);
          label.setColor('#FFD700');
        });
        node.on('pointerout', () => {
          node.setScale(1);
          label.setColor(isDone ? '#FFD700' : '#FFFFFF');
        });
        node.on('pointerdown', () => {
          this.cameras.main.fadeOut(400);
          this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start(SCENES.GAME, {
              world: lvl.world,
              level: lvl.level,
              levelKey: lvl.key,
            });
          });
        });

        // Animation pulsée pour le niveau actuel
        const currentKey = `${save.currentWorld || 1}-${save.currentLevel || 1}`;
        if (lvl.key === currentKey) {
          this.tweens.add({
            targets: node,
            scaleX: 1.3, scaleY: 1.3,
            duration: 500,
            yoyo: true,
            repeat: -1,
          });
        }
      }
    });

    // Swann sur la carte
    const currentLvl = LEVEL_MAP.find(l => l.key === `${save.currentWorld || 1}-${save.currentLevel || 1}`) || LEVEL_MAP[0];
    const swann = this.add.sprite(currentLvl.x, currentLvl.y - 15, 'swann').setScale(2);
    swann.play('swann_idle');

    // Infos en bas
    this.add.text(cx, height - 30, `⭐ ${save.stars || 0}   💛 ${save.goodActions || 0} BA`, {
      fontFamily: 'monospace',
      fontSize: '9px',
      color: '#AAAACC',
    }).setOrigin(0.5);

    this.add.text(cx, height - 16, '[MENU] Touche M', {
      fontFamily: 'monospace',
      fontSize: '7px',
      color: '#666666',
    }).setOrigin(0.5);

    this.input.keyboard.on('keydown-M', () => {
      this.cameras.main.fadeOut(400);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.MENU);
      });
    });

    this.cameras.main.fadeIn(400);
  }
}
