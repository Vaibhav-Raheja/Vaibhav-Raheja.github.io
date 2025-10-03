// Media Viewer / Lightbox
// Full-screen gallery for viewing project images and GIFs

const MediaViewer = {
	// State
	currentIndex: 0,
	mediaList: [],
	modal: null,
	isOpen: false,

	// Initialize
	init() {
		this.createModal();
		this.attachEventListeners();
	},

	// Create modal structure
	createModal() {
		const modal = document.createElement('div');
		modal.className = 'media-modal';
		modal.innerHTML = `
			<div class="media-modal-overlay"></div>
			<div class="media-modal-content">
				<div class="media-header">
					<span class="media-title">Media Viewer</span>
					<button class="media-close" aria-label="Close">✕</button>
				</div>
				<div class="media-body">
					<div class="media-loading">Loading...</div>
					<img src="" alt="" style="display: none;" />
				</div>
				<div class="media-controls">
					<button class="media-prev">◀ Previous</button>
					<span class="media-counter">1 / 1</span>
					<button class="media-download">⬇ Download</button>
					<button class="media-next">Next ▶</button>
				</div>
			</div>
			<button class="media-nav prev" aria-label="Previous">◀</button>
			<button class="media-nav next" aria-label="Next">▶</button>
		`;

		document.body.appendChild(modal);
		this.modal = modal;
	},

	// Attach event listeners
	attachEventListeners() {
		// Close button
		this.modal.querySelector('.media-close').addEventListener('click', () => this.close());

		// Overlay click to close
		this.modal.querySelector('.media-modal-overlay').addEventListener('click', () => this.close());

		// Navigation buttons
		this.modal.querySelector('.media-prev').addEventListener('click', () => this.prev());
		this.modal.querySelector('.media-next').addEventListener('click', () => this.next());
		this.modal.querySelector('.media-nav.prev').addEventListener('click', () => this.prev());
		this.modal.querySelector('.media-nav.next').addEventListener('click', () => this.next());

		// Download button
		this.modal.querySelector('.media-download').addEventListener('click', () => this.download());

		// Keyboard navigation
		document.addEventListener('keydown', (e) => {
			if (!this.isOpen) return;

			switch(e.key) {
				case 'Escape':
					this.close();
					break;
				case 'ArrowLeft':
					this.prev();
					break;
				case 'ArrowRight':
					this.next();
					break;
				case 'd':
				case 'D':
					this.download();
					break;
			}
		});

		// Touch swipe for mobile
		let touchStartX = 0;
		let touchEndX = 0;

		this.modal.querySelector('.media-body').addEventListener('touchstart', (e) => {
			touchStartX = e.changedTouches[0].screenX;
		}, { passive: true });

		this.modal.querySelector('.media-body').addEventListener('touchend', (e) => {
			touchEndX = e.changedTouches[0].screenX;
			this.handleSwipe();
		}, { passive: true });

		const handleSwipe = () => {
			if (touchEndX < touchStartX - 50) {
				this.next(); // Swipe left
			}
			if (touchEndX > touchStartX + 50) {
				this.prev(); // Swipe right
			}
		};
		this.handleSwipe = handleSwipe;
	},

	// Open viewer with media
	open(mediaPath, title, mediaList = null) {
		// If mediaList provided, use it for gallery mode
		if (mediaList && Array.isArray(mediaList)) {
			this.mediaList = mediaList;
			this.currentIndex = mediaList.findIndex(m => m.path === mediaPath);
			if (this.currentIndex === -1) this.currentIndex = 0;
		} else {
			// Single image mode
			this.mediaList = [{ path: mediaPath, name: title }];
			this.currentIndex = 0;
		}

		this.isOpen = true;
		this.modal.classList.add('active');
		this.loadMedia();

		// Add touch hint for mobile
		if (Utils.isMobile() && this.mediaList.length > 1) {
			this.showTouchHint();
		}

		// Log analytics
		if (typeof gtag !== 'undefined') {
			gtag('event', 'media_view', {
				'event_category': 'Media',
				'event_label': title
			});
		}
	},

	// Close viewer
	close() {
		this.isOpen = false;
		this.modal.classList.remove('active');
		this.mediaList = [];
		this.currentIndex = 0;

		// Clear image
		const img = this.modal.querySelector('.media-body img');
		img.style.display = 'none';
		img.src = '';

		// Focus back on terminal input
		if (window.terminal) {
			window.terminal.focusInput();
		}
	},

	// Load current media
	loadMedia() {
		const current = this.mediaList[this.currentIndex];
		if (!current) return;

		const img = this.modal.querySelector('.media-body img');
		const loading = this.modal.querySelector('.media-loading');
		const title = this.modal.querySelector('.media-title');
		const counter = this.modal.querySelector('.media-counter');

		// Update title
		title.textContent = current.name || 'Media Viewer';

		// Update counter
		counter.textContent = `${this.currentIndex + 1} / ${this.mediaList.length}`;

		// Show loading
		loading.style.display = 'block';
		img.style.display = 'none';

		// Load image
		img.onload = () => {
			loading.style.display = 'none';
			img.style.display = 'block';
		};

		img.onerror = () => {
			loading.textContent = 'Failed to load media';
			loading.style.color = 'var(--terminal-error)';
		};

		img.src = current.path;
		img.alt = current.name || 'Project media';

		// Update navigation button states
		this.updateNavButtons();
	},

	// Update navigation button states
	updateNavButtons() {
		const prevButtons = this.modal.querySelectorAll('.media-prev, .media-nav.prev');
		const nextButtons = this.modal.querySelectorAll('.media-next, .media-nav.next');

		// Disable prev on first item
		prevButtons.forEach(btn => {
			btn.disabled = this.currentIndex === 0;
		});

		// Disable next on last item
		nextButtons.forEach(btn => {
			btn.disabled = this.currentIndex === this.mediaList.length - 1;
		});

		// Hide nav arrows if only one item
		if (this.mediaList.length <= 1) {
			this.modal.querySelectorAll('.media-nav').forEach(btn => {
				btn.style.display = 'none';
			});
		} else {
			this.modal.querySelectorAll('.media-nav').forEach(btn => {
				btn.style.display = 'flex';
			});
		}
	},

	// Navigate to previous media
	prev() {
		if (this.currentIndex > 0) {
			this.currentIndex--;
			this.loadMedia();
		}
	},

	// Navigate to next media
	next() {
		if (this.currentIndex < this.mediaList.length - 1) {
			this.currentIndex++;
			this.loadMedia();
		}
	},

	// Download current media
	download() {
		const current = this.mediaList[this.currentIndex];
		if (!current) return;

		const link = document.createElement('a');
		link.href = current.path;
		link.download = current.name || 'download';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		// Show feedback
		if (window.terminal) {
			window.terminal.print(Utils.colors.green(`✓ Downloading ${current.name}...`));
		}
	},

	// Show touch hint for mobile users
	showTouchHint() {
		const hint = document.createElement('div');
		hint.className = 'touch-hint';
		hint.textContent = '← Swipe to navigate →';
		this.modal.querySelector('.media-modal-content').appendChild(hint);

		setTimeout(() => {
			hint.remove();
		}, 3000);
	},

	// Open gallery mode with all media in current directory
	openGallery() {
		const mediaFiles = FileSystem.getMediaFiles();

		if (mediaFiles.length === 0) {
			if (window.terminal) {
				window.terminal.printError('No media files in current directory');
			}
			return;
		}

		// Convert to media list format
		const mediaList = mediaFiles.map(file => ({
			path: file.mediaPath,
			name: file.name
		}));

		this.open(mediaList[0].path, mediaList[0].name, mediaList);

		if (window.terminal) {
			window.terminal.print(Utils.colors.green(`Opening gallery with ${mediaFiles.length} items...`));
		}
	},

	// View specific file
	viewFile(filename) {
		const file = FileSystem.getFile(filename);

		if (!file) {
			if (window.terminal) {
				window.terminal.printError(`File not found: ${filename}`);
			}
			return;
		}

		if (file.type !== 'media') {
			if (window.terminal) {
				window.terminal.printError(`Not a media file: ${filename}`);
			}
			return;
		}

		// Get all media in directory for gallery navigation
		const allMedia = FileSystem.getMediaFiles();
		const mediaList = allMedia.map(f => ({
			path: f.mediaPath,
			name: f.name
		}));

		this.open(file.path, filename, mediaList);
	}
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => MediaViewer.init());
} else {
	MediaViewer.init();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = MediaViewer;
}
