# PRD — Collective WordPress Theme

**Date Created:** 2026-02-01  
**Last Updated:** 2025-12-XX  
**Status:** React Preview Complete (v1.3.0) + WordPress Theme Updated

---

## Original Problem Statement

Build a complete, downloadable WordPress theme that replicates the visual design, layout, typography, and reading experience of ThoughtCatalog.com and Collective.World. Primary signature feature: **Infinite Article Scroll** on single post pages.

---

## User Choices

| Choice | Selected |
|---|---|
| Theme Name | Collective |
| Theme URL | https://lf.media |
| Author | Naveen Kumar |
| Accent Color | #0006ff (Blue) |
| Homepage Layout | Hero post + 2-column grid |
| Show Dates | Off (configurable via Customizer) |
| Sans-serif font | Montserrat (Google Fonts) |
| Serif body font | Georgia (system) |
| Related Articles | 6 items in 3-column grid |

---

## What's Been Implemented

### 2025-12-XX — v1.3.0 Hero Post + Search Refinement
- **Hero post** on homepage — large featured image with title overlay (latest article)
- **Dates removed** from homepage, search page, and archive pages
- **Show/Hide Date toggle** added to WordPress Customizer
- **Enhanced search page:**
  - Clean search input with underline style
  - Results with thumbnail, category, title, author
  - Popular topics suggestions when no query
  - No results message with helpful link
- **Zip file updated** with all new features (40KB)

### 2025-12-XX — v1.2.0 Major UI Update
- Homepage redesigned to 2-column grid layout
- Accent color changed to blue (#0006ff)
- page.php template added
- Full-screen menu uses WordPress Menus (3 locations)
- Theme credits updated

### 2025-12-XX — v1.1.0 React Preview Enhancement
- Leaderboard ad placeholder below header
- 5:3 aspect ratio for featured images
- Related Articles with 6 items in grid
- Custom SVG separator between infinite scroll articles
- Enhanced header with larger logo area
- Micro-animations throughout
- Full-screen dark menu with veggie burger trigger

### 2026-02-01 — v1.0.0 MVP
- Complete WordPress theme with all required files
- Infinite scroll engine (vanilla JS, IntersectionObserver)
- Demo content

---

## WordPress Theme Features

### Customizer Settings
1. **Show Ad Placeholder** — Toggle leaderboard ad display
2. **Show Publish Date** — Toggle date display on cards
3. **Instagram Followers** — Count for menu
4. **Twitter Followers** — Count for menu
5. **Facebook Followers** — Count for menu

### Menu Locations (3 registered)
1. **Primary Navigation** — Large links in center of full-screen menu
2. **Explore Menu** — Left column links (Latest, Writers, etc.)
3. **Footer Navigation** — Legal pages

### Widget Areas
1. **Leaderboard Ad** — 728x90 banner below header

---

## Code Architecture

```
/app/
├── collective.zip          # WordPress theme (40KB)
└── frontend/               # React live preview
    ├── public/
    │   └── collective.zip  # Download link
    └── src/
        ├── pages/
        │   ├── HomePage.jsx    # Hero + grid
        │   └── SearchPage.jsx  # Refined search
        └── ...
```

---

## Download

**Theme ZIP available at:**
- Preview: Click "Download Theme (ZIP)" button in footer
- Direct: `/app/collective.zip` or `/app/frontend/public/collective.zip`

---

## Prioritized Backlog

### P0 — Complete
- [x] Hero post on homepage
- [x] Remove dates (with toggle option)
- [x] Refined search page

### P1 — High Value
- [ ] Screenshot.png for WordPress theme browser
- [ ] Comments template (comments.php)
- [ ] Reading progress bar

### P2 — Nice to Have
- [ ] Dark mode toggle
- [ ] Newsletter subscription block
