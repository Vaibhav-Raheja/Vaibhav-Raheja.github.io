// Quick Navigation Panel
// Handles the sidebar navigation and breadcrumb functionality

const QuickNav = {
	// Initialize quick navigation
	init: function() {
		this.setupToggle();
		this.setupBreadcrumbs();
		this.setupClickHandlers();
	},

	// Setup hamburger menu toggle
	setupToggle: function() {
		const toggle = document.getElementById('quick-nav-toggle');
		const nav = document.getElementById('quick-nav');

		if (!toggle || !nav) return;

		toggle.addEventListener('click', (e) => {
			e.stopPropagation();
			toggle.classList.toggle('open');
			nav.classList.toggle('open');
		});

		// Close nav when clicking outside
		document.addEventListener('click', (e) => {
			if (!nav.contains(e.target) && !toggle.contains(e.target)) {
				if (nav.classList.contains('open')) {
					toggle.classList.remove('open');
					nav.classList.remove('open');
				}
			}
		});

		// Close nav when clicking a nav item
		const navItems = nav.querySelectorAll('.quick-nav-item');
		navItems.forEach(item => {
			item.addEventListener('click', () => {
				if (window.innerWidth <= 768) {
					toggle.classList.remove('open');
					nav.classList.remove('open');
				}
			});
		});
	},

	// Setup breadcrumb navigation
	setupBreadcrumbs: function() {
		// This will be called when directory changes
		// Hide by default, show when navigating
		const breadcrumb = document.getElementById('breadcrumb-nav');
		if (breadcrumb) {
			breadcrumb.style.display = 'none';
		}
	},

	// Update breadcrumbs based on current path
	updateBreadcrumbs: function(path) {
		const breadcrumb = document.getElementById('breadcrumb-nav');
		const breadcrumbPath = document.getElementById('breadcrumb-path');

		if (!breadcrumb || !breadcrumbPath) return;

		// Show breadcrumb if not in home directory
		if (path === '/home/vaibhav' || path === '~') {
			breadcrumb.style.display = 'none';
			return;
		}

		breadcrumb.style.display = 'flex';

		// Parse path and create breadcrumb items
		const parts = path.replace('/home/vaibhav/', '').split('/').filter(p => p);

		if (parts.length === 0) {
			breadcrumb.style.display = 'none';
			return;
		}

		let breadcrumbHTML = '';
		let currentPath = '';

		parts.forEach((part, index) => {
			currentPath += '/' + part;
			const isLast = index === parts.length - 1;

			if (isLast) {
				breadcrumbHTML += `<span class="breadcrumb-item" style="color: var(--terminal-text); font-weight: bold;">${part}</span>`;
			} else {
				breadcrumbHTML += `
					<span class="breadcrumb-item" onclick="terminal.executeCommandFromClick('cd ${currentPath}'); return false;">
						${part}
					</span>
					<span class="breadcrumb-separator">›</span>
				`;
			}
		});

		breadcrumbPath.innerHTML = breadcrumbHTML;
	},

	// Setup click handlers for navigation items
	setupClickHandlers: function() {
		// All click handlers are already set up in the HTML
		// This is a placeholder for any additional functionality
	},

	// Show/hide quick nav programmatically
	toggle: function() {
		const toggle = document.getElementById('quick-nav-toggle');
		const nav = document.getElementById('quick-nav');

		if (toggle && nav) {
			toggle.classList.toggle('open');
			nav.classList.toggle('open');
		}
	},

	// Close quick nav
	close: function() {
		const toggle = document.getElementById('quick-nav-toggle');
		const nav = document.getElementById('quick-nav');

		if (toggle && nav) {
			toggle.classList.remove('open');
			nav.classList.remove('open');
		}
	}
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	QuickNav.init();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = QuickNav;
}
