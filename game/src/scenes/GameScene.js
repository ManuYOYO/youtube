import { SCENES, EVENTS, GAME_CONFIG } from '../GameConfig.js';
import Player from '../entities/Player.js';
import Cat from '../entities/Cat.js';
import ChaussetteFantome from '../entities/enemies/ChaussetteFantome.js';
import CuillereRebelle from '../entities/enemies/CuillereRebelle.js';
import GlaconSauteur from '../entities/enemies/GlaconSauteur.js';
import FauteOrthographe from '../entities/enemies/FauteOrthographe.js';
import PigeonParc from '../entities/enemies/PigeonParc.js';
import ReveilGeant from '../bosses/ReveilGeant.js';
import GrillePainFurieux from '../bosses/GrillePainFurieux.js';
import LevelBuilder, { LEVELS } from '../levels/LevelBuilder.js';
import HUD from '../ui/HUD.js';
import DialogSystem from '../systems/DialogSystem.js';

const ENEMY_CLASSES = {
  ChaussetteFantome,
  CuillereRebelle,
  GlaconSauteur,
  FauteOrthographe,
  PigeonParc,
};

const BOSS_CLASSES = {
  ReveilGeant,
  GrillePainFurieux,
};

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.GAME });
  }

  init(data) {
    this.worldNum = data.world || 1;
    this.levelNum = data.level || 1;
    this._levelKey = data.levelKey || `${this.worldNum}-${this.levelNum}`;
    this._fromSave = data.fromSave || false;
  }

  create() {
    const levelData = LEVELS[this._levelKey] || LEVELS['1-1'];

    // Limites du monde
    const TW = 16 * 2;
    const levelWidth = (levelData.widthTiles || 40) * TW;
    this.physics.world.setBounds(0, 0, levelWidth, this.scale.height);

    // Construction du niveau
    this._builder = new LevelBuilder(this);
    const { platforms, hazards } = this._builder.build(levelData);
    this.platforms = platforms;
    this.hazards = hazards;

    // Spawn du joueur
    const sx = (levelData.playerSpawn?.x || 2) * TW;
    const sy = this.scale.height - (levelData.playerSpawn?.y || 3) * TW;
    this.player = new Player(this, sx, sy);

    // Restaurer les stats depuis la sauvegarde
    this._restorePlayerStats();

    // Chat
    this.cat = new Cat(this, this.player);

    // Ennemis
    this.enemies = this.add.group();
    this.collectables = {
      starGroup: this.physics.add.staticGroup(),
      heartGroup: this.physics.add.staticGroup(),
      baGroup: this.physics.add.staticGroup(),
      woolGroup: this.physics.add.group(),
    };
    this._spawnEnemies(levelData);
    this._spawnCollectables(levelData);

    // Boss (si niveau boss)
    this.boss = null;
    if (levelData.bossType && levelData.bossSpawn) {
      this._spawnBoss(levelData);
    }

    // Fin de niveau
    this._levelEnd = null;
    if (levelData.levelEnd) {
      const ex = levelData.levelEnd.x * TW;
      const ey = this.scale.height - levelData.levelEnd.y * TW;
      this._levelEnd = this.add.zone(ex, ey, 20, 40);
      this.physics.add.existing(this._levelEnd, true);
      // Indicateur visuel
      const flag = this.add.text(ex, ey - 20, '🏁', { fontSize: '20px' })
        .setOrigin(0.5);
      this.tweens.add({ targets: flag, y: '-=6', duration: 800, yoyo: true, repeat: -1 });
    }

    // Checkpoints
    this._checkpoints = [];
    (levelData.checkpoints || []).forEach(cp => {
      const cpx = cp.x * TW;
      const cpy = this.scale.height - cp.y * TW;
      const cpObj = this.add.sprite(cpx, cpy, 'tiles', 13).setScale(2);
      this.physics.add.existing(cpObj, true);
      this._checkpoints.push(cpObj);
    });
    this._lastCheckpoint = { x: sx, y: sy };

    // Caméra
    this.cameras.main.setBounds(0, 0, levelWidth, this.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setDeadzone(60, 40);

    // Fond de couleur adapté au monde
    const worldColors = [0x2D1B69, 0x3D1515, 0x0D2137, 0x1A2744, 0x2A1F0E, 0x1A3A1A];
    this.cameras.main.setBackgroundColor(worldColors[this.worldNum - 1] || 0x0a0a1a);

    // Physique — collisions
    this._setupCollisions();

    // Contrôles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys({
      W: Phaser.Input.Keyboard.KeyCodes.W,
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      S: Phaser.Input.Keyboard.KeyCodes.S,
      Z: Phaser.Input.Keyboard.KeyCodes.Z,
      X: Phaser.Input.Keyboard.KeyCodes.X,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      P: Phaser.Input.Keyboard.KeyCodes.P,
      ESC: Phaser.Input.Keyboard.KeyCodes.ESC,
    });

    // HUD
    this.hud = new HUD(this, this.player);
    this.hud.setWorldInfo(this.worldNum, this.levelNum);
    if (levelData.timerSeconds) {
      this.hud.showTimer(levelData.timerSeconds);
      this._timerEvent = this.time.addEvent({
        delay: 1000,
        callback: () => this.hud.tickTimer(),
        loop: true,
      });
    }

    // Système de dialogues
    this.dialogSystem = new DialogSystem(this);

    // Events
    this._bindEvents();

    // Auto-run (monde 6)
    this._autoRun = levelData.autoRun || false;

    // Dialogue d'intro
    if (levelData.dialog_intro) {
      this.player.setCanMove(false);
      this.time.delayedCall(600, () => {
        this.dialogSystem.show({
          ...levelData.dialog_intro,
          onComplete: () => {
            this.player.setCanMove(true);
            if (this._autoRun) this._startAutoRun();
          },
        });
      });
    } else if (this._autoRun) {
      this._startAutoRun();
    }

    // Fond musical procédural
    this._playWorldMusic();

    // Fade in
    this.cameras.main.fadeIn(400);

    // Sauvegarde de la scène pour le boss dialog
    this._levelData = levelData;
  }

  _restorePlayerStats() {
    const save = localStorage.getItem('parcours_swann_save');
    if (save) {
      const data = JSON.parse(save);
      this.player.stats.starCount = data.stars || 0;
      this.player.stats.goodActions = data.goodActions || 0;
      // Débloque le double saut si le monde 1 boss a été vaincu
      if (data.completedLevels && data.completedLevels.includes('1-boss')) {
        this.player.stats.hasDoubleJump = true;
      }
    }
  }

  _spawnEnemies(levelData) {
    const TW = 16 * 2;
    (levelData.enemies || []).forEach(e => {
      const EClass = ENEMY_CLASSES[e.type];
      if (!EClass) return;
      const ex = e.x * TW;
      const ey = this.scale.height - e.y * TW;
      const enemy = new EClass(this, ex, ey);
      this.enemies.add(enemy);
    });
  }

  _spawnCollectables(levelData) {
    const TW = 16 * 2;
    const { stars, hearts, boneActions, wool } = levelData.collectables || {};

    (stars || []).forEach(s => {
      const c = this.collectables.starGroup.create(s.x * TW, this.scale.height - s.y * TW, 'star_rose', 0)
        .setScale(2);
      c.play('star_spin');
    });

    (hearts || []).forEach(h => {
      const c = this.collectables.heartGroup.create(h.x * TW, this.scale.height - h.y * TW, 'heart', 0)
        .setScale(2);
      this.tweens.add({ targets: c, y: '-=4', duration: 800, yoyo: true, repeat: -1 });
    });

    (boneActions || []).forEach(ba => {
      const c = this.collectables.baGroup.create(ba.x * TW, this.scale.height - ba.y * TW, 'bonne_action', 0)
        .setScale(2);
      this.tweens.add({ targets: c, angle: 360, duration: 2000, repeat: -1 });
    });

    (wool || []).forEach(w => {
      const c = this.collectables.woolGroup.create(w.x * TW, this.scale.height - w.y * TW, 'wool_ball')
        .setScale(2);
      this.physics.add.existing(c);
      c.body.setGravityY(200);
    });
  }

  _spawnBoss(levelData) {
    const TW = 16 * 2;
    const BossClass = BOSS_CLASSES[levelData.bossType];
    if (!BossClass) return;

    const bx = levelData.bossSpawn.x * TW;
    const by = this.scale.height - levelData.bossSpawn.y * TW;
    this.boss = new BossClass(this, bx, by);

    // Collision boss–player
    this.physics.add.overlap(this.player, this.boss, () => {
      if (this.boss._alive && !this.player.state.isInvincible) {
        this.player.takeDamage(1);
      }
    });

    // Vulnérable quand Moustache touche
    this.events.on('cat_projectile', (proj) => {
      this.physics.add.overlap(proj, this.boss, () => {
        if (proj.active && this.boss._alive) {
          this.boss.takeDamage(1);
          proj.destroy();
          this.cat.hitEnemy();
        }
      });
    });
  }

  _setupCollisions() {
    // Joueur ↔ sol
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.cat, this.platforms);

    // Ennemis ↔ sol
    this.physics.add.collider(this.enemies, this.platforms);

    // Joueur ↔ ennemis
    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (enemy._alive) player.takeDamage(1);
    });

    // Moustache ↔ ennemis
    this.events.on('cat_projectile', (proj) => {
      this.physics.add.overlap(proj, this.enemies, (p, enemy) => {
        if (p.active && enemy._alive) {
          enemy.takeDamage(1);
          p.destroy();
          this.cat.hitEnemy();
        }
      });
    });

    // Joueur ↔ collectables
    this.physics.add.overlap(this.player, this.collectables.starGroup, (player, star) => {
      star.destroy();
      player.collectStar();
      this._collectSound(880);
    });
    this.physics.add.overlap(this.player, this.collectables.heartGroup, (player, heart) => {
      heart.destroy();
      player.collectHeart();
      this._collectSound(523);
    });
    this.physics.add.overlap(this.player, this.collectables.baGroup, (player, ba) => {
      ba.destroy();
      player.collectBA();
      this._collectSound(659);
    });
    this.physics.add.overlap(this.player, this.collectables.woolGroup, (player, wool) => {
      wool.destroy();
      player.collectWool();
      this._collectSound(440);
    });

    // Joueur ↔ fin de niveau
    if (this._levelEnd) {
      this.physics.add.overlap(this.player, this._levelEnd, () => {
        this._completeLevel();
      });
    }

    // Joueur ↔ dangers
    this.physics.add.overlap(this.player, this.hazards, (player) => {
      player.takeDamage(1);
    });

    // Joueur ↔ checkpoints
    this._checkpoints.forEach(cp => {
      this.physics.add.overlap(this.player, cp, () => {
        this._lastCheckpoint = { x: this.player.x, y: this.player.y };
        // Anim checkpoint
        this.tweens.add({ targets: cp, angle: 360, duration: 400 });
        this.events.emit(EVENTS.CHECKPOINT);
      });
    });
  }

  _bindEvents() {
    // Mort du joueur
    this.events.on(EVENTS.PLAYER_DIE, () => {
      this.time.delayedCall(1000, () => {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.cameras.main.once('camerafadeoutcomplete', () => {
          this._respawnAtCheckpoint();
        });
      });
    });

    // Boss vaincu
    this.events.on(EVENTS.BOSS_DEFEATED, (bossId) => {
      this._onBossDefeated(bossId);
    });

    // Pause
    this.input.keyboard.on('keydown-P', () => this._togglePause());
    this.input.keyboard.on('keydown-ESC', () => this._togglePause());
  }

  _respawnAtCheckpoint() {
    this.player.stats.hearts = this.player.stats.maxHearts;
    this.player.state.isInvincible = false;
    this.player.state.canMove = true;
    this.player.setAlpha(1);
    this.player.setPosition(this._lastCheckpoint.x, this._lastCheckpoint.y);
    this.player.setVelocity(0);
    this.cameras.main.fadeIn(400);
  }

  _completeLevel() {
    if (this._levelCompleted) return;
    this._levelCompleted = true;

    this.player.setCanMove(false);
    this.player.setVelocityX(0);

    const levelData = this._levelData;
    if (levelData.dialog_outro) {
      this.dialogSystem.show({
        ...levelData.dialog_outro,
        onComplete: () => this._showLevelComplete(),
      });
    } else {
      this._showLevelComplete();
    }
  }

  _showLevelComplete() {
    // Sauvegarde
    this._saveProgress();

    this.cameras.main.fadeOut(600, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start(SCENES.LEVEL_COMPLETE, {
        world: this.worldNum,
        level: this.levelNum,
        stars: this.player.stats.starCount,
        goodActions: this.player.stats.goodActions,
        hearts: this.player.stats.hearts,
        levelKey: this._levelKey,
      });
    });
  }

  _onBossDefeated(bossId) {
    const levelData = this._levelData;

    // Rewards
    if (levelData.reward?.doubleJump) {
      this.player.stats.hasDoubleJump = true;
    }
    if (levelData.reward?.baBonus) {
      for (let i = 0; i < levelData.reward.baBonus; i++) {
        this.player.collectBA();
      }
    }

    // Dialogue de victoire
    if (levelData.dialog_outro) {
      this.time.delayedCall(1000, () => {
        this.dialogSystem.show({
          ...levelData.dialog_outro,
          onComplete: () => this._showLevelComplete(),
        });
      });
    } else {
      this.time.delayedCall(1500, () => this._showLevelComplete());
    }
  }

  _startAutoRun() {
    // En mode auto-runner, le joueur avance automatiquement
    this.player.stats.speed = 120;
    this._autoRunTimer = this.time.addEvent({
      delay: 16,
      callback: () => {
        if (this.player.state.canMove) {
          this.player.setVelocityX(120);
        }
      },
      loop: true,
    });
  }

  _togglePause() {
    if (this.dialogSystem.isActive) return;
    this.scene.pause(SCENES.GAME);
    this.scene.launch(SCENES.PAUSE, { world: this.worldNum, level: this.levelNum });
  }

  _saveProgress() {
    const save = JSON.parse(localStorage.getItem('parcours_swann_save') || '{}');
    save.stars = this.player.stats.starCount;
    save.goodActions = this.player.stats.goodActions;
    save.hearts = this.player.stats.hearts;
    save.currentWorld = this.worldNum;
    save.currentLevel = this.levelNum;
    if (!save.completedLevels) save.completedLevels = [];
    if (!save.completedLevels.includes(this._levelKey)) {
      save.completedLevels.push(this._levelKey);
    }
    // Débloque le niveau suivant
    if (this._levelKey.includes('boss')) {
      const nextWorld = this.worldNum + 1;
      if (!save.unlockedWorlds) save.unlockedWorlds = [1];
      if (!save.unlockedWorlds.includes(nextWorld)) {
        save.unlockedWorlds.push(nextWorld);
      }
      save.currentWorld = nextWorld;
      save.currentLevel = 1;
    } else {
      save.currentLevel = this.levelNum + 1;
    }
    localStorage.setItem('parcours_swann_save', JSON.stringify(save));
  }

  _collectSound(freq) {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'square';
      osc.frequency.value = freq;
      osc.frequency.exponentialRampToValueAtTime(freq * 2, actx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.15);
      osc.start();
      osc.stop(actx.currentTime + 0.15);
    } catch (e) {}
  }

  _playWorldMusic() {
    // Mélodies chiptune par monde
    const melodies = {
      1: [261, 329, 392, 261, 329, 392, 523, 392],
      2: [440, 550, 440, 330, 440, 550, 660, 550],
      3: [294, 370, 440, 294, 370, 440, 587, 440],
      4: [196, 247, 294, 370, 294, 247, 196, 165],
      5: [220, 277, 330, 277, 220, 165, 220, 277],
      6: [392, 523, 659, 784, 659, 523, 784, 1046],
    };
    const melody = melodies[this.worldNum] || melodies[1];

    const playMelody = () => {
      try {
        const actx = new (window.AudioContext || window.webkitAudioContext)();
        melody.forEach((freq, i) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.type = 'square';
          osc.frequency.value = freq;
          const t = actx.currentTime + i * 0.25;
          gain.gain.setValueAtTime(0.03, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
          osc.start(t);
          osc.stop(t + 0.22);
        });
      } catch (e) {}
    };

    playMelody();
    this._musicTimer = this.time.addEvent({
      delay: melody.length * 250,
      callback: playMelody,
      loop: true,
    });
  }

  update(time, delta) {
    if (this.dialogSystem.isActive) return;

    this.player.update(this.cursors, this.keys, delta);
    this.cat.update();

    // Ennemis
    this.enemies.getChildren().forEach(e => e.update && e.update());

    // Boss
    if (this.boss && this.boss._alive) this.boss.update();

    // Pouvoirs
    if (Phaser.Input.Keyboard.JustDown(this.keys.Z)) {
      this.player.catAttack();
    }
    if (Phaser.Input.Keyboard.JustDown(this.keys.X)) {
      this.player.activateReflect();
    }

    // Activation boss dialogue Papa (monde 5)
    if (this._levelData?.bossType === 'PapaDialog' && this.boss === null) {
      const TW = 16 * 2;
      const bx = (this._levelData.bossSpawn?.x || 14) * TW;
      if (Math.abs(this.player.x - bx) < 60 && !this._papaDialogStarted) {
        this._papaDialogStarted = true;
        this._startPapaDialog();
      }
    }

    // Gestion chute hors niveau
    if (this.player.y > this.scale.height + 50) {
      this.player.takeDamage(1);
      this.player.setPosition(this._lastCheckpoint.x, this._lastCheckpoint.y - 30);
      this.player.setVelocity(0);
    }
  }

  _startPapaDialog() {
    this.player.setCanMove(false);

    // Sprite de Papa
    const TW = 16 * 2;
    const bx = this._levelData.bossSpawn.x * TW;
    const by = this.scale.height - 4 * TW;
    const papaSprite = this.add.sprite(bx, by, 'papa').setScale(3);
    papaSprite.play('papa_strict');

    const goodActions = this.player.stats.goodActions;

    // Séquence de dialogues
    const dialogSequence = [
      {
        speaker: 'papa', name: 'Papa',
        text: 'Swann. Assieds-toi. On va parler.',
      },
      {
        speaker: 'papa', name: 'Papa',
        text: 'Tu veux aller chez Léa. Mais avant... quelques questions.',
      },
      {
        speaker: 'papa', name: 'Papa',
        text: 'As-tu terminé tes devoirs de mathématiques ?',
        options: [
          {
            text: 'Oui ! Et j\'ai tout bon !',
            baCost: 0,
            callback: () => { this._papaConfidence = (this._papaConfidence || 0) + 3; this._papaNextDialog(1, papaSprite); },
          },
          {
            text: 'Presque... il restait 2 exercices.',
            baCost: 0,
            callback: () => { this._papaConfidence = (this._papaConfidence || 0) + 1; this._papaNextDialog(1, papaSprite); },
          },
          {
            text: 'J\'avais pas vraiment envie...',
            baCost: 0,
            callback: () => { this._papaConfidence = (this._papaConfidence || 0) - 2; this._papaNextDialog(1, papaSprite); },
          },
        ],
      },
    ];

    this._papaConfidence = 0;
    this._dialogStep = 0;

    const playNext = () => {
      if (this._dialogStep >= dialogSequence.length) return;
      const d = dialogSequence[this._dialogStep];
      this._dialogStep++;
      this.dialogSystem.show({ ...d, onComplete: playNext });
    };
    playNext();
  }

  _papaNextDialog(step, papaSprite) {
    const goodActions = this.player.stats.goodActions;

    if (step === 1) {
      this.dialogSystem.show({
        speaker: 'papa', name: 'Papa',
        text: 'As-tu aidé Maman ce matin ?',
        options: [
          {
            text: 'Oui ! Petit-déj + vaisselle !',
            baCost: 0,
            callback: () => { this._papaConfidence += 3; this._papaNextDialog(2, papaSprite); },
          },
          {
            text: 'J\'ai essayé de l\'aider...',
            baCost: 0,
            callback: () => { this._papaConfidence += 1; this._papaNextDialog(2, papaSprite); },
          },
        ],
      });
    } else if (step === 2) {
      // Utiliser les Bonnes Actions pour convaincre
      this.dialogSystem.show({
        speaker: 'papa', name: 'Papa',
        text: `Donne-moi une bonne raison. [Tu as ${goodActions} Bonne(s) Action(s)]`,
        options: [
          {
            text: 'Voilà toutes mes preuves !',
            baCost: Math.min(goodActions, 5),
            callback: () => {
              this._papaConfidence += Math.min(goodActions, 5);
              this._papaConclusion(papaSprite);
            },
          },
          {
            text: 'Je mérite cette sortie !',
            baCost: 0,
            callback: () => { this._papaConfidence += 1; this._papaConclusion(papaSprite); },
          },
        ],
      });
    }
  }

  _papaConclusion(papaSprite) {
    const confidence = this._papaConfidence;
    if (confidence >= 6) {
      // Victoire !
      papaSprite.play('papa_smile');
      this.dialogSystem.show({
        speaker: 'papa', name: 'Papa',
        text: 'Je suis fier de toi, Swann. Tu as été responsable ce matin. Va t\'amuser... mais rentre avant 18h !',
        onComplete: () => {
          this.player.collectBA(); // Bonus
          this.player.collectBA();
          papaSprite.destroy();
          this._completeLevel();
        },
      });
    } else {
      // Résultat partiel
      papaSprite.play('papa_strict');
      this.dialogSystem.show({
        speaker: 'papa', name: 'Papa',
        text: 'Hmm... je ne suis pas totalement convaincu. Mais ta maman dit que tu as fait des efforts. OK. Mais rentre tôt !',
        onComplete: () => {
          papaSprite.destroy();
          this._completeLevel();
        },
      });
    }
  }

  shutdown() {
    if (this._musicTimer) this._musicTimer.destroy();
    if (this._timerEvent) this._timerEvent.destroy();
    if (this._autoRunTimer) this._autoRunTimer.destroy();
    if (this.hud) this.hud.destroy();
    this.events.removeAllListeners();
  }
}
