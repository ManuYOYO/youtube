// ─── GameConfig.js ─────────────────────────────────────────────────────────
const GAME_CONFIG = {
  NATIVE_WIDTH: 320,
  NATIVE_HEIGHT: 180,
  SCALE: 4,
  TILE_SIZE: 16,

  PHYSICS: {
    GRAVITY: 700,
    PLAYER_SPEED: 180,
    JUMP_FORCE: -420,
    DOUBLE_JUMP_FORCE: -320,
    MAX_FALL_SPEED: 600,
    COYOTE_TIME: 120,
    JUMP_BUFFER: 150,
  },

  PLAYER: {
    MAX_HEARTS: 3,
    INVINCIBILITY_DURATION: 2000,
    REFLECT_DURATION: 5000,
    REFLECT_COOLDOWN: 15000,
    REFLECT_CHARGES: 3,
    CAT_WOOL_BALLS: 5,
    CAT_COOLDOWN: 8000,
  },

  COLORS: {
    SWANN_PINK: 0xFF6B9D,
    PAPA_DARK: 0x1A1A2E,
    MAMAN_BLUE: 0xA8D8EA,
    ZELIE_PURPLE: 0xC4A7E7,
    STAR_GOLD: 0xFFD700,
    BA_YELLOW: 0xFFE135,
    HEART_RED: 0xFF4444,
    REFLECT_BLUE: 0x4FC3F7,
  },

  WORLDS: [
    { id: 1, name: 'Le Réveil Héroïque',      bgColor: 0x2D1B69 },
    { id: 2, name: 'La Cuisine du Chaos',      bgColor: 0x3D1515 },
    { id: 3, name: 'Mission Vaisselle',         bgColor: 0x0D2137 },
    { id: 4, name: 'Les Devoirs Infernaux',     bgColor: 0x1A2744 },
    { id: 5, name: 'Le Convaincre-Papa',        bgColor: 0x2A1F0E },
    { id: 6, name: 'La Course vers l\'Anniv.', bgColor: 0x1A3A1A },
  ],
};

const SCENES = {
  BOOT: 'BootScene',
  PRELOAD: 'PreloadScene',
  MENU: 'MenuScene',
  WORLD_MAP: 'WorldMapScene',
  GAME: 'GameScene',
  DIALOG: 'DialogScene',
  PAUSE: 'PauseScene',
  LEVEL_COMPLETE: 'LevelCompleteScene',
  GAME_OVER: 'GameOverScene',
  ENDING: 'EndingScene',
};

const EVENTS = {
  PLAYER_HURT: 'player_hurt',
  PLAYER_DIE: 'player_die',
  STAR_COLLECT: 'star_collect',
  HEART_COLLECT: 'heart_collect',
  BA_COLLECT: 'ba_collect',
  WOOL_COLLECT: 'wool_collect',
  BOSS_DEFEATED: 'boss_defeated',
  LEVEL_COMPLETE: 'level_complete',
  REFLECT_ACTIVATE: 'reflect_activate',
  REFLECT_END: 'reflect_end',
  CAT_ATTACK: 'cat_attack',
  DIALOG_START: 'dialog_start',
  DIALOG_END: 'dialog_end',
  CHECKPOINT: 'checkpoint',
};

// ─── SpriteGenerator.js ─────────────────────────────────────────────────────────
/**
 * Génère tous les sprites pixel art procéduralement via Canvas.
 * Chaque sprite est dessiné pixel par pixel puis converti en texture Phaser.
 */
class SpriteGenerator {
  constructor(scene) {
    this.scene = scene;
  }

  generateAll() {
    this.generateSwann();
    this.generateMoustache();
    this.generatePapa();
    this.generateMaman();
    this.generateZelie();
    this.generateEnemies();
    this.generateBosses();
    this.generateCollectables();
    this.generateTiles();
    this.generateUI();
  }

  // ─── Utilitaires ───────────────────────────────────────────────

  makeCanvas(w, h) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    return { canvas, ctx: canvas.getContext('2d') };
  }

  setPixel(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
  }

  drawPixels(ctx, pixels, offsetX = 0, offsetY = 0) {
    pixels.forEach(([x, y, color]) => {
      this.setPixel(ctx, x + offsetX, y + offsetY, color);
    });
  }

  registerTexture(key, canvas, frameWidth, frameHeight) {
    if (this.scene.textures.exists(key)) return;
    this.scene.textures.addCanvas(key, canvas);
    if (frameWidth && frameHeight) {
      const texture = this.scene.textures.get(key);
      const frames = Math.floor(canvas.width / frameWidth);
      for (let i = 0; i < frames; i++) {
        texture.add(i, 0, i * frameWidth, 0, frameWidth, frameHeight);
      }
    }
  }

  // ─── SWANN ─────────────────────────────────────────────────────

  generateSwann() {
    // Spritesheet: 8 frames × 16px wide, 24px tall
    // Frames: 0=idle1, 1=idle2, 2=walk1, 3=walk2, 4=walk3, 5=jump, 6=fall, 7=hurt
    const frameW = 16, frameH = 24, frames = 8;
    const { canvas, ctx } = this.makeCanvas(frameW * frames, frameH);

    const skin = '#F5C5A3';
    const hair = '#F5D76E';
    const shirt = '#FFFFFF';
    const jeans = '#5B8DB8';
    const jeansHeart = '#FF6B9D';
    const shoes = '#FF6B9D';
    const outline = '#2A1A0A';

    // Base Swann pixel art (16×24)
    const basePixels = [
      // Tête
      [5,1,hair],[6,1,hair],[7,1,hair],[8,1,hair],[9,1,hair],[10,1,hair],
      [4,2,hair],[5,2,hair],[6,2,skin],[7,2,skin],[8,2,skin],[9,2,skin],[10,2,hair],[11,2,hair],
      [4,3,hair],[5,3,skin],[6,3,skin],[7,3,skin],[8,3,skin],[9,3,skin],[10,3,skin],[11,3,hair],
      [4,4,skin],[5,4,skin],[6,4,'#2A6F8B'],[7,4,skin],[8,4,skin],[9,4,'#2A6F8B'],[10,4,skin],[11,4,skin],
      [4,5,skin],[5,5,skin],[6,5,skin],[7,5,'#E8A87C'],[8,5,skin],[9,5,skin],[10,5,skin],[11,5,skin],
      [5,6,skin],[6,6,skin],[7,6,'#FF9999'],[8,6,'#FF9999'],[9,6,skin],[10,6,skin],
      [4,7,hair],[5,7,hair],[6,7,skin],[7,7,skin],[8,7,skin],[9,7,skin],[10,7,hair],[11,7,hair],
      // Corps
      [5,8,shirt],[6,8,shirt],[7,8,shirt],[8,8,shirt],[9,8,shirt],[10,8,shirt],
      [5,9,shirt],[6,9,shirt],[7,9,shirt],[8,9,shirt],[9,9,shirt],[10,9,shirt],
      [4,10,shirt],[5,10,shirt],[6,10,shirt],[7,10,shirt],[8,10,shirt],[9,10,shirt],[10,10,shirt],[11,10,shirt],
      [4,11,shirt],[5,11,shirt],[6,11,shirt],[7,11,shirt],[8,11,shirt],[9,11,shirt],[10,11,shirt],[11,11,shirt],
      // Bras (idle)
      [3,9,skin],[3,10,skin],[3,11,skin],[12,9,skin],[12,10,skin],[12,11,skin],
      // Jeans
      [5,12,jeans],[6,12,jeans],[7,12,jeans],[8,12,jeans],[9,12,jeans],[10,12,jeans],
      [5,13,jeans],[6,13,jeans],[7,13,jeans],[8,13,jeans],[9,13,jeans],[10,13,jeans],
      // Cœur sur le jean
      [7,13,jeansHeart],[8,13,jeansHeart],
      // Jambes
      [5,14,jeans],[6,14,jeans],[8,14,jeans],[9,14,jeans],
      [5,15,jeans],[6,15,jeans],[8,15,jeans],[9,15,jeans],
      [5,16,jeans],[6,16,jeans],[8,16,jeans],[9,16,jeans],
      [5,17,jeans],[6,17,jeans],[8,17,jeans],[9,17,jeans],
      // Chaussures
      [4,18,shoes],[5,18,shoes],[6,18,shoes],[7,18,'#FFFFFF'],
      [8,18,shoes],[9,18,shoes],[10,18,shoes],[11,18,'#FFFFFF'],
      // Contour
      [4,1,outline],[11,1,outline],[3,3,outline],[12,3,outline],
      [3,7,outline],[12,7,outline],[4,12,outline],[11,12,outline],
    ];

    // Frame 0 — Idle 1 (position normale)
    this.drawPixels(ctx, basePixels, 0, 0);

    // Frame 1 — Idle 2 (légère variation)
    this.drawPixels(ctx, basePixels, 16, 0);
    // Yeux légèrement fermés (clin d'œil)
    ctx.fillStyle = skin;
    ctx.fillRect(16 + 6, 4, 1, 1);
    ctx.fillRect(16 + 9, 4, 1, 1);

    // Frame 2 — Walk 1
    this.drawPixels(ctx, basePixels, 32, 0);
    // Jambe gauche avancée
    ctx.fillStyle = jeans;
    ctx.fillRect(32 + 5, 14, 2, 5);
    ctx.fillStyle = shoes;
    ctx.fillRect(32 + 4, 19, 4, 1);

    // Frame 3 — Walk 2 (neutre)
    this.drawPixels(ctx, basePixels, 48, 0);

    // Frame 4 — Walk 3
    this.drawPixels(ctx, basePixels, 64, 0);
    // Jambe droite avancée
    ctx.fillStyle = jeans;
    ctx.fillRect(64 + 9, 14, 2, 5);
    ctx.fillStyle = shoes;
    ctx.fillRect(64 + 8, 19, 4, 1);

    // Frame 5 — Jump
    this.drawPixels(ctx, basePixels, 80, 0);
    // Bras levés
    ctx.fillStyle = skin;
    ctx.fillRect(80 + 2, 8, 1, 3);
    ctx.fillRect(80 + 13, 8, 1, 3);
    // Jambes repliées
    ctx.fillStyle = jeans;
    ctx.fillRect(80 + 5, 14, 2, 2);
    ctx.fillRect(80 + 9, 14, 2, 2);

    // Frame 6 — Fall
    this.drawPixels(ctx, basePixels, 96, 0);
    // Bras écartés
    ctx.fillStyle = skin;
    ctx.fillRect(96 + 2, 10, 1, 2);
    ctx.fillRect(96 + 13, 10, 1, 2);

    // Frame 7 — Hurt (rouge)
    this.drawPixels(ctx, basePixels, 112, 0);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(112 + 4, 0, 8, 20);
    ctx.globalAlpha = 1.0;

    this.registerTexture('swann', canvas, frameW, frameH);
    this.scene.anims.create({
      key: 'swann_idle',
      frames: [{ key: 'swann', frame: 0 }, { key: 'swann', frame: 1 }],
      frameRate: 3,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'swann_walk',
      frames: [{ key: 'swann', frame: 2 }, { key: 'swann', frame: 3 }, { key: 'swann', frame: 4 }, { key: 'swann', frame: 3 }],
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'swann_jump',
      frames: [{ key: 'swann', frame: 5 }],
      frameRate: 1,
      repeat: 0,
    });
    this.scene.anims.create({
      key: 'swann_fall',
      frames: [{ key: 'swann', frame: 6 }],
      frameRate: 1,
      repeat: 0,
    });
    this.scene.anims.create({
      key: 'swann_hurt',
      frames: [{ key: 'swann', frame: 7 }, { key: 'swann', frame: 0 }],
      frameRate: 8,
      repeat: 3,
    });
  }

  // ─── MOUSTACHE ─────────────────────────────────────────────────

  generateMoustache() {
    const frameW = 16, frameH = 12, frames = 6;
    const { canvas, ctx } = this.makeCanvas(frameW * frames, frameH);

    const fur = '#8A8A9A';
    const furDark = '#5A5A6A';
    const furLight = '#C0C0D0';
    const white = '#F0F0F8';
    const eyes = '#4FC3F7';
    const nose = '#FF9999';
    const outline = '#2A2A3A';

    const catBase = [
      // Corps
      [2,4,fur],[3,4,fur],[4,4,fur],[5,4,fur],[6,4,fur],[7,4,fur],[8,4,fur],[9,4,fur],[10,4,fur],[11,4,fur],[12,4,fur],[13,4,fur],
      [2,5,fur],[3,5,furLight],[4,5,furLight],[5,5,furLight],[6,5,white],[7,5,white],[8,5,white],[9,5,fur],[10,5,fur],[11,5,fur],[12,5,fur],[13,5,fur],
      [1,6,fur],[2,6,fur],[3,6,fur],[4,6,fur],[5,6,fur],[6,6,fur],[7,6,fur],[8,6,fur],[9,6,fur],[10,6,fur],[11,6,fur],[12,6,fur],[13,6,fur],[14,6,fur],
      [1,7,fur],[2,7,fur],[3,7,fur],[4,7,fur],[5,7,fur],[6,7,fur],[7,7,fur],[8,7,fur],[9,7,fur],[10,7,fur],[11,7,fur],[12,7,fur],[13,7,fur],[14,7,fur],
      [2,8,fur],[3,8,fur],[4,8,fur],[5,8,fur],[6,8,fur],[7,8,fur],[8,8,fur],[9,8,fur],[10,8,fur],[11,8,fur],[12,8,fur],[13,8,fur],
      // Pattes
      [3,9,fur],[4,9,fur],[5,9,fur],[8,9,fur],[9,9,fur],[10,9,fur],
      [3,10,fur],[4,10,fur],[5,10,fur],[8,10,fur],[9,10,fur],[10,10,fur],
      [3,11,white],[4,11,white],[5,11,white],[8,11,white],[9,11,white],[10,11,white],
      // Tête
      [5,0,fur],[6,0,fur],[7,0,fur],[8,0,fur],[9,0,fur],[10,0,fur],
      [4,1,fur],[5,1,fur],[6,1,fur],[7,1,fur],[8,1,fur],[9,1,fur],[10,1,fur],[11,1,fur],
      [3,2,fur],[4,2,furDark],[5,2,fur],[6,2,fur],[7,2,fur],[8,2,fur],[9,2,fur],[10,2,furDark],[11,2,fur],[12,2,fur],
      // Oreilles
      [4,0,furDark],[5,0,fur],[9,0,fur],[10,0,furDark],
      [3,1,furDark],[11,1,furDark],
      // Yeux
      [5,3,eyes],[6,3,eyes],[9,3,eyes],[10,3,eyes],
      // Nez
      [7,3,nose],[8,3,nose],
      // Rayures
      [4,6,furDark],[6,6,furDark],[9,6,furDark],[11,6,furDark],
      [3,7,furDark],[5,7,furDark],[10,7,furDark],[12,7,furDark],
    ];

    // Frame 0 — Idle
    this.drawPixels(ctx, catBase, 0, 0);

    // Frame 1 — Idle 2 (queue levée)
    this.drawPixels(ctx, catBase, 16, 0);
    ctx.fillStyle = fur;
    ctx.fillRect(16 + 13, 5, 2, 4);
    ctx.fillRect(16 + 14, 4, 1, 1);

    // Frame 2 — Run 1
    this.drawPixels(ctx, catBase, 32, 0);
    ctx.fillStyle = fur;
    ctx.fillRect(32 + 2, 9, 3, 2);
    ctx.fillRect(32 + 10, 9, 3, 2);

    // Frame 3 — Run 2
    this.drawPixels(ctx, catBase, 48, 0);
    ctx.fillStyle = fur;
    ctx.fillRect(48 + 4, 9, 3, 2);
    ctx.fillRect(48 + 8, 9, 3, 2);

    // Frame 4 — Attack (bond)
    this.drawPixels(ctx, catBase, 64, 0);
    ctx.fillStyle = '#FFE135';
    ctx.fillRect(64 + 13, 5, 3, 3);

    // Frame 5 — Happy
    this.drawPixels(ctx, catBase, 80, 0);
    ctx.fillStyle = fur;
    ctx.fillRect(80 + 12, 3, 3, 7);
    ctx.fillRect(80 + 13, 2, 1, 1);

    this.registerTexture('moustache', canvas, frameW, frameH);
    this.scene.anims.create({
      key: 'moustache_idle',
      frames: [{ key: 'moustache', frame: 0 }, { key: 'moustache', frame: 1 }],
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'moustache_run',
      frames: [{ key: 'moustache', frame: 2 }, { key: 'moustache', frame: 3 }],
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'moustache_attack',
      frames: [{ key: 'moustache', frame: 4 }],
      frameRate: 1,
      repeat: 0,
    });
    this.scene.anims.create({
      key: 'moustache_happy',
      frames: [{ key: 'moustache', frame: 5 }, { key: 'moustache', frame: 0 }],
      frameRate: 4,
      repeat: 2,
    });
  }

  // ─── PAPA ──────────────────────────────────────────────────────

  generatePapa() {
    const frameW = 18, frameH = 28, frames = 5;
    const { canvas, ctx } = this.makeCanvas(frameW * frames, frameH);

    const skinDark = '#8B5E3C';
    const skinMid = '#A0714F';
    const clothes = '#1A1A2E';
    const glasses = '#888888';
    const coffee = '#6B3F23';
    const outline = '#0A0A1A';

    const papaBase = [
      // Tête
      [6,1,skinDark],[7,1,skinDark],[8,1,skinDark],[9,1,skinDark],[10,1,skinDark],[11,1,skinDark],
      [5,2,skinDark],[6,2,skinMid],[7,2,skinMid],[8,2,skinMid],[9,2,skinMid],[10,2,skinMid],[11,2,skinMid],[12,2,skinDark],
      [5,3,skinDark],[6,3,skinMid],[7,3,skinMid],[8,3,skinMid],[9,3,skinMid],[10,3,skinMid],[11,3,skinMid],[12,3,skinDark],
      // Yeux + lunettes
      [6,4,glasses],[7,4,glasses],[8,4,glasses],[9,4,glasses],[10,4,glasses],[11,4,glasses],
      [6,5,glasses],[7,5,'#4488AA'],[8,5,'#4488AA'],[9,5,glasses],[10,5,'#4488AA'],[11,5,'#4488AA'],
      [6,6,glasses],[7,6,glasses],[8,6,glasses],[9,6,glasses],[10,6,glasses],[11,6,glasses],
      // Nez
      [8,7,skinMid],[9,7,skinMid],
      // Bouche
      [7,8,skinDark],[8,8,'#C07050'],[9,8,'#C07050'],[10,8,skinDark],
      // Oreilles
      [4,4,skinDark],[4,5,skinDark],[13,4,skinDark],[13,5,skinDark],
      // Corps
      [5,10,clothes],[6,10,clothes],[7,10,clothes],[8,10,clothes],[9,10,clothes],[10,10,clothes],[11,10,clothes],[12,10,clothes],
      [5,11,clothes],[6,11,clothes],[7,11,clothes],[8,11,clothes],[9,11,clothes],[10,11,clothes],[11,11,clothes],[12,11,clothes],
      [5,12,clothes],[6,12,clothes],[7,12,clothes],[8,12,clothes],[9,12,clothes],[10,12,clothes],[11,12,clothes],[12,12,clothes],
      [5,13,clothes],[6,13,clothes],[7,13,clothes],[8,13,clothes],[9,13,clothes],[10,13,clothes],[11,13,clothes],[12,13,clothes],
      [5,14,clothes],[6,14,clothes],[7,14,clothes],[8,14,clothes],[9,14,clothes],[10,14,clothes],[11,14,clothes],[12,14,clothes],
      // Bras
      [3,11,clothes],[3,12,clothes],[3,13,clothes],[4,13,skinDark],[14,11,clothes],[14,12,clothes],[14,13,clothes],[15,13,skinDark],
      // Tasse de café
      [14,13,coffee],[15,13,coffee],[15,14,coffee],[14,14,coffee],[15,15,coffee],
      // Pantalon
      [5,15,clothes],[6,15,clothes],[7,15,clothes],[8,15,clothes],[9,15,clothes],[10,15,clothes],[11,15,clothes],[12,15,clothes],
      [5,16,clothes],[6,16,clothes],[8,16,clothes],[9,16,clothes],[10,16,clothes],[11,16,clothes],
      [5,17,clothes],[6,17,clothes],[8,17,clothes],[9,17,clothes],
      [5,18,clothes],[6,18,clothes],[8,18,clothes],[9,18,clothes],
      [5,19,clothes],[6,19,clothes],[8,19,clothes],[9,19,clothes],
      // Chaussures
      [4,20,'#111111'],[5,20,'#111111'],[6,20,'#111111'],[7,20,'#111111'],
      [8,20,'#111111'],[9,20,'#111111'],[10,20,'#111111'],[11,20,'#111111'],
    ];

    // Frame 0 — Idle
    this.drawPixels(ctx, papaBase, 0, 0);

    // Frame 1 — Bras croisés (strict)
    this.drawPixels(ctx, papaBase, 18, 0);
    ctx.fillStyle = clothes;
    ctx.fillRect(18 + 5, 11, 7, 2);
    ctx.fillStyle = '#111111';
    ctx.fillRect(18 + 6, 4, 1, 1);
    ctx.fillRect(18 + 11, 4, 1, 1);

    // Frame 2 — Sourcil levé (dubitatif)
    this.drawPixels(ctx, papaBase, 36, 0);
    ctx.fillStyle = '#1A1A2E';
    ctx.fillRect(36 + 6, 3, 3, 1);

    // Frame 3 — Qui sourit
    this.drawPixels(ctx, papaBase, 54, 0);
    ctx.fillStyle = '#C07050';
    ctx.fillRect(54 + 7, 8, 4, 1);
    ctx.fillStyle = '#FF9999';
    ctx.fillRect(54 + 7, 8, 4, 1);

    // Frame 4 — Pouce levé
    this.drawPixels(ctx, papaBase, 72, 0);
    ctx.fillStyle = skinDark;
    ctx.fillRect(72 + 14, 10, 2, 3);
    ctx.fillRect(72 + 15, 9, 1, 1);

    this.registerTexture('papa', canvas, frameW, frameH);
    this.scene.anims.create({
      key: 'papa_idle',
      frames: [{ key: 'papa', frame: 0 }],
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'papa_strict',
      frames: [{ key: 'papa', frame: 1 }, { key: 'papa', frame: 2 }],
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'papa_smile',
      frames: [{ key: 'papa', frame: 3 }, { key: 'papa', frame: 4 }],
      frameRate: 3,
      repeat: -1,
    });
  }

  // ─── MAMAN ─────────────────────────────────────────────────────

  generateMaman() {
    const frameW = 16, frameH = 26, frames = 3;
    const { canvas, ctx } = this.makeCanvas(frameW * frames, frameH);

    const skin = '#FDDBB4';
    const hair = '#C8A060';
    const shirt = '#FFFFFF';
    const stripes = '#5B8DB8';
    const jeans = '#7090B0';
    const outline = '#2A1A0A';

    const mamanBase = [
      // Tête
      [5,1,hair],[6,1,hair],[7,1,hair],[8,1,hair],[9,1,hair],[10,1,hair],
      [4,2,hair],[5,2,skin],[6,2,skin],[7,2,skin],[8,2,skin],[9,2,skin],[10,2,skin],[11,2,hair],
      [4,3,skin],[5,3,skin],[6,3,skin],[7,3,skin],[8,3,skin],[9,3,skin],[10,3,skin],[11,3,skin],
      [5,4,skin],[6,4,'#5B8DB8'],[7,4,skin],[8,4,skin],[9,4,'#5B8DB8'],[10,4,skin],
      [6,5,skin],[7,5,skin],[8,5,skin],[9,5,skin],
      [6,6,skin],[7,6,'#FF9999'],[8,6,skin],[9,6,skin],
      [5,7,hair],[6,7,hair],[7,7,skin],[8,7,skin],[9,7,hair],[10,7,hair],
      // Corps à rayures
      [5,8,shirt],[6,8,stripes],[7,8,shirt],[8,8,stripes],[9,8,shirt],[10,8,stripes],
      [5,9,stripes],[6,9,shirt],[7,9,stripes],[8,9,shirt],[9,9,stripes],[10,9,shirt],
      [4,10,shirt],[5,10,shirt],[6,10,stripes],[7,10,shirt],[8,10,stripes],[9,10,shirt],[10,10,stripes],[11,10,shirt],
      [4,11,stripes],[5,11,shirt],[6,11,stripes],[7,11,shirt],[8,11,stripes],[9,11,shirt],[10,11,stripes],[11,11,shirt],
      [5,12,shirt],[6,12,stripes],[7,12,shirt],[8,12,stripes],[9,12,shirt],[10,12,stripes],
      // Bras
      [3,10,skin],[3,11,skin],[4,12,skin],[13,10,skin],[13,11,skin],[12,12,skin],
      // Jean
      [5,13,jeans],[6,13,jeans],[7,13,jeans],[8,13,jeans],[9,13,jeans],[10,13,jeans],
      [5,14,jeans],[6,14,jeans],[7,14,jeans],[8,14,jeans],[9,14,jeans],[10,14,jeans],
      [5,15,jeans],[6,15,jeans],[8,15,jeans],[9,15,jeans],
      [5,16,jeans],[6,16,jeans],[8,16,jeans],[9,16,jeans],
      [5,17,jeans],[6,17,jeans],[8,17,jeans],[9,17,jeans],
      // Chaussures
      [4,18,'#806040'],[5,18,'#806040'],[6,18,'#806040'],
      [8,18,'#806040'],[9,18,'#806040'],[10,18,'#806040'],
    ];

    this.drawPixels(ctx, mamanBase, 0, 0);
    this.drawPixels(ctx, mamanBase, 16, 0);
    // Liste dans la main
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(16 + 13, 10, 3, 4);
    ctx.fillStyle = '#888888';
    ctx.fillRect(16 + 14, 11, 2, 1);
    ctx.fillRect(16 + 14, 12, 2, 1);

    this.drawPixels(ctx, mamanBase, 32, 0);
    // Sourit
    ctx.fillStyle = '#FF9999';
    ctx.fillRect(32 + 6, 6, 4, 1);

    this.registerTexture('maman', canvas, frameW, frameH);
    this.scene.anims.create({
      key: 'maman_idle',
      frames: [{ key: 'maman', frame: 0 }, { key: 'maman', frame: 1 }],
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'maman_happy',
      frames: [{ key: 'maman', frame: 2 }],
      frameRate: 2,
      repeat: 0,
    });
  }

  // ─── ZÉLIE ─────────────────────────────────────────────────────

  generateZelie() {
    const frameW = 16, frameH = 26, frames = 4;
    const { canvas, ctx } = this.makeCanvas(frameW * frames, frameH);

    const skin = '#FDDBB4';
    const hair = '#5A3A1A';
    const shirt = '#9B59B6';
    const jeans = '#3A5A8A';
    const earphones = '#333333';

    const zelieBase = [
      // Cheveux bruns ondulés
      [4,0,hair],[5,0,hair],[6,0,hair],[7,0,hair],[8,0,hair],[9,0,hair],[10,0,hair],[11,0,hair],
      [3,1,hair],[4,1,hair],[5,1,skin],[6,1,skin],[7,1,skin],[8,1,skin],[9,1,skin],[10,1,hair],[11,1,hair],[12,1,hair],
      [3,2,hair],[4,2,skin],[5,2,skin],[6,2,skin],[7,2,skin],[8,2,skin],[9,2,skin],[10,2,skin],[11,2,hair],[12,2,hair],
      [4,3,skin],[5,3,skin],[6,3,'#4A3020'],[7,3,skin],[8,3,skin],[9,3,'#4A3020'],[10,3,skin],[11,3,skin],
      [4,4,skin],[5,4,skin],[6,4,skin],[7,4,'#C09070'],[8,4,skin],[9,4,skin],[10,4,skin],
      [5,5,skin],[6,5,skin],[7,5,'#E88080'],[8,5,'#E88080'],[9,5,skin],[10,5,skin],
      [3,2,earphones],[3,3,earphones],[3,4,earphones],[12,2,earphones],[12,3,earphones],[12,4,earphones],
      [4,1,hair],[5,1,hair],[9,1,hair],[10,1,hair],[11,1,hair],
      // Corps
      [5,7,shirt],[6,7,shirt],[7,7,shirt],[8,7,shirt],[9,7,shirt],[10,7,shirt],
      [5,8,shirt],[6,8,shirt],[7,8,shirt],[8,8,shirt],[9,8,shirt],[10,8,shirt],
      [4,9,shirt],[5,9,shirt],[6,9,shirt],[7,9,shirt],[8,9,shirt],[9,9,shirt],[10,9,shirt],[11,9,shirt],
      [4,10,shirt],[5,10,shirt],[6,10,shirt],[7,10,shirt],[8,10,shirt],[9,10,shirt],[10,10,shirt],[11,10,shirt],
      [5,11,shirt],[6,11,shirt],[7,11,shirt],[8,11,shirt],[9,11,shirt],[10,11,shirt],
      // Bras
      [3,9,skin],[3,10,skin],[12,9,skin],[12,10,skin],
      // Jean
      [5,12,jeans],[6,12,jeans],[7,12,jeans],[8,12,jeans],[9,12,jeans],[10,12,jeans],
      [5,13,jeans],[6,13,jeans],[7,13,jeans],[8,13,jeans],[9,13,jeans],[10,13,jeans],
      [5,14,jeans],[6,14,jeans],[8,14,jeans],[9,14,jeans],
      [5,15,jeans],[6,15,jeans],[8,15,jeans],[9,15,jeans],
      [5,16,jeans],[6,16,jeans],[8,16,jeans],[9,16,jeans],
      [5,17,jeans],[6,17,jeans],[8,17,jeans],[9,17,jeans],
      // Baskets
      [4,18,'#FFFFFF'],[5,18,'#FFFFFF'],[6,18,'#FFFFFF'],[7,18,'#CCCCCC'],
      [8,18,'#FFFFFF'],[9,18,'#FFFFFF'],[10,18,'#FFFFFF'],[11,18,'#CCCCCC'],
    ];

    this.drawPixels(ctx, zelieBase, 0, 0);
    this.drawPixels(ctx, zelieBase, 16, 0);
    // Bras croisés
    ctx.fillStyle = shirt;
    ctx.fillRect(16 + 5, 9, 6, 2);
    ctx.fillStyle = skin;
    ctx.fillRect(16 + 4, 10, 1, 1);
    ctx.fillRect(16 + 11, 10, 1, 1);

    this.drawPixels(ctx, zelieBase, 32, 0);
    // Écouteurs retirés
    ctx.fillStyle = '#9B59B6';
    ctx.fillRect(32 + 2, 3, 2, 2);
    ctx.fillRect(32 + 12, 3, 2, 2);

    this.drawPixels(ctx, zelieBase, 48, 0);
    // Sourit
    ctx.fillStyle = '#E88080';
    ctx.fillRect(48 + 6, 5, 4, 1);

    this.registerTexture('zelie', canvas, frameW, frameH);
    this.scene.anims.create({
      key: 'zelie_idle',
      frames: [{ key: 'zelie', frame: 0 }],
      frameRate: 2,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'zelie_block',
      frames: [{ key: 'zelie', frame: 1 }],
      frameRate: 1,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'zelie_listen',
      frames: [{ key: 'zelie', frame: 2 }],
      frameRate: 1,
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'zelie_smile',
      frames: [{ key: 'zelie', frame: 3 }],
      frameRate: 2,
      repeat: 0,
    });
  }

  // ─── ENNEMIS ───────────────────────────────────────────────────

  generateEnemies() {
    this.generateChaussetteFantome();
    this.generateCuillereRebelle();
    this.generateGlaconSauteur();
    this.generateFauteOrthographe();
    this.generatePigeonParc();
  }

  generateChaussetteFantome() {
    const { canvas, ctx } = this.makeCanvas(32, 16);
    // Frame 0 — Normal
    const sock = [
      [1,2,'#FF6666'],[2,2,'#FFFFFF'],[3,2,'#FF6666'],[4,2,'#FFFFFF'],[5,2,'#FF6666'],[6,2,'#FFFFFF'],
      [0,3,'#FF6666'],[1,3,'#FFFFFF'],[2,3,'#FF6666'],[3,3,'#FFFFFF'],[4,3,'#FF6666'],[5,3,'#FFFFFF'],[6,3,'#FF6666'],[7,3,'#FFFFFF'],
      [0,4,'#FFFFFF'],[1,4,'#FF6666'],[2,4,'#FFFFFF'],[3,4,'#FF6666'],[4,4,'#FFFFFF'],[5,4,'#FF6666'],[6,4,'#FFFFFF'],[7,4,'#FF6666'],
      [0,5,'#FF6666'],[1,5,'#FFFFFF'],[2,5,'#FF6666'],[3,5,'#FFFFFF'],[4,5,'#FF6666'],[5,5,'#FFFFFF'],[6,5,'#FF6666'],[7,5,'#FFFFFF'],
      [0,6,'#FF6666'],[1,6,'#FF6666'],[2,6,'#FF6666'],[3,6,'#FF6666'],[4,6,'#FF6666'],[5,6,'#FF6666'],[6,6,'#FF6666'],[7,6,'#FF6666'],
      [0,7,'#CCCCCC'],[1,7,'#CCCCCC'],[2,7,'#CCCCCC'],[3,7,'#CCCCCC'],[4,7,'#CCCCCC'],[5,7,'#CCCCCC'],[6,7,'#CCCCCC'],[7,7,'#CCCCCC'],
      // Yeux de fantôme
      [2,4,'#FF0000'],[5,4,'#FF0000'],
      // Glow fantôme
      [3,2,'#FFFFFF66'],[4,2,'#FFFFFF66'],
    ];
    this.drawPixels(ctx, sock, 0, 0);

    // Frame 1 — Légèrement haut (zigzag)
    this.drawPixels(ctx, sock, 16, 1);

    this.registerTexture('chaussette', canvas, 16, 16);
    this.scene.anims.create({
      key: 'chaussette_float',
      frames: [{ key: 'chaussette', frame: 0 }, { key: 'chaussette', frame: 1 }],
      frameRate: 3,
      repeat: -1,
    });
  }

  generateCuillereRebelle() {
    const { canvas, ctx } = this.makeCanvas(32, 16);
    const silver = '#C0C0C0';
    const dark = '#808080';

    const spoon = [
      [3,0,silver],[4,0,silver],[5,0,silver],
      [2,1,silver],[3,1,silver],[4,1,dark],[5,1,silver],[6,1,silver],
      [3,2,silver],[4,2,silver],[5,2,silver],
      [4,3,silver],[4,4,silver],[4,5,silver],[4,6,silver],
      [3,7,silver],[4,7,silver],[5,7,silver],
      // Yeux
      [2,2,'#333333'],[5,2,'#333333'],
      // Bouche
      [3,3,'#CC4444'],[4,3,'#CC4444'],[5,3,'#CC4444'],
      // Jambes
      [3,8,silver],[5,8,silver],
      [2,9,silver],[6,9,silver],
    ];
    this.drawPixels(ctx, spoon, 0, 0);
    this.drawPixels(ctx, spoon, 16, 0);
    // Frame 1 — Jambe levée droite
    ctx.fillStyle = silver;
    ctx.fillRect(16 + 6, 8, 1, 2);
    ctx.fillRect(16 + 7, 9, 1, 1);

    this.registerTexture('cuillere', canvas, 16, 16);
    this.scene.anims.create({
      key: 'cuillere_walk',
      frames: [{ key: 'cuillere', frame: 0 }, { key: 'cuillere', frame: 1 }],
      frameRate: 6,
      repeat: -1,
    });
  }

  generateGlaconSauteur() {
    const { canvas, ctx } = this.makeCanvas(32, 16);
    ctx.fillStyle = '#A8E6FF';
    ctx.fillRect(2, 2, 8, 10);
    ctx.fillStyle = '#D0F4FF';
    ctx.fillRect(3, 2, 2, 3);
    ctx.fillStyle = '#333333';
    ctx.fillRect(3, 5, 1, 1);
    ctx.fillRect(7, 5, 1, 1);
    ctx.fillStyle = '#336688';
    ctx.fillRect(4, 7, 4, 1);
    // Frame 2 — comprimé (avant saut)
    ctx.fillStyle = '#A8E6FF';
    ctx.fillRect(18, 5, 8, 7);
    ctx.fillStyle = '#D0F4FF';
    ctx.fillRect(19, 5, 2, 2);
    ctx.fillStyle = '#333333';
    ctx.fillRect(19, 8, 1, 1);
    ctx.fillRect(23, 8, 1, 1);

    this.registerTexture('glacon', canvas, 16, 16);
    this.scene.anims.create({
      key: 'glacon_idle',
      frames: [{ key: 'glacon', frame: 0 }, { key: 'glacon', frame: 1 }],
      frameRate: 4,
      repeat: -1,
    });
  }

  generateFauteOrthographe() {
    const { canvas, ctx } = this.makeCanvas(32, 16);
    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#FF4444';
    ctx.fillText('X', 2, 12);
    ctx.fillStyle = '#CC0000';
    ctx.fillText('?', 6, 12);
    ctx.strokeStyle = '#FF4444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, 13);
    ctx.lineTo(11, 13);
    ctx.stroke();

    ctx.fillStyle = '#FF6666';
    ctx.fillText('!', 18, 12);
    ctx.fillStyle = '#AA0000';
    ctx.fillText('÷', 21, 12);

    this.registerTexture('faute', canvas, 16, 16);
    this.scene.anims.create({
      key: 'faute_fly',
      frames: [{ key: 'faute', frame: 0 }, { key: 'faute', frame: 1 }],
      frameRate: 5,
      repeat: -1,
    });
  }

  generatePigeonParc() {
    const { canvas, ctx } = this.makeCanvas(32, 16);
    const pigeon = [
      [2,3,'#888888'],[3,3,'#888888'],[4,3,'#888888'],[5,3,'#888888'],[6,3,'#888888'],
      [1,4,'#888888'],[2,4,'#AAAAAA'],[3,4,'#AAAAAA'],[4,4,'#AAAAAA'],[5,4,'#AAAAAA'],[6,4,'#888888'],[7,4,'#888888'],
      [1,5,'#888888'],[2,5,'#AAAAAA'],[3,5,'#FFFFFF'],[4,5,'#FFFFFF'],[5,5,'#AAAAAA'],[6,5,'#888888'],[7,5,'#888888'],
      [1,6,'#888888'],[2,6,'#888888'],[3,6,'#888888'],[4,6,'#888888'],[5,6,'#888888'],[6,6,'#888888'],
      // Tête
      [6,1,'#AAAAAA'],[7,1,'#AAAAAA'],[8,1,'#AAAAAA'],
      [6,2,'#AAAAAA'],[7,2,'#333333'],[8,2,'#AAAAAA'],
      [9,2,'#FFD700'],
      // Pattes
      [3,7,'#FFD700'],[5,7,'#FFD700'],
      [2,8,'#FFD700'],[3,8,'#FFD700'],[5,8,'#FFD700'],[6,8,'#FFD700'],
    ];
    this.drawPixels(ctx, pigeon, 0, 0);
    this.drawPixels(ctx, pigeon, 16, 0);
    // Frame 1 — ailes baissées
    ctx.fillStyle = '#888888';
    ctx.fillRect(16, 6, 3, 2);
    ctx.fillRect(16 + 7, 6, 3, 2);

    this.registerTexture('pigeon', canvas, 16, 16);
    this.scene.anims.create({
      key: 'pigeon_fly',
      frames: [{ key: 'pigeon', frame: 0 }, { key: 'pigeon', frame: 1 }],
      frameRate: 6,
      repeat: -1,
    });
  }

  // ─── BOSS ──────────────────────────────────────────────────────

  generateBosses() {
    this.generateReveilBoss();
    this.generateGrillePainBoss();
  }

  generateReveilBoss() {
    const { canvas, ctx } = this.makeCanvas(64, 64);
    // Corps du réveil
    ctx.fillStyle = '#CC4444';
    ctx.fillRect(8, 16, 48, 40);
    // Cloche droite
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(50, 8, 8, 16);
    // Cloche gauche
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(6, 8, 8, 16);
    // Cadran
    ctx.fillStyle = '#FFFFEE';
    ctx.fillRect(14, 20, 36, 28);
    // Chiffres (simplified)
    ctx.fillStyle = '#333333';
    ctx.fillRect(30, 22, 4, 2);
    ctx.fillRect(30, 40, 4, 2);
    ctx.fillRect(14, 32, 4, 2);
    ctx.fillRect(46, 32, 4, 2);
    // Aiguilles
    ctx.fillStyle = '#CC2222';
    ctx.fillRect(30, 26, 2, 8);
    ctx.fillRect(30, 26, 6, 2);
    // Yeux méchants
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(18, 26, 8, 6);
    ctx.fillRect(38, 26, 8, 6);
    ctx.fillStyle = '#FFFF00';
    ctx.fillRect(20, 27, 4, 4);
    ctx.fillRect(40, 27, 4, 4);
    // Bouche
    ctx.fillStyle = '#CC0000';
    ctx.fillRect(18, 38, 28, 4);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(20, 39, 4, 2);
    ctx.fillRect(28, 39, 4, 2);
    ctx.fillRect(36, 39, 4, 2);
    // Pieds
    ctx.fillStyle = '#AA3333';
    ctx.fillRect(14, 56, 10, 8);
    ctx.fillRect(40, 56, 10, 8);

    this.registerTexture('boss_reveil', canvas);
  }

  generateGrillePainBoss() {
    const { canvas, ctx } = this.makeCanvas(48, 64);
    // Corps chrome
    const grad = ctx.createLinearGradient(0, 0, 48, 0);
    grad.addColorStop(0, '#B0B0B0');
    grad.addColorStop(0.5, '#E0E0E0');
    grad.addColorStop(1, '#B0B0B0');
    ctx.fillStyle = grad;
    ctx.fillRect(4, 16, 40, 40);
    // Fentes
    ctx.fillStyle = '#333333';
    ctx.fillRect(10, 18, 12, 4);
    ctx.fillRect(26, 18, 12, 4);
    // Résistances rouges
    ctx.fillStyle = '#FF4400';
    ctx.fillRect(11, 19, 10, 2);
    ctx.fillRect(27, 19, 10, 2);
    // Yeux
    ctx.fillStyle = '#FF6600';
    ctx.fillRect(12, 28, 8, 8);
    ctx.fillRect(28, 28, 8, 8);
    ctx.fillStyle = '#FFDD00';
    ctx.fillRect(14, 30, 4, 4);
    ctx.fillRect(30, 30, 4, 4);
    // Bouche grillagée
    ctx.fillStyle = '#CC2200';
    ctx.fillRect(10, 44, 28, 6);
    ctx.fillStyle = '#884400';
    for (let i = 0; i < 5; i++) {
      ctx.fillRect(12 + i * 5, 45, 2, 4);
    }
    // Pieds
    ctx.fillStyle = '#808080';
    ctx.fillRect(6, 56, 8, 8);
    ctx.fillRect(34, 56, 8, 8);
    // Flammes par les fentes
    ctx.fillStyle = '#FF6600';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(10, 12, 4, 6);
    ctx.fillRect(18, 10, 4, 8);
    ctx.fillRect(26, 12, 4, 6);
    ctx.fillRect(34, 10, 4, 8);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#FFDD00';
    ctx.globalAlpha = 0.5;
    ctx.fillRect(12, 8, 2, 6);
    ctx.fillRect(20, 6, 2, 8);
    ctx.fillRect(28, 8, 2, 6);
    ctx.fillRect(36, 6, 2, 8);
    ctx.globalAlpha = 1;

    this.registerTexture('boss_grillePain', canvas);
  }

  // ─── COLLECTABLES ──────────────────────────────────────────────

  generateCollectables() {
    // Star rose — 8×8
    const { canvas: starC, ctx: starCtx } = this.makeCanvas(64, 8);
    const starColors = ['#FF6B9D', '#FF9EC4', '#FFB5D5', '#FF6B9D'];
    for (let f = 0; f < 4; f++) {
      const c = starColors[f];
      const off = f * 16;
      const pixels = [
        [3,0,c],[4,0,c],
        [2,1,'#FFDDEE'],[3,1,c],[4,1,c],[5,1,c],
        [0,2,c],[1,2,c],[2,2,c],[3,2,c],[4,2,c],[5,2,c],[6,2,c],[7,2,c],
        [1,3,c],[2,3,c],[3,3,'#FFDDEE'],[4,3,'#FFDDEE'],[5,3,c],[6,3,c],
        [2,4,c],[3,4,c],[4,4,c],[5,4,c],
        [1,5,c],[2,5,c],[5,5,c],[6,5,c],
        [0,6,c],[7,6,c],
      ];
      pixels.forEach(([x, y, col]) => {
        starCtx.fillStyle = col;
        starCtx.fillRect(x + off, y, 1, 1);
      });
    }
    this.registerTexture('star_rose', starC, 8, 8);
    this.scene.anims.create({
      key: 'star_spin',
      frames: [
        { key: 'star_rose', frame: 0 },
        { key: 'star_rose', frame: 1 },
        { key: 'star_rose', frame: 2 },
        { key: 'star_rose', frame: 3 },
      ],
      frameRate: 8,
      repeat: -1,
    });

    // Cœur — 8×8
    const { canvas: heartC, ctx: heartCtx } = this.makeCanvas(16, 8);
    const heartPixels = [
      [1,1,'#FF4444'],[2,1,'#FF4444'],[4,1,'#FF4444'],[5,1,'#FF4444'],
      [0,2,'#FF4444'],[1,2,'#FF8888'],[2,2,'#FF4444'],[3,2,'#FF4444'],[4,2,'#FF8888'],[5,2,'#FF4444'],[6,2,'#FF4444'],
      [0,3,'#FF4444'],[1,3,'#FF4444'],[2,3,'#FF4444'],[3,3,'#FF4444'],[4,3,'#FF4444'],[5,3,'#FF4444'],[6,3,'#FF4444'],
      [1,4,'#FF4444'],[2,4,'#FF4444'],[3,4,'#FF4444'],[4,4,'#FF4444'],[5,4,'#FF4444'],
      [2,5,'#FF4444'],[3,5,'#FF4444'],[4,5,'#FF4444'],
      [3,6,'#FF4444'],
    ];
    this.drawPixels(heartCtx, heartPixels, 0, 0);
    this.drawPixels(heartCtx, heartPixels, 8, 0);
    heartCtx.fillStyle = '#FFAAAA';
    heartCtx.fillRect(9, 2, 1, 1);
    this.registerTexture('heart', heartC, 8, 8);

    // Bonne Action (étoile dorée) — 8×8
    const { canvas: baC, ctx: baCtx } = this.makeCanvas(16, 8);
    const baPixels = [
      [3,0,'#FFD700'],[4,0,'#FFD700'],
      [2,1,'#FFE135'],[3,1,'#FFD700'],[4,1,'#FFD700'],[5,1,'#FFE135'],
      [0,2,'#FFD700'],[1,2,'#FFD700'],[2,2,'#FFD700'],[3,2,'#FFD700'],[4,2,'#FFD700'],[5,2,'#FFD700'],[6,2,'#FFD700'],[7,2,'#FFD700'],
      [1,3,'#FFD700'],[2,3,'#FFD700'],[3,3,'#FFE135'],[4,3,'#FFE135'],[5,3,'#FFD700'],[6,3,'#FFD700'],
      [2,4,'#FFD700'],[3,4,'#FFD700'],[4,4,'#FFD700'],[5,4,'#FFD700'],
      [1,5,'#FFD700'],[6,5,'#FFD700'],
    ];
    this.drawPixels(baCtx, baPixels, 0, 0);
    this.drawPixels(baCtx, baPixels, 8, 0);
    baCtx.fillStyle = '#FFFFFF';
    baCtx.fillRect(9, 2, 1, 1);
    this.registerTexture('bonne_action', baC, 8, 8);

    // Pelote de laine — 8×8
    const { canvas: woolC, ctx: woolCtx } = this.makeCanvas(8, 8);
    woolCtx.fillStyle = '#9B59B6';
    woolCtx.fillRect(1, 2, 6, 4);
    woolCtx.fillRect(2, 1, 4, 6);
    woolCtx.fillStyle = '#C39BD3';
    woolCtx.fillRect(2, 2, 1, 1);
    woolCtx.fillRect(4, 3, 2, 1);
    woolCtx.fillRect(2, 5, 3, 1);
    this.registerTexture('wool_ball', woolC);
  }

  // ─── TILES ─────────────────────────────────────────────────────

  generateTiles() {
    // Tileset principal — 16 tuiles de 16×16 organisées sur une ligne
    const tileCount = 16;
    const { canvas, ctx } = this.makeCanvas(tileCount * 16, 16);

    // Tile 0 — Sol parquet clair (chambre)
    for (let x = 0; x < 16; x++) {
      ctx.fillStyle = x % 4 === 0 ? '#C8A060' : '#D4A96A';
      ctx.fillRect(x, 0, 1, 2);
      ctx.fillStyle = x % 4 === 0 ? '#C8A060' : '#D4A96A';
      ctx.fillRect(x, 2, 1, 14);
    }
    ctx.fillStyle = '#B89050';
    ctx.fillRect(0, 0, 16, 1);

    // Tile 1 — Mur papier peint rose étoilé
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#F2A7C3' : '#EFA0BC';
        ctx.fillRect(x + 16, y, 1, 1);
      }
    }
    // Petites étoiles
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(18, 3, 1, 1);
    ctx.fillRect(26, 9, 1, 1);
    ctx.fillRect(23, 14, 1, 1);
    ctx.fillRect(19, 12, 1, 1);

    // Tile 2 — Plateforme (surface bois foncé)
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(32, 0, 16, 16);
    ctx.fillStyle = '#6B4E0F';
    ctx.fillRect(32, 0, 16, 3);
    ctx.fillStyle = '#A07820';
    ctx.fillRect(32, 1, 16, 1);
    ctx.fillStyle = '#7A5A10';
    ctx.fillRect(35, 4, 1, 10);
    ctx.fillRect(42, 4, 1, 10);

    // Tile 3 — Canapé (gris, rebondissant)
    ctx.fillStyle = '#8A8A9A';
    ctx.fillRect(48, 2, 16, 14);
    ctx.fillStyle = '#6A6A7A';
    ctx.fillRect(48, 2, 16, 3);
    ctx.fillStyle = '#AAAABC';
    ctx.fillRect(49, 3, 14, 2);
    // Coussin
    ctx.fillStyle = '#9A9AAA';
    ctx.fillRect(50, 6, 6, 6);
    ctx.fillRect(58, 6, 5, 6);
    ctx.fillStyle = '#BBBBCC';
    ctx.fillRect(51, 7, 4, 4);
    ctx.fillRect(59, 7, 3, 4);

    // Tile 4 — Carrelage cuisine (blanc/noir damier)
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        ctx.fillStyle = (Math.floor(x / 8) + Math.floor(y / 8)) % 2 === 0 ? '#F0F0F0' : '#E0E0E0';
        ctx.fillRect(x + 64, y, 1, 1);
      }
    }
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(72, 0, 1, 16);
    ctx.fillRect(64, 8, 16, 1);

    // Tile 5 — Mur cuisine (faïence bleu/blanc)
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        ctx.fillStyle = '#E8F4F8';
        ctx.fillRect(x + 80, y, 1, 1);
      }
    }
    ctx.fillStyle = '#B0D0E8';
    ctx.fillRect(80, 0, 1, 16);
    ctx.fillRect(80, 8, 16, 1);
    ctx.fillStyle = '#90B8D0';
    ctx.fillRect(80, 7, 16, 2);
    ctx.fillRect(79, 0, 2, 16);

    // Tile 6 — Sol bois foncé (salon)
    for (let x = 0; x < 16; x++) {
      ctx.fillStyle = x % 3 === 0 ? '#6B3A1F' : '#7A4520';
      ctx.fillRect(x + 96, 0, 1, 16);
    }
    ctx.fillStyle = '#4A2510';
    ctx.fillRect(96, 0, 16, 1);
    ctx.fillRect(96, 8, 16, 1);

    // Tile 7 — Asphalte (monde 6)
    ctx.fillStyle = '#404040';
    ctx.fillRect(112, 0, 16, 16);
    ctx.fillStyle = '#383838';
    for (let x = 0; x < 16; x += 4) {
      ctx.fillRect(x + 112, 0, 1, 16);
    }

    // Tile 8 — Trottoir
    ctx.fillStyle = '#9A9A9A';
    ctx.fillRect(128, 0, 16, 16);
    ctx.fillStyle = '#888888';
    ctx.fillRect(128, 0, 16, 2);
    ctx.fillStyle = '#B0B0B0';
    ctx.fillRect(129, 1, 14, 1);

    // Tile 9 — Sol vert (jardin/herbe)
    ctx.fillStyle = '#5DA832';
    ctx.fillRect(144, 0, 16, 16);
    ctx.fillStyle = '#4A8A28';
    ctx.fillRect(144, 0, 16, 2);
    ctx.fillStyle = '#72C040';
    ctx.fillRect(145, 0, 1, 4);
    ctx.fillRect(150, 0, 1, 3);
    ctx.fillRect(155, 0, 1, 5);
    ctx.fillStyle = '#3A6A20';
    ctx.fillRect(144, 12, 16, 4);

    // Tile 10 — Plan de travail (cuisine, plateforme)
    ctx.fillStyle = '#B0B8C1';
    ctx.fillRect(160, 0, 16, 16);
    ctx.fillStyle = '#D0D8E1';
    ctx.fillRect(160, 0, 16, 2);
    ctx.fillStyle = '#909099';
    ctx.fillRect(160, 2, 16, 1);
    ctx.fillStyle = '#C0C8D1';
    ctx.fillRect(162, 4, 4, 6);
    ctx.fillRect(170, 4, 4, 6);

    // Tile 11 — Tapis (zone ralentissement)
    ctx.fillStyle = '#4A7C59';
    ctx.fillRect(176, 0, 16, 16);
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = '#3A6048';
      ctx.fillRect(178 + i * 4, 2, 2, 12);
    }
    ctx.fillStyle = '#5A8C6A';
    ctx.fillRect(176, 6, 16, 4);

    // Tile 12 — Vide / fond transparent
    // (laissé vide)

    // Tile 13 — Checkpoint (livre rose brillant)
    ctx.fillStyle = '#FF6B9D';
    ctx.fillRect(208, 2, 12, 14);
    ctx.fillStyle = '#CC4477';
    ctx.fillRect(208, 2, 2, 14);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(210, 4, 8, 1);
    ctx.fillRect(210, 6, 8, 1);
    ctx.fillRect(210, 8, 8, 1);
    ctx.fillRect(210, 10, 5, 1);

    // Tile 14 — Assiette (tremplin)
    ctx.fillStyle = '#F8F8F8';
    ctx.fillRect(224, 8, 16, 6);
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(224, 8, 16, 1);
    ctx.fillRect(224, 13, 16, 1);
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(226, 9, 12, 1);

    // Tile 15 — Épine / danger
    ctx.fillStyle = '#AA0000';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(240 + i * 4, 16, 2, -8 + i % 2 * 4);
    }
    ctx.fillStyle = '#CC2222';
    for (let i = 0; i < 3; i++) {
      ctx.fillRect(241 + i * 4, 15, 1, -6 + i % 2 * 3);
    }

    this.registerTexture('tiles', canvas, 16, 16);
  }

  // ─── UI ────────────────────────────────────────────────────────

  generateUI() {
    // HUD icônes sur un seul canvas 128×16
    const { canvas, ctx } = this.makeCanvas(128, 16);

    // Cœur plein (0)
    this.drawPixels(ctx, [
      [1,1,'#FF4444'],[2,1,'#FF4444'],[4,1,'#FF4444'],[5,1,'#FF4444'],
      [0,2,'#FF4444'],[1,2,'#FF8888'],[2,2,'#FF4444'],[3,2,'#FF4444'],[4,2,'#FF8888'],[5,2,'#FF4444'],[6,2,'#FF4444'],
      [0,3,'#FF4444'],[6,3,'#FF4444'],[1,3,'#FF4444'],[5,3,'#FF4444'],[2,3,'#FF4444'],[4,3,'#FF4444'],[3,3,'#FF4444'],
      [1,4,'#FF4444'],[2,4,'#FF4444'],[3,4,'#FF4444'],[4,4,'#FF4444'],[5,4,'#FF4444'],
      [2,5,'#FF4444'],[3,5,'#FF4444'],[4,5,'#FF4444'],
      [3,6,'#FF4444'],
    ], 0, 4);

    // Cœur vide (1)
    this.drawPixels(ctx, [
      [1,1,'#884444'],[2,1,'#884444'],[4,1,'#884444'],[5,1,'#884444'],
      [0,2,'#884444'],[6,2,'#884444'],
      [0,3,'#884444'],[6,3,'#884444'],
      [1,4,'#884444'],[5,4,'#884444'],
      [2,5,'#884444'],[4,5,'#884444'],
      [3,6,'#884444'],
    ], 8, 4);

    // Étoile (2)
    this.drawPixels(ctx, [
      [3,0,'#FFD700'],[4,0,'#FFD700'],
      [2,1,'#FFD700'],[3,1,'#FFE135'],[4,1,'#FFD700'],[5,1,'#FFD700'],
      [0,2,'#FFD700'],[1,2,'#FFD700'],[2,2,'#FFD700'],[3,2,'#FFD700'],[4,2,'#FFD700'],[5,2,'#FFD700'],[6,2,'#FFD700'],[7,2,'#FFD700'],
      [1,3,'#FFD700'],[2,3,'#FFD700'],[3,3,'#FFE135'],[4,3,'#FFE135'],[5,3,'#FFD700'],[6,3,'#FFD700'],
      [2,4,'#FFD700'],[3,4,'#FFD700'],[4,4,'#FFD700'],[5,4,'#FFD700'],
      [1,5,'#FFD700'],[6,5,'#FFD700'],
    ], 16, 4);

    // Pelote de laine (3)
    ctx.fillStyle = '#9B59B6';
    ctx.fillRect(25, 5, 6, 6);
    ctx.fillStyle = '#7D3C98';
    ctx.fillRect(26, 6, 4, 4);
    ctx.fillStyle = '#C39BD3';
    ctx.fillRect(26, 6, 1, 1);
    ctx.fillRect(28, 8, 2, 1);

    // Éclair Réflexion (4)
    ctx.fillStyle = '#4FC3F7';
    ctx.fillRect(38, 4, 2, 4);
    ctx.fillRect(36, 8, 6, 2);
    ctx.fillRect(40, 10, 2, 4);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(39, 5, 1, 3);
    ctx.fillRect(37, 9, 4, 1);
    ctx.fillRect(41, 11, 1, 2);

    // BA (Bonne Action) — étoile dorée différente (5)
    ctx.fillStyle = '#FFE135';
    ctx.fillRect(51, 5, 2, 6);
    ctx.fillRect(48, 8, 8, 2);
    ctx.fillRect(49, 6, 6, 6);
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(52, 6, 1, 1);

    this.registerTexture('hud_icons', canvas, 8, 8);

    // Bulle de dialogue
    const { canvas: dlgC, ctx: dlgCtx } = this.makeCanvas(200, 60);
    dlgCtx.fillStyle = '#F0F0F8';
    dlgCtx.fillRect(0, 0, 200, 60);
    dlgCtx.fillStyle = '#FF6B9D';
    dlgCtx.fillRect(0, 0, 200, 3);
    dlgCtx.fillRect(0, 57, 200, 3);
    dlgCtx.fillRect(0, 0, 3, 60);
    dlgCtx.fillRect(197, 0, 3, 60);
    this.registerTexture('dialog_box', dlgC);

    // Fond menu
    const { canvas: menuC, ctx: menuCtx } = this.makeCanvas(320, 180);
    // Ciel nocturne dégradé
    const skyGrad = menuCtx.createLinearGradient(0, 0, 0, 180);
    skyGrad.addColorStop(0, '#0a0a1a');
    skyGrad.addColorStop(0.6, '#1a1a4a');
    skyGrad.addColorStop(1, '#2a2a5a');
    menuCtx.fillStyle = skyGrad;
    menuCtx.fillRect(0, 0, 320, 180);
    // Étoiles
    for (let i = 0; i < 60; i++) {
      const x = Math.floor(Math.random() * 320);
      const y = Math.floor(Math.random() * 120);
      menuCtx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
      menuCtx.fillRect(x, y, 1, 1);
    }
    // Silhouette de maison
    menuCtx.fillStyle = '#1a1a3a';
    menuCtx.fillRect(60, 100, 200, 80);
    menuCtx.fillRect(50, 80, 30, 30);
    menuCtx.fillRect(240, 80, 30, 30);
    // Toit
    menuCtx.beginPath();
    menuCtx.moveTo(50, 100);
    menuCtx.lineTo(160, 60);
    menuCtx.lineTo(270, 100);
    menuCtx.closePath();
    menuCtx.fillStyle = '#151530';
    menuCtx.fill();
    // Fenêtre lumineuse
    menuCtx.fillStyle = '#FFE580';
    menuCtx.globalAlpha = 0.6;
    menuCtx.fillRect(140, 120, 16, 20);
    menuCtx.fillRect(165, 120, 16, 20);
    menuCtx.globalAlpha = 1;
    this.registerTexture('menu_bg', menuC);
  }
}

// ─── BaseEnemy.js ─────────────────────────────────────────────────────────
class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.hp = config.hp || 1;
    this.maxHP = this.hp;
    this.damage = config.damage || 1;
    this.speed = config.speed || 60;
    this.pointValue = config.points || 10;
    this.direction = config.direction || 1;
    this._alive = true;

    this.setScale(2);
    this.setDepth(8);
    this.setCollideWorldBounds(true);
    this.body.setGravityY(200);
  }

  update() {
    if (!this._alive) return;
    this.patrol();
  }

  patrol() {
    this.setVelocityX(this.speed * this.direction);
    if (this.body.blocked.right || this.body.blocked.left) {
      this.direction *= -1;
      this.setFlipX(this.direction < 0);
    }
  }

  takeDamage(amount = 1) {
    if (!this._alive) return;
    this.hp -= amount;
    this.scene.cameras.main.shake(80, 0.004);

    // Flash blanc
    this.setTintFill(0xFFFFFF);
    this.scene.time.delayedCall(80, () => {
      if (this.scene && this.active) this.clearTint();
    });

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this._alive = false;
    this.disableBody(true, false);

    // Effet de mort : rebond et disparition
    this.scene.tweens.add({
      targets: this,
      y: this.y - 20,
      alpha: 0,
      scaleX: 3,
      scaleY: 0,
      duration: 400,
      ease: 'Back.easeIn',
      onComplete: () => {
        if (this.scene) {
          // Spawn des étoiles
          this._dropItems();
        }
        this.destroy();
      },
    });

    // Petit son de victoire
    this._playDeathSound();
  }

  _dropItems() {
    // 30% de chance de dropper une pelote
    if (Math.random() < 0.3) {
      const wool = this.scene.collectables?.woolGroup?.create(this.x, this.y - 10, 'wool_ball');
      if (wool) {
        wool.setScale(2);
        wool.setVelocity(Phaser.Math.Between(-60, 60), -150);
        wool.body.setGravityY(200);
      }
    }
  }

  _playDeathSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, actx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.06, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.3);
      osc.start();
      osc.stop(actx.currentTime + 0.3);
    } catch (e) {}
  }
}

// ─── ChaussetteFantome.js ─────────────────────────────────────────────────────────


class ChaussetteFantome extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'chaussette', { hp: 1, damage: 1, speed: 50, points: 10 });
    this.body.setAllowGravity(false);
    this.body.setSize(12, 10);
    this._startY = y;
    this._time = Math.random() * Math.PI * 2;
    this.play('chaussette_float');
  }

  patrol() {
    this._time += 0.04;
    // Vol en zigzag
    this.setVelocityX(this.speed * this.direction);
    this.y = this._startY + Math.sin(this._time) * 20;

    if (this.body.blocked.right || this.x > this.scene.scale.width + 50) {
      this.direction = -1;
      this.setFlipX(true);
    }
    if (this.body.blocked.left || this.x < -50) {
      this.direction = 1;
      this.setFlipX(false);
    }
  }
}

// ─── CuillereRebelle.js ─────────────────────────────────────────────────────────


class CuillereRebelle extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'cuillere', { hp: 1, damage: 1, speed: 70, points: 10 });
    this.body.setSize(8, 14);
    this.play('cuillere_walk');
  }

  patrol() {
    this.setVelocityX(this.speed * this.direction);
    if (this.body.blocked.right || this.body.blocked.left) {
      this.direction *= -1;
      this.setFlipX(this.direction < 0);
    }
    // Saute aléatoirement
    if (this.body.blocked.down && Math.random() < 0.005) {
      this.setVelocityY(-300);
    }
  }
}

// ─── GlaconSauteur.js ─────────────────────────────────────────────────────────


class GlaconSauteur extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'glacon', { hp: 1, damage: 1, speed: 0, points: 10 });
    this.body.setSize(8, 12);
    this._jumpTimer = 0;
    this._jumpInterval = Phaser.Math.Between(60, 120);
    this.play('glacon_idle');
  }

  patrol() {
    this._jumpTimer++;
    if (this._jumpTimer >= this._jumpInterval && this.body.blocked.down) {
      this.setVelocityY(-380);
      this.setVelocityX(Phaser.Math.Between(-80, 80));
      this._jumpTimer = 0;
      this._jumpInterval = Phaser.Math.Between(60, 120);
    }
  }
}

// ─── FauteOrthographe.js ─────────────────────────────────────────────────────────


class FauteOrthographe extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'faute', { hp: 1, damage: 1, speed: 100, points: 15 });
    this.body.setAllowGravity(false);
    this.body.setSize(10, 10);
    this._time = 0;
    this._startX = x;
    this._startY = y;
    this.play('faute_fly');
  }

  patrol() {
    this._time += 0.06;
    // Trajectoire sinusoïdale
    this.x = this._startX - this._time * this.speed * 0.016;
    this.y = this._startY + Math.sin(this._time) * 30;

    if (this.x < -50) {
      this.x = this._startX;
      this._time = 0;
    }
  }
}

// ─── PigeonParc.js ─────────────────────────────────────────────────────────


class PigeonParc extends BaseEnemy {
  constructor(scene, x, y) {
    super(scene, x, y, 'pigeon', { hp: 1, damage: 1, speed: 120, points: 10 });
    this.body.setAllowGravity(false);
    this.body.setSize(14, 10);
    this._startY = y;
    this._time = Math.random() * Math.PI * 2;
    this._aggroRange = 80;
    this._charging = false;
    this.play('pigeon_fly');
  }

  patrol() {
    const player = this.scene.player;
    if (!player) return;

    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (dist < this._aggroRange && !this._charging) {
      this._charging = true;
      const angle = Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y);
      this.setVelocity(Math.cos(angle) * 200, Math.sin(angle) * 200);
      this.scene.time.delayedCall(600, () => {
        this._charging = false;
        this.setVelocity(0, 0);
      });
    } else if (!this._charging) {
      this._time += 0.03;
      this.setVelocityX(this.speed * this.direction);
      this.y = this._startY + Math.sin(this._time) * 15;
      if (this.x > this.scene.scale.width + 20) this.direction = -1;
      if (this.x < -20) this.direction = 1;
      this.setFlipX(this.direction < 0);
    }
  }
}

// ─── BaseBoss.js ─────────────────────────────────────────────────────────


class BaseBoss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, config = {}) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.bossId = config.id || 'boss';
    this.maxHP = config.maxHP || 6;
    this.currentHP = this.maxHP;
    this.phases = config.phases || [{ hpThreshold: 0 }];
    this.currentPhase = 0;
    this._alive = true;
    this._vulnerable = true;
    this._actionTimer = 0;
    this._actionInterval = config.actionInterval || 120;

    this.setScale(config.scale || 3);
    this.setDepth(8);
    this.setCollideWorldBounds(true);

    // Barre de vie
    this._createHealthBar(scene, config);
    this._createNameTag(scene, config.name || 'BOSS');
  }

  _createHealthBar(scene, config) {
    const barW = 200;
    const barH = 12;
    const cx = scene.scale.width / 2;
    const y = 24;

    this._hpBarBg = scene.add.rectangle(cx, y, barW + 4, barH + 4, 0x333333)
      .setScrollFactor(0).setDepth(100);
    this._hpBar = scene.add.rectangle(cx - barW / 2, y, barW, barH, 0xFF4444)
      .setScrollFactor(0).setDepth(101).setOrigin(0, 0.5);
    this._hpText = scene.add.text(cx, y - 14, '', {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#FFFFFF',
    }).setScrollFactor(0).setDepth(101).setOrigin(0.5);
  }

  _createNameTag(scene, name) {
    const cx = scene.scale.width / 2;
    this._nameTag = scene.add.text(cx, 10, name, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: '#FFD700',
      stroke: '#000000',
      strokeThickness: 2,
    }).setScrollFactor(0).setDepth(101).setOrigin(0.5);
  }

  _updateHealthBar() {
    const ratio = this.currentHP / this.maxHP;
    const barW = 200;
    const cx = this.scene.scale.width / 2;
    this._hpBar.width = barW * ratio;
    this._hpBar.x = cx - barW / 2;
    const color = ratio > 0.6 ? 0x44FF44 : ratio > 0.3 ? 0xFFAA00 : 0xFF4444;
    this._hpBar.setFillStyle(color);
    this._hpText.setText(`${this.currentHP} / ${this.maxHP}`);
  }

  update() {
    if (!this._alive) return;
    this._actionTimer++;
    if (this._actionTimer >= this._actionInterval) {
      this._actionTimer = 0;
      this.doAction();
    }
    this._updateHealthBar();
  }

  doAction() {
    // Override dans les sous-classes
  }

  takeDamage(amount = 1) {
    if (!this._alive || !this._vulnerable) return;
    this.currentHP = Math.max(0, this.currentHP - amount);
    this._updateHealthBar();

    // Flash
    this.setTintFill(0xFFFFFF);
    this.scene.time.delayedCall(100, () => {
      if (this.active) this.clearTint();
    });
    this.scene.cameras.main.shake(150, 0.006);
    this._playHitSound();

    // Phase suivante ?
    const nextPhase = this.phases[this.currentPhase + 1];
    if (nextPhase && this.currentHP <= nextPhase.hpThreshold * this.maxHP) {
      this.currentPhase++;
      this._onPhaseChange(this.currentPhase);
    }

    if (this.currentHP <= 0) {
      this._defeat();
    }
  }

  _onPhaseChange(phase) {
    // Shake + flash rouge
    this.scene.cameras.main.shake(400, 0.015);
    this.setTintFill(0xFF0000);
    this.scene.time.delayedCall(300, () => {
      if (this.active) this.clearTint();
    });
    // Accélérer les actions
    this._actionInterval = Math.max(60, this._actionInterval - 20);
  }

  _defeat() {
    this._alive = false;
    this._vulnerable = false;
    this.disableBody(true, false);

    // Destruction spectaculaire
    this.scene.cameras.main.shake(600, 0.02);
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      scaleY: 0,
      angle: 720,
      alpha: 0,
      duration: 800,
      ease: 'Back.easeIn',
      onComplete: () => {
        this._cleanUI();
        this.scene.events.emit(EVENTS.BOSS_DEFEATED, this.bossId);
        this.destroy();
      },
    });

    // Explosion de particules
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const star = this.scene.add.circle(
        this.x + Math.cos(angle) * 10,
        this.y + Math.sin(angle) * 10,
        4, 0xFFD700
      );
      this.scene.tweens.add({
        targets: star,
        x: star.x + Math.cos(angle) * 80,
        y: star.y + Math.sin(angle) * 80,
        alpha: 0,
        scaleX: 0, scaleY: 0,
        duration: 600,
        ease: 'Power2',
        delay: i * 30,
        onComplete: () => star.destroy(),
      });
    }

    this._playDefeatSound();
  }

  _cleanUI() {
    [this._hpBarBg, this._hpBar, this._hpText, this._nameTag].forEach(obj => {
      if (obj) obj.destroy();
    });
  }

  _playHitSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'sawtooth';
      osc.frequency.value = 220;
      osc.frequency.exponentialRampToValueAtTime(110, actx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.08, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.15);
      osc.start();
      osc.stop(actx.currentTime + 0.15);
    } catch (e) {}
  }

  _playDefeatSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523, 659, 784, 1047, 784, 659, 523];
      notes.forEach((freq, i) => {
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.type = 'square';
        osc.frequency.value = freq;
        const t = actx.currentTime + i * 0.08;
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
        osc.start(t);
        osc.stop(t + 0.1);
      });
    } catch (e) {}
  }
}

// ─── ReveilGeant.js ─────────────────────────────────────────────────────────


class ReveilGeant extends BaseBoss {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss_reveil', {
      id: 'reveil',
      name: 'RÉVEIL GÉANT',
      maxHP: 6,
      scale: 3,
      actionInterval: 100,
      phases: [
        { hpThreshold: 1.0 },
        { hpThreshold: 0.67 },
        { hpThreshold: 0.33 },
      ],
    });

    this._projectiles = [];
    this._startX = x;
    this._ringing = false;
    this.body.setSize(42, 50);
    this.setOffset(0, 0);
  }

  doAction() {
    switch (this.currentPhase) {
      case 0: this._actionPhase1(); break;
      case 1: this._actionPhase2(); break;
      case 2: this._actionPhase3(); break;
    }
  }

  _actionPhase1() {
    // Lance des mini-projectiles (aiguilles)
    const r = Math.random();
    if (r < 0.5) {
      this._shootHands();
    } else {
      this._ring();
    }
  }

  _actionPhase2() {
    // Saute
    if (this.body.blocked.down && Math.random() < 0.4) {
      this._jump();
    }
    if (Math.random() < 0.3) this._shootHands();
    this._spawnMiniReveil();
  }

  _actionPhase3() {
    this._shootHands();
    if (this.body.blocked.down && Math.random() < 0.6) this._jump();
    if (Math.random() < 0.4) this._ring();
  }

  _shootHands() {
    const directions = [-1, 1];
    directions.forEach(dir => {
      const proj = this.scene.add.rectangle(this.x + dir * 20, this.y, 8, 4, 0xCC4444);
      this.scene.physics.add.existing(proj);
      proj.body.setGravityY(-700);
      proj.body.velocity.x = dir * 250;
      proj.body.velocity.y = Phaser.Math.Between(-80, 80);
      this._projectiles.push(proj);

      // Collision avec le joueur
      const coll = this.scene.physics.add.overlap(
        this.scene.player, proj,
        () => {
          this.scene.player.takeDamage(1);
          proj.destroy();
          this._projectiles = this._projectiles.filter(p => p !== proj);
          coll.destroy();
        }
      );

      this.scene.time.delayedCall(1500, () => {
        if (proj.active) {
          proj.destroy();
          this._projectiles = this._projectiles.filter(p => p !== proj);
        }
      });
    });
  }

  _ring() {
    if (this._ringing) return;
    this._ringing = true;

    // Onde de choc sonore
    for (let r = 20; r <= 100; r += 20) {
      const ring = this.scene.add.circle(this.x, this.y, r, 0xFFAA00, 0.4);
      this.scene.tweens.add({
        targets: ring,
        scaleX: 2,
        scaleY: 2,
        alpha: 0,
        duration: 600,
        delay: r * 3,
        onComplete: () => ring.destroy(),
      });
    }

    // Onde fait des dégâts si le joueur est proche
    const player = this.scene.player;
    const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);
    if (dist < 120 * this.scaleX) {
      player.takeDamage(1);
    }

    this._playRingSound();
    this.scene.time.delayedCall(2000, () => { this._ringing = false; });
  }

  _jump() {
    this.setVelocityY(-400);
    this.setVelocityX(Phaser.Math.Between(-100, 100));
  }

  _spawnMiniReveil() {
    if (this._miniReveils >= 2) return;
    const mini = this.scene.add.rectangle(
      this.x + Phaser.Math.Between(-60, 60),
      this.y - 30,
      16, 16, 0xAA3333
    );
    this.scene.physics.add.existing(mini);
    mini.body.velocity.x = Phaser.Math.Between(-80, 80);
    this.scene.physics.add.overlap(
      this.scene.player, mini,
      () => {
        this.scene.player.takeDamage(1);
        mini.destroy();
      }
    );
    this.scene.time.delayedCall(3000, () => { if (mini.active) mini.destroy(); });
    this._miniReveils = (this._miniReveils || 0) + 1;
    this.scene.time.delayedCall(3100, () => { this._miniReveils = Math.max(0, (this._miniReveils || 1) - 1); });
  }

  _playRingSound() {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.type = 'sine';
      osc.frequency.value = 880;
      osc.frequency.exponentialRampToValueAtTime(440, actx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.12, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.5);
      osc.start();
      osc.stop(actx.currentTime + 0.5);
    } catch (e) {}
  }
}

// ─── GrillePainFurieux.js ─────────────────────────────────────────────────────────


class GrillePainFurieux extends BaseBoss {
  constructor(scene, x, y) {
    super(scene, x, y, 'boss_grillePain', {
      id: 'grillePain',
      name: 'GRILLE-PAIN FURIEUX',
      maxHP: 5,
      scale: 3,
      actionInterval: 90,
      phases: [
        { hpThreshold: 1.0 },
        { hpThreshold: 0.6 },
        { hpThreshold: 0.3 },
      ],
    });

    this._toasts = [];
    this._startX = x;
    this._jumping = false;
    this.body.setSize(36, 56);
  }

  doAction() {
    switch (this.currentPhase) {
      case 0: this._actionPhase1(); break;
      case 1: this._actionPhase2(); break;
      case 2: this._actionPhase3(); break;
    }
  }

  _actionPhase1() {
    if (Math.random() < 0.7) this._shootToast();
    else this._shootFlame(false);
  }

  _actionPhase2() {
    this._shootToast();
    if (!this._jumping && Math.random() < 0.4) this._jumpToSide();
    if (Math.random() < 0.3) this._shootFlame(false);
  }

  _actionPhase3() {
    this._shootToast(true);
    this._shootFlame(true);
    if (!this._jumping && Math.random() < 0.5) this._jumpToSide();
  }

  _shootToast(flaming = false) {
    const color = flaming ? 0xFF4400 : 0xD4A96A;
    const toast = this.scene.add.rectangle(this.x, this.y - 20, 12, 8, color);
    this.scene.physics.add.existing(toast);
    toast.body.setGravityY(200);
    const dir = this.x > this.scene.scale.width / 2 ? -1 : 1;
    toast.body.velocity.x = dir * Phaser.Math.Between(100, 200);
    toast.body.velocity.y = -300;

    this._toasts.push(toast);

    const coll = this.scene.physics.add.overlap(this.scene.player, toast, () => {
      this.scene.player.takeDamage(flaming ? 2 : 1);
      this._destroyToast(toast);
      coll.destroy();
    });

    this.scene.time.delayedCall(2500, () => {
      this._destroyToast(toast);
    });

    // Flammes si phase 3
    if (flaming) {
      const flame = this.scene.add.circle(toast.x, toast.y, 8, 0xFF6600, 0.7);
      this.scene.tweens.add({
        targets: flame,
        x: `+=${dir * 10}`,
        alpha: 0,
        scaleX: 2,
        scaleY: 2,
        duration: 400,
        onComplete: () => flame.destroy(),
      });
    }
  }

  _destroyToast(toast) {
    if (!toast.active) return;
    // Particules de miettes
    for (let i = 0; i < 5; i++) {
      const crumb = this.scene.add.circle(toast.x, toast.y, 2, 0xD4A96A);
      this.scene.physics.add.existing(crumb);
      crumb.body.velocity.x = Phaser.Math.Between(-80, 80);
      crumb.body.velocity.y = Phaser.Math.Between(-100, -40);
      this.scene.time.delayedCall(500, () => crumb.destroy());
    }
    toast.destroy();
    this._toasts = this._toasts.filter(t => t !== toast);
  }

  _shootFlame(both = false) {
    const dirs = both ? [-1, 1] : [this.x > this.scene.scale.width / 2 ? -1 : 1];
    dirs.forEach(dir => {
      for (let i = 0; i < 4; i++) {
        const flame = this.scene.add.circle(
          this.x + dir * (20 + i * 20),
          this.y + 10,
          10 - i * 2,
          Phaser.Display.Color.Interpolate.ColorWithColor(
            Phaser.Display.Color.ValueToColor(0xFF6600),
            Phaser.Display.Color.ValueToColor(0xFFDD00),
            4, i
          ).color,
          0.8 - i * 0.15
        );

        // Dommage si joueur touche la flamme
        const coll = this.scene.physics.add.overlap(this.scene.player, flame, () => {
          this.scene.player.takeDamage(1);
          coll.destroy();
        });

        this.scene.time.delayedCall(600, () => {
          flame.destroy();
          if (coll.active) coll.destroy();
        });
      }
    });
  }

  _jumpToSide() {
    if (this._jumping) return;
    this._jumping = true;
    const targetX = this.x > this.scene.scale.width / 2
      ? this.scene.scale.width * 0.25
      : this.scene.scale.width * 0.75;
    this.setVelocityY(-350);
    this.scene.tweens.add({
      targets: this,
      x: targetX,
      duration: 600,
      ease: 'Power2',
    });
    this.scene.time.delayedCall(700, () => { this._jumping = false; });
  }
}

// ─── Player.js ─────────────────────────────────────────────────────────


const CFG = GAME_CONFIG.PHYSICS;
const PCFG = GAME_CONFIG.PLAYER;

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'swann');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
    this.body.setSize(8, 20);
    this.body.setOffset(4, 4);
    this.setScale(2);
    this.setDepth(10);

    this.stats = {
      speed: CFG.PLAYER_SPEED,
      jumpForce: CFG.JUMP_FORCE,
      doubleJumpForce: CFG.DOUBLE_JUMP_FORCE,
      maxHearts: PCFG.MAX_HEARTS,
      hearts: PCFG.MAX_HEARTS,
      starCount: 0,
      goodActions: 0,
      woolBalls: PCFG.CAT_WOOL_BALLS,
      reflectCharges: PCFG.REFLECT_CHARGES,
      hasDoubleJump: false,
    };

    this.state = {
      isOnGround: false,
      hasDoubleJumped: false,
      isReflecting: false,
      isInvincible: false,
      facingRight: true,
      canMove: true,
    };

    this._coyoteTimer = 0;
    this._jumpBuffer = 0;
    this._lastGroundY = y;
    this._reflectTimer = null;
    this._catCooldown = 0;
    this._reflectCooldown = 0;

    this.play('swann_idle');

    // Particules de reflet lors de la réflexion éclair
    this._reflectGlow = scene.add.circle(x, y, 20, 0x4FC3F7, 0);
    this._reflectGlow.setDepth(9);
  }

  update(cursors, keys, delta) {
    if (!this.state.canMove) return;

    this._updateTimers(delta);
    this._handleMovement(cursors, keys);
    this._handleJump(cursors, keys);
    this._updateAnimation();
    this._updateGlow();
  }

  _updateTimers(delta) {
    if (this._coyoteTimer > 0) this._coyoteTimer -= delta;
    if (this._jumpBuffer > 0) this._jumpBuffer -= delta;
    if (this._catCooldown > 0) this._catCooldown -= delta;
    if (this._reflectCooldown > 0) this._reflectCooldown -= delta;

    // Suivi du sol
    if (this.body.blocked.down) {
      this.state.isOnGround = true;
      this.state.hasDoubleJumped = false;
      this._coyoteTimer = CFG.COYOTE_TIME;
      this._lastGroundY = this.y;
    } else {
      this.state.isOnGround = false;
    }
  }

  _handleMovement(cursors, keys) {
    const left = cursors.left.isDown || keys.A.isDown;
    const right = cursors.right.isDown || keys.D.isDown;

    if (left) {
      this.setVelocityX(-this.stats.speed);
      this.state.facingRight = false;
      this.setFlipX(true);
    } else if (right) {
      this.setVelocityX(this.stats.speed);
      this.state.facingRight = true;
      this.setFlipX(false);
    } else {
      // Décélération
      this.setVelocityX(this.body.velocity.x * 0.7);
      if (Math.abs(this.body.velocity.x) < 5) this.setVelocityX(0);
    }

    // Limiter vitesse de chute
    if (this.body.velocity.y > CFG.MAX_FALL_SPEED) {
      this.setVelocityY(CFG.MAX_FALL_SPEED);
    }
  }

  _handleJump(cursors, keys) {
    const jumpPressed = Phaser.Input.Keyboard.JustDown(cursors.up) ||
                        Phaser.Input.Keyboard.JustDown(keys.W) ||
                        Phaser.Input.Keyboard.JustDown(keys.SPACE);

    if (jumpPressed) {
      this._jumpBuffer = CFG.JUMP_BUFFER;
    }

    if (this._jumpBuffer > 0) {
      if (this._coyoteTimer > 0) {
        this._doJump(this.stats.jumpForce);
        this._jumpBuffer = 0;
        this._coyoteTimer = 0;
      } else if (!this.state.hasDoubleJumped && this.stats.hasDoubleJump) {
        this._doDoubleJump();
        this._jumpBuffer = 0;
      }
    }

    // Couper le saut si on relâche tôt
    if ((Phaser.Input.Keyboard.JustUp(cursors.up) || Phaser.Input.Keyboard.JustUp(keys.W)) &&
        this.body.velocity.y < -100) {
      this.setVelocityY(this.body.velocity.y * 0.5);
    }
  }

  _doJump(force) {
    this.setVelocityY(force);
    this.scene.sound && this.scene.sound.play && this._playSound('jump');
    this.play('swann_jump', true);
  }

  _doDoubleJump() {
    this.setVelocityY(this.stats.doubleJumpForce);
    this.state.hasDoubleJumped = true;

    // Effet visuel double saut
    const burst = this.scene.add.circle(this.x, this.y + 8, 10, 0xFF6B9D, 0.7);
    this.scene.tweens.add({
      targets: burst,
      scaleX: 3,
      scaleY: 3,
      alpha: 0,
      duration: 300,
      onComplete: () => burst.destroy(),
    });
    this.play('swann_jump', true);
  }

  _updateAnimation() {
    if (this.state.isInvincible) return;

    if (this.state.isOnGround) {
      const vx = Math.abs(this.body.velocity.x);
      if (vx > 20) {
        this.play('swann_walk', true);
      } else {
        this.play('swann_idle', true);
      }
    } else {
      if (this.body.velocity.y < 0) {
        this.play('swann_jump', true);
      } else {
        this.play('swann_fall', true);
      }
    }
  }

  _updateGlow() {
    if (this._reflectGlow) {
      this._reflectGlow.x = this.x;
      this._reflectGlow.y = this.y;
    }
  }

  // ─── POUVOIRS ────────────────────────────────────────────────────

  activateReflect() {
    if (this.stats.reflectCharges <= 0 || this.state.isReflecting || this._reflectCooldown > 0) {
      return false;
    }
    this.stats.reflectCharges--;
    this.state.isReflecting = true;
    this._reflectCooldown = PCFG.REFLECT_COOLDOWN;

    // Ralentir le temps
    this.scene.physics.world.timeScale = 5; // Ralenti 5×
    this.scene.time.timeScale = 0.2;

    // Effet visuel
    if (this._reflectGlow) {
      this._reflectGlow.setFillStyle(0x4FC3F7, 0.4);
    }
    this.scene.cameras.main.setAlpha(1);

    // Overlay bleu
    const overlay = this.scene.add.rectangle(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      this.scene.scale.width,
      this.scene.scale.height,
      0x4FC3F7, 0.15
    ).setDepth(50).setScrollFactor(0);

    this.scene.events.emit(EVENTS.REFLECT_ACTIVATE);

    this._reflectTimer = this.scene.time.delayedCall(PCFG.REFLECT_DURATION * 0.2, () => {
      this.deactivateReflect();
      overlay.destroy();
    });

    return true;
  }

  deactivateReflect() {
    if (!this.state.isReflecting) return;
    this.state.isReflecting = false;
    this.scene.physics.world.timeScale = 1;
    this.scene.time.timeScale = 1;
    if (this._reflectGlow) {
      this._reflectGlow.setFillStyle(0x4FC3F7, 0);
    }
    this.scene.events.emit(EVENTS.REFLECT_END);
  }

  catAttack() {
    if (this.stats.woolBalls <= 0 || this._catCooldown > 0) return false;
    this.stats.woolBalls--;
    this._catCooldown = PCFG.CAT_COOLDOWN;
    this.scene.events.emit(EVENTS.CAT_ATTACK, this.state.facingRight);
    return true;
  }

  // ─── DÉGÂTS ──────────────────────────────────────────────────────

  takeDamage(amount = 1) {
    if (this.state.isInvincible) return;
    this.stats.hearts = Math.max(0, this.stats.hearts - amount);
    this.state.isInvincible = true;

    this.play('swann_hurt', true);
    this.scene.cameras.main.shake(200, 0.008);

    // Clignotement
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      duration: 100,
      yoyo: true,
      repeat: 8,
      onComplete: () => {
        this.setAlpha(1);
        this.state.isInvincible = false;
      },
    });

    this.scene.events.emit(EVENTS.PLAYER_HURT, this.stats.hearts);

    if (this.stats.hearts <= 0) {
      this.die();
    }
  }

  die() {
    this.state.canMove = false;
    this.setVelocity(0, -200);
    this.scene.tweens.add({
      targets: this,
      y: this.y - 40,
      alpha: 0,
      duration: 600,
      ease: 'Power2',
      onComplete: () => {
        this.scene.events.emit(EVENTS.PLAYER_DIE);
      },
    });
  }

  // ─── COLLECTABLES ─────────────────────────────────────────────────

  collectStar() {
    this.stats.starCount++;
    this.scene.events.emit(EVENTS.STAR_COLLECT, this.stats.starCount);
  }

  collectHeart() {
    if (this.stats.hearts < this.stats.maxHearts) {
      this.stats.hearts++;
      this.scene.events.emit(EVENTS.HEART_COLLECT, this.stats.hearts);
    }
  }

  collectBA() {
    this.stats.goodActions++;
    this.scene.events.emit(EVENTS.BA_COLLECT, this.stats.goodActions);
  }

  collectWool() {
    this.stats.woolBalls = Math.min(PCFG.CAT_WOOL_BALLS, this.stats.woolBalls + 1);
    this.scene.events.emit(EVENTS.WOOL_COLLECT, this.stats.woolBalls);
  }

  setCanMove(val) {
    this.state.canMove = val;
    if (!val) this.setVelocity(0, 0);
  }

  _playSound(key) {
    try {
      const actx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      osc.connect(gain);
      gain.connect(actx.destination);
      const sounds = {
        jump: [600, 0.05, 0.15],
        hurt: [150, 0.1, 0.3],
        collect: [880, 0.05, 0.1],
      };
      const [freq, vol, dur] = sounds[key] || [440, 0.05, 0.1];
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, actx.currentTime + dur);
      gain.gain.setValueAtTime(vol, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      osc.start();
      osc.stop(actx.currentTime + dur);
    } catch (e) {}
  }
}

// ─── Cat.js ─────────────────────────────────────────────────────────


class Cat extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, player) {
    super(scene, player.x - 20, player.y, 'moustache');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.player = player;
    this.setScale(2);
    this.setDepth(9);
    this.body.setSize(12, 10);
    this.body.setOffset(2, 2);
    this.body.setGravityY(-400); // Suit le joueur sans trop de gravité
    this.setCollideWorldBounds(true);

    this._following = true;
    this._attacking = false;
    this._projectile = null;

    this.play('moustache_idle');

    scene.events.on(EVENTS.CAT_ATTACK, this.launch, this);
  }

  update() {
    if (this._attacking) return;

    const dx = this.player.x - this.x;
    const dy = this.player.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 40) {
      // Rattraper le joueur
      this.setVelocityX(dx * 3);
      this.setVelocityY(dy * 3);
      this.setFlipX(dx < 0);
      this.play('moustache_run', true);
    } else {
      this.setVelocity(0);
      this.setFlipX(!this.player.state.facingRight);
      this.play('moustache_idle', true);
    }
  }

  launch(facingRight) {
    if (this._attacking) return;
    this._attacking = true;

    const direction = facingRight ? 1 : -1;
    const startX = this.player.x + direction * 20;
    const startY = this.player.y - 5;

    // Pelote de laine projectile
    this._projectile = this.scene.add.circle(startX, startY, 5, 0x9B59B6, 1);
    this._projectile.setDepth(11);
    this.scene.physics.add.existing(this._projectile);
    this._projectile.body.setGravityY(-700);
    this._projectile.body.velocity.x = direction * 400;

    // Traîne lumineuse
    const trail = this.scene.add.circle(startX, startY, 3, 0xC39BD3, 0.6);
    this.scene.tweens.add({
      targets: trail,
      scaleX: 0, scaleY: 0,
      alpha: 0,
      duration: 300,
      onComplete: () => trail.destroy(),
    });

    // Joue l'animation d'attaque
    this.play('moustache_attack', true);

    // Notifie la GameScene que le projectile existe
    this.scene.events.emit('cat_projectile', this._projectile);

    // Nettoie après 800ms si pas de collision
    this.scene.time.delayedCall(800, () => {
      this._cleanProjectile();
    });
  }

  _cleanProjectile() {
    if (this._projectile) {
      this._projectile.destroy();
      this._projectile = null;
    }
    this._attacking = false;
    this.play('moustache_idle', true);
    this.scene.time.delayedCall(300, () => {
      this.play('moustache_happy', true);
    });
  }

  hitEnemy() {
    this._cleanProjectile();
    // Petit effet de succès
    this.play('moustache_happy', true);
    this.scene.time.delayedCall(600, () => {
      this.play('moustache_idle', true);
    });
  }

  destroy() {
    this.scene.events.off(EVENTS.CAT_ATTACK, this.launch, this);
    super.destroy();
  }
}

// ─── DialogSystem.js ─────────────────────────────────────────────────────────


class DialogSystem {
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

// ─── HUD.js ─────────────────────────────────────────────────────────


class HUD {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
    this._elements = [];
    this._heartSprites = [];
    this._woolDots = [];
    this._reflectDots = [];
    this._worldText = null;
    this._levelText = null;
    this._timerText = null;
    this._timerActive = false;
    this._timerValue = 0;

    this._build();
    this._bindEvents();
  }

  _build() {
    const sx = 0; // scrollFactor = 0 (HUD fixe)
    const depth = 150;

    // Fond du HUD
    this._hudBg = this.scene.add.rectangle(0, 0, this.scene.scale.width, 28, 0x000000, 0.6)
      .setScrollFactor(0).setDepth(depth - 1).setOrigin(0, 0);

    // Cœurs
    this._heartLabel = this._txt(8, 4, '♥', '#FF6B9D', 10, depth);
    for (let i = 0; i < this.player.stats.maxHearts; i++) {
      const h = this.scene.add.sprite(22 + i * 14, 10, 'heart', 0)
        .setScrollFactor(0).setDepth(depth).setScale(1.5);
      this._heartSprites.push(h);
    }

    // Étoiles
    this._starIcon = this.scene.add.sprite(90, 10, 'star_rose', 0)
      .setScrollFactor(0).setDepth(depth).setScale(1.5);
    this._starIcon.play('star_spin');
    this._starText = this._txt(101, 4, '000', '#FFD700', 9, depth);

    // Pelotes de laine
    this._woolLabel = this._txt(148, 4, '🧶', '#9B59B6', 9, depth);
    for (let i = 0; i < 5; i++) {
      const dot = this.scene.add.circle(163 + i * 10, 10, 3, 0x9B59B6)
        .setScrollFactor(0).setDepth(depth);
      this._woolDots.push(dot);
    }

    // Réflexion Éclair
    this._reflectLabel = this._txt(220, 4, '⚡', '#4FC3F7', 9, depth);
    for (let i = 0; i < 3; i++) {
      const dot = this.scene.add.circle(234 + i * 10, 10, 3, 0x4FC3F7)
        .setScrollFactor(0).setDepth(depth);
      this._reflectDots.push(dot);
    }

    // Bonnes Actions
    this._baIcon = this.scene.add.sprite(272, 10, 'bonne_action', 0)
      .setScrollFactor(0).setDepth(depth).setScale(1.5);
    this._baText = this._txt(282, 4, 'BA:0', '#FFE135', 9, depth);

    // Monde / Niveau (en bas)
    this._worldLabel = this._txt(8, this.scene.scale.height - 16, '', '#AAAACC', 8, depth);

    // Timer (visible dans le monde 6)
    this._timerText = this._txt(
      this.scene.scale.width / 2, 4,
      '', '#FF6B9D', 10, depth
    ).setOrigin(0.5, 0).setVisible(false);
  }

  _txt(x, y, text, color, size, depth) {
    return this.scene.add.text(x, y, text, {
      fontFamily: 'monospace',
      fontSize: `${size}px`,
      color,
    }).setScrollFactor(0).setDepth(depth);
  }

  _bindEvents() {
    this.scene.events.on(EVENTS.PLAYER_HURT, (hearts) => this._updateHearts(hearts));
    this.scene.events.on(EVENTS.HEART_COLLECT, (hearts) => this._updateHearts(hearts));
    this.scene.events.on(EVENTS.STAR_COLLECT, (count) => this._updateStars(count));
    this.scene.events.on(EVENTS.BA_COLLECT, (count) => this._updateBA(count));
    this.scene.events.on(EVENTS.WOOL_COLLECT, (count) => this._updateWool(count));
    this.scene.events.on(EVENTS.REFLECT_ACTIVATE, () => this._updateReflect());
    this.scene.events.on(EVENTS.REFLECT_END, () => this._updateReflect());
  }

  _updateHearts(count) {
    this._heartSprites.forEach((h, i) => {
      h.setFrame(i < count ? 0 : 1);
      if (i < count) {
        h.setTint(0xFF4444);
      } else {
        h.setTint(0x444444);
      }
    });
  }

  _updateStars(count) {
    this._starText.setText(String(count).padStart(3, '0'));
    // Petit flash
    this.scene.tweens.add({
      targets: this._starText,
      scaleX: 1.3, scaleY: 1.3,
      duration: 100,
      yoyo: true,
    });
  }

  _updateBA(count) {
    this._baText.setText(`BA:${count}`);
    this.scene.tweens.add({
      targets: this._baIcon,
      angle: 360,
      duration: 300,
    });
  }

  _updateWool(count) {
    this._woolDots.forEach((d, i) => {
      d.setFillStyle(i < count ? 0x9B59B6 : 0x444444);
    });
  }

  _updateReflect() {
    const charges = this.scene.player.stats.reflectCharges;
    this._reflectDots.forEach((d, i) => {
      d.setFillStyle(i < charges ? 0x4FC3F7 : 0x224455);
    });
  }

  setWorldInfo(world, level) {
    this._worldLabel.setText(`MONDE ${world} - NIVEAU ${level}`);
  }

  showTimer(seconds) {
    this._timerActive = true;
    this._timerValue = seconds;
    this._timerText.setVisible(true);
    this._updateTimer();
  }

  _updateTimer() {
    if (!this._timerActive) return;
    const mins = Math.floor(this._timerValue / 60);
    const secs = this._timerValue % 60;
    this._timerText.setText(`⏱ ${mins}:${String(secs).padStart(2, '0')}`);
    const color = this._timerValue > 30 ? '#FFFFFF' : '#FF4444';
    this._timerText.setColor(color);
  }

  tickTimer() {
    if (!this._timerActive || this._timerValue <= 0) return;
    this._timerValue--;
    this._updateTimer();
    if (this._timerValue <= 0) {
      this._timerActive = false;
      this.scene.events.emit('timer_expired');
    }
  }

  update() {
    // Mise à jour en continu si nécessaire
  }

  destroy() {
    [this._hudBg, this._heartLabel, ...this._heartSprites,
     this._starIcon, this._starText, this._woolLabel, ...this._woolDots,
     this._reflectLabel, ...this._reflectDots, this._baIcon, this._baText,
     this._worldLabel, this._timerText].forEach(e => { if (e) e.destroy(); });
  }
}

// ─── LevelBuilder.js ─────────────────────────────────────────────────────────
/**
 * Construit les niveaux procéduralement avec des tilemaps Phaser.
 * Chaque niveau est défini par sa liste de plateformes, ennemis et collectables.
 */
class LevelBuilder {
  constructor(scene) {
    this.scene = scene;
    this.platforms = null;
    this.hazards = null;
    this.decorations = null;
    this._width = 0;
    this._height = 0;
  }

  build(levelData) {
    const { width, height } = this.scene.scale;
    const TW = 16 * 2; // tile width affiché (tile 16px × scale 2)
    const TH = 16 * 2;

    this.platforms = this.scene.physics.add.staticGroup();
    this.hazards = this.scene.physics.add.staticGroup();
    this.decorations = this.scene.add.group();
    this._width = (levelData.widthTiles || 40) * TW;
    this._height = height;

    // Sol de base
    if (levelData.hasGround !== false) {
      this._buildGround(levelData, TW, TH);
    }

    // Plateformes définies dans levelData
    (levelData.platforms || []).forEach(p => this._addPlatform(p, TW, TH));

    // Dangers
    (levelData.hazards || []).forEach(h => this._addHazard(h, TW, TH));

    // Fond
    this._buildBackground(levelData);

    return {
      platforms: this.platforms,
      hazards: this.hazards,
      decorations: this.decorations,
      width: this._width,
      height: this._height,
    };
  }

  _buildGround(levelData, TW, TH) {
    const groundTile = levelData.groundTile || 0;
    const groundY = this.scene.scale.height - TH;
    const tiles = levelData.widthTiles || 40;

    for (let x = 0; x < tiles; x++) {
      const tile = this.scene.add.image(x * TW + TW / 2, groundY + TH / 2, 'tiles', groundTile)
        .setDisplaySize(TW, TH);
      this.platforms.add(tile);
    }

    // Couche sous le sol (décoration)
    for (let x = 0; x < tiles; x++) {
      const wallTile = levelData.wallTile || 1;
      this.scene.add.image(x * TW + TW / 2, groundY + TH * 1.5, 'tiles', wallTile)
        .setDisplaySize(TW, TH);
    }
  }

  _addPlatform(p, TW, TH) {
    const x = p.x * TW;
    const y = this.scene.scale.height - p.y * TH;
    const w = p.w || 3;
    const tile = p.tile !== undefined ? p.tile : 2;

    for (let i = 0; i < w; i++) {
      const img = this.scene.add.image(x + i * TW + TW / 2, y, 'tiles', tile)
        .setDisplaySize(TW, TH);
      this.platforms.add(img);
    }

    // Propriétés spéciales
    if (p.bouncy) {
      const zone = this.scene.add.zone(x + w * TW / 2, y, w * TW, TH);
      this.scene.physics.add.existing(zone, true);
      zone.setData('bouncy', true);
    }
    if (p.slow) {
      const zone = this.scene.add.zone(x + w * TW / 2, y, w * TW, TH);
      this.scene.physics.add.existing(zone, true);
      zone.setData('slow', true);
    }
  }

  _addHazard(h, TW, TH) {
    const x = h.x * TW;
    const y = this.scene.scale.height - h.y * TH;

    const img = this.scene.add.image(x + TW / 2, y, 'tiles', 15)
      .setDisplaySize(TW, TH);
    this.hazards.add(img);
  }

  _buildBackground(levelData) {
    const { width, height } = this.scene.scale;
    const bg = levelData.bg || 0;
    const bgColors = [
      [0x2D1B69, 0x1A0E42], // chambre
      [0x3D1515, 0x1A0808], // cuisine
      [0x0D2137, 0x061120], // vaisselle
      [0x1A2744, 0x0D1422], // devoirs
      [0x2A1F0E, 0x150F07], // salon
      [0x1A3A1A, 0x0D1D0D], // quartier
    ];
    const [topColor, bottomColor] = bgColors[bg] || bgColors[0];

    // Dégradé via rectangle (simplifié)
    this.scene.add.rectangle(0, 0, width * 3, height * 0.6, topColor, 1)
      .setOrigin(0, 0).setDepth(-1).setScrollFactor(0.1);
    this.scene.add.rectangle(0, height * 0.4, width * 3, height * 0.6, bottomColor, 1)
      .setOrigin(0, 0).setDepth(-1).setScrollFactor(0.15);
  }
}

// ─── Définitions des niveaux ─────────────────────────────────────────────────

const LEVELS = {
  // MONDE 1 — LE RÉVEIL HÉROÏQUE
  '1-1': {
    name: 'La Montagne du Matelas',
    bg: 0,
    widthTiles: 30,
    groundTile: 0,
    wallTile: 1,
    hasGround: true,
    playerSpawn: { x: 1, y: 3 },
    levelEnd: { x: 28, y: 3 },
    bossSpawn: null,
    platforms: [
      { x: 3, y: 4, w: 5, tile: 3 },    // Canapé rebondissant
      { x: 9, y: 5, w: 3, tile: 2 },    // Étagère
      { x: 13, y: 4, w: 4, tile: 3 },   // Gros matelas
      { x: 18, y: 6, w: 3, tile: 2 },
      { x: 22, y: 5, w: 4, tile: 2 },
      { x: 5, y: 7, w: 2, tile: 11 },   // Tapis (ralentit)
    ],
    hazards: [],
    enemies: [
      { type: 'ChaussetteFantome', x: 6, y: 5 },
      { type: 'ChaussetteFantome', x: 14, y: 5 },
      { type: 'ChaussetteFantome', x: 20, y: 7 },
    ],
    collectables: {
      stars: [
        { x: 4, y: 5 },{ x: 5, y: 5 },{ x: 10, y: 6 },
        { x: 14, y: 5 },{ x: 15, y: 5 },{ x: 19, y: 7 },
        { x: 23, y: 6 },{ x: 24, y: 6 },{x:25,y:6},
      ],
      hearts: [{ x: 12, y: 6 }],
      boneActions: [],
      wool: [{ x: 22, y: 6 }],
    },
    dialog_intro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'C\'est parti ! L\'anniversaire de Léa c\'est aujourd\'hui !',
    },
    checkpoints: [{ x: 15, y: 3 }],
    hasDoubleJumpUpgrade: false,
  },

  '1-boss': {
    name: 'Le Réveil Géant',
    bg: 0,
    widthTiles: 22,
    groundTile: 0,
    wallTile: 1,
    hasGround: true,
    playerSpawn: { x: 2, y: 3 },
    bossSpawn: { x: 18, y: 4 },
    bossType: 'ReveilGeant',
    levelEnd: null,
    platforms: [
      { x: 3, y: 5, w: 4, tile: 2 },
      { x: 8, y: 6, w: 3, tile: 2 },
      { x: 12, y: 5, w: 3, tile: 2 },
      { x: 16, y: 4, w: 4, tile: 3 },
    ],
    hazards: [],
    enemies: [],
    collectables: { stars: [], hearts: [{ x: 6, y: 3 }], boneActions: [], wool: [] },
    dialog_intro: {
      speaker: 'papa',
      name: 'Réveil',
      text: 'DRING DRING !!! Tu ne peux pas te lever sans moi !',
    },
    dialog_outro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'SNOOZE ! Maintenant je suis réveillée... ET JE VAIS À LA FÊTE ! ⭐',
    },
    reward: { doubleJump: true },
  },

  // MONDE 2 — LA CUISINE DU CHAOS
  '2-1': {
    name: 'L\'Arène du Plan de Travail',
    bg: 1,
    widthTiles: 35,
    groundTile: 4,
    wallTile: 5,
    hasGround: true,
    playerSpawn: { x: 1, y: 3 },
    levelEnd: { x: 33, y: 3 },
    bossSpawn: null,
    platforms: [
      { x: 2, y: 5, w: 8, tile: 10 },  // Plan de travail
      { x: 12, y: 6, w: 6, tile: 10 }, // Plan de travail haut
      { x: 20, y: 5, w: 5, tile: 10 },
      { x: 27, y: 6, w: 6, tile: 10 },
      { x: 5, y: 8, w: 3, tile: 2 },   // Tiroir sorti
      { x: 15, y: 8, w: 3, tile: 2 },
    ],
    hazards: [
      { x: 4, y: 6 },  // Jet de vapeur
    ],
    enemies: [
      { type: 'CuillereRebelle', x: 5, y: 6 },
      { type: 'CuillereRebelle', x: 16, y: 7 },
      { type: 'GlaconSauteur', x: 10, y: 6 },
      { type: 'CuillereRebelle', x: 25, y: 6 },
    ],
    collectables: {
      stars: [
        {x:3,y:6},{x:5,y:6},{x:7,y:6},
        {x:13,y:7},{x:15,y:7},
        {x:21,y:6},{x:23,y:6},{x:25,y:6},
        {x:28,y:7},{x:30,y:7},{x:32,y:7},
      ],
      hearts: [{ x: 19, y: 3 }],
      boneActions: [{ x: 33, y: 4 }],
      wool: [{ x: 10, y: 6 }],
    },
    dialog_intro: {
      speaker: 'maman',
      name: 'Maman',
      text: 'Swann ! Le petit-déjeuner ! Café pour Papa, tartines pour tout le monde !',
    },
    checkpoints: [{ x: 17, y: 3 }],
  },

  '2-boss': {
    name: 'Le Grille-Pain Furieux',
    bg: 1,
    widthTiles: 22,
    groundTile: 4,
    wallTile: 5,
    hasGround: true,
    playerSpawn: { x: 2, y: 3 },
    bossSpawn: { x: 18, y: 4 },
    bossType: 'GrillePainFurieux',
    levelEnd: null,
    platforms: [
      { x: 3, y: 5, w: 4, tile: 10 },
      { x: 8, y: 6, w: 3, tile: 10 },
      { x: 13, y: 5, w: 3, tile: 10 },
      { x: 17, y: 7, w: 4, tile: 10 },
    ],
    hazards: [],
    enemies: [],
    collectables: { stars: [], hearts: [{ x: 11, y: 7 }], boneActions: [], wool: [{ x: 5, y: 6 }] },
    dialog_intro: {
      speaker: 'papa',
      name: 'Grille-Pain',
      text: 'JE BRÛLERAI TOUTES TES TARTINES !!!',
    },
    dialog_outro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'Le jus d\'orange a eu raison de toi ! Petit-déjeuner = servi ! 🍊',
    },
    reward: { baBonus: 2 },
  },

  // MONDE 3 — MISSION VAISSELLE
  '3-1': {
    name: 'La Tour d\'Assiettes',
    bg: 2,
    widthTiles: 25,
    groundTile: 4,
    wallTile: 5,
    hasGround: true,
    playerSpawn: { x: 1, y: 3 },
    levelEnd: { x: 23, y: 3 },
    platforms: [
      { x: 2, y: 4, w: 4, tile: 14 },  // Assiettes (tremplin)
      { x: 7, y: 5, w: 3, tile: 14 },
      { x: 11, y: 6, w: 3, tile: 14 },
      { x: 15, y: 5, w: 3, tile: 14 },
      { x: 19, y: 4, w: 4, tile: 14 },
      { x: 8, y: 7, w: 2, tile: 2 },
      { x: 14, y: 8, w: 2, tile: 2 },
    ],
    hazards: [],
    enemies: [
      { type: 'ChaussetteFantome', x: 8, y: 6 },
      { type: 'CuillereRebelle', x: 12, y: 3 },
      { type: 'GlaconSauteur', x: 16, y: 6 },
    ],
    collectables: {
      stars: [
        {x:3,y:5},{x:8,y:6},{x:12,y:7},
        {x:16,y:6},{x:20,y:5},{x:21,y:5},{x:22,y:5},
      ],
      hearts: [],
      boneActions: [{ x: 23, y: 4 }],
      wool: [{ x: 12, y: 3 }],
    },
    dialog_intro: {
      speaker: 'maman',
      name: 'Maman',
      text: 'La vaisselle ne va pas se faire toute seule ! Swann, s\'il te plaît... 🙏',
    },
    checkpoints: [{ x: 12, y: 3 }],
  },

  // MONDE 4 — LES DEVOIRS INFERNAUX
  '4-1': {
    name: 'Le Territoire du Cahier',
    bg: 3,
    widthTiles: 32,
    groundTile: 4,
    wallTile: 5,
    hasGround: true,
    playerSpawn: { x: 1, y: 3 },
    levelEnd: { x: 30, y: 3 },
    platforms: [
      { x: 3, y: 4, w: 3, tile: 2 },   // Lignes de cahier
      { x: 7, y: 5, w: 4, tile: 2 },
      { x: 12, y: 4, w: 3, tile: 2 },
      { x: 16, y: 6, w: 4, tile: 2 },
      { x: 21, y: 5, w: 3, tile: 2 },
      { x: 25, y: 4, w: 4, tile: 2 },
    ],
    hazards: [],
    enemies: [
      { type: 'FauteOrthographe', x: 6, y: 5 },
      { type: 'FauteOrthographe', x: 14, y: 5 },
      { type: 'FauteOrthographe', x: 22, y: 5 },
      { type: 'FauteOrthographe', x: 28, y: 5 },
    ],
    collectables: {
      stars: [
        {x:4,y:5},{x:5,y:5},
        {x:8,y:6},{x:10,y:6},
        {x:13,y:5},{x:14,y:5},
        {x:18,y:7},{x:19,y:7},
        {x:22,y:6},{x:26,y:5},{x:27,y:5},
      ],
      hearts: [{ x: 15, y: 3 }],
      boneActions: [{ x: 30, y: 4 }, { x: 20, y: 3 }],
      wool: [{ x: 10, y: 3 }],
    },
    dialog_intro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'Les maths... Je dois finir mes exercices si je veux convaincre Papa !',
    },
    checkpoints: [{ x: 16, y: 3 }],
  },

  // MONDE 5 — LE CONVAINCRE-PAPA (dialogue + mini plateformes)
  '5-1': {
    name: 'La Grande Négociation',
    bg: 4,
    widthTiles: 18,
    groundTile: 6,
    wallTile: 1,
    hasGround: true,
    playerSpawn: { x: 2, y: 3 },
    levelEnd: null,
    bossType: 'PapaDialog',
    bossSpawn: { x: 14, y: 4 },
    platforms: [
      { x: 3, y: 4, w: 4, tile: 3 },  // Canapé
      { x: 8, y: 5, w: 2, tile: 2 },  // Table basse
      { x: 11, y: 4, w: 5, tile: 3 }, // Fauteuil (trône de Papa)
    ],
    hazards: [],
    enemies: [],
    collectables: {
      stars: [],
      hearts: [],
      boneActions: [{ x: 4, y: 5 }, { x: 8, y: 6 }, { x: 12, y: 3 }],
      wool: [],
    },
    dialog_intro: {
      speaker: 'papa',
      name: 'Papa',
      text: 'Swann. Assieds-toi. Parlons-nous.',
    },
  },

  // MONDE 6 — LA COURSE (auto-runner)
  '6-1': {
    name: 'La Course vers l\'Anniversaire',
    bg: 5,
    widthTiles: 50,
    groundTile: 8,
    wallTile: 7,
    hasGround: true,
    playerSpawn: { x: 2, y: 3 },
    levelEnd: { x: 48, y: 3 },
    autoRun: true,
    timerSeconds: 180,
    platforms: [
      { x: 5, y: 4, w: 3, tile: 9 },    // Trottoir surélevé
      { x: 10, y: 5, w: 4, tile: 9 },
      { x: 16, y: 4, w: 3, tile: 9 },
      { x: 22, y: 5, w: 5, tile: 9 },
      { x: 30, y: 4, w: 3, tile: 9 },
      { x: 35, y: 6, w: 4, tile: 9 },
      { x: 41, y: 5, w: 5, tile: 9 },
    ],
    hazards: [
      { x: 8, y: 2 },
      { x: 25, y: 2 },
    ],
    enemies: [
      { type: 'PigeonParc', x: 10, y: 5 },
      { type: 'PigeonParc', x: 24, y: 5 },
      { type: 'PigeonParc', x: 38, y: 5 },
    ],
    collectables: {
      stars: [
        {x:6,y:5},{x:11,y:6},{x:17,y:5},{x:23,y:6},
        {x:24,y:6},{x:31,y:5},{x:36,y:7},{x:42,y:6},
        {x:44,y:6},{x:46,y:6},
      ],
      hearts: [{ x: 28, y: 3 }],
      boneActions: [],
      wool: [{ x: 18, y: 3 }],
    },
    dialog_intro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'YESSS !!! Papa a dit OUI ! La fête de Léa, j\'ARRIVE ! 🎉',
    },
    dialog_outro: {
      speaker: 'swann',
      name: 'Swann',
      text: 'LÉA !!! BONNE ANNIIIIIV !!! J\'ai FAILLI ne pas venir... mais j\'ai réussi ! ⭐',
    },
  },
};

// ─── BootScene.js ─────────────────────────────────────────────────────────


class BootScene extends Phaser.Scene {
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

// ─── PreloadScene.js ─────────────────────────────────────────────────────────



class PreloadScene extends Phaser.Scene {
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

// ─── MenuScene.js ─────────────────────────────────────────────────────────


class MenuScene extends Phaser.Scene {
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

// ─── WorldMapScene.js ─────────────────────────────────────────────────────────


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

class WorldMapScene extends Phaser.Scene {
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

// ─── DialogScene.js ─────────────────────────────────────────────────────────


// Scène de dialogue standalone (non utilisée dans le flow principal mais disponible)
class DialogScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.DIALOG });
  }

  create() {
    // Réservé pour des cinématiques complètes si besoin
  }
}

// ─── PauseScene.js ─────────────────────────────────────────────────────────


class PauseScene extends Phaser.Scene {
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

// ─── GameOverScene.js ─────────────────────────────────────────────────────────


class GameOverScene extends Phaser.Scene {
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

// ─── LevelCompleteScene.js ─────────────────────────────────────────────────────────


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

class LevelCompleteScene extends Phaser.Scene {
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

// ─── EndingScene.js ─────────────────────────────────────────────────────────


class EndingScene extends Phaser.Scene {
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

// ─── GameScene.js ─────────────────────────────────────────────────────────














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

class GameScene extends Phaser.Scene {
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

// ─── main.js (bundled) ───────────────────────────────────────────────────────
const phaserConfig = {
  type: Phaser.AUTO,
  parent: 'game-container',
  width: GAME_CONFIG.NATIVE_WIDTH * GAME_CONFIG.SCALE,
  height: GAME_CONFIG.NATIVE_HEIGHT * GAME_CONFIG.SCALE,
  backgroundColor: '#0a0a1a',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: GAME_CONFIG.PHYSICS.GRAVITY },
      debug: false,
    },
  },
  scene: [
    BootScene,
    PreloadScene,
    MenuScene,
    WorldMapScene,
    GameScene,
    DialogScene,
    PauseScene,
    LevelCompleteScene,
    GameOverScene,
    EndingScene,
  ],
};
new Phaser.Game(phaserConfig);
