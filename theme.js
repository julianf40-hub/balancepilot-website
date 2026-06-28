(function () {
  'use strict';

  var STORAGE_KEY = 'bp-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Sync all toggle buttons on the page
    document.querySelectorAll('.theme-opt').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.themeVal === theme ? 'true' : 'false');
    });
    // Update theme-color meta
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#FFFFFF' : '#09090B');
  }

  // Bind toggle buttons (called after DOM ready)
  function bindToggles() {
    document.querySelectorAll('.theme-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyTheme(btn.dataset.themeVal);
      });
    });
    // Sync initial pressed state
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    document.querySelectorAll('.theme-opt').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.themeVal === current ? 'true' : 'false');
    });
  }

  // Listen for OS-level preference changes (only if user hasn't manually overridden)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggles);
  } else {
    bindToggles();
  }
}());
