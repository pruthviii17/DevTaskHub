# Dev Task Hub

## Project Overview
Dev Task Hub is a **modern, responsive web application** built with plain HTML5, CSS3, and vanilla JavaScript. It provides a clean developer‑focused dashboard for managing tasks related to a college Git version‑control practical. All data is persisted in the browser using `localStorage`, so the app works offline without any backend.

![Screenshot](https://raw.githubusercontent.com/your-repo/DevTaskHub/main/screenshots/dashboard.png)

## Features
- **Task CRUD** – Add, edit, delete, and toggle completion status.
- **Rich task model** – title, description, priority, status, due date, creation date.
- **Filtering & Sorting** – search, status filter, priority filter, and several sorting options.
- **Statistics panel** – total tasks, completed, pending and completion percentage.
- **Responsive UI** – adapts gracefully to desktop, tablet and mobile.
- **Local storage** – data survives page reloads.
- **Sample tasks** – pre‑populated demo data.
- **Empty states & clear‑all** – friendly messages and confirmation dialogs.

## Technologies
- **HTML5** – semantic markup.
- **CSS3** – custom properties, flexbox, grid, media queries, smooth transitions.
- **Vanilla JavaScript (ES6+)** – modular code, `localStorage`, DOM manipulation.

## Folder Structure
```
DevTaskHub/
│   index.html          # Main page
│   style.css           # All styling (dark navy theme, cards, animations)
│   script.js           # Application logic
│   README.md           # This file
│   .gitignore          # Git ignore rules
└─ screenshots/        # Optional – screenshots for the repo README
```

## Setup Instructions
1. **Open the project** – simply double‑click `index.html` or serve the folder with any static web server.
   ```bash
   # Using Python (built‑in) – from the project root
   python -m http.server 8080
   # Then open http://localhost:8080 in a browser
   ```
2. No build step, dependencies, or Node.js is required.
3. All tasks are saved automatically to `localStorage`.

## Screenshots
*(Add screenshots to the `screenshots/` directory and commit them. The placeholder URL above should be replaced with the actual path after you upload the repo.)*

## Git Workflow
The repository is prepared for a typical GitLab workflow:
```bash
# 1️⃣ Initial commit on `main`
git init
git add .
git commit -m "chore: initial commit – project scaffold"

# 2️⃣ Create a feature branch for UI work
git checkout -b feature/app-ui
# ... commit UI related changes
git commit -am "feat: add dark‑navy dashboard layout"

# 3️⃣ Create a feature branch for JavaScript functionality
git checkout main
git checkout -b feature/app-logic
# ... commit JS implementation
git commit -am "feat: implement task CRUD, storage and filters"
```
### Resolving a Merge Conflict (example)
```bash
# Suppose both branches edited `index.html`
git checkout main
git merge feature/app-ui   # conflict appears
# Open the conflicted file, keep the desired sections, remove conflict markers
# After editing:
git add index.html
git commit -m "fix: resolve merge conflict in index.html"
```

## Suggested GitLab Issues
| # | Title | Description | Acceptance Criteria |
|---|-------|-------------|----------------------|
| 1 | UI – Responsive Dashboard | Build dark navy sidebar, stats cards and task list with proper breakpoints. | Layout adjusts at ≤900 px and ≤600 px, sidebar collapses, cards stay readable. |
| 2 | Core – Task CRUD & Persistence | Implement add, edit, delete, toggle‑complete, and store tasks in `localStorage`. | All operations reflect instantly, data persists after page reload. |
| 3 | Enhancements – Filters & Sorting | Add search, status/priority filters and sorting options. | Users can combine filters and sort without errors, results update live. |

## Milestone
**v1.0.0** – Feature‑complete demo ready for demo day.

## Merge Request Description
```
Title: feat: complete UI & logic for Dev Task Hub
Description: Implements responsive dashboard, task management, localStorage persistence, and filters.
Closes #1
```

## Release Notes (v1.0.0)
- Added full responsive UI with dark navy theme.
- Implemented task CRUD operations and validation.
- Integrated localStorage persistence and sample demo data.
- Provided search, filtering, sorting and statistics panel.
- Added clear‑all functionality with confirmation.
- Updated documentation and Git workflow instructions.

---

*Happy coding!*