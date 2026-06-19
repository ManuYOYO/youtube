export const GAME_CONFIG = {
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

export const SCENES = {
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

export const EVENTS = {
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
