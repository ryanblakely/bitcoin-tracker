// Settings functionality - Dark mode only
(function() {
  const SETTINGS_KEY = 'bitcoin-tracker-settings';

  // Default settings
  const defaultSettings = {
    theme: 'light'
  };

  // Load settings from localStorage
  function loadSettings() {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (e) {
      return defaultSettings;
    }
  }

  // Save settings to localStorage
  function saveSettings(settings) {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  }

  // Apply settings
  function applySettings(settings) {
    // Apply theme
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }

    // Update theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeStatus = document.getElementById('theme-status');
    if (themeToggle && themeStatus) {
      themeToggle.checked = settings.theme === 'dark';
      themeStatus.textContent = settings.theme === 'dark' ? 'On' : 'Off';
    }
  }

  // Initialize on page load
  function init() {
    const settings = loadSettings();
    applySettings(settings);

    // Settings menu toggle
    document.querySelectorAll('.settings-container').forEach(container => {
      const settingsButton = container.querySelector('.settings-button');
      const settingsMenu = container.querySelector('.settings-menu');

      if (settingsButton && settingsMenu) {
        settingsButton.addEventListener('click', (e) => {
          e.stopPropagation();

          // Close all other menus first
          document.querySelectorAll('.settings-menu').forEach(menu => {
            if (menu !== settingsMenu) {
              menu.style.display = 'none';
            }
          });

          const isVisible = settingsMenu.style.display === 'block';
          settingsMenu.style.display = isVisible ? 'none' : 'block';
        });
      }
    });

    // Close all menus when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.settings-container')) {
        document.querySelectorAll('.settings-menu').forEach(menu => {
          menu.style.display = 'none';
        });
      }
    });

    // Theme toggle handling
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', (e) => {
        e.stopPropagation();
        settings.theme = themeToggle.checked ? 'dark' : 'light';
        saveSettings(settings);
        applySettings(settings);
      });
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
