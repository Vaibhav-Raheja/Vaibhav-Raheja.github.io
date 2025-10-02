// Utility Functions and ASCII Art
// Helper functions for terminal operations

const Utils = {
	// Color formatting for terminal output
	colors: {
		green: (text) => `<span style="color: var(--terminal-text);">${text}</span>`,
		error: (text) => `<span style="color: var(--terminal-error);">${text}</span>`,
		warning: (text) => `<span style="color: var(--terminal-warning);">${text}</span>`,
		link: (text, url) => `<a href="${url}" target="_blank" style="color: var(--terminal-link);">${text}</a>`,
		secondary: (text) => `<span style="color: var(--terminal-secondary);">${text}</span>`,
		bold: (text) => `<strong>${text}</strong>`,
		// Prompt colors - Terminator theme
		promptUser: (text) => `<span class="prompt-user">${text}</span>`,
		promptPath: (text) => `<span class="prompt-path">${text}</span>`,
		promptSymbol: (text) => `<span class="prompt-symbol">${text}</span>`,
		folder: (text) => `<span style="color: var(--terminal-folder);">${text}</span>`,
		file: (text) => `<span style="color: var(--terminal-file);">${text}</span>`,
		media: (text) => `<span style="color: var(--terminal-media);">${text}</span>`
	},

	// ASCII Art Collection
	ascii: {
		welcome: `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝`,

		tree: `
.
├── about/
│   ├── bio.txt
│   ├── skills.txt
│   └── interests.txt
├── education/
│   ├── masters.txt
│   └── bachelors.txt
├── experience/
│   ├── earthsense.txt
│   ├── uiuc.txt
│   └── aiims.txt
├── projects/
│   ├── igvc/
│   ├── slam/
│   ├── graic/
│   └── more...
└── contact/
    ├── email.txt
    ├── phone.txt
    └── social.txt`
	},

	// Format text with line breaks
	formatText: function(text, maxWidth = 80) {
		const words = text.split(' ');
		let lines = [];
		let currentLine = '';

		words.forEach(word => {
			if ((currentLine + word).length > maxWidth) {
				lines.push(currentLine.trim());
				currentLine = word + ' ';
			} else {
				currentLine += word + ' ';
			}
		});

		if (currentLine.trim()) {
			lines.push(currentLine.trim());
		}

		return lines.join('\n');
	},

	// Create a box around text
	createBox: function(content, title = '') {
		const lines = content.split('\n');
		const maxLength = Math.max(...lines.map(l => l.length), title.length);
		const width = maxLength + 4;

		let box = '╔' + '═'.repeat(width) + '╗\n';

		if (title) {
			const padding = Math.floor((width - title.length) / 2);
			box += '║' + ' '.repeat(padding) + title + ' '.repeat(width - padding - title.length) + '║\n';
			box += '╠' + '═'.repeat(width) + '╣\n';
		}

		lines.forEach(line => {
			box += '║ ' + line + ' '.repeat(width - line.length - 1) + '║\n';
		});

		box += '╚' + '═'.repeat(width) + '╝';
		return box;
	},

	// Create a table from data
	createTable: function(headers, rows) {
		const colWidths = headers.map((h, i) => {
			const maxRowLength = Math.max(...rows.map(r => String(r[i]).length));
			return Math.max(h.length, maxRowLength) + 2;
		});

		let table = '<div class="terminal-table-wrapper">\n';
		table += '<table class="terminal-table">\n';

		// Headers
		table += '<tr>';
		headers.forEach((h, i) => {
			table += `<th>${h}</th>`;
		});
		table += '</tr>\n';

		// Rows
		rows.forEach(row => {
			table += '<tr>';
			row.forEach((cell, i) => {
				table += `<td>${cell}</td>`;
			});
			table += '</tr>\n';
		});

		table += '</table>\n</div>';
		return table;
	},

	// Create a list with bullet points
	createList: function(items, numbered = false) {
		return items.map((item, i) => {
			const bullet = numbered ? `${i + 1}.` : '▸';
			return `${bullet} ${item}`;
		}).join('\n');
	},

	// Create a progress bar
	progressBar: function(percentage, width = 40) {
		const filled = Math.floor((percentage / 100) * width);
		const empty = width - filled;
		return `[${'█'.repeat(filled)}${'░'.repeat(empty)}] ${percentage}%`;
	},

	// Format date
	formatDate: function(date = new Date()) {
		return date.toLocaleString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	},

	// Sanitize HTML to prevent XSS
	sanitizeHTML: function(text) {
		const temp = document.createElement('div');
		temp.textContent = text;
		return temp.innerHTML;
	},

	// Parse command and arguments
	parseCommand: function(input) {
		const parts = input.trim().split(/\s+/);
		return {
			command: parts[0].toLowerCase(),
			args: parts.slice(1),
			fullArgs: parts.slice(1).join(' '),
			flags: parts.filter(p => p.startsWith('--')).map(f => f.substring(2))
		};
	},

	// Fuzzy match for command suggestions
	fuzzyMatch: function(input, commands) {
		input = input.toLowerCase();
		return commands.filter(cmd => {
			cmd = cmd.toLowerCase();
			return cmd.includes(input) || input.includes(cmd) ||
				   this.levenshteinDistance(input, cmd) <= 2;
		});
	},

	// Levenshtein distance for fuzzy matching
	levenshteinDistance: function(a, b) {
		const matrix = [];

		for (let i = 0; i <= b.length; i++) {
			matrix[i] = [i];
		}

		for (let j = 0; j <= a.length; j++) {
			matrix[0][j] = j;
		}

		for (let i = 1; i <= b.length; i++) {
			for (let j = 1; j <= a.length; j++) {
				if (b.charAt(i - 1) === a.charAt(j - 1)) {
					matrix[i][j] = matrix[i - 1][j - 1];
				} else {
					matrix[i][j] = Math.min(
						matrix[i - 1][j - 1] + 1,
						matrix[i][j - 1] + 1,
						matrix[i - 1][j] + 1
					);
				}
			}
		}

		return matrix[b.length][a.length];
	},

	// Generate random cow say text
	cowsay: function(message) {
		const length = message.length;
		const border = '-'.repeat(length + 2);

		return `
 ${border}
< ${message} >
 ${border}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
	},

	// Neofetch-style system info
	neofetch: function(data) {
		return `
${this.ascii.robot}

${this.colors.bold('Vaibhav Raheja')} @ ${this.colors.secondary('Portfolio')}
${'─'.repeat(50)}
${this.colors.warning('Role')}: ${data.personal.role}
${this.colors.warning('Location')}: ${data.personal.location}
${this.colors.warning('Education')}: ${data.education[0].degree}
${this.colors.warning('Experience')}: ${data.stats.yearsExperience} years
${this.colors.warning('Projects')}: ${data.stats.projectsCompleted}
${this.colors.warning('GitHub')}: ${data.contact.github}
${this.colors.warning('Coffee')}: ${data.stats.cupsOfCoffee}
${'─'.repeat(50)}
${this.colors.secondary('Type "help" for available commands')}`;
	},

	// Typing indicator
	typingIndicator: function() {
		return '<span class="loading"></span>';
	},

	// Split long text into chunks
	chunkText: function(text, chunkSize = 100) {
		const chunks = [];
		for (let i = 0; i < text.length; i += chunkSize) {
			chunks.push(text.substring(i, i + chunkSize));
		}
		return chunks;
	},

	// Format project for display
	formatProject: function(project, detailed = false) {
		let output = `\n${this.colors.warning(`[${project.id}]`)} ${this.colors.bold(project.name)}\n`;
		output += `${this.colors.secondary(project.description)}\n`;

		if (detailed) {
			output += `\n${this.colors.bold('Technologies')}: ${project.technologies.join(', ')}\n`;
			output += `${this.colors.bold('Category')}: ${project.category}\n`;
			output += `${this.colors.bold('Year')}: ${project.year}\n`;
			output += `${this.colors.bold('Status')}: ${project.status}\n`;

			if (project.achievements.length > 0) {
				output += `\n${this.colors.bold('Achievements')}:\n`;
				output += this.createList(project.achievements);
			}

			if (project.github) {
				output += `\n\n${this.colors.bold('GitHub')}: ${this.colors.link(project.github, project.github)}`;
			}
		} else {
			output += `${this.colors.secondary('Tech')}: ${project.technologies.slice(0, 3).join(', ')}`;
		}

		return output;
	},

	// Format experience for display
	formatExperience: function(exp, detailed = false) {
		let output = `\n${this.colors.bold(exp.role)} @ ${this.colors.warning(exp.company)}\n`;
		output += `${this.colors.secondary(exp.period + ' | ' + exp.location)}\n`;

		if (detailed) {
			output += `\n${this.createList(exp.achievements)}`;
			output += `\n\n${this.colors.secondary('Technologies')}: ${exp.technologies.join(', ')}`;
		}

		return output;
	},

	// Mobile detection
	isMobile: function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	},

	// Copy to clipboard
	copyToClipboard: function(text) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(text);
			return true;
		}
		return false;
	},

	// Local storage helpers
	storage: {
		set: function(key, value) {
			try {
				localStorage.setItem(key, JSON.stringify(value));
				return true;
			} catch (e) {
				return false;
			}
		},
		get: function(key) {
			try {
				return JSON.parse(localStorage.getItem(key));
			} catch (e) {
				return null;
			}
		},
		remove: function(key) {
			try {
				localStorage.removeItem(key);
				return true;
			} catch (e) {
				return false;
			}
		}
	},

	// Easter egg messages
	easterEggs: {
		sudo: "Nice try! This portfolio runs with maximum privileges already. 😎",
		hack: "Mr. Robot called, he wants his terminal back. 🤖",
		coffee: "☕ Coffee.exe is already running in background...",
		matrix: "Initiating Matrix mode...",
		vim: "You can check out any time you like, but you can never leave... wait, wrong reference.",
		konami: "↑ ↑ ↓ ↓ ← → ← → B A - Achievement Unlocked! 🎮"
	}
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Utils;
}
