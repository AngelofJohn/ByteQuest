// =====================================================
// Audio System - Theme-Aware Music & Sound Effects
// =====================================================

const AudioManager = {
  // Audio elements
  musicPlayer: null,
  sfxPlayers: {},

  // State
  initialized: false,
  currentTrack: null,
  currentTheme: 'art',
  isMuted: false,
  isMusicPlaying: false,

  // Volume levels (0-1)
  masterVolume: 0.8,
  musicVolume: 0.6,
  sfxVolume: 0.8,

  // Track definitions by theme and context
  tracks: {
    art: {
      title: 'assets/audio/music/art/title.mp3',
      explore: 'assets/audio/music/art/explore.mp3',
      battle: 'assets/audio/music/art/battle.mp3',
      shop: 'assets/audio/music/art/shop.mp3',
      victory: 'assets/audio/music/art/victory.mp3'
    },
    pixel: {
      title: 'assets/audio/music/pixel/title.mp3',
      explore: 'assets/audio/music/pixel/explore.mp3',
      battle: 'assets/audio/music/pixel/battle.mp3',
      shop: 'assets/audio/music/pixel/shop.mp3',
      victory: 'assets/audio/music/pixel/victory.mp3'
    }
  },

  // Sound effects (shared between themes, or can be theme-specific)
  sfx: {
    // UI sounds
    click: 'assets/audio/sfx/click.mp3',
    hover: 'assets/audio/sfx/hover.mp3',
    open: 'assets/audio/sfx/open.mp3',
    close: 'assets/audio/sfx/close.mp3',

    // Game sounds
    success: 'assets/audio/sfx/success.mp3',
    error: 'assets/audio/sfx/error.mp3',
    levelUp: 'assets/audio/sfx/level_up.mp3',
    questComplete: 'assets/audio/sfx/quest_complete.mp3',
    itemPickup: 'assets/audio/sfx/item_pickup.mp3',
    gold: 'assets/audio/sfx/gold.mp3',

    // Lesson sounds
    correct: 'assets/audio/sfx/correct.mp3',
    wrong: 'assets/audio/sfx/wrong.mp3',
    streak: 'assets/audio/sfx/streak.mp3',

    // Crafting sounds
    craft: 'assets/audio/sfx/craft.mp3',
    forge: 'assets/audio/sfx/forge.mp3',
    enchant: 'assets/audio/sfx/enchant.mp3'
  },

  // Initialize the audio system
  init() {
    if (this.initialized) return;

    // Create main music player
    this.musicPlayer = new Audio();
    this.musicPlayer.loop = true;
    this.musicPlayer.volume = 0;

    // Preload common sound effects
    this.preloadSFX(['click', 'success', 'error', 'correct', 'wrong']);

    // Load settings from GameState if available
    if (typeof GameState !== 'undefined' && GameState.settings) {
      this.applySettings(GameState.settings);
    }

    this.initialized = true;
    console.log('[AudioManager] Initialized');
  },

  // Apply settings from GameState
  applySettings(settings) {
    this.masterVolume = (settings.masterVolume || 80) / 100;
    this.musicVolume = (settings.musicVolume || 60) / 100;
    this.sfxVolume = (settings.sfxVolume || 80) / 100;
    this.isMuted = settings.muteAll || false;

    // Update current music volume
    this.updateMusicVolume();

    // Update theme if changed
    const newTheme = settings.uiTheme || 'art';
    if (newTheme !== this.currentTheme && this.currentTrack) {
      this.currentTheme = newTheme;
      // Crossfade to new theme's version of current track
      this.crossfadeToTheme(newTheme);
    } else {
      this.currentTheme = newTheme;
    }
  },

  // Calculate effective music volume
  getEffectiveMusicVolume() {
    if (this.isMuted) return 0;
    return this.masterVolume * this.musicVolume;
  },

  // Calculate effective SFX volume
  getEffectiveSFXVolume() {
    if (this.isMuted) return 0;
    return this.masterVolume * this.sfxVolume;
  },

  // Update music player volume
  updateMusicVolume() {
    if (this.musicPlayer) {
      this.musicPlayer.volume = this.getEffectiveMusicVolume();
    }
  },

  // Preload sound effects for instant playback
  preloadSFX(sfxNames) {
    sfxNames.forEach(name => {
      if (this.sfx[name] && !this.sfxPlayers[name]) {
        const audio = new Audio();
        audio.src = this.sfx[name];
        audio.preload = 'auto';
        this.sfxPlayers[name] = audio;
      }
    });
  },

  // Play background music
  playMusic(trackName, fadeIn = true) {
    if (!this.initialized) this.init();

    const trackPath = this.tracks[this.currentTheme]?.[trackName];
    if (!trackPath) {
      console.warn(`[AudioManager] Track not found: ${trackName} for theme ${this.currentTheme}`);
      return;
    }

    // Don't restart if same track
    if (this.currentTrack === trackName && this.isMusicPlaying) {
      return;
    }

    this.currentTrack = trackName;

    if (fadeIn && this.isMusicPlaying) {
      // Crossfade from current track
      this.crossfade(trackPath);
    } else {
      // Start fresh
      this.musicPlayer.src = trackPath;
      this.musicPlayer.volume = fadeIn ? 0 : this.getEffectiveMusicVolume();

      this.musicPlayer.play().then(() => {
        this.isMusicPlaying = true;
        if (fadeIn) {
          this.fadeIn(this.musicPlayer, this.getEffectiveMusicVolume(), 1000);
        }
      }).catch(err => {
        // Autoplay blocked - will play on first user interaction
        console.log('[AudioManager] Autoplay blocked, waiting for user interaction');
        this.setupAutoplayUnlock();
      });
    }
  },

  // Stop music with optional fade out
  stopMusic(fadeOut = true) {
    if (!this.musicPlayer || !this.isMusicPlaying) return;

    if (fadeOut) {
      this.fadeOut(this.musicPlayer, 500, () => {
        this.musicPlayer.pause();
        this.musicPlayer.currentTime = 0;
        this.isMusicPlaying = false;
        this.currentTrack = null;
      });
    } else {
      this.musicPlayer.pause();
      this.musicPlayer.currentTime = 0;
      this.isMusicPlaying = false;
      this.currentTrack = null;
    }
  },

  // Pause music (keeps position)
  pauseMusic() {
    if (this.musicPlayer && this.isMusicPlaying) {
      this.musicPlayer.pause();
      this.isMusicPlaying = false;
    }
  },

  // Resume music
  resumeMusic() {
    if (this.musicPlayer && this.currentTrack && !this.isMusicPlaying) {
      this.musicPlayer.play().then(() => {
        this.isMusicPlaying = true;
      }).catch(err => {
        console.log('[AudioManager] Could not resume music');
      });
    }
  },

  // Crossfade to a new track
  crossfade(newTrackPath, duration = 1000) {
    const oldPlayer = this.musicPlayer;
    const newPlayer = new Audio(newTrackPath);
    newPlayer.loop = true;
    newPlayer.volume = 0;

    // Start new track
    newPlayer.play().then(() => {
      // Fade out old, fade in new
      this.fadeOut(oldPlayer, duration, () => {
        oldPlayer.pause();
      });
      this.fadeIn(newPlayer, this.getEffectiveMusicVolume(), duration);

      // Replace player reference
      this.musicPlayer = newPlayer;
    }).catch(err => {
      console.log('[AudioManager] Crossfade failed');
    });
  },

  // Crossfade to same track in different theme
  crossfadeToTheme(newTheme) {
    if (!this.currentTrack) return;

    const newTrackPath = this.tracks[newTheme]?.[this.currentTrack];
    if (newTrackPath) {
      this.crossfade(newTrackPath, 1500);
    }
  },

  // Fade in helper
  fadeIn(audioElement, targetVolume, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    const volumeStep = targetVolume / steps;
    let currentStep = 0;

    const fade = setInterval(() => {
      currentStep++;
      audioElement.volume = Math.min(volumeStep * currentStep, targetVolume);

      if (currentStep >= steps) {
        clearInterval(fade);
        audioElement.volume = targetVolume;
      }
    }, stepTime);
  },

  // Fade out helper
  fadeOut(audioElement, duration, callback) {
    const steps = 20;
    const stepTime = duration / steps;
    const startVolume = audioElement.volume;
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    const fade = setInterval(() => {
      currentStep++;
      audioElement.volume = Math.max(startVolume - (volumeStep * currentStep), 0);

      if (currentStep >= steps) {
        clearInterval(fade);
        audioElement.volume = 0;
        if (callback) callback();
      }
    }, stepTime);
  },

  // Play a sound effect
  playSFX(sfxName) {
    if (!this.initialized) this.init();
    if (this.isMuted) return;

    const sfxPath = this.sfx[sfxName];
    if (!sfxPath) {
      console.warn(`[AudioManager] SFX not found: ${sfxName}`);
      return;
    }

    // Use preloaded player or create new
    let player = this.sfxPlayers[sfxName];
    if (player) {
      // Reset and play preloaded sound
      player.currentTime = 0;
      player.volume = this.getEffectiveSFXVolume();
      player.play().catch(() => {});
    } else {
      // Create one-off player
      player = new Audio(sfxPath);
      player.volume = this.getEffectiveSFXVolume();
      player.play().catch(() => {});
    }
  },

  // Setup unlock for browsers that block autoplay
  setupAutoplayUnlock() {
    const unlock = () => {
      if (this.currentTrack) {
        this.musicPlayer.play().then(() => {
          this.isMusicPlaying = true;
          this.fadeIn(this.musicPlayer, this.getEffectiveMusicVolume(), 500);
        }).catch(() => {});
      }

      // Remove listeners after first interaction
      document.removeEventListener('click', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
    };

    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('keydown', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true });
  },

  // Mute/unmute all audio
  setMute(muted) {
    this.isMuted = muted;
    this.updateMusicVolume();
  },

  // Toggle mute
  toggleMute() {
    this.setMute(!this.isMuted);
    return this.isMuted;
  },

  // Set master volume (0-100)
  setMasterVolume(volume) {
    this.masterVolume = volume / 100;
    this.updateMusicVolume();
  },

  // Set music volume (0-100)
  setMusicVolume(volume) {
    this.musicVolume = volume / 100;
    this.updateMusicVolume();
  },

  // Set SFX volume (0-100)
  setSFXVolume(volume) {
    this.sfxVolume = volume / 100;
  },

  // Check if a track file exists (for graceful degradation)
  async checkTrackExists(trackPath) {
    try {
      const response = await fetch(trackPath, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  },

  // Get list of missing audio files (for development)
  async getMissingFiles() {
    const missing = { music: [], sfx: [] };

    // Check music tracks
    for (const theme of Object.keys(this.tracks)) {
      for (const track of Object.keys(this.tracks[theme])) {
        const path = this.tracks[theme][track];
        const exists = await this.checkTrackExists(path);
        if (!exists) {
          missing.music.push({ theme, track, path });
        }
      }
    }

    // Check SFX
    for (const sfx of Object.keys(this.sfx)) {
      const path = this.sfx[sfx];
      const exists = await this.checkTrackExists(path);
      if (!exists) {
        missing.sfx.push({ name: sfx, path });
      }
    }

    return missing;
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  AudioManager.init();
});

// Make globally available
window.AudioManager = AudioManager;
