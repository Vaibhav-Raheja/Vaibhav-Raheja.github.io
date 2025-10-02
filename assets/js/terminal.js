// Terminal Core Engine
// Main terminal functionality, input handling, and command execution

class Terminal {
	constructor() {
		this.output = document.getElementById('terminal-output');
		this.input = document.getElementById('terminal-input');
		this.inputArea = document.querySelector('.terminal-input-area');

		// Command history
		this.history = Utils.storage.get('terminalHistory') || [];
		this.historyIndex = -1;
		this.currentInput = '';

		// Auto-suggest
		this.suggestContainer = null;
		this.suggestIndex = -1;

		// State
		this.isProcessing = false;
		this.prompt = `${portfolioData.personal.username}@${portfolioData.personal.hostname}:~$`;

		this.initialize();
	}

	initialize() {
		// Set up event listeners
		this.setupEventListeners();

		// Show welcome screen
		this.showWelcome();

		// Focus on input
		this.focusInput();

		// Mobile optimizations
		if (Utils.isMobile()) {
			this.setupMobile();
		}
	}

	setupEventListeners() {
		// Input keydown
		this.input.addEventListener('keydown', (e) => this.handleKeyDown(e));

		// Input change for auto-suggest
		this.input.addEventListener('input', () => this.handleInput());

		// Click anywhere to focus
		document.addEventListener('click', () => this.focusInput());

		// Skip animation on any key press
		document.addEventListener('keydown', () => {
			if (Animations.state.isAnimating) {
				Animations.skip();
			}
		});

		// Window resize
		window.addEventListener('resize', () => this.handleResize());
	}

	handleKeyDown(e) {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				this.handleCommand();
				break;

			case 'ArrowUp':
				e.preventDefault();
				this.navigateHistory('up');
				break;

			case 'ArrowDown':
				e.preventDefault();
				this.navigateHistory('down');
				break;

			case 'Tab':
				e.preventDefault();
				this.handleTab();
				break;

			case 'Escape':
				e.preventDefault();
				this.hideSuggestions();
				break;

			case 'l':
				if (e.ctrlKey) {
					e.preventDefault();
					this.clearScreen();
				}
				break;

			case 'c':
				if (e.ctrlKey) {
					e.preventDefault();
					this.cancelCommand();
				}
				break;
		}
	}

	handleInput() {
		// Hide suggestions when input changes (user is still typing)
		// Suggestions will be shown on Tab key press instead
		this.hideSuggestions();
	}

	async handleCommand() {
		const commandText = this.input.value.trim();

		if (!commandText) {
			this.addPrompt();
			return;
		}

		// Add command to output
		this.addCommandLine(commandText);

		// Clear input
		this.input.value = '';
		this.hideSuggestions();

		// Add to history
		if (commandText !== this.history[this.history.length - 1]) {
			this.history.push(commandText);
			Utils.storage.set('terminalHistory', this.history);
		}
		this.historyIndex = -1;

		// Process command
		this.isProcessing = true;
		await this.executeCommand(commandText);
		this.isProcessing = false;

		// Add new prompt
		this.addPrompt();

		// Scroll to bottom (use setTimeout to ensure DOM is updated)
		setTimeout(() => {
			Animations.scrollToBottom();
		}, 50);
	}

	async executeCommand(commandText) {
		const parsed = Utils.parseCommand(commandText);
		const cmd = parsed.command;

		// Check if command exists
		if (Commands[cmd]) {
			try {
				await Commands[cmd](parsed.args, parsed.flags, this);
			} catch (error) {
				this.printError(`Error executing command: ${error.message}`);
			}
		} else {
			// Command not found
			this.printError(`Command not found: ${cmd}`);
			this.print(`Type 'help' for available commands.`);

			// Suggest similar commands
			const similar = Utils.fuzzyMatch(cmd, Object.keys(Commands));
			if (similar.length > 0) {
				this.print(`\nDid you mean: ${similar.slice(0, 3).join(', ')}?`, 'info');
			}
		}
	}

	navigateHistory(direction) {
		if (this.history.length === 0) return;

		if (direction === 'up') {
			if (this.historyIndex === -1) {
				this.currentInput = this.input.value;
				this.historyIndex = this.history.length - 1;
			} else if (this.historyIndex > 0) {
				this.historyIndex--;
			}
			this.input.value = this.history[this.historyIndex];
		} else if (direction === 'down') {
			if (this.historyIndex === -1) return;

			this.historyIndex++;
			if (this.historyIndex >= this.history.length) {
				this.historyIndex = -1;
				this.input.value = this.currentInput;
			} else {
				this.input.value = this.history[this.historyIndex];
			}
		}
	}

	handleTab() {
		const value = this.input.value.trim();
		const suggestions = this.getSuggestions(value);

		if (suggestions.length === 0) {
			return;
		}

		if (suggestions.length === 1) {
			// Single match - autocomplete it
			this.input.value = suggestions[0];
			this.hideSuggestions();
		} else {
			// Multiple matches - autocomplete to common prefix only (no dropdown)
			const commonPrefix = this.getCommonPrefix(suggestions);
			if (commonPrefix.length > value.length) {
				this.input.value = commonPrefix;
			}
			// Don't show suggestions dropdown
			this.hideSuggestions();
		}
	}

	getCommonPrefix(strings) {
		if (strings.length === 0) return '';
		if (strings.length === 1) return strings[0];

		let prefix = strings[0];
		for (let i = 1; i < strings.length; i++) {
			while (strings[i].indexOf(prefix) !== 0) {
				prefix = prefix.substring(0, prefix.length - 1);
				if (prefix === '') return '';
			}
		}
		return prefix;
	}

	getSuggestions(input) {
		const commands = Object.keys(Commands);
		return Utils.fuzzyMatch(input, commands);
	}

	showSuggestions(input) {
		const suggestions = this.getSuggestions(input);

		if (suggestions.length === 0) {
			this.hideSuggestions();
			return;
		}

		if (!this.suggestContainer) {
			this.suggestContainer = document.createElement('div');
			this.suggestContainer.className = 'auto-suggest';
			this.inputArea.parentNode.insertBefore(this.suggestContainer, this.inputArea);
		}

		this.suggestContainer.innerHTML = '';
		suggestions.slice(0, 5).forEach((cmd, index) => {
			const item = document.createElement('div');
			item.className = 'auto-suggest-item';
			if (index === 0) item.classList.add('selected');
			item.textContent = cmd;
			item.addEventListener('click', () => {
				this.input.value = cmd;
				this.hideSuggestions();
				this.focusInput();
			});
			this.suggestContainer.appendChild(item);
		});
	}

	hideSuggestions() {
		if (this.suggestContainer) {
			this.suggestContainer.remove();
			this.suggestContainer = null;
		}
		this.suggestIndex = -1;
	}

	// Output methods
	addCommandLine(text) {
		const line = document.createElement('div');
		line.className = 'command-line';
		line.innerHTML = `<span class="prompt">${this.getColoredPrompt()}</span><span class="command-text">${Utils.sanitizeHTML(text)}</span>`;
		this.output.appendChild(line);
	}

	addPrompt() {
		const inputPrompt = this.inputArea.querySelector('.input-prompt');
		inputPrompt.innerHTML = this.getColoredPrompt();
	}

	// Generate colored prompt with Terminator theme colors
	getColoredPrompt() {
		const username = portfolioData.personal.username;
		const hostname = portfolioData.personal.hostname;
		const path = FileSystem.getShortPath();

		return `${Utils.colors.promptUser(username + '@' + hostname)}${Utils.colors.promptSymbol(':')}${Utils.colors.promptPath(path)}${Utils.colors.promptSymbol('$')} `;
	}

	print(text, type = 'success') {
		const div = document.createElement('div');
		div.className = `output-line ${type}`;
		div.innerHTML = text;
		this.output.appendChild(div);
		return div;
	}

	printError(text) {
		return this.print(Utils.colors.error(text), 'error');
	}

	printWarning(text) {
		return this.print(Utils.colors.warning(text), 'warning');
	}

	printSuccess(text) {
		return this.print(Utils.colors.green(text), 'success');
	}

	printInfo(text) {
		return this.print(Utils.colors.secondary(text), 'info');
	}

	async printWithAnimation(lines, speed = null) {
		await Animations.typeLines(lines, this.output, speed);
		Animations.scrollToBottom();
	}

	clearScreen() {
		this.output.innerHTML = '';
		this.addPrompt();
	}

	cancelCommand() {
		this.input.value = '';
		this.hideSuggestions();
		this.print('^C', 'info');
		this.addPrompt();
	}

	focusInput() {
		this.input.focus();
	}

	handleResize() {
		Animations.scrollToBottom();
	}

	setupMobile() {
		// Add mobile-specific classes
		document.body.classList.add('mobile');

		// Adjust font sizes
		document.documentElement.style.fontSize = '14px';

		// Add touch event for input focus
		this.output.addEventListener('touchstart', () => {
			this.focusInput();
		});

		// Virtual keyboard handling
		this.input.setAttribute('autocomplete', 'off');
		this.input.setAttribute('autocorrect', 'off');
		this.input.setAttribute('autocapitalize', 'off');
		this.input.setAttribute('spellcheck', 'false');
	}

	// Welcome screen
	async showWelcome() {
		// Calculate dynamic width based on screen size
		const maxWidth = Math.min(Math.floor(window.innerWidth / 12), 80);

		// Show welcome instantly (no typing animation)
		const welcomeLines = [
			'',
			Utils.colors.bold('═'.repeat(maxWidth)),
			Utils.colors.bold('VAIBHAV RAHEJA') + ' @ ' + Utils.colors.secondary('Portfolio'),
			Utils.colors.bold('═'.repeat(maxWidth)),
			Utils.colors.warning('Role') + ': ' + portfolioData.personal.role,
			Utils.colors.warning('Location') + ': ' + portfolioData.personal.location,
			Utils.colors.warning('Education') + ': ' + portfolioData.education[0].degree,
			Utils.colors.warning('Experience') + ': ' + portfolioData.stats.yearsExperience + ' years',
			Utils.colors.warning('Projects') + ': ' + portfolioData.stats.projectsCompleted,
			Utils.colors.warning('Coffee') + ': ' + portfolioData.stats.cupsOfCoffee,
			Utils.colors.bold('═'.repeat(maxWidth)),
			'',
			Utils.colors.secondary('Links:'),
			Utils.colors.secondary('Resume: ') + Utils.colors.link('[Download PDF]', portfolioData.contact.resume),
			Utils.colors.secondary('Email: ') + Utils.colors.link(portfolioData.contact.email[0], 'mailto:' + portfolioData.contact.email[0]),
			Utils.colors.secondary('GitHub: ') + Utils.colors.link('github.com/vaibhav-raheja', 'https://github.com/vaibhav-raheja'),
			Utils.colors.secondary('LinkedIn: ') + Utils.colors.link('linkedin.com/in/vaibhav-raheja', 'https://www.linkedin.com/in/vaibhav-raheja/'),
			Utils.colors.secondary('Medium: ') + Utils.colors.link('medium.com/@vaibhavraheja32', 'https://medium.com/@vaibhavraheja32'),
			'',
			Utils.colors.secondary('Type ') + Utils.colors.warning('help') + Utils.colors.secondary(' for available commands'),
			Utils.colors.secondary('Type ') + Utils.colors.warning('about') + Utils.colors.secondary(' to learn more about me'),
			''
		];

		// Display instantly
		welcomeLines.forEach(line => {
			this.print(line);
		});

		// Auto-run ls to show directory contents
		this.print(Utils.colors.secondary('─'.repeat(maxWidth)));
		this.print('');
		this.addCommandLine('ls');
		await Commands.ls([], [], this);
		this.print('');

		this.addPrompt();
	}

	// Update terminal title with current directory
	updateTitle() {
		const titleElement = document.querySelector('.terminal-title');
		if (titleElement) {
			const shortPath = FileSystem.getShortPath();
			titleElement.textContent = `${portfolioData.personal.username}@${portfolioData.personal.hostname}: ${shortPath}`;
		}

		// Update input prompt
		const shortPath = FileSystem.getShortPath();
		this.prompt = `${portfolioData.personal.username}@${portfolioData.personal.hostname}:${shortPath}$`;
		const inputPrompt = document.querySelector('.input-prompt');
		if (inputPrompt) {
			inputPrompt.innerHTML = this.getColoredPrompt();
		}

		// Update breadcrumbs
		if (typeof QuickNav !== 'undefined') {
			QuickNav.updateBreadcrumbs(FileSystem.pwd());
		}
	}

	// Execute command from clickable link
	async executeCommandFromClick(commandText) {
		// Add command to output
		this.addCommandLine(commandText);

		// Add to history
		if (commandText !== this.history[this.history.length - 1]) {
			this.history.push(commandText);
			Utils.storage.set('terminalHistory', this.history);
		}

		// Process command
		this.isProcessing = true;
		await this.executeCommand(commandText);
		this.isProcessing = false;

		// Add new prompt
		this.addPrompt();

		// Scroll to bottom (use setTimeout to ensure DOM is updated)
		setTimeout(() => {
			Animations.scrollToBottom();
		}, 50);
	}
}

// Initialize terminal when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
	// Create global terminal instance
	window.terminal = new Terminal();

	// Add window controls functionality
	const closeBtn = document.querySelector('.terminal-button.close');
	const minimizeBtn = document.querySelector('.terminal-button.minimize');
	const maximizeBtn = document.querySelector('.terminal-button.maximize');

	if (closeBtn) {
		closeBtn.addEventListener('click', () => {
			if (confirm('Close terminal? This will refresh the page.')) {
				location.reload();
			}
		});
	}

	if (minimizeBtn) {
		minimizeBtn.addEventListener('click', () => {
			const terminalBody = document.querySelector('.terminal-body');
			terminalBody.style.display = terminalBody.style.display === 'none' ? 'block' : 'none';
		});
	}

	if (maximizeBtn) {
		maximizeBtn.addEventListener('click', () => {
			const terminalWindow = document.querySelector('.terminal-window');
			terminalWindow.classList.toggle('maximized');

			if (terminalWindow.classList.contains('maximized')) {
				terminalWindow.style.width = '100%';
				terminalWindow.style.height = '100vh';
				terminalWindow.style.borderRadius = '0';
			} else {
				terminalWindow.style.width = '';
				terminalWindow.style.height = '';
				terminalWindow.style.borderRadius = '';
			}
		});
	}

	// Konami code easter egg
	let konamiCode = [];
	const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

	document.addEventListener('keydown', (e) => {
		konamiCode.push(e.key);
		konamiCode = konamiCode.slice(-10);

		if (konamiCode.join(',') === konamiSequence.join(',')) {
			terminal.printSuccess(Utils.easterEggs.konami);
			Animations.confetti(3000);
			konamiCode = [];
		}
	});
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Terminal;
}
