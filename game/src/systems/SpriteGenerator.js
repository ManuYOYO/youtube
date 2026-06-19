/**
 * Génère tous les sprites pixel art procéduralement via Canvas.
 * Chaque sprite est dessiné pixel par pixel puis converti en texture Phaser.
 */
export default class SpriteGenerator {
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
