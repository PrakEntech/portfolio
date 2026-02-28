# Prakhar Srivastava — Portfolio

A terminal-inspired, interactive portfolio designed to showcase engineering expertise, security-first thinking, and product ownership. Built as a high-performance React SPA with a custom static-generation engine for blogging.

## Key Features

- **Interactive Terminal:** A fully functional bash-like interface allowing users to navigate sections, filter projects, and search blogs using terminal commands.
- **Recruiter Mode:** A high-visibility, professional overlay for quick access to key information, accessible at the click of a button.
- **Retro Gaming:** An authentic 1962 PDP-1 SpaceWar! replica integrated directly into the terminal environment.
- **Serverless Architecture:** A globally distributed static site with zero backend dependencies for content management.

---

## Architecture & Components

### 1. Interactive Terminal (`InteractiveTerminal.jsx`)
The heart of the portfolio. It manages a virtual filesystem-like navigation experience.
- **Command History:** Persisted in `localStorage` to replicate actual terminal behavior across sessions.
- **Command Parsing:** Handles custom commands like `cd`, `ls`, `projects --filter`, and `blog --search`.
- **Hacker Aesthetic:** Dynamic typewriter effects and phosphor-glow styling.

### 2. Recruiter View
A specialized UI component that swaps the terminal for a traditional, clean resume-style layout. It persists in `localStorage` so the user's preference is remembered.

### 3. SpaceWar! Engine (`SpaceWar.jsx`)
A physics-accurate recreation of the first digital computer game.
- **Newtonian Physics:** Inverse-square law gravity well for the central star.
- **Performance Optimized:** Uses `requestAnimationFrame` and pre-calculated gradients to maintain 60FPS even on low-spec hardware.

---

## Static Blog System (Backend-less)

The project uses a custom **Static Generation Engine** (`scripts/generate-blogs.js`) to manage content. This allows for rich, searchable blog posts without the overhead of a CMS or database.

### How it Works:
1.  **Source Data:** Content is written in `src/data/blogs/[key].json` and indexed in `src/data/blogs.csv`.
2.  **Generation:** Running `node scripts/generate-blogs.js` performs the following:
    - Parses JSON/CSV data.
    - Generates individual JSX components for each post in `src/pages/blogs/`.
    - Automatically updates the `BlogList.jsx` searchable index.
    - Re-builds `src/generated/BlogRoutes.jsx` to register the new paths.
3.  **Search Logic:** The blog list features a `grep`-themed search bar that filters based on titles and tags, computed entirely on the client side.

---

## Analytics & Monitoring

- **Google Analytics 4 (GA4):** Connected via a Global Site Tag in `index.html`.
- **SPA Tracking:** Since React doesn't trigger a full page reload on navigation, a `useEffect` hook in `App.jsx` monitors `location` changes via `react-router-dom` and manually pushes `page_view` events to Google Analytics. This ensures every blog post read and section visit is tracked precisely.

---

## Deployment & CI/CD

The project iterates fast through a modern CI/CD pipeline:

1.  **Version Control:** Hosted on GitHub.
2.  **Automated Deployment:** Connected to **Cloudflare Pages**.
3.  **Build Pipeline:**
    - Every push to `main` triggers a Cloudflare Build.
    - The environment runs `npm run build` (which executes the Vite builder).
    - The resulting static assets are deployed to Cloudflare's global edge network for sub-100ms latency worldwide.

---

## Development

```bash
# Install dependencies
npm install

# Run generation script (if adding new blogs)
node scripts/generate-blogs.js

# Start development server
npm run dev

# Build for production
npm run build
```

---

*Built with React, Vite, Lucide React, and a passion for systems engineering.*
