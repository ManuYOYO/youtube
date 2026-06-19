import { EVENTS } from '../GameConfig.js';

export default class DialogSystem {
  constructor(scene) {
    this.scene = scene;
    this.isActive = false;
    this._container = null;
    this._typing = null;
    this._onComplete = null;
    this._optionTexts = [];
    this._selectedOption = 0;
  }

  show(config) {
    if (this.isActive) return;
    this.isActive = true;
    this.scene.events.emit(EVENTS.DIALOG_START);

    const { width, height } = this.scene.scale;
    const boxH = config.options ? 110 : 70;
    const boxY = height - boxH - 10;

    // Fond
    this._bg = this.scene.add.rectangle(width / 2, boxY + boxH / 2, width - 20, boxH, 0x0D0D2A, 0.92)
      .setScrollFactor(0).setDepth(200);
    this._border = this.scene.add.rectangle(width / 2, boxY + boxH / 2, width - 18, boxH - 2, 0x000000, 0)
      .setScrollFactor(0).setDepth(200).setStrokeStyle(2, 0xFF6B9D);

    // Portrait
    if (config.portrait) {
      this._portrait = this.scene.add.sprite(20 + 16, boxY + 16, config.portrait)
        .setScale(2).setScrollFactor(0).setDepth(201).setOrigin(0, 0);
    }

    // Nom du personnage
    const nameColors = {
      swann: '#FF6B9D',
      papa: '#7EC8E3',
      maman: '#A8D8EA',
      zelie: '#C4A7E7',
    };
    const nameColor = nameColors[config.speaker] || '#FFFFFF';

    this._nameText = this.scene.add.text(20, boxY + 4, config.name || '', {
      fontFamily: 'monospace',
      fontSize: '9px',
      color: nameColor,
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0).setDepth(201);

    // Texte principal (typewriter)
    this._mainText = this.scene.add.text(
      config.portrait ? 60 : 14,
      boxY + 18,
      '',
      {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: '#FFFFFF',
        wordWrap: { width: width - (config.portrait ? 80 : 40) },
        lineSpacing: 3,
      }
    ).setScrollFactor(0).setDepth(201);

    this._typewriterText(config.text, config.options, config.onComplete);
  }

  _typewriterText(text, options, onComplete) {
    let i = 0;
    this._typing = this.scene.time.addEvent({
      delay: 28,
      callback: () => {
        this._mainText.text += text[i];
        i++;
        if (i >= text.length) {
          this._typing.destroy();
          this._typing = null;
          if (options) {
            this._showOptions(options, onComplete);
          } else {
            this._showContinue(onComplete);
          }
        }
      },
      repeat: text.length - 1,
    });

    // Clic pour sauter le typewriter
    this.scene.input.keyboard.once('keydown-ENTER', () => {
      if (this._typing) {
        this._typing.destroy();
        this._mainText.text = text;
        if (options) this._showOptions(options, onComplete);
        else this._showContinue(onComplete);
      }
    });
  }

  _showContinue(onComplete) {
    const blink = this.scene.add.text(
      this.scene.scale.width - 20, this.scene.scale.height - 25, '▼',
      { fontFamily: 'monospace', fontSize: '10px', color: '#FF6B9D' }
    ).setScrollFactor(0).setDepth(202).setOrigin(1, 1);

    this.scene.tweens.add({
      targets: blink,
      alpha: 0,
      duration: 400,
      yoyo: true,
      repeat: -1,
    });

    const dismiss = () => {
      blink.destroy();
      this.hide();
      if (onComplete) onComplete();
    };

    this.scene.input.keyboard.once('keydown-ENTER', dismiss);
    this.scene.input.keyboard.once('keydown-SPACE', dismiss);
    this.scene.input.once('pointerdown', dismiss);
  }

  _showOptions(options, onComplete) {
    const { width, height } = this.scene.scale;
    const startY = height - 55;
    this._optionTexts = [];
    this._selectedOption = 0;
    this._options = options;
    this._onComplete = onComplete;

    options.forEach((opt, i) => {
      const canAfford = !opt.baCost || (this.scene.player.stats.goodActions >= opt.baCost);
      const color = i === 0 ? '#FFD700' : '#CCCCCC';
      const label = opt.baCost ? `[${opt.baCost}💛] ${opt.text}` : opt.text;

      const t = this.scene.add.text(20, startY + i * 16, `${i === 0 ? '▶' : ' '} ${label}`, {
        fontFamily: 'monospace',
        fontSize: '8px',
        color: canAfford ? color : '#666666',
      }).setScrollFactor(0).setDepth(202).setData('index', i).setData('opt', opt).setData('canAfford', canAfford);

      this._optionTexts.push(t);
    });

    // Navigation clavier
    const nav = (e) => {
      if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
        this._selectOption((this._selectedOption - 1 + options.length) % options.length);
      } else if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.DOWN) {
        this._selectOption((this._selectedOption + 1) % options.length);
      } else if (e.keyCode === Phaser.Input.Keyboard.KeyCodes.ENTER ||
                 e.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
        this.scene.input.keyboard.off('keydown', nav);
        this._chooseOption(this._selectedOption);
      }
    };
    this.scene.input.keyboard.on('keydown', nav);
    this._navHandler = nav;
  }

  _selectOption(index) {
    this._selectedOption = index;
    this._optionTexts.forEach((t, i) => {
      const opt = t.getData('opt');
      const canAfford = t.getData('canAfford');
      const baseColor = canAfford ? (i === index ? '#FFD700' : '#CCCCCC') : '#666666';
      t.setColor(baseColor);
      t.setText(`${i === index ? '▶' : ' '} ${opt.baCost ? `[${opt.baCost}💛] ` : ''}${opt.text}`);
    });
  }

  _chooseOption(index) {
    const optText = this._optionTexts[index];
    const opt = optText.getData('opt');
    const canAfford = optText.getData('canAfford');

    if (!canAfford) {
      // Secouer le texte
      this.scene.tweens.add({
        targets: optText,
        x: '+=4',
        duration: 80,
        yoyo: true,
        repeat: 3,
      });
      return;
    }

    // Appliquer coût BA
    if (opt.baCost) {
      this.scene.player.stats.goodActions -= opt.baCost;
      this.scene.events.emit(EVENTS.BA_COLLECT, this.scene.player.stats.goodActions);
    }

    this.hide();
    if (opt.callback) opt.callback();
    else if (this._onComplete) this._onComplete(opt);
  }

  hide() {
    this.isActive = false;
    [this._bg, this._border, this._portrait, this._nameText, this._mainText, ...this._optionTexts]
      .forEach(obj => { if (obj) obj.destroy(); });
    this._optionTexts = [];
    this.scene.events.emit(EVENTS.DIALOG_END);
  }
}
