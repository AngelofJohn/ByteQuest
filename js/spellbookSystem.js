// ByteQuest - Spellbook System
// Grammar reference UI with unlockable pages

// =====================================================
// Spellbook Page Definitions
// =====================================================

const SPELLBOOK_PAGES = {
  // Verbs
  etre: {
    id: "etre",
    title: "Être",
    subtitle: "to be",
    category: "verbs",
    icon: "✨",
    unlockHint: "Learn from Sage Aldric in Dawnmere",
    content: {
      type: "conjugation",
      verb: "etre"
    }
  },
  avoir: {
    id: "avoir",
    title: "Avoir",
    subtitle: "to have",
    category: "verbs",
    icon: "🤲",
    unlockHint: "Continue your studies with Sage Aldric",
    content: {
      type: "conjugation",
      verb: "avoir"
    }
  },
  aller: {
    id: "aller",
    title: "Aller",
    subtitle: "to go",
    category: "verbs",
    icon: "🚶",
    unlockHint: "Advance your training with Sage Aldric",
    content: {
      type: "conjugation",
      verb: "aller"
    }
  },
  faire: {
    id: "faire",
    title: "Faire",
    subtitle: "to do/make",
    category: "verbs",
    icon: "🔨",
    unlockHint: "Master more verbs with Sage Aldric",
    content: {
      type: "conjugation",
      verb: "faire"
    }
  },
  regular_er_pattern: {
    id: "regular_er_pattern",
    title: "Regular -ER Verbs",
    subtitle: "The most common verb pattern",
    category: "verbs",
    icon: "📝",
    unlockHint: "Complete the -ER verb lesson",
    content: {
      type: "pattern",
      pattern: "er_verbs"
    }
  },
  
  // Grammar
  articles: {
    id: "articles",
    title: "Articles",
    subtitle: "le, la, les, un, une, des",
    category: "grammar",
    icon: "📰",
    unlockHint: "Learn about gender with Sage Aldric",
    content: {
      type: "articles"
    }
  },
  gender: {
    id: "gender",
    title: "Noun Gender",
    subtitle: "Masculine vs Feminine",
    category: "grammar",
    icon: "⚖️",
    unlockHint: "Learn about gender with Sage Aldric",
    content: {
      type: "gender"
    }
  },
  
  // Reference
  pronouns: {
    id: "pronouns",
    title: "Subject Pronouns",
    subtitle: "je, tu, il, elle, nous...",
    category: "reference",
    icon: "👥",
    unlockHint: "Available from the start",
    alwaysUnlocked: true,
    content: {
      type: "pronouns"
    }
  }
};

// Category display order and labels
const SPELLBOOK_CATEGORIES = [
  { id: "verbs", label: "Verbs", icon: "⚡" },
  { id: "grammar", label: "Grammar", icon: "📚" },
  { id: "reference", label: "Reference", icon: "📋" }
];

// =====================================================
// Spellbook Manager Class
// =====================================================

class SpellbookManager {
  constructor(gameState) {
    this.state = gameState;
    this.currentPage = null;
    
    // Initialize spellbook state if not present
    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"], // Pronouns always available
        lastViewed: null
      };
    }
  }

  // ===================================================
  // Page Management
  // ===================================================

  /**
   * Check if a page is unlocked
   */
  isPageUnlocked(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page) return false;
    if (page.alwaysUnlocked) return true;
    return this.state.player.spellbook.unlockedPages.includes(pageId);
  }

  /**
   * Unlock a spellbook page
   */
  unlockPage(pageId) {
    if (!SPELLBOOK_PAGES[pageId]) {
      console.warn(`Unknown spellbook page: ${pageId}`);
      return false;
    }
    
    if (!this.state.player.spellbook.unlockedPages.includes(pageId)) {
      this.state.player.spellbook.unlockedPages.push(pageId);
      return true;
    }
    return false;
  }

  /**
   * Unlock multiple pages (from quest rewards)
   */
  unlockPages(pageIds) {
    let newUnlocks = [];
    pageIds.forEach(id => {
      if (this.unlockPage(id)) {
        newUnlocks.push(id);
      }
    });
    return newUnlocks;
  }

  /**
   * Get all pages in a category
   */
  getPagesInCategory(categoryId) {
    return Object.values(SPELLBOOK_PAGES).filter(p => p.category === categoryId);
  }

  /**
   * Get count of unlocked pages
   */
  getUnlockedCount() {
    return this.state.player.spellbook.unlockedPages.length;
  }

  /**
   * Get total page count
   */
  getTotalCount() {
    return Object.keys(SPELLBOOK_PAGES).length;
  }

  // ===================================================
  // UI Rendering
  // ===================================================

  /**
   * Show the spellbook modal
   */
  show() {
    const modal = document.getElementById('spellbook-modal');
    if (!modal) return;

    // Ensure spellbook state exists
    if (!this.state.player.spellbook) {
      this.state.player.spellbook = {
        unlockedPages: ["pronouns"],
        lastViewed: null
      };
    }

    this.renderTableOfContents();

    // Show last viewed page or welcome
    const lastViewed = this.state.player.spellbook.lastViewed;
    if (lastViewed && this.isPageUnlocked(lastViewed)) {
      this.showPage(lastViewed);
    } else {
      this.showWelcome();
    }

    modal.classList.add('active');
  }

  /**
   * Hide the spellbook modal
   */
  hide() {
    const modal = document.getElementById('spellbook-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  /**
   * Render the table of contents
   */
  renderTableOfContents() {
    const toc = document.querySelector('.spellbook-toc');
    if (!toc) return;
    
    let html = '';
    
    SPELLBOOK_CATEGORIES.forEach(category => {
      const pages = this.getPagesInCategory(category.id);
      if (pages.length === 0) return;
      
      html += `
        <div class="toc-section">
          <div class="toc-section-title">${category.icon} ${category.label}</div>
      `;
      
      pages.forEach(page => {
        const isUnlocked = this.isPageUnlocked(page.id);
        const isActive = this.currentPage === page.id;
        
        html += `
          <div class="toc-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}" 
               data-page="${page.id}">
            <span class="toc-item-icon">${isUnlocked ? page.icon : '🔒'}</span>
            <span class="toc-item-label">${isUnlocked ? page.title : '???'}</span>
            <span class="toc-item-status">${isUnlocked ? '✓' : ''}</span>
          </div>
        `;
      });
      
      html += '</div>';
    });
    
    toc.innerHTML = html;
    
    // Add click handlers
    toc.querySelectorAll('.toc-item').forEach(item => {
      item.addEventListener('click', () => {
        const pageId = item.dataset.page;
        if (this.isPageUnlocked(pageId)) {
          this.showPage(pageId);
        } else {
          this.showLockedPage(pageId);
        }
      });
    });
  }

  /**
   * Show welcome/intro page
   */
  showWelcome() {
    const content = document.querySelector('.spellbook-content');
    if (!content) return;
    
    this.currentPage = null;
    this.updateTocActive();
    
    const unlocked = this.getUnlockedCount();
    const total = this.getTotalCount();
    
    content.innerHTML = `
      <div class="spellbook-welcome">
        <div class="welcome-icon">📖</div>
        <div class="page-title">Welcome to Your Spellbook</div>
        <div class="welcome-text">
          <p>This tome contains the grammar knowledge you've acquired on your journey.</p>
          <p style="margin-top: 16px;">Select a topic from the left to review what you've learned.</p>
          <p style="margin-top: 16px; color: var(--accent-gold);">
            Pages Unlocked: ${unlocked} / ${total}
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Show a specific page
   */
  showPage(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page || !this.isPageUnlocked(pageId)) return;
    
    this.currentPage = pageId;
    this.state.player.spellbook.lastViewed = pageId;
    this.updateTocActive();
    
    const content = document.querySelector('.spellbook-content');
    if (!content) return;
    
    let html = `
      <div class="spellbook-page active">
        <div class="page-title">${page.icon} ${page.title}</div>
        <div class="page-subtitle">${page.subtitle}</div>
    `;
    
    // Render content based on type
    html += this.renderPageContent(page);
    
    html += '</div>';
    content.innerHTML = html;
  }

  /**
   * Show locked page info
   */
  showLockedPage(pageId) {
    const page = SPELLBOOK_PAGES[pageId];
    if (!page) return;
    
    this.currentPage = null;
    this.updateTocActive();
    
    const content = document.querySelector('.spellbook-content');
    if (!content) return;
    
    content.innerHTML = `
      <div class="locked-page">
        <div class="locked-icon">🔒</div>
        <div class="locked-message">This page is locked</div>
        <div class="locked-hint">${page.unlockHint}</div>
      </div>
    `;
  }

  /**
   * Update TOC active state
   */
  updateTocActive() {
    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === this.currentPage);
    });
  }

  /**
   * Render page content based on type
   */
  renderPageContent(page) {
    switch (page.content.type) {
      case 'conjugation':
        return this.renderConjugation(page.content.verb);
      case 'pattern':
        return this.renderPattern(page.content.pattern);
      case 'articles':
        return this.renderArticles();
      case 'gender':
        return this.renderGender();
      case 'pronouns':
        return this.renderPronouns();
      default:
        return '<p>Content not available.</p>';
    }
  }

  /**
   * Render verb conjugation table
   */
  renderConjugation(verbId) {
    if (typeof GRAMMAR === 'undefined' || !GRAMMAR.verbs[verbId]) {
      return '<p>Verb data not found.</p>';
    }
    
    const verb = GRAMMAR.verbs[verbId];
    
    let html = `
      <div class="page-section">
        <div class="page-section-title">Present Tense</div>
        <table class="conjugation-table">
          <thead>
            <tr>
              <th>Pronoun</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
    `;
    
    const pronounOrder = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
    const pronounDisplay = {
      'je': 'je',
      'tu': 'tu',
      'il': 'il / elle / on',
      'nous': 'nous',
      'vous': 'vous',
      'ils': 'ils / elles'
    };
    
    pronounOrder.forEach(pronoun => {
      if (verb.present[pronoun]) {
        html += `
          <tr>
            <td class="pronoun">${pronounDisplay[pronoun]}</td>
            <td class="form">${verb.present[pronoun]}</td>
          </tr>
        `;
      }
    });
    
    html += `
          </tbody>
        </table>
      </div>
    `;
    
    // Add tip if available
    if (verb.hint) {
      html += `
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          ${verb.hint}
        </div>
      `;
    }
    
    return html;
  }

  /**
   * Render verb pattern (e.g., regular -ER verbs)
   */
  renderPattern(patternId) {
    if (patternId === 'er_verbs') {
      return `
        <div class="page-section">
          <div class="page-section-title">Pattern: Regular -ER Verbs</div>
          <p style="margin-bottom: 16px;">Most French verbs end in -ER and follow this pattern. Remove -ER and add:</p>
          <table class="conjugation-table">
            <thead>
              <tr>
                <th>Pronoun</th>
                <th>Ending</th>
                <th>Example (parler)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td class="pronoun">je</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">tu</td><td class="form">-es</td><td>parles</td></tr>
              <tr><td class="pronoun">il/elle</td><td class="form">-e</td><td>parle</td></tr>
              <tr><td class="pronoun">nous</td><td class="form">-ons</td><td>parlons</td></tr>
              <tr><td class="pronoun">vous</td><td class="form">-ez</td><td>parlez</td></tr>
              <tr><td class="pronoun">ils/elles</td><td class="form">-ent</td><td>parlent</td></tr>
            </tbody>
          </table>
        </div>
        <div class="grammar-tip">
          <span class="grammar-tip-icon">💡</span>
          The endings -e, -es, -e, and -ent are all silent! Only -ons and -ez are pronounced.
        </div>
      `;
    }
    return '<p>Pattern not found.</p>';
  }

  /**
   * Render articles reference
   */
  renderArticles() {
    return `
      <div class="page-section">
        <div class="page-section-title">Definite Articles (the)</div>
        <div class="articles-grid">
          <div class="article-card">
            <div class="article-card-title">Masculine</div>
            <div class="article-card-content">le</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Feminine</div>
            <div class="article-card-content">la</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Plural</div>
            <div class="article-card-content">les</div>
          </div>
        </div>
        <p style="font-size: 14px; color: var(--text-muted);">
          Before a vowel, both le and la become <strong>l'</strong> (l'ami, l'école)
        </p>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Indefinite Articles (a, an, some)</div>
        <div class="articles-grid">
          <div class="article-card">
            <div class="article-card-title">Masculine</div>
            <div class="article-card-content">un</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Feminine</div>
            <div class="article-card-content">une</div>
          </div>
          <div class="article-card">
            <div class="article-card-title">Plural</div>
            <div class="article-card-content">des</div>
          </div>
        </div>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Every French noun has a gender. You must memorize the gender along with the word!
      </div>
    `;
  }

  /**
   * Render gender reference
   */
  renderGender() {
    let mascHtml = '';
    let femHtml = '';
    
    if (typeof GRAMMAR !== 'undefined' && GRAMMAR.nouns) {
      // Show first 8 examples of each
      GRAMMAR.nouns.masculine.slice(0, 8).forEach(noun => {
        mascHtml += `
          <div class="gender-item">
            <span class="gender-french">le ${noun.french}</span>
            <span class="gender-english">${noun.english}</span>
          </div>
        `;
      });
      
      GRAMMAR.nouns.feminine.slice(0, 8).forEach(noun => {
        femHtml += `
          <div class="gender-item">
            <span class="gender-french">la ${noun.french}</span>
            <span class="gender-english">${noun.english}</span>
          </div>
        `;
      });
    }
    
    return `
      <div class="page-section">
        <div class="page-section-title">Examples by Gender</div>
        <div class="gender-list">
          <div class="gender-column masculine">
            <div class="gender-column-title">MASCULINE (le)</div>
            ${mascHtml}
          </div>
          <div class="gender-column feminine">
            <div class="gender-column-title">FEMININE (la)</div>
            ${femHtml}
          </div>
        </div>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Helpful Patterns</div>
        <p style="margin-bottom: 8px;"><strong>Usually Masculine:</strong> -age, -ment, -eau, -isme, -é</p>
        <p><strong>Usually Feminine:</strong> -tion, -sion, -té, -ure, -ette, -ille</p>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        These are patterns, not rules! There are exceptions, so always learn the article with the noun.
      </div>
    `;
  }

  /**
   * Render pronouns reference
   */
  renderPronouns() {
    let singularHtml = '';
    let pluralHtml = '';
    
    if (typeof GRAMMAR !== 'undefined' && GRAMMAR.pronouns) {
      GRAMMAR.pronouns.singular.forEach(p => {
        singularHtml += `
          <tr>
            <td class="form">${p.french}</td>
            <td>${p.english}</td>
            <td class="pronoun">${p.notes}</td>
          </tr>
        `;
      });
      
      GRAMMAR.pronouns.plural.forEach(p => {
        pluralHtml += `
          <tr>
            <td class="form">${p.french}</td>
            <td>${p.english}</td>
            <td class="pronoun">${p.notes}</td>
          </tr>
        `;
      });
    }
    
    return `
      <div class="page-section">
        <div class="page-section-title">Singular Pronouns</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${singularHtml}
          </tbody>
        </table>
      </div>
      
      <div class="page-section">
        <div class="page-section-title">Plural Pronouns</div>
        <table class="conjugation-table" style="max-width: 100%;">
          <thead>
            <tr>
              <th>French</th>
              <th>English</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${pluralHtml}
          </tbody>
        </table>
      </div>
      
      <div class="grammar-tip">
        <span class="grammar-tip-icon">💡</span>
        Use "tu" for friends and family, "vous" for strangers, elders, or to show respect.
      </div>
    `;
  }
}

// =====================================================
// Global Functions
// =====================================================

let spellbookManager = null;

function initSpellbook(gameState) {
  spellbookManager = new SpellbookManager(gameState);
}

function showSpellbook() {
  if (spellbookManager) {
    spellbookManager.show();
  }
}

function hideSpellbook() {
  if (spellbookManager) {
    spellbookManager.hide();
  }
}

function unlockSpellbookPages(pageIds) {
  if (spellbookManager) {
    const newPages = spellbookManager.unlockPages(pageIds);
    if (newPages.length > 0) {
      const pageNames = newPages.map(id => SPELLBOOK_PAGES[id]?.title || id).join(', ');
      if (typeof showNotification === 'function') {
        showNotification(`📖 Spellbook Updated: ${pageNames}`, 'success');
      }
    }
    return newPages;
  }
  return [];
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SPELLBOOK_PAGES,
    SPELLBOOK_CATEGORIES,
    SpellbookManager,
    initSpellbook,
    showSpellbook,
    hideSpellbook,
    unlockSpellbookPages
  };
}
