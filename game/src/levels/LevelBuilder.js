/**
 * Construit les niveaux procéduralement avec des tilemaps Phaser.
 * Chaque niveau est défini par sa liste de plateformes, ennemis et collectables.
 */
export default class LevelBuilder {
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

export const LEVELS = {
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
