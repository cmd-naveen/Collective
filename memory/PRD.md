# PRD — Collective WordPress Theme

**Date Created:** 2026-02-01  
**Last Updated:** 2025-12-XX  
**Status:** React Preview Complete (v1.2.0) + WordPress Theme Updated

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
| Homepage Layout | 2-column grid (like Collective World) |
| Sans-serif font | Montserrat (Google Fonts) |
| Serif body font | Georgia (system) |
| Related Articles | 6 items in 3-column grid |

---

## What's Been Implemented

### 2025-12-XX — v1.2.0 Major UI Update
- **Homepage redesigned** to 2-column grid layout matching Collective World
- **Accent color changed** to blue (#0006ff) for categories and links
- **page.php template** added for WordPress pages
- **Full-screen menu now uses WordPress Menus:**
  - Primary Navigation (large center links)
  - Explore Menu (left column links)  
  - Footer Navigation (legal links)
- **Theme credits updated:**
  - Theme URL: https://lf.media
  - Author: Naveen Kumar
- **Download button** added to footer for theme ZIP

### 2025-12-XX — v1.1.0 React Preview Enhancement
- Leaderboard ad placeholder (728x90) below header
- 5:3 aspect ratio for featured images
- Related Articles section with 6 items in 3-column grid
- Custom SVG separator between infinite scroll articles
- Enhanced header with larger logo area
- Micro-animations throughout
- Full-screen dark menu with veggie burger trigger
- Category and Author page layouts
- Legal pages (About, Privacy, Terms)

### 2026-02-01 — v1.0.0 MVP
- Complete WordPress theme with all required files
- Full CSS implementation
- Infinite scroll engine (vanilla JS, IntersectionObserver)
- Demo content (8 articles, 4 categories, 2 authors)

---

## Code Architecture

```
/app/
├── collective.zip          # WordPress theme package (39KB)
├── collective/             # WordPress theme source
│   ├── style.css           # Main stylesheet (updated credits)
│   ├── functions.php       # Theme functions + 3 menu locations
│   ├── header.php          # Uses WordPress menus
│   ├── page.php            # NEW: Page template
│   ├── front-page.php      # 2-column grid homepage
│   ├── template-parts/
│   │   ├── content-single.php
│   │   └── related-posts.php  # 6-item grid
│   └── js/
│       ├── main.js
│       └── infinite-scroll.js
│
└── frontend/               # React live preview
    ├── public/
    │   └── collective.zip  # Download link
    └── src/
        ├── components/
        │   ├── PostCardGrid.jsx  # NEW: Grid card
        │   └── ...
        └── pages/
            └── HomePage.jsx   # 2-column grid
```

---

## WordPress Theme Features

### Menu Locations (3 registered)
1. **Primary Navigation** — Large links in center of full-screen menu
2. **Explore Menu** — Left column links (Latest, Writers, etc.)
3. **Footer Navigation** — Legal pages

### Widget Areas (1 registered)
1. **Leaderboard Ad** — 728x90 banner below header

### Customizer Settings
- Show/Hide ad placeholder
- Instagram follower count
- Twitter follower count
- Facebook follower count

---

## Prioritized Backlog

### P0 — Complete
- [x] Update WordPress theme to match React preview
- [x] Homepage 2-column grid layout
- [x] Blue accent color (#0006ff)
- [x] page.php template
- [x] Configurable menus (not hardcoded)

### P1 — High Value
- [ ] Screenshot.png for WordPress theme browser
- [ ] Comments template (comments.php)
- [ ] Live search functionality
- [ ] Reading progress bar

### P2 — Nice to Have
- [ ] Dark mode toggle
- [ ] Newsletter subscription block
- [ ] Category color coding

---

## Download

Theme ZIP available at:
- React Preview: `/collective.zip` (download button in footer)
- Direct path: `/app/collective.zip`
