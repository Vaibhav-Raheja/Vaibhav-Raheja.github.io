/**
 * Dark Theme Toggle Script
 * Enables smooth switching between light and dark themes
 * with localStorage persistence
 */

(function() {
    'use strict';

    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const THEME_KEY = 'preferred-theme';

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem(THEME_KEY);

    // Apply saved theme on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        updateToggleIcon(true);
    }

    // Theme toggle button click handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isDark = body.classList.toggle('dark-theme');

            // Save preference to localStorage
            localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');

            // Update toggle button icon
            updateToggleIcon(isDark);

            // Add ripple effect on click
            createRipple(this, event);
        });
    }

    /**
     * Update the toggle button icon based on theme
     * @param {boolean} isDark - Whether dark theme is active
     */
    function updateToggleIcon(isDark) {
        const icon = themeToggleBtn.querySelector('i');
        if (icon) {
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    }

    /**
     * Create a ripple effect on button click
     * @param {HTMLElement} button - The button element
     * @param {Event} event - The click event
     */
    function createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Listen for system theme changes
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        darkModeQuery.addListener(function(e) {
            // Only auto-switch if user hasn't set a preference
            if (!localStorage.getItem(THEME_KEY)) {
                if (e.matches) {
                    body.classList.add('dark-theme');
                    updateToggleIcon(true);
                } else {
                    body.classList.remove('dark-theme');
                    updateToggleIcon(false);
                }
            }
        });
    }

    // Add keyboard shortcut (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            themeToggleBtn.click();
        }
    });

})();
