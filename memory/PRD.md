# PRD — Collective WordPress Theme

**Date Created:** 2026-02-01  
**Last Updated:** 2025-12-XX  
**Status:** React Preview Complete (v1.1.0)

---

## Original Problem Statement

Build a complete, downloadable WordPress theme that replicates the visual design, layout, typography, and reading experience of ThoughtCatalog.com and Collective.World. Primary signature feature: **Infinite Article Scroll** on single post pages. Full specification provided including exact CSS variables, HTML structure, PHP file list, and JavaScript implementation.

---

## User Choices

| Choice | Selected |
|---|---|
| Delivery format | WordPress theme (downloadable ZIP) + React Live Preview |
| Sans-serif font | Montserrat (Google Fonts, 400/600/700) |
| Serif body font | Georgia (system font) |
| Theme name | Collective |
| Demo content | 8 original TC-style articles, 4 categories, 2 authors |
| Logo | Text placeholder (ready for image logo) |
| Related Articles | 6 items in 3-column grid |

---

## Target Audience

Editorial blogs, personal essay sites, lifestyle/culture publications — anyone who wants the clean, minimal, long-read aesthetic of ThoughtCatalog or Collective.World.

---

## Architecture

### Theme File Structure (20 files)

```
collective/
├── style.css                        Theme header + complete CSS (700px column, all vars)
├── functions.php                    Setup, enqueue (Montserrat), REST endpoint, customizer
├── header.php                       Sticky header, search overlay, mobile hamburger nav
├── footer.php                       Footer with logo, nav, copyright
├── index.php                        Blog index / fallback
├── front-page.php                   Static homepage
├── single.php                       Article page + infinite scroll container
├── archive.php                      Category / tag / author / date archives
├── search.php                       Search results
├── 404.php                          Not found page
├── searchform.php                   Custom styled search form
├── template-parts/
│   ├── content-card.php            Post card (img + date + category + title)
│   ├── content-single.php          Full article (image → cats → H1 → meta → body → related → bio)
│   ├── content-single-infinite.php Same structure, rendered server-side for AJAX appending
│   ├── related-posts.php           Text-only 4 related links (same category)
│   └── author-bio.php              Author box (72px avatar, bio, social links)
├── js/
│   ├── infinite-scroll.js          Vanilla JS infinite scroll (IntersectionObserver)
│   └── main.js                     Header interactions (menu, search)
├── demo-content.xml                WXR import file — 8 articles, 4 cats, 2 authors
└── README.md                       Full installation + config guide
```

### Key Technical Decisions

- **Infinite Scroll:** Vanilla JS, no jQuery. `IntersectionObserver` watches sentinel `<div>`. Fetches next post list via WP REST API, then renders via custom `collective/v1/post-html/{id}` endpoint.
- **Custom REST endpoint:** Renders `content-single-infinite.php` server-side → returns JSON `{html, id, title, permalink}`
- **URL updates:** `History.replaceState()` triggered when article is 30%+ in viewport
- **Font stack:** Montserrat (sans, Google Fonts) for all headings + UI; Georgia (serif, system) for body text
- **CSS variables:** All colors, widths, fonts in `:root` for easy child-theme overrides

---

## Core Requirements (Spec Compliance)

- [x] Global white background, 700px centered column, zero sidebars
- [x] Sticky header: logo + nav + search icon + mobile hamburger
- [x] Georgia serif body text, 18px, 1.8 line-height
- [x] Montserrat headings (H1 32px/700, H2 22px/700)
- [x] Featured image full-width with photo credit
- [x] Category label (11px uppercase, letter-spacing, linked)
- [x] Author avatar (circle 40px) + name + date in meta bar
- [x] Article body: H2/H3/blockquote/link/list/image styling
- [x] Related posts: text-only, 4 titles, same category
- [x] Author bio box (72px avatar + name + bio + social)
- [x] Infinite scroll: loads next article on scroll, appends below divider
- [x] URL updates via History.replaceState
- [x] Article divider: 1px line + 60px margin + site name centered
- [x] Loading spinner + end-of-feed message
- [x] REST endpoint serving rendered article HTML
- [x] Fully responsive (768px / 480px breakpoints)
- [x] No jQuery dependency
- [x] Lazy loading on all images
- [x] Google Fonts preconnect for performance

---

## What's Been Implemented

### 2025-12-XX — v1.1.0 React Preview Enhancement
- **Leaderboard ad placeholder** (728x90) below header on all pages
- **5:3 aspect ratio** for featured images (contained within content width)
- **Related Articles section** with 6 items in 3-column grid layout
- **Custom SVG separator** (three dots) between infinite scroll articles
- **Enhanced header** with larger logo area supporting image logos
- **Micro-animations throughout:**
  - fadeInUp entrance animations on page content
  - Staggered animations on post cards and menu items
  - Image scale transitions on hover
  - Underline animations on title links
  - Button hover transformations
  - Reduced-motion media query support
- **Full-screen dark menu** (#0d0d0d) with veggie burger trigger
- **Category page** with large title and two-column article rows
- **Author page** with centered header, avatar, bio, and social links
- **Legal pages** (About, Privacy, Terms, Advertise)
- All features tested with 100% pass rate

### 2026-02-01 — v1.0.0 MVP
- Complete WordPress theme with all 20 required files
- Full CSS implementation (all spec variables, mobile-first responsive)
- Infinite scroll engine (vanilla JS, IntersectionObserver)
- Custom WordPress REST API endpoint
- Demo content (8 articles, 4 categories, 2 authors) as WXR import file
- README with installation, configuration, and child theme guide
- Packaged as `collective.zip` at `/app/collective.zip`
- React Live Preview at `/app/frontend/`

---

## Prioritized Backlog

### P0 — Critical (blocking use)
- [ ] **Update WordPress theme** to match React preview changes (leaderboard ad, 5:3 images, 6-item related articles, SVG separator, animations)

### P1 — High Value
- [ ] Screenshot.png for WordPress theme browser (1200×900px preview)
- [ ] Comments template (comments.php)
- [ ] Page template (page.php)
- [ ] Tag archive improvements (tag cloud)
- [ ] Live search functionality in search overlay

### P2 — Nice to Have
- [ ] Dark mode toggle (CSS variables make this trivial)
- [ ] Reading progress bar on single posts
- [ ] Newsletter subscription block
- [ ] "Load More" posts button as alternative to pagination
- [ ] Category color coding (optional accent)
- [ ] Table of contents auto-generator for long articles

---

## Next Steps

1. **Upload to WordPress:** Appearance → Themes → Add New → Upload `collective.zip`
2. **Import demo content:** Tools → Import → WordPress → upload `demo-content.xml`
3. **Add author bios:** Users → Profile → Biographical Info (author bio box appears automatically)
4. **Set up navigation menus:** Appearance → Menus → assign to Primary + Footer locations
5. **Optional:** Upload custom logo via Appearance → Customize → Site Identity
