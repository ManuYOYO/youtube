import { SCENES, GAME_CONFIG } from '../GameConfig.js';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.MENU });
  }

  create() {
    const { width, height } = this.scale;
    const cx = width / 2;

    // Fond
    this.add.image(cx, height / 2, 'menu_bg').setDisplaySize(width, height);

    // Effet de particules d'étoiles
    this.createStarParticles();

    // Titre principal
    this.createTitle(cx);

    // Menu
    this.createMenu(cx, height);

    // Swann en animation sur le côté
    this.createSwannIdle(cx, height);

    // Musique
    this.createBgMusic();

    // Cursor blink
    this.selectedIndex = 0;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.input.keyboard.on('keydown', this.handleInput, this);
  }

  createTitle(cx) {
    const titleConfig = {
      fontFamily: 'monospace',
      fontSize: '28px',
      color: '#FF6B9D',
      stroke: '#2A1A4A',
      strokeThickness: 4,
      shadow: { color: '#FF6B9D', blur: 8, offsetX: 2, offsetY: 2, fill: true },
    };
    const title1 = this.add.text(cx, 55, 'LE PARCOURS', titleConfig).setOrigin(0.5);
    const title2 = this.add.text(cx, 85, 'DE SWANN', {
      ...titleConfig,
      fontSize: '32px',
      color: '#FFD700',
    }).setOrigin(0.5);

    // Animation flottante du titre
    this.tweens.add({
      targets: [title1, title2],
      y: '-=4',
      duration: 1500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });

    // Sous-titre
    this.add.text(cx, 112, 'Un jeu de plateforme familial', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#AAAACC',
    }).setOrigin(0.5);
  }

  createMenu(cx, height) {
    const menuItems = [
      { label: 'NOUVELLE PARTIE', action: () => this.startNewGame() },
      { label: 'CONTINUER', action: () => this.continueGame() },
      { label: 'CRÉDITS', action: () => this.showCredits() },
    ];

    this.menuTexts = [];
    menuItems.forEach((item, i) => {
      const y = height - 120 + i * 28;
      const text = this.add.text(cx, y, item.label, {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: i === 0 ? '#FFD700' : '#AAAACC',
      }).setOrigin(0.5).setData('action', item.action).setData('index', i);

      text.setInteractive();
      text.on('pointerover', () => this.selectItem(i));
      text.on('pointerdown', () => item.action());

      this.menuTexts.push(text);
    });

    // Flèche de sélection
    this.arrow = this.add.text(cx - 80, height - 120, '>', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#FF6B9D',
    }).setOrigin(0.5);

    this.tweens.add({
      targets: this.arrow,
      x: '+=4',
      duration: 500,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1,
    });
  }

  selectItem(index) {
    this.selectedIndex = index;
    const { height } = this.scale;
    this.menuTexts.forEach((t, i) => {
      t.setColor(i === index ? '#FFD700' : '#AAAACC');
    });
    this.arrow.y = height - 120 + index * 28;
  }

  handleInput(event) {
    if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
      this.selectItem((this.selectedIndex - 1 + 3) % 3);
    } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN) {
      this.selectItem((this.selectedIndex + 1) % 3);
    } else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER ||
               event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
      this.menuTexts[this.selectedIndex].getData('action')();
    }
  }

  createSwannIdle(cx, height) {
    const swann = this.add.sprite(cx - 90, height - 60, 'swann').setScale(2);
    swann.play('swann_idle');

    const moustache = this.add.sprite(cx - 65, height - 48, 'moustache').setScale(2);
    moustache.play('moustache_idle');

    // Swann entre en scène depuis la gauche
    swann.x = -50;
    moustache.x = -20;
    this.tweens.add({
      targets: [swann, moustache],
      x: swann.x + (cx - 90 + 50),
      duration: 800,
      ease: 'Back.easeOut',
      onComplete: () => {
        moustache.x = cx - 65;
      },
    });
  }

  createStarParticles() {
    // Simuler des particules d'étoiles avec des tweens sur des petits cercles
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(50, 270);
      const y = Phaser.Math.Between(10, 130);
      const star = this.add.circle(x, y, 1, 0xFFD700, 0.8);
      this.tweens.add({
        targets: star,
        alpha: 0,
        scaleX: 2,
        scaleY: 2,
        duration: Phaser.Math.Between(1000, 3000),
        ease: 'Sine.easeInOut',
        yoyo: true,
        repeat: -1,
        delay: Phaser.Math.Between(0, 2000),
      });
    }
  }

  createBgMusic() {
    // Placeholder — la vraie musique serait chargée depuis un fichier audio
    // Pour la démo, on crée un son synthétique simple avec Web Audio API
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [261.63, 329.63, 392, 523.25, 392, 329.63, 261.63, 196];
      let time = ctx.currentTime + 0.5;
      const playNote = (freq, t) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.03, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.start(t);
        osc.stop(t + 0.3);
      };
      notes.forEach((note, i) => playNote(note, time + i * 0.35));
      // Boucle toutes les 3 secondes
      this.time.addEvent({
        delay: 3000,
        callback: () => {
          const t2 = ctx.currentTime + 0.1;
          notes.forEach((note, i) => playNote(note, t2 + i * 0.35));
        },
        loop: true,
      });
    } catch (e) {
      // Pas d'audio disponible
    }
  }

  startNewGame() {
    // Reset sauvegarde
    const saveData = {
      currentWorld: 1,
      currentLevel: 1,
      stars: 0,
      goodActions: 0,
      hearts: 3,
      unlockedWorlds: [1],
      completedLevels: [],
    };
    localStorage.setItem('parcours_swann_save', JSON.stringify(saveData));

    this.cameras.main.fadeOut(500, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.GAME, { world: 1, level: 1 });
    });
  }

  continueGame() {
    const save = localStorage.getItem('parcours_swann_save');
    if (save) {
      const data = JSON.parse(save);
      this.cameras.main.fadeOut(500, 0, 0, 0);
      this.cameras.main.once('camerafadeoutcomplete', () => {
        this.scene.start(SCENES.GAME, { world: data.currentWorld, level: data.currentLevel });
      });
    } else {
      // Pas de sauvegarde, flash le texte
      const txt = this.menuTexts[1];
      this.tweens.add({
        targets: txt,
        alpha: 0,
        duration: 150,
        yoyo: true,
        repeat: 3,
      });
    }
  }

  showCredits() {
    const { width, height } = this.scale;
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85);
    const credits = [
      'LE PARCOURS DE SWANN',
      '',
      'Direction créative & Game Design',
      'Studio Swann',
      '',
      'Développement',
      'Phaser 3 + Pixel Art procédural',
      '',
      'Inspiré par Mario, Kirby,',
      'Chip\'n Dale & A Hat in Time',
      '',
      '❤️ Pour tous les enfants héroïques',
      '',
      '[ENTRÉE] pour fermer',
    ];
    const creditText = this.add.text(width / 2, height / 2, credits.join('\n'), {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#FFFFFF',
      align: 'center',
      lineSpacing: 4,
    }).setOrigin(0.5);

    const close = () => {
      overlay.destroy();
      creditText.destroy();
      this.input.keyboard.off('keydown', close);
    };
    this.input.keyboard.once('keydown-ENTER', close);
    this.input.keyboard.once('keydown-SPACE', close);
    overlay.setInteractive();
    overlay.once('pointerdown', close);
  }
}
