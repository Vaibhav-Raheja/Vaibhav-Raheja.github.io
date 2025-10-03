// Animation Effects for Terminal
// Typing effects, transitions, and visual enhancements

const Animations = {
	// Configuration
	config: {
		typingSpeed: 5,         // milliseconds per character (fast for better UX)
		fastTypingSpeed: 2,     // fast typing speed
		lineDelay: 20,          // delay between lines (reduced for speed)
		canSkip: true           // allow skipping animations
	},

	// Current animation state
	state: {
		isAnimating: false,
		currentAnimation: null,
		skipRequested: false
	},

	// Type out text with animation
	typeText: async function(text, speed = null) {
		speed = speed || this.config.typingSpeed;
		const chars = text.split('');
		let output = '';

		for (let i = 0; i < chars.length; i++) {
			if (this.state.skipRequested) {
				return text; // Return full text immediately
			}

			output += chars[i];
			await this.sleep(speed);
		}

		return output;
	},

	// Type multiple lines with delays
	typeLines: async function(lines, container, speed = null) {
		this.state.isAnimating = true;
		this.state.skipRequested = false;

		for (let line of lines) {
			if (this.state.skipRequested) {
				// If skip requested, show all remaining lines immediately
				lines.slice(lines.indexOf(line)).forEach(l => {
					const div = document.createElement('div');
					div.className = 'output-line';
					div.innerHTML = l;
					container.appendChild(div);
				});
				break;
			}

			const div = document.createElement('div');
			div.className = 'output-line';
			container.appendChild(div);

			// Type out the line
			const typedText = await this.typeText(line, speed);
			div.innerHTML = typedText;

			// Delay before next line
			await this.sleep(this.config.lineDelay);
		}

		this.state.isAnimating = false;
		this.state.skipRequested = false;
	},

	// Instant output (no animation)
	instantOutput: function(lines, container) {
		lines.forEach(line => {
			const div = document.createElement('div');
			div.className = 'output-line';
			div.innerHTML = line;
			container.appendChild(div);
		});
	},

	// Sleep utility
	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},

	// Skip current animation
	skip: function() {
		if (this.state.isAnimating) {
			this.state.skipRequested = true;
		}
	},

	// Matrix rain effect (easter egg)
	matrixRain: function(duration = 5000) {
		const canvas = document.createElement('canvas');
		canvas.className = 'matrix-canvas';
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		document.body.appendChild(canvas);

		const ctx = canvas.getContext('2d');
		const columns = Math.floor(canvas.width / 20);
		const drops = Array(columns).fill(1);

		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

		let animationId;
		const draw = () => {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = '#0F0';
			ctx.font = '15px monospace';

			for (let i = 0; i < drops.length; i++) {
				const text = chars[Math.floor(Math.random() * chars.length)];
				ctx.fillText(text, i * 20, drops[i] * 20);

				if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}

			animationId = requestAnimationFrame(draw);
		};

		draw();

		// Stop after duration
		setTimeout(() => {
			cancelAnimationFrame(animationId);
			canvas.remove();
		}, duration);
	},

	// Fade in effect
	fadeIn: function(element, duration = 300) {
		element.style.opacity = 0;
		element.style.display = 'block';

		let start = null;
		const animate = (timestamp) => {
			if (!start) start = timestamp;
			const progress = timestamp - start;
			element.style.opacity = Math.min(progress / duration, 1);

			if (progress < duration) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	},

	// Slide in from bottom
	slideIn: function(element, duration = 300) {
		element.style.transform = 'translateY(20px)';
		element.style.opacity = 0;

		let start = null;
		const animate = (timestamp) => {
			if (!start) start = timestamp;
			const progress = timestamp - start;
			const percentage = Math.min(progress / duration, 1);

			element.style.transform = `translateY(${20 * (1 - percentage)}px)`;
			element.style.opacity = percentage;

			if (progress < duration) {
				requestAnimationFrame(animate);
			}
		};

		requestAnimationFrame(animate);
	},

	// Glitch effect
	glitchText: function(element, duration = 1000) {
		const originalText = element.textContent;
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
		let iterations = 0;
		const maxIterations = duration / 50;

		const interval = setInterval(() => {
			element.textContent = originalText
				.split('')
				.map((char, index) => {
					if (index < iterations) {
						return originalText[index];
					}
					return chars[Math.floor(Math.random() * chars.length)];
				})
				.join('');

			iterations += 1 / 3;

			if (iterations >= originalText.length) {
				clearInterval(interval);
				element.textContent = originalText;
			}
		}, 50);
	},

	// Cursor blink animation
	cursorBlink: function(element) {
		setInterval(() => {
			element.style.opacity = element.style.opacity === '0' ? '1' : '0';
		}, 530);
	},

	// Progress bar animation
	animateProgressBar: function(container, targetPercentage, duration = 2000) {
		const width = 40;
		let currentPercentage = 0;
		const increment = targetPercentage / (duration / 50);

		const interval = setInterval(() => {
			currentPercentage = Math.min(currentPercentage + increment, targetPercentage);
			const filled = Math.floor((currentPercentage / 100) * width);
			const empty = width - filled;

			container.innerHTML = `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${Math.floor(currentPercentage)}%`;

			if (currentPercentage >= targetPercentage) {
				clearInterval(interval);
			}
		}, 50);
	},

	// Shake animation
	shake: function(element, duration = 500) {
		const originalPosition = element.style.transform;
		let start = null;
		const amplitude = 5;

		const animate = (timestamp) => {
			if (!start) start = timestamp;
			const progress = timestamp - start;

			if (progress < duration) {
				const offset = Math.sin(progress / 50) * amplitude;
				element.style.transform = `translateX(${offset}px)`;
				requestAnimationFrame(animate);
			} else {
				element.style.transform = originalPosition;
			}
		};

		requestAnimationFrame(animate);
	},

	// Pulse animation
	pulse: function(element, duration = 1000) {
		element.style.animation = `pulse ${duration}ms ease-in-out`;
		setTimeout(() => {
			element.style.animation = '';
		}, duration);
	},

	// Scramble text effect
	scrambleText: function(element, newText, duration = 1000) {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const startText = element.textContent;
		const maxLength = Math.max(startText.length, newText.length);
		let frame = 0;
		const totalFrames = duration / 30;

		const interval = setInterval(() => {
			frame++;
			const progress = frame / totalFrames;

			element.textContent = newText
				.split('')
				.map((char, i) => {
					if (progress * newText.length > i) {
						return newText[i];
					}
					return chars[Math.floor(Math.random() * chars.length)];
				})
				.join('');

			if (frame >= totalFrames) {
				clearInterval(interval);
				element.textContent = newText;
			}
		}, 30);
	},

	// Confetti effect (for achievements)
	confetti: function(duration = 3000) {
		const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
		const confettiCount = 50;
		const container = document.createElement('div');
		container.style.cssText = `
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			z-index: 9999;
		`;
		document.body.appendChild(container);

		for (let i = 0; i < confettiCount; i++) {
			const confetti = document.createElement('div');
			confetti.style.cssText = `
				position: absolute;
				width: 10px;
				height: 10px;
				background: ${colors[Math.floor(Math.random() * colors.length)]};
				left: ${Math.random() * 100}%;
				top: -10px;
				transform: rotate(${Math.random() * 360}deg);
				animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
			`;
			container.appendChild(confetti);
		}

		// Add CSS animation
		if (!document.getElementById('confetti-style')) {
			const style = document.createElement('style');
			style.id = 'confetti-style';
			style.textContent = `
				@keyframes confetti-fall {
					to {
						transform: translateY(100vh) rotate(720deg);
						opacity: 0;
					}
				}
			`;
			document.head.appendChild(style);
		}

		setTimeout(() => {
			container.remove();
		}, duration);
	},

	// Boot sequence animation
	bootSequence: async function(container) {
		const bootMessages = [
			'[  OK  ] Starting Terminal Interface...',
			'[  OK  ] Loading Portfolio Data...',
			'[  OK  ] Initializing Command Parser...',
			'[  OK  ] Mounting File Systems...',
			'[  OK  ] Starting Network Services...',
			'[  OK  ] Loading User Profile: Vaibhav Raheja',
			'[  OK  ] Portfolio System Ready!',
			''
		];

		for (let msg of bootMessages) {
			const div = document.createElement('div');
			div.className = 'output-line success';
			div.textContent = msg;
			container.appendChild(div);
			await this.sleep(100);
			this.scrollToBottom();
		}
	},

	// Scroll to bottom smoothly
	scrollToBottom: function() {
		const terminal = document.querySelector('.terminal-body');
		if (terminal) {
			terminal.scrollTop = terminal.scrollHeight;
		}
	},

	// Loading spinner
	showLoading: function(container, message = 'Loading...') {
		const div = document.createElement('div');
		div.className = 'output-line';
		div.innerHTML = `${message}<span class="loading"></span>`;
		container.appendChild(div);
		return div;
	},

	// Remove loading spinner
	removeLoading: function(element) {
		if (element && element.parentNode) {
			element.parentNode.removeChild(element);
		}
	}
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Animations;
}
