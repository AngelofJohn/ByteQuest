# Dev Log #015 - Theme Toggle & Audio System

**Date:** December 13, 2025
**Version:** 0.5.3
**Session Type:** Feature Implementation

---

## Summary

Added an in-game theme toggle allowing players to switch between Paper Art and Pixel visual styles at runtime. Also implemented a complete audio system ready for theme-specific music and sound effects.

---

## What We Built

### Theme Toggle System

Players can now switch visual styles without reloading the game.

**Implementation:**
- Added `uiTheme` setting to GameState (`art` or `pixel`)
- Toggle located in Settings → Display → UI Theme
- CSS class `body.theme-pixel` overrides all art styles
- Changes apply instantly with no page reload

**Paper Art Theme (Default):**
- Catholicon + GrimoireOfDeath fonts
- Parchment/warm paper UI backgrounds
- Art-based buttons, modals, bars

**Pixel Theme:**
- Press Start 2P + VT323 fonts
- Original dark UI backgrounds
- Pixel-style buttons and elements

**CSS Structure:**
```css
/* ~260 lines of pixel theme overrides */
body.theme-pixel {
  --font-display: 'Press Start 2P', monospace;
  --font-body: 'VT323', monospace;
  /* ... button, modal, dialog overrides */
}
```

---

### Audio System

Created a complete audio manager with theme-aware music support.

**Features:**
- Background music with looping
- Sound effects with preloading
- Volume controls (Master, Music, SFX)
- Mute toggle
- Theme-specific track switching
- Crossfade between tracks
- Autoplay unlock handling for browsers

**AudioManager API:**
```javascript
AudioManager.playMusic('explore');  // Play theme-appropriate track
AudioManager.stopMusic();           // Stop with fade out
AudioManager.playSFX('success');    // Play sound effect
AudioManager.setMusicVolume(60);    // 0-100
```

**Track Contexts:**
- `title` - Title screen music
- `explore` - General exploration/town
- `battle` - Combat encounters
- `shop` - Shopping/trading
- `victory` - Quest/lesson completion

**Folder Structure:**
```
assets/audio/
├── music/
│   ├── art/      (fantasy/orchestral)
│   │   ├── title.mp3
│   │   ├── explore.mp3
│   │   ├── battle.mp3
│   │   ├── shop.mp3
│   │   └── victory.mp3
│   └── pixel/    (chiptune/8-bit)
│       └── ... (same files)
└── sfx/          (shared effects)
    ├── click.mp3
    ├── correct.mp3
    ├── wrong.mp3
    └── ...
```

---

### Git Cleanup

Merged feature branch into main and cleaned up:
- `feature/ui-art-integration` → merged to `main`
- Feature branch deleted
- Single branch workflow now

---

## Files Changed

**New Files:**
- `js/audioSystem.js` - AudioManager (~400 lines)
- `assets/audio/AUDIO_README.txt` - Documentation for audio assets
- `devlog/015-2025-12-13-theme-toggle-audio-system.md` - This file

**Modified:**
- `css/style.css` - Added `body.theme-pixel` overrides (~260 lines)
- `js/game.js` - Theme setting, audio integration, settings UI updates
- `index.html` - Added audioSystem.js script

---

## Technical Notes

### Theme Switching
The theme toggle reuses the existing settings system:
```javascript
updateSetting('uiTheme', 'pixel');  // Switch to pixel
updateSetting('uiTheme', 'art');    // Switch to paper art
```

This triggers `applySettings()` which:
1. Adds/removes `theme-pixel` class on body
2. Calls `AudioManager.applySettings()` to crossfade music

### Audio Autoplay
Browsers block autoplay until user interaction. The AudioManager handles this by:
1. Attempting to play music on request
2. If blocked, setting up click/key listeners
3. Playing music on first user interaction

---

## Next Steps

- Add audio files (music + SFX)
- Test theme persistence across sessions
- Consider adding theme preview in settings
- Playtest both themes for readability

---

## Notes

Audio files not yet included. See `assets/audio/AUDIO_README.txt` for:
- Required file names and formats
- Recommended royalty-free sources
- Style guidelines for each theme
