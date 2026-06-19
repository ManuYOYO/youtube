import { SCENES } from '../GameConfig.js';

// Scène de dialogue standalone (non utilisée dans le flow principal mais disponible)
export default class DialogScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.DIALOG });
  }

  create() {
    // Réservé pour des cinématiques complètes si besoin
  }
}
