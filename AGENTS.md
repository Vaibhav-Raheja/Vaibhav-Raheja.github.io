# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

This is an interactive terminal-style portfolio website (no backend). It runs entirely in the browser using vanilla JavaScript with no build system. The site is deployed to GitHub Pages and presents Vaibhav's professional profile through a retro terminal interface.

## Architecture

### Core Systems

**Terminal Engine** (`assets/js/terminal.js`)
- Core class managing input/output, command execution, and history
- Handles key events (Enter, ArrowUp/Down, Tab, Ctrl+L), autosuggestions, and animations
- Stores command history in localStorage
- Manages prompt display and focus

**Command System** (`assets/js/commands.js`)
- Large object containing all terminal commands (help, about, education, experience, projects, skills, contact, etc.)
- Each command is an async function receiving args, flags, and terminal instance
- Commands call `terminal.print()` or `terminal.printWithAnimation()` to display output
- Includes system commands (clear, history, whoami, date, neofetch), fun commands (cowsay, matrix), and navigation commands

**Data Layer** (`assets/js/data.js`)
- Single `portfolioData` object containing all portfolio information
- Structured sections: personal, education, experience, projects, skills, contact
- Edit this file to update portfolio content (no hardcoding elsewhere)

**Utilities** (`assets/js/utils.js`)
- Color formatting functions using CSS variables (--terminal-text, --terminal-warning, etc.)
- ASCII art collection (welcome banner, tree visualization)
- Helper functions: formatText(), isMobile(), storage (localStorage wrapper)
- Mobile detection for adaptive behavior

**Virtual Filesystem** (`assets/js/filesystem.js`)
- Creates a virtual directory structure mapped to commands
- The `ls` and `tree` commands navigate this structure
- Helps organize content logically without actual files

**Animations** (`assets/js/animations.js`)
- Typing animation engine with configurable speeds
- Methods: animate(), skip(), sleep()
- Configuration object for animation timing

**Supporting Systems**
- `media-viewer.js` — displays project images/media with modal
- `quick-nav.js` — hamburger menu and quick navigation sidebar

### Data Flow

1. User types in input field → Terminal listens for Enter
2. Command is parsed (args, flags extracted)
3. Matching command function from Commands object is executed
4. Command calls terminal methods (print, printWithAnimation) to display output
5. All portfolio data flows through portfolioData object

## Common Development Tasks

### Editing Portfolio Content
Edit `assets/js/data.js`:
- `personal` — name, bio, username, hostname, role, location, avatar
- `education` — degrees, institutions, highlights
- `experience` — work roles, companies, achievements, technologies
- `projects` — descriptions, technologies, links, images

### Adding a New Command
1. Add function to `Commands` object in `assets/js/commands.js`
2. Import needed data from `portfolioData`
3. Call `terminal.print()` or `terminal.printWithAnimation()` for output
4. Update `help` command to include new command
5. Optional: add to filesystem.js if it needs navigation structure

### Styling Changes
- `assets/css/terminal.css` — main terminal styling, theme colors (CSS variables)
- `assets/css/media-viewer.css` — modal for image viewing
- CSS uses variables like `--terminal-text`, `--terminal-warning`, `--terminal-error` — change these to retheme

### Responsive Design
- Terminal detects mobile via `Utils.isMobile()`
- Quick nav sidebar hides on mobile, replaced with hamburger menu
- Commands render responsively (utils.formatText wraps text)

### Adding Images/Media
1. Place image in `images/` folder
2. Reference in `portfolioData` (e.g., project images)
3. Use media-viewer.js to display (opens in modal on click)

## Deployment

- Repository is hosted on GitHub Pages
- Site is live at https://vaibhav-raheja.github.io/
- Push to main branch → automatically deployed
- No build step required (pure HTML/CSS/JS)

## Key Implementation Notes

- **No external dependencies** — vanilla JavaScript only
- **localStorage** — command history persists in browser
- **CSS Variables** — all colors configurable in :root (see terminal.css)
- **Animation System** — typing animations can be skipped with keypress
- **Mobile First** — input focuses only on desktop (prevents keyboard popup on mobile)
- **Breadcrumb Navigation** — dynamically updates when navigating folders (cd command)
- **Google Analytics** — integrated via gtag (ID: G-8BL61YTMC1)

## Structure Quick Reference

```
index.html                 — Main page
assets/
├── js/
│   ├── data.js           — Portfolio content (edit for updates)
│   ├── terminal.js       — Terminal engine
│   ├── commands.js       — All command implementations
│   ├── utils.js          — Colors, ASCII art, helpers
│   ├── filesystem.js     — Virtual directory structure
│   ├── animations.js     — Typing animation system
│   ├── media-viewer.js   — Image/media modal
│   └── quick-nav.js      — Sidebar navigation
├── css/
│   ├── terminal.css      — Main styling (theme colors)
│   ├── media-viewer.css  — Image modal styles
│   └── fontawesome-all.min.css
└── images/              — Portfolio images
```
