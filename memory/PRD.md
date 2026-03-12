# PRD — Collective WordPress Theme

**Date Created:** 2026-02-01  
**Status:** MVP Complete (v1.0.0)

---

## Original Problem Statement

Build a complete, downloadable WordPress theme that replicates the visual design, layout, typography, and reading experience of ThoughtCatalog.com and Collective.World. Primary signature feature: **Infinite Article Scroll** on single post pages. Full specification provided including exact CSS variables, HTML structure, PHP file list, and JavaScript implementation.

---

## User Choices

| Choice | Selected |
|---|---|
| Delivery format | WordPress theme (downloadable ZIP) |
| Sans-serif font | Montserrat (Google Fonts, 400/600/700) |
| Serif body font | Georgia (system font) |
| Theme name | Collective |
| Demo content | 8 original TC-style articles, 4 categories, 2 authors |

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

### 2026-02-01 — v1.0.0 MVP
- Complete WordPress theme with all 20 required files
- Full CSS implementation (all spec variables, mobile-first responsive)
- Infinite scroll engine (vanilla JS, IntersectionObserver)
- Custom WordPress REST API endpoint
- Demo content (8 articles, 4 categories, 2 authors) as WXR import file
- README with installation, configuration, and child theme guide
- Packaged as `collective.zip` at `/app/collective.zip`

---

## Prioritized Backlog

### P0 — Critical (blocking use)
- None known

### P1 — High Value
- [ ] Screenshot.png for WordPress theme browser (1200×900px preview)
- [ ] Comments template (comments.php)
- [ ] Page template (page.php)
- [ ] Tag archive improvements (tag cloud)

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
