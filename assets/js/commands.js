// Command Implementations
// All available terminal commands

const Commands = {
	// Help command - show all available commands
	help: async function(args, flags, terminal) {
		const helpText = [
			Utils.colors.bold('Available Commands:'),
			'',
			Utils.colors.warning('Navigation:'),
			'  help              - Show this help message',
			'  about             - Learn about me',
			'  education         - View education history',
			'  experience        - View work experience',
			'  projects          - Explore my projects',
			'  skills            - See technical skills',
			'  contact           - Get contact information',
			'  resume            - View/download resume',
			'  social            - Social media links',
			'',
			Utils.colors.warning('System:'),
			'  clear             - Clear terminal screen',
			'  history           - Show command history',
			'  whoami            - Display current user',
			'  date              - Show current date/time',
			'  neofetch          - Display system info',
			'',
			Utils.colors.warning('Fun Commands:'),
			'  ls                - List portfolio sections',
			'  pwd               - Print working directory',
			'  tree              - Show portfolio structure',
			'  cowsay [message]  - Make a cow say something',
			'  matrix            - Matrix rain animation',
			'  sudo [command]    - Run with superuser privileges (joke)',
			'',
			Utils.colors.secondary('Tip: Use Tab for autocomplete, ↑↓ for history'),
			Utils.colors.secondary('Tip: Press any key to skip typing animations')
		];

		await terminal.printWithAnimation(helpText, Animations.config.fastTypingSpeed);
	},

	// About command
	about: async function(args, flags, terminal) {
		const lines = [
			Utils.ascii.banner,
			'',
			Utils.colors.bold('About Me'),
			'═'.repeat(50),
			'',
			Utils.formatText(portfolioData.personal.bio),
			'',
			Utils.colors.warning('Current Focus:'),
			'  • Autonomous Navigation Systems',
			'  • Computer Vision & Perception',
			'  • Robot Control & Planning',
			'  • Machine Learning for Robotics',
			'',
			Utils.colors.secondary('Type "experience" to see my work history'),
			Utils.colors.secondary('Type "projects" to explore my projects')
		];

		lines.forEach(line => terminal.print(line));
	},

	// Education command
	education: async function(args, flags, terminal) {
		const lines = [
			Utils.colors.bold('Education'),
			'═'.repeat(50),
			''
		];

		portfolioData.education.forEach((edu, index) => {
			lines.push(Utils.colors.warning(`[${index + 1}] ${edu.degree}`));
			lines.push(`    ${edu.institution}`);
			lines.push(`    ${edu.location} | ${edu.year}`);
			edu.highlights.forEach(h => {
				lines.push(`    ▸ ${h}`);
			});
			if (index < portfolioData.education.length - 1) {
				lines.push('');
			}
		});

		lines.forEach(line => terminal.print(line));
	},

	// Experience command
	experience: async function(args, flags, terminal) {
		// Filter by company if specified
		let experiences = portfolioData.experience;

		if (args.length > 0) {
			const searchTerm = args.join(' ').toLowerCase();
			experiences = experiences.filter(exp =>
				exp.company.toLowerCase().includes(searchTerm)
			);

			if (experiences.length === 0) {
				terminal.printError(`No experience found matching: ${searchTerm}`);
				return;
			}
		}

		const lines = [
			Utils.colors.bold('Work Experience'),
			'═'.repeat(50),
			''
		];

		if (flags.includes('timeline')) {
			// Show as timeline
			experiences.forEach(exp => {
				lines.push(`<div class="timeline-item">`);
				lines.push(`  <div class="timeline-date">${exp.period}</div>`);
				lines.push(`  <div class="timeline-company">${exp.company}</div>`);
				lines.push(`  <div class="timeline-role">${exp.role}</div>`);
				lines.push(`  <div class="timeline-desc">${exp.location}</div>`);
				lines.push(`</div>`);
			});
		} else {
			// Show as list
			experiences.forEach((exp, index) => {
				lines.push(...Utils.formatExperience(exp, true).split('\n'));
				if (index < experiences.length - 1) {
					lines.push('');
					lines.push('─'.repeat(50));
					lines.push('');
				}
			});
		}

		lines.push('');
		lines.push(Utils.colors.secondary('Use "experience --timeline" for timeline view'));
		lines.push(Utils.colors.secondary('Use "experience [company]" to filter by company'));

		lines.forEach(line => terminal.print(line));
	},

	// Projects command
	projects: async function(args, flags, terminal) {
		// Simulate cd to projects directory
		await this.cd(['projects'], flags, terminal);
	},

	// Skills command
	skills: async function(args, flags, terminal) {
		const lines = [
			Utils.colors.bold('Technical Skills'),
			'',
			Utils.colors.warning('Programming Languages:'),
			'  ' + portfolioData.skills.languages.join(' • '),
			'',
			Utils.colors.warning('Frameworks & Libraries:'),
			'  ' + portfolioData.skills.frameworks.join(' • '),
			'',
			Utils.colors.warning('Robotics:'),
			'  ' + portfolioData.skills.robotics.join(' • '),
			'',
			Utils.colors.warning('Machine Learning:'),
			'  ' + portfolioData.skills.ml.join(' • '),
			'',
			Utils.colors.warning('Tools & Platforms:'),
			'  ' + portfolioData.skills.tools.join(' • '),
			'',
			Utils.colors.warning('Hardware:'),
			'  ' + portfolioData.skills.hardware.join(' • ')
		];

		lines.forEach(line => terminal.print(line));
	},

	// Contact command
	contact: async function(args, flags, terminal) {
		const lines = [
			Utils.colors.bold('Contact Information'),
			'═'.repeat(50),
			'',
			Utils.colors.warning('Email:'),
			'  • ' + Utils.colors.link(portfolioData.contact.email[0], `mailto:${portfolioData.contact.email[0]}`),
			'  • ' + Utils.colors.link(portfolioData.contact.email[1], `mailto:${portfolioData.contact.email[1]}`),
			'',
			Utils.colors.warning('Phone:'),
			'  ' + portfolioData.contact.phone,
			'',
			Utils.colors.warning('Location:'),
			'  ' + portfolioData.contact.location,
			'',
			Utils.colors.warning('Online:'),
			'  GitHub:   ' + Utils.colors.link(portfolioData.contact.github, `https://${portfolioData.contact.github}`),
			'  LinkedIn: ' + Utils.colors.link(portfolioData.contact.linkedin, `https://${portfolioData.contact.linkedin}`),
			'',
			Utils.colors.secondary('Type "social" for all social links'),
			Utils.colors.secondary('Type "resume" to view/download my resume')
		];

		lines.forEach(line => terminal.print(line));
	},

	// Social command
	social: async function(args, flags, terminal) {
		const lines = [
			Utils.colors.bold('Social Media'),
			'═'.repeat(50),
			''
		];

		portfolioData.social.forEach(social => {
			lines.push(`${social.name.padEnd(12)} ${Utils.colors.link(social.username, social.url)}`);
		});

		lines.push('');
		lines.push(Utils.colors.secondary('Click any link to open in new tab'));

		lines.forEach(line => terminal.print(line));
	},

	// Resume command
	resume: async function(args, flags, terminal) {
		terminal.print(Utils.colors.warning('Opening resume...'));
		terminal.print('');

		const resumeButton = `<a href="${portfolioData.contact.resume}" target="_blank" class="btn-primary" style="display: inline-block; padding: 10px 20px; text-decoration: none; background: var(--terminal-prompt); color: var(--terminal-bg); border-radius: 4px; margin: 10px 0;">📄 View Resume (PDF)</a>`;

		terminal.print(resumeButton);
		terminal.print('');
		terminal.print(Utils.colors.secondary('Resume will open in a new tab'));

		// Auto-open after 1 second
		setTimeout(() => {
			window.open(portfolioData.contact.resume, '_blank');
		}, 1000);
	},

	// Clear command
	clear: function(args, flags, terminal) {
		terminal.clearScreen();
	},

	// History command
	history: function(args, flags, terminal) {
		if (terminal.history.length === 0) {
			terminal.print('No command history');
			return;
		}

		terminal.print(Utils.colors.bold('Command History:'));
		terminal.print('');

		terminal.history.forEach((cmd, index) => {
			terminal.print(`  ${Utils.colors.warning((index + 1).toString().padStart(4))}  ${cmd}`);
		});
	},

	// Whoami command
	whoami: function(args, flags, terminal) {
		terminal.print(portfolioData.personal.username);
		terminal.print(Utils.colors.secondary(`${portfolioData.personal.role} @ ${portfolioData.personal.location}`));
	},

	// Date command
	date: function(args, flags, terminal) {
		terminal.print(Utils.formatDate());
	},

	// Neofetch command
	neofetch: function(args, flags, terminal) {
		const output = Utils.neofetch(portfolioData);
		terminal.print(output);
	},

	// Ls command - Simple Ubuntu terminal style
	ls: function(args, flags, terminal) {
		const path = args[0] || null;
		const contents = FileSystem.ls(path);

		if (!contents) {
			terminal.printError(`ls: cannot access '${args[0]}': No such file or directory`);
			return;
		}

		if (contents.length === 0) {
			terminal.print(Utils.colors.secondary('(empty directory)'));
			return;
		}

		// List items in simple format
		contents.forEach(item => {
			let color;
			if (item.type === 'directory') {
				color = Utils.colors.folder;
			} else if (item.type === 'media') {
				color = Utils.colors.media;
			} else {
				color = Utils.colors.file;
			}

			const itemName = item.type === 'directory' ? item.name + '/' : item.name;
			const command = item.type === 'directory' ? `cd ${item.name}` :
			                 item.type === 'media' ? `view ${item.name}` :
			                 `cat ${item.name}`;

			const link = `<a href="#" class="fs-item" onclick="terminal.executeCommandFromClick('${command}'); return false;">${color(itemName)}</a>`;

			terminal.print(link);
		});

		// Show back option at the end
		const currentPath = FileSystem.pwd();
		if (currentPath !== '/home/vaibhav') {
			terminal.print('');
			const backLink = `<a href="#" class="fs-item" onclick="terminal.executeCommandFromClick('cd ..'); return false;">${Utils.colors.secondary('..')}</a>`;
			terminal.print(backLink);
		}
	},

	// Pwd command - Use FileSystem
	pwd: function(args, flags, terminal) {
		terminal.print(FileSystem.pwd());
	},

	// Cd command - Change directory
	cd: async function(args, flags, terminal) {
		const target = args[0] || '~';
		const result = FileSystem.cd(target);

		if (!result.success) {
			terminal.printError(`cd: ${target}: No such file or directory`);
			return;
		}

		// Update terminal title with new path
		if (window.terminal) {
			terminal.updateTitle();
		}

		terminal.print('');

		// Check for special directories that should show formatted output
		const currentPath = FileSystem.pwd();
		const dirName = currentPath.split('/').pop();

		// Show formatted output for special directories
		if (dirName === 'education') {
			await this.education([], [], terminal);
			return;
		} else if (dirName === 'skills') {
			await this.skills([], [], terminal);
			return;
		} else if (dirName === 'experience') {
			await this.experience([], [], terminal);
			return;
		}

		// Check if README.md exists in current directory and auto-display it
		const readme = FileSystem.getFile('README.md');
		if (readme && readme.type === 'file') {
			// Auto-display README.md content
			terminal.print(readme.content);
			terminal.print('');
			terminal.print(Utils.colors.secondary('─'.repeat(80)));
			terminal.print('');
		}

		// Auto-run ls after showing README
		await this.ls([], [], terminal);
	},

	// Tree command
	tree: function(args, flags, terminal) {
		terminal.print(Utils.ascii.tree);
	},

	// Cowsay command
	cowsay: function(args, flags, terminal) {
		const message = args.join(' ') || 'Hire me!';
		terminal.print(Utils.cowsay(message));
	},

	// Matrix command
	matrix: async function(args, flags, terminal) {
		terminal.print(Utils.colors.green('Entering the Matrix...'));
		terminal.print(Utils.colors.secondary('Press any key to exit'));

		Animations.matrixRain(5000);

		await Animations.sleep(5000);
		terminal.print(Utils.colors.green('Welcome back to reality.'));
	},

	// Sudo command (easter egg)
	sudo: function(args, flags, terminal) {
		const command = args.join(' ');

		if (command.includes('make') && command.includes('coffee')) {
			terminal.printError('Error: I am a teapot ☕ (RFC 2324)');
		} else if (command.includes('rm') && command.includes('-rf')) {
			terminal.printError('Error: Nice try! 😏');
		} else {
			terminal.print(Utils.easterEggs.sudo);
		}
	},

	// Cat command - View files using FileSystem
	cat: function(args, flags, terminal) {
		if (args.length === 0) {
			terminal.printError('cat: missing file operand');
			return;
		}

		const file = FileSystem.getFile(args[0]);

		if (!file) {
			terminal.printError(`cat: ${args[0]}: No such file or directory`);
			return;
		}

		if (file.type === 'directory') {
			terminal.printError(`cat: ${args[0]}: Is a directory`);
			return;
		}

		if (file.type === 'media') {
			terminal.printWarning(`${args[0]} is a media file. Use 'view ${args[0]}' to open it.`);
			return;
		}

		// Display file content
		terminal.print('');
		terminal.print(file.content);
		terminal.print('');
	},

	// View command - Open media files in lightbox
	view: function(args, flags, terminal) {
		if (args.length === 0) {
			terminal.printError('view: missing file operand');
			terminal.print(Utils.colors.secondary('Usage: view [filename]'));
			return;
		}

		MediaViewer.viewFile(args[0]);
	},

	// Gallery command - Open all media in current directory
	gallery: function(args, flags, terminal) {
		MediaViewer.openGallery();
	},

	// Echo command
	echo: function(args, flags, terminal) {
		terminal.print(args.join(' '));
	},

	// Exit command
	exit: function(args, flags, terminal) {
		terminal.print(Utils.colors.warning('Thanks for visiting!'));
		terminal.print(Utils.colors.secondary('Refreshing page in 2 seconds...'));

		setTimeout(() => {
			location.reload();
		}, 2000);
	},

	// Curl/wget simulation
	curl: function(args, flags, terminal) {
		terminal.printError('curl: command not found');
		terminal.print(Utils.colors.secondary('Try: resume, contact, or social'));
	},

	wget: function(args, flags, terminal) {
		this.curl(args, flags, terminal);
	}
};

// Add common aliases
Commands.man = Commands.help;
Commands.cls = Commands.clear;
Commands.dir = Commands.ls;
Commands.quit = Commands.exit;

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
	module.exports = Commands;
}
