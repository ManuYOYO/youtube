import { GAME_CONFIG, EVENTS } from '../GameConfig.js';

const CFG = GAME_CONFIG.PHYSICS;
const PCFG = GAME_CONFIG.PLAYER;

export default class Player extends Phaser.Physics.Arcade.Sprite {
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
