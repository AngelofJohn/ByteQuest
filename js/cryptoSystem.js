// ByteQuest Cryptography System
// Handles encryption/decryption of save files using Web Crypto API
// 
// Version: 0.1
// Status: Template - Ready for integration
// Features: AES-256-GCM encryption, PBKDF2 key derivation, HMAC-SHA256 signatures

/**
 * CryptoSystem: Main class for save file encryption/decryption
 * 
 * Usage:
 *   const crypto = new CryptoSystem();
 *   const encrypted = await crypto.encryptSaveFile(data, password);
 *   const decrypted = await crypto.decryptSaveFile(encrypted, password);
 */

class CryptoSystem {
  constructor() {
    this.ALGORITHM = 'AES-GCM';
    this.KEY_ALGORITHM = 'PBKDF2';
    this.HASH_ALGORITHM = 'SHA-256';
    this.HMAC_ALGORITHM = 'HMAC';
    
    // Configuration
    this.PBKDF2_ITERATIONS = 100000;  // Industry standard (slows brute force)
    this.SALT_LENGTH = 16;             // 128 bits
    this.IV_LENGTH = 12;               // 96 bits (recommended for GCM)
    this.KEY_LENGTH = 256;             // 256 bits for AES-256
    this.TAG_LENGTH = 128;             // 128 bits (GCM authentication tag)
    this.HMAC_LENGTH = 256;            // 256 bits for SHA-256
    
    this.BUFFER_OVERHEAD = 16 + 12 + 32; // salt + iv + hmac
  }

  /**
   * Derive encryption key from password using PBKDF2
   * @param {string} password - User's password
   * @param {Uint8Array} salt - Random salt
   * @returns {Promise<CryptoKey>} Derived key ready for encryption
   */
  async deriveKey(password, salt) {
    try {
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);

      // Import password as a key material
      const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        this.KEY_ALGORITHM,
        false,
        ['deriveBits', 'deriveKey']
      );

      // Derive encryption key
      const encryptionKey = await crypto.subtle.deriveKey(
        {
          name: this.KEY_ALGORITHM,
          salt: salt,
          iterations: this.PBKDF2_ITERATIONS,
          hash: this.HASH_ALGORITHM
        },
        baseKey,
        {
          name: this.ALGORITHM,
          length: this.KEY_LENGTH
        },
        false,  // not extractable
        ['encrypt', 'decrypt']
      );

      return encryptionKey;
    } catch (error) {
      throw new Error(`Key derivation failed: ${error.message}`);
    }
  }

  /**
   * Derive HMAC key from password (for integrity verification)
   * @param {string} password - User's password
   * @param {Uint8Array} salt - Same salt as used for encryption key
   * @returns {Promise<CryptoKey>} HMAC key
   */
  async deriveHmacKey(password, salt) {
    try {
      const encoder = new TextEncoder();
      const passwordBuffer = encoder.encode(password);

      const baseKey = await crypto.subtle.importKey(
        'raw',
        passwordBuffer,
        this.KEY_ALGORITHM,
        false,
        ['deriveBits']
      );

      // Derive HMAC key bits
      const keyBits = await crypto.subtle.deriveBits(
        {
          name: this.KEY_ALGORITHM,
          salt: salt,
          iterations: this.PBKDF2_ITERATIONS,
          hash: this.HASH_ALGORITHM
        },
        baseKey,
        this.HMAC_LENGTH
      );

      // Import as HMAC key
      const hmacKey = await crypto.subtle.importKey(
        'raw',
        keyBits,
        { name: this.HMAC_ALGORITHM, hash: this.HASH_ALGORITHM },
        false,
        ['sign', 'verify']
      );

      return hmacKey;
    } catch (error) {
      throw new Error(`HMAC key derivation failed: ${error.message}`);
    }
  }

  /**
   * Encrypt save file data
   * @param {Object} saveData - Game state object to encrypt
   * @param {string} password - Encryption password (min 8 chars recommended)
   * @returns {Promise<string>} Base64-encoded encrypted data
   */
  async encryptSaveFile(saveData, password) {
    try {
      if (!password || password.length < 1) {
        throw new Error('Password is required');
      }

      // 1. Serialize to JSON
      const jsonString = JSON.stringify(saveData);
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(jsonString);

      // 2. Generate random salt and IV
      const salt = crypto.getRandomValues(new Uint8Array(this.SALT_LENGTH));
      const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));

      // 3. Derive encryption key
      const encryptionKey = await this.deriveKey(password, salt);

      // 4. Encrypt the data
      const encryptedData = await crypto.subtle.encrypt(
        { name: this.ALGORITHM, iv: iv },
        encryptionKey,
        dataBuffer
      );

      // 5. Create HMAC signature for integrity verification
      const hmacKey = await this.deriveHmacKey(password, salt);
      const signature = await crypto.subtle.sign(
        this.HMAC_ALGORITHM,
        hmacKey,
        encryptedData
      );

      // 6. Combine: salt + iv + encryptedData + signature
      const combined = this.combineBuffers([
        salt,
        iv,
        new Uint8Array(encryptedData),
        new Uint8Array(signature)
      ]);

      // 7. Base64 encode for safe storage
      const encrypted = this.uint8ToBase64(combined);

      return encrypted;
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  /**
   * Decrypt save file data
   * @param {string} encryptedBase64 - Base64-encoded encrypted data
   * @param {string} password - Decryption password
   * @returns {Promise<Object>} Decrypted game state object
   */
  async decryptSaveFile(encryptedBase64, password) {
    try {
      if (!password || password.length < 1) {
        throw new Error('Password is required');
      }

      // 1. Base64 decode
      const combined = this.base64ToUint8(encryptedBase64);

      // 2. Extract components
      const salt = combined.slice(0, this.SALT_LENGTH);
      const iv = combined.slice(
        this.SALT_LENGTH,
        this.SALT_LENGTH + this.IV_LENGTH
      );
      const encryptedData = combined.slice(
        this.SALT_LENGTH + this.IV_LENGTH,
        combined.length - (this.HMAC_LENGTH / 8)
      );
      const signature = combined.slice(combined.length - (this.HMAC_LENGTH / 8));

      // 3. Verify HMAC signature first (fail early if tampered)
      const hmacKey = await this.deriveHmacKey(password, salt);
      const isValid = await crypto.subtle.verify(
        this.HMAC_ALGORITHM,
        hmacKey,
        signature,
        encryptedData
      );

      if (!isValid) {
        throw new Error(
          'Save file integrity check failed. File may be corrupted or password is incorrect.'
        );
      }

      // 4. Derive decryption key
      const decryptionKey = await this.deriveKey(password, salt);

      // 5. Decrypt the data
      const decryptedData = await crypto.subtle.decrypt(
        { name: this.ALGORITHM, iv: iv },
        decryptionKey,
        encryptedData
      );

      // 6. Deserialize from JSON
      const decoder = new TextDecoder();
      const jsonString = decoder.decode(decryptedData);
      const saveData = JSON.parse(jsonString);

      return saveData;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  /**
   * Combine multiple Uint8Arrays into one
   * @param {Uint8Array[]} arrays - Arrays to combine
   * @returns {Uint8Array} Combined array
   */
  combineBuffers(arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const combined = new Uint8Array(totalLength);

    let offset = 0;
    for (const array of arrays) {
      combined.set(array, offset);
      offset += array.length;
    }

    return combined;
  }

  /**
   * Convert Uint8Array to Base64 string
   * @param {Uint8Array} array - Array to encode
   * @returns {string} Base64 string
   */
  uint8ToBase64(array) {
    let binary = '';
    for (let i = 0; i < array.byteLength; i++) {
      binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
  }

  /**
   * Convert Base64 string to Uint8Array
   * @param {string} base64 - Base64 string to decode
   * @returns {Uint8Array} Decoded array
   */
  base64ToUint8(base64) {
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }
    return array;
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {Object} { isValid: boolean, message: string }
   */
  validatePassword(password) {
    const result = {
      isValid: true,
      message: '',
      strength: 'weak'
    };

    if (!password) {
      result.isValid = false;
      result.message = 'Password is required';
      return result;
    }

    if (password.length < 6) {
      result.isValid = false;
      result.message = 'Password must be at least 6 characters';
      return result;
    }

    if (password.length < 8) {
      result.strength = 'weak';
      result.message = 'Consider using at least 8 characters';
    } else if (password.length < 12) {
      result.strength = 'medium';
    } else {
      result.strength = 'strong';
    }

    // Check for variety
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    const varietyScore = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
      Boolean
    ).length;

    if (varietyScore >= 3 && password.length >= 10) {
      result.strength = 'strong';
    }

    return result;
  }
}

// ============================================================
// EncryptedSaveManager: High-level save/load management
// ============================================================

/**
 * EncryptedSaveManager: Handles saving/loading with optional encryption
 * 
 * Usage:
 *   const manager = new EncryptedSaveManager();
 *   await manager.setSavePassword('mypassword');
 *   await manager.saveGame(gameState);
 *   const state = await manager.loadGame();
 */

class EncryptedSaveManager {
  constructor() {
    this.crypto = new CryptoSystem();
    this.isPasswordProtected = false;
    this.password = null;
    this.lastError = null;
    this.STORAGE_KEY_ENCRYPTED = 'bytequest_save_encrypted_v2';
    this.STORAGE_KEY_LEGACY = 'bytequest_save';
    this.STORAGE_KEY_CRYPTO_ENABLED = 'bytequest_crypto_enabled';
    this.STORAGE_KEY_VERSION = 'bytequest_save_version';

    // Load crypto status from localStorage
    this.isPasswordProtected =
      localStorage.getItem(this.STORAGE_KEY_CRYPTO_ENABLED) === 'true';
  }

  /**
   * Set/update the save file password
   * @param {string} password - New password
   * @returns {Promise<Object>} { success: boolean, message: string }
   */
  async setSavePassword(password) {
    const validation = this.crypto.validatePassword(password);

    if (!validation.isValid) {
      return {
        success: false,
        message: validation.message,
        strength: validation.strength
      };
    }

    this.password = password;
    this.isPasswordProtected = true;
    localStorage.setItem(this.STORAGE_KEY_CRYPTO_ENABLED, 'true');

    return {
      success: true,
      message: `Password set successfully (${validation.strength} strength)`,
      strength: validation.strength
    };
  }

  /**
   * Disable encryption for future saves
   */
  disableEncryption() {
    this.password = null;
    this.isPasswordProtected = false;
    localStorage.removeItem(this.STORAGE_KEY_CRYPTO_ENABLED);
  }

  /**
   * Save game with optional encryption
   * @param {Object} gameState - Complete game state to save
   * @returns {Promise<Object>} { success: boolean, message: string, size: number }
   */
  async saveGame(gameState) {
    try {
      let saveSize = 0;

      if (this.isPasswordProtected && this.password) {
        // Encrypt save
        const encrypted = await this.crypto.encryptSaveFile(
          gameState,
          this.password
        );
        localStorage.setItem(this.STORAGE_KEY_ENCRYPTED, encrypted);
        localStorage.setItem(this.STORAGE_KEY_VERSION, '2.0');
        saveSize = encrypted.length;
      } else {
        // Legacy: unencrypted save
        const jsonString = JSON.stringify(gameState);
        localStorage.setItem(this.STORAGE_KEY_LEGACY, jsonString);
        localStorage.setItem(this.STORAGE_KEY_VERSION, '1.0');
        saveSize = jsonString.length;
      }

      return {
        success: true,
        message: `Game saved (${(saveSize / 1024).toFixed(2)} KB)`,
        size: saveSize
      };
    } catch (error) {
      this.lastError = error.message;
      return {
        success: false,
        message: `Save failed: ${error.message}`,
        size: 0
      };
    }
  }

  /**
   * Load game (auto-detects encrypted vs legacy)
   * @param {string|null} password - Password if loading encrypted save (optional if already set)
   * @returns {Promise<Object|null>} Game state or null if no save
   */
  async loadGame(password = null) {
    try {
      // Try encrypted save first
      const encryptedSave = localStorage.getItem(
        this.STORAGE_KEY_ENCRYPTED
      );
      if (encryptedSave) {
        const passwordToUse = password || this.password;
        if (!passwordToUse) {
          throw new Error('Password required for encrypted save');
        }

        const gameState = await this.crypto.decryptSaveFile(
          encryptedSave,
          passwordToUse
        );
        this.password = passwordToUse; // Remember password for future loads
        return gameState;
      }

      // Fall back to legacy save
      const legacySave = localStorage.getItem(this.STORAGE_KEY_LEGACY);
      if (legacySave) {
        return JSON.parse(legacySave);
      }

      return null;
    } catch (error) {
      this.lastError = error.message;
      throw error;
    }
  }

  /**
   * Check if a save file exists
   * @returns {boolean} True if save exists
   */
  hasSave() {
    return (
      !!localStorage.getItem(this.STORAGE_KEY_ENCRYPTED) ||
      !!localStorage.getItem(this.STORAGE_KEY_LEGACY)
    );
  }

  /**
   * Delete save file
   */
  deleteSave() {
    localStorage.removeItem(this.STORAGE_KEY_ENCRYPTED);
    localStorage.removeItem(this.STORAGE_KEY_LEGACY);
    localStorage.removeItem(this.STORAGE_KEY_VERSION);
  }

  /**
   * Get save file info (size, encryption status, etc)
   * @returns {Object} Save file metadata
   */
  getSaveInfo() {
    const encrypted = localStorage.getItem(this.STORAGE_KEY_ENCRYPTED);
    const legacy = localStorage.getItem(this.STORAGE_KEY_LEGACY);

    if (encrypted) {
      return {
        exists: true,
        encrypted: true,
        sizeKB: (encrypted.length / 1024).toFixed(2),
        version: '2.0'
      };
    } else if (legacy) {
      return {
        exists: true,
        encrypted: false,
        sizeKB: (legacy.length / 1024).toFixed(2),
        version: '1.0'
      };
    }

    return {
      exists: false,
      encrypted: false,
      sizeKB: 0,
      version: null
    };
  }
}

// ============================================================
// Unit Tests (optional, for validation)
// ============================================================

/**
 * Run basic crypto tests
 * Usage: cryptoSystem.runTests();
 */
CryptoSystem.prototype.runTests = async function() {
  console.log('🔐 ByteQuest Crypto System - Running Tests...\n');

  const testCases = [
    {
      name: 'Basic Encryption/Decryption',
      test: async () => {
        const testData = { level: 50, gold: 1000, name: 'Player' };
        const password = 'testPassword123';

        const encrypted = await this.encryptSaveFile(testData, password);
        const decrypted = await this.decryptSaveFile(encrypted, password);

        return (
          JSON.stringify(decrypted) === JSON.stringify(testData)
        );
      }
    },
    {
      name: 'Wrong Password Detection',
      test: async () => {
        const testData = { level: 50 };
        const password = 'correctPassword';
        const wrongPassword = 'wrongPassword';

        const encrypted = await this.encryptSaveFile(testData, password);

        try {
          await this.decryptSaveFile(encrypted, wrongPassword);
          return false; // Should have thrown
        } catch (e) {
          return e.message.includes('integrity');
        }
      }
    },
    {
      name: 'Large Data Handling',
      test: async () => {
        const largeData = {
          inventory: Array(1000)
            .fill(null)
            .map((_, i) => ({ id: i, name: `Item ${i}` })),
          quests: Array(500)
            .fill(null)
            .map((_, i) => ({ id: i, status: 'completed' }))
        };
        const password = 'testPassword123';

        const encrypted = await this.encryptSaveFile(largeData, password);
        const decrypted = await this.decryptSaveFile(encrypted, password);

        return (
          decrypted.inventory.length === 1000 && decrypted.quests.length === 500
        );
      }
    },
    {
      name: 'Password Validation',
      test: async () => {
        const validations = [
          { pwd: '', expected: false },
          { pwd: '123', expected: false },
          { pwd: 'shortPass', expected: true },
          { pwd: 'VeryStrongPassword123!', expected: true }
        ];

        for (const { pwd, expected } of validations) {
          const result = this.validatePassword(pwd);
          if (result.isValid !== expected) return false;
        }

        return true;
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const testCase of testCases) {
    try {
      const result = await testCase.test();
      if (result) {
        console.log(`✓ ${testCase.name}`);
        passed++;
      } else {
        console.log(`✗ ${testCase.name}`);
        failed++;
      }
    } catch (error) {
      console.log(`✗ ${testCase.name} - ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  return failed === 0;
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CryptoSystem, EncryptedSaveManager };
}
