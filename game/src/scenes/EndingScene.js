import { SCENES } from '../GameConfig.js';

export default class EndingScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.ENDING });
  }

  init(data) {
    this.finalData = data || {};
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;

    this.add.rectangle(0, 0, width, height, 0x0a1a2a).setOrigin(0, 0);

    // Fond de fête
    this._spawnConfetti(30);

    // Séquence d'images narratives via textes et sprites
    this._playSequence(cx, height);

    this.cameras.main.fadeIn(800);
  }

  _playSequence(cx, height) {
    const scenes = [
      {
        delay: 0,
        texts: ['[ Jardin de Léa — 13h58 ]'],
        textColor: '#AAAACC',
        spawnSwann: true,
      },
      {
        delay: 2000,
        texts: ['LÉA : "SWANN !!! Tu es là !!!"'],
        textColor: '#FF9EC4',
        spawnLea: true,
      },
      {
        delay: 4000,
        texts: ['SWANN : "LÉA ! BONNE ANNIIIIIV !!!"'],
        textColor: '#FF6B9D',
      },
      {
        delay: 6000,
        texts: [
          'SWANN : "J\'ai failli ne pas venir...',
          'Il s\'est passé des trucs DINGUES ce matin !"',
        ],
        textColor: '#FF6B9D',
      },
      {
        delay: 9000,
        texts: ['LÉA : "Genre quoi ?"'],
        textColor: '#FF9EC4',
      },
      {
        delay: 11000,
        texts: ['SWANN : "Genre... une aventure."'],
        textColor: '#FF6B9D',
        showStar: true,
      },
      {
        delay: 14000,
        texts: [
          '[ Au bout de la rue, Papa est appuyé',
          'contre la voiture. Il lève le pouce. ]',
        ],
        textColor: '#AAAACC',
        showPapa: true,
      },
      {
        delay: 17000,
        texts: ['— FIN —', '', '✨ Merci d\'avoir joué ! ✨'],
        textColor: '#FFD700',
        final: true,
      },
    ];

    let swann, moustache, papa;

    scenes.forEach(scene => {
      this.time.delayedCall(scene.delay, () => {
        // Efface les textes précédents sauf les sprites
        if (this._sceneTexts) this._sceneTexts.forEach(t => {
          this.tweens.add({ targets: t, alpha: 0, duration: 300, onComplete: () => t.destroy() });
        });
        this._sceneTexts = [];

        scene.texts.forEach((line, i) => {
          const t = this.add.text(this.scale.width / 2, 30 + i * 16, line, {
            fontFamily: 'monospace',
            fontSize: '9px',
            color: scene.textColor || '#FFFFFF',
            align: 'center',
            wordWrap: { width: this.scale.width - 20 },
          }).setOrigin(0.5).setAlpha(0);
          this.tweens.add({ targets: t, alpha: 1, duration: 500 });
          this._sceneTexts.push(t);
        });

        if (scene.spawnSwann && !swann) {
          swann = this.add.sprite(this.scale.width * 0.35, 110, 'swann').setScale(3);
          swann.play('swann_idle');
          swann.setAlpha(0);
          this.tweens.add({ targets: swann, alpha: 1, duration: 500 });

          moustache = this.add.sprite(this.scale.width * 0.35 + 25, 118, 'moustache').setScale(3);
          moustache.play('moustache_happy');
          moustache.setAlpha(0);
          this.tweens.add({ targets: moustache, alpha: 1, duration: 500 });
        }

        if (scene.showPapa && !papa) {
          papa = this.add.sprite(this.scale.width * 0.75, 100, 'papa').setScale(3);
          papa.play('papa_smile');
          papa.setAlpha(0);
          this.tweens.add({ targets: papa, alpha: 1, duration: 600 });
          // Pouce levé
          this.time.delayedCall(1000, () => {
            if (papa.active) papa.play('papa_smile');
          });
        }

        if (scene.showStar) {
          for (let i = 0; i < 5; i++) {
            const star = this.add.sprite(
              Phaser.Math.Between(20, this.scale.width - 20),
              Phaser.Math.Between(60, 130),
              'star_rose', 0
            ).setScale(2);
            star.play('star_spin');
            this.tweens.add({
              targets: star,
              y: star.y - 30,
              alpha: 0,
              duration: 2000,
              delay: i * 200,
              onComplete: () => star.destroy(),
            });
          }
        }

        if (scene.final) {
          // Stats finales
          const ba = this.finalData.goodActions || 0;
          const stars = this.finalData.stars || 0;
          const endings = [
            { min: 25, text: '✨ FIN PARFAITE : Papa rejoint la fête !', color: '#FFD700' },
            { min: 15, text: '🎉 SUPER FIN : Swann arrive à l\'heure !', color: '#FF6B9D' },
            { min: 0,  text: '🎈 BONNE FIN : Swann arrive avec un peu de retard !', color: '#AAAACC' },
          ];
          const ending = endings.find(e => ba >= e.min) || endings[endings.length - 1];

          this.time.delayedCall(1000, () => {
            this.add.text(this.scale.width / 2, 130, ending.text, {
              fontFamily: 'monospace',
              fontSize: '8px',
              color: ending.color,
              align: 'center',
              wordWrap: { width: this.scale.width - 20 },
            }).setOrigin(0.5);

            this.add.text(this.scale.width / 2, 148, `⭐ ${stars} étoiles   💛 ${ba} Bonnes Actions`, {
              fontFamily: 'monospace',
              fontSize: '8px',
              color: '#FFFFFF',
            }).setOrigin(0.5);

            const replayBtn = this.add.text(this.scale.width / 2, 168, '[ ENTRÉE ] Rejouer', {
              fontFamily: 'monospace',
              fontSize: '9px',
              color: '#FF6B9D',
            }).setOrigin(0.5).setInteractive();

            this.tweens.add({ targets: replayBtn, alpha: 0, duration: 600, yoyo: true, repeat: -1 });

            replayBtn.on('pointerdown', () => this._restart());
            this.input.keyboard.once('keydown-ENTER', () => this._restart());
          });
        }
      });
    });
  }

  _restart() {
    localStorage.removeItem('parcours_swann_save');
    this.cameras.main.fadeOut(600);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.MENU);
    });
  }

  _spawnConfetti(count) {
    const colors = [0xFF6B9D, 0xFFD700, 0x4FC3F7, 0x9B59B6, 0x44FF88, 0xFF4444];
    for (let i = 0; i < count; i++) {
      const x = Phaser.Math.Between(0, this.scale.width);
      const color = colors[i % colors.length];
      const c = this.add.rectangle(x, -10, Phaser.Math.Between(3, 6), Phaser.Math.Between(5, 10), color);
      this.tweens.add({
        targets: c,
        y: this.scale.height + 20,
        x: x + Phaser.Math.Between(-40, 40),
        angle: Phaser.Math.Between(-360, 360),
        duration: Phaser.Math.Between(2000, 4000),
        delay: Phaser.Math.Between(0, 3000),
        repeat: -1,
        ease: 'Linear',
      });
    }
  }
}
