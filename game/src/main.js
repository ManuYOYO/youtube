import { GAME_CONFIG, SCENES } from './GameConfig.js';
import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import MenuScene from './scenes/MenuScene.js';
import WorldMapScene from './scenes/WorldMapScene.js';
import GameScene from './scenes/GameScene.js';
import DialogScene from './scenes/DialogScene.js';
import PauseScene from './scenes/PauseScene.js';
import LevelCompleteScene from './scenes/LevelCompleteScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import EndingScene from './scenes/EndingScene.js';

const config = {
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

const game = new Phaser.Game(config);
export default game;
