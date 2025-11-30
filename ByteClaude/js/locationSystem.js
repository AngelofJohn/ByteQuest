// ByteQuest - Location System
// Phase 2: Location infrastructure, travel, map

// =====================================================
// Location Definitions
// =====================================================

const LOCATION_DEFINITIONS = {
  dawnmere: {
    id: 'dawnmere',
    name: 'Dawnmere',
    description: 'A small frontier settlement seeking prosperity along the trade routes.',
    levelRequired: 1,
    connections: [], // To be filled when more locations exist
    icon: '🏘️',
    color: '#a0785a',
    bgGradient: ['#1a3a5c', '#2a5a3c', '#3a6a4c'], // Sky to ground colors
    themes: ['community', 'beginnings'],
    npcs: ['urma', 'rega', 'dave'],
    quests: ['welcome_to_dawnmere', 'meet_the_settlers', 'learning_basics']
  }
  
  // Additional locations added via addLocation() or defined here
  // Example structure:
  /*
  haari_fields: {
    id: 'haari_fields',
    name: 'The Haari Fields',
    description: 'Vast farmlands stretching across the plains. Boar-like animals roam freely.',
    levelRequired: 3,
    connections: ['dawnmere'],
    icon: '🌾',
    color: '#c9a227',
    bgGradient: ['#87ceeb', '#f4d03f', '#8b7355'],
    themes: ['agriculture', 'labor'],
    npcs: [],
    quests: []
  },
  
  lurenium: {
    id: 'lurenium',
    name: 'Lurenium',
    description: 'An ancient city covered in gold, with forgotten leaders lost to time.',
    levelRequired: 5,
    connections: ['haari_fields'],
    icon: '🏛️',
    color: '#ffd700',
    bgGradient: ['#1a1a2e', '#2a2a4e', '#c9a227'],
    themes: ['history', 'mystery'],
    npcs: [],
    quests: [],
    hasBossExam: true
  }
  */
};

// =====================================================
// Location Manager Class
// =====================================================

class LocationManager {
  constructor(gameState) {
    this.state = gameState;
    this.locations = { ...LOCATION_DEFINITIONS };
    this.initializePlayerLocations();
  }

  // ===================================================
  // Initialization
  // ===================================================

  /**
   * Initialize player location tracking
   */
  initializePlayerLocations() {
    if (!this.state.player.locations) {
      this.state.player.locations = {
        current: 'dawnmere',
        discovered: ['dawnmere'],
        unlocked: ['dawnmere']
      };
    }
  }

  // ===================================================
  // Location Access
  // ===================================================

  /**
   * Get location definition by ID
   */
  getLocation(locationId) {
    return this.locations[locationId] || null;
  }

  /**
   * Get all location definitions
   */
  getAllLocations() {
    return Object.values(this.locations);
  }

  /**
   * Get current location
   */
  getCurrentLocation() {
    const currentId = this.state.player.locations?.current || 'dawnmere';
    return this.getLocation(currentId);
  }

  /**
   * Get current location ID
   */
  getCurrentLocationId() {
    return this.state.player.locations?.current || 'dawnmere';
  }

  // ===================================================
  // Discovery & Unlocking
  // ===================================================

  /**
   * Check if a location has been discovered
   */
  isDiscovered(locationId) {
    return this.state.player.locations?.discovered?.includes(locationId) || false;
  }

  /**
   * Check if a location is unlocked (can travel to)
   */
  isUnlocked(locationId) {
    return this.state.player.locations?.unlocked?.includes(locationId) || false;
  }

  /**
   * Check if player meets level requirement for a location
   */
  meetsLevelRequirement(locationId) {
    const location = this.getLocation(locationId);
    if (!location) return false;
    return this.state.player.level >= location.levelRequired;
  }

  /**
   * Discover a location (add to map, but may not be unlocked)
   */
  discoverLocation(locationId) {
    const location = this.getLocation(locationId);
    if (!location) return { success: false, message: 'Location not found' };
    
    if (this.isDiscovered(locationId)) {
      return { success: false, message: 'Location already discovered' };
    }
    
    this.state.player.locations.discovered.push(locationId);
    
    // Auto-unlock if meets requirements
    if (this.meetsLevelRequirement(locationId)) {
      this.unlockLocation(locationId);
    }
    
    return {
      success: true,
      message: `Discovered: ${location.name}`,
      location
    };
  }

  /**
   * Unlock a location (allow travel)
   */
  unlockLocation(locationId) {
    const location = this.getLocation(locationId);
    if (!location) return { success: false, message: 'Location not found' };
    
    if (this.isUnlocked(locationId)) {
      return { success: false, message: 'Location already unlocked' };
    }
    
    // Must be discovered first
    if (!this.isDiscovered(locationId)) {
      this.discoverLocation(locationId);
    }
    
    this.state.player.locations.unlocked.push(locationId);
    
    return {
      success: true,
      message: `Unlocked: ${location.name}`,
      location
    };
  }

  /**
   * Check why a location is locked
   */
  getLockedReason(locationId) {
    const location = this.getLocation(locationId);
    if (!location) return 'Location not found';
    
    if (!this.isDiscovered(locationId)) {
      return 'Not yet discovered';
    }
    
    if (!this.meetsLevelRequirement(locationId)) {
      return `Requires level ${location.levelRequired}`;
    }
    
    // Could add more conditions here (quest requirements, etc.)
    
    return null; // No reason - should be unlockable
  }

  // ===================================================
  // Travel
  // ===================================================

  /**
   * Check if player can travel to a location
   */
  canTravelTo(locationId) {
    // Must be unlocked
    if (!this.isUnlocked(locationId)) {
      return { canTravel: false, reason: this.getLockedReason(locationId) };
    }
    
    // Must be connected to current location OR use fast travel (map)
    // For now, allow travel to any unlocked location
    return { canTravel: true };
  }

  /**
   * Travel to a location
   */
  travelTo(locationId) {
    const check = this.canTravelTo(locationId);
    if (!check.canTravel) {
      return { success: false, message: check.reason };
    }
    
    const previousLocation = this.getCurrentLocationId();
    const newLocation = this.getLocation(locationId);
    
    // Update current location
    this.state.player.locations.current = locationId;
    
    return {
      success: true,
      message: `Traveled to ${newLocation.name}`,
      previousLocation,
      newLocation
    };
  }

  // ===================================================
  // Connected Locations
  // ===================================================

  /**
   * Get locations connected to current location
   */
  getConnectedLocations() {
    const current = this.getCurrentLocation();
    if (!current || !current.connections) return [];
    
    return current.connections
      .map(id => this.getLocation(id))
      .filter(loc => loc !== null);
  }

  /**
   * Get all discovered locations
   */
  getDiscoveredLocations() {
    const discovered = this.state.player.locations?.discovered || [];
    return discovered
      .map(id => this.getLocation(id))
      .filter(loc => loc !== null);
  }

  /**
   * Get all unlocked locations
   */
  getUnlockedLocations() {
    const unlocked = this.state.player.locations?.unlocked || [];
    return unlocked
      .map(id => this.getLocation(id))
      .filter(loc => loc !== null);
  }

  // ===================================================
  // Location Status
  // ===================================================

  /**
   * Get full status for a location
   */
  getLocationStatus(locationId) {
    const location = this.getLocation(locationId);
    if (!location) return null;
    
    const discovered = this.isDiscovered(locationId);
    const unlocked = this.isUnlocked(locationId);
    const meetsLevel = this.meetsLevelRequirement(locationId);
    const isCurrent = this.getCurrentLocationId() === locationId;
    
    return {
      location,
      discovered,
      unlocked,
      meetsLevel,
      isCurrent,
      lockedReason: !unlocked ? this.getLockedReason(locationId) : null
    };
  }

  /**
   * Get status for all locations (for map display)
   */
  getAllLocationStatuses() {
    return Object.keys(this.locations).map(id => this.getLocationStatus(id));
  }

  // ===================================================
  // Dynamic Location Management
  // ===================================================

  /**
   * Add a new location definition
   */
  addLocation(locationData) {
    if (!locationData.id) {
      return { success: false, message: 'Location must have an ID' };
    }
    
    if (this.locations[locationData.id]) {
      return { success: false, message: 'Location ID already exists' };
    }
    
    // Ensure required fields
    const location = {
      id: locationData.id,
      name: locationData.name || 'Unknown Location',
      description: locationData.description || '',
      levelRequired: locationData.levelRequired || 1,
      connections: locationData.connections || [],
      icon: locationData.icon || '📍',
      color: locationData.color || '#888888',
      bgGradient: locationData.bgGradient || ['#1a1a2e', '#2a2a4e', '#3a3a6e'],
      themes: locationData.themes || [],
      npcs: locationData.npcs || [],
      quests: locationData.quests || [],
      ...locationData
    };
    
    this.locations[location.id] = location;
    
    return { success: true, location };
  }

  /**
   * Update location connections
   */
  addConnection(fromLocationId, toLocationId) {
    const fromLocation = this.getLocation(fromLocationId);
    const toLocation = this.getLocation(toLocationId);
    
    if (!fromLocation || !toLocation) {
      return { success: false, message: 'Invalid location ID' };
    }
    
    if (!fromLocation.connections.includes(toLocationId)) {
      fromLocation.connections.push(toLocationId);
    }
    
    // Make bidirectional
    if (!toLocation.connections.includes(fromLocationId)) {
      toLocation.connections.push(fromLocationId);
    }
    
    return { success: true };
  }

  // ===================================================
  // Level-Up Check
  // ===================================================

  /**
   * Check if any new locations should be unlocked after level up
   * Call this when player levels up
   */
  checkLevelUnlocks() {
    const newlyUnlocked = [];
    
    for (const locationId of this.state.player.locations.discovered) {
      if (!this.isUnlocked(locationId) && this.meetsLevelRequirement(locationId)) {
        this.unlockLocation(locationId);
        newlyUnlocked.push(this.getLocation(locationId));
      }
    }
    
    return newlyUnlocked;
  }
}

// =====================================================
// Helper Functions
// =====================================================

/**
 * Get location by ID from definitions
 */
function getLocationDefinition(locationId) {
  return LOCATION_DEFINITIONS[locationId];
}

// =====================================================
// Export
// =====================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LOCATION_DEFINITIONS,
    LocationManager,
    getLocationDefinition
  };
}
