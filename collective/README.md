# Collective — WordPress Theme

A clean, editorial WordPress theme inspired by **ThoughtCatalog.com** and **Collective.World**.

---

## Features

- **Infinite Article Scroll** — After the current article ends, the next post in the same category loads automatically and appends below. No page reload, no button press.
- **URL + Title Updates** — As you scroll into each new article the browser URL and page `<title>` update in real time via `History.replaceState`.
- **Montserrat Typography** — Google Font (400/600/700) used for all headings and UI chrome.
- **Georgia Serif Body** — Classic readable serif for article body text (18px / 1.8 line-height).
- **Zero Sidebars** — Strict 700px centered column on all pages. Pure white margins everywhere.
- **Minimal Color Palette** — Black, white, and muted grays only.
- **Fully Responsive** — Mobile-first, works beautifully from 320px to 4K.
- **No jQuery** — The infinite scroll is pure vanilla JavaScript using the Intersection Observer API.
- **Custom REST Endpoint** — `GET /wp-json/collective/v1/post-html/{id}` renders article HTML server-side for safe AJAX appending.
- **Author Bio Box** — Shows automatically when an author has filled in their bio in their profile.
- **Related Articles** — Text-only links (no thumbnails), 4 posts, same primary category.
- **Search Overlay** — Full-screen search with keyboard accessibility.
- **Mobile Menu** — Full-screen overlay nav for small screens.
- **Custom Logo Support** via WordPress Customizer.
- **Above-Header Strip** — Optional thin text bar (e.g. moon phase, newsletter CTA) configurable in Customizer.

---

## Requirements

| Requirement | Version |
|---|---|
| WordPress | 6.0 or newer |
| PHP | 7.4 or newer |
| WP REST API | Enabled (default) |

---

## Installation

### Option A — WordPress Admin Upload (recommended)

1. **Zip** the `collective` folder into `collective.zip`  
   *(or use the pre-packaged zip if provided)*
2. Log into your WordPress dashboard
3. Go to **Appearance → Themes → Add New → Upload Theme**
4. Choose `collective.zip` and click **Install Now**
5. Click **Activate**

### Option B — FTP / SFTP

1. Extract `collective.zip`
2. Upload the `collective/` folder to `/wp-content/themes/`
3. Activate in **Appearance → Themes**

---

## Demo Content Import

The file `demo-content.xml` contains 8 sample articles across 4 categories.

1. Go to **Tools → Import → WordPress**  
   *(Install the WordPress Importer plugin when prompted)*
2. Upload `demo-content.xml`
3. Map authors to your existing admin account (or create new users)
4. Tick **"Download and import file attachments"**
5. Click **Submit**

> **Note:** Demo posts reference external placeholder images. Make sure "Download and import file attachments" is checked so WordPress copies them locally.

---

## Configuration

### Navigation Menu

1. **Appearance → Menus → Create New Menu**
2. Add pages, categories, or custom links
3. Assign to **Primary Navigation** location
4. Save

### Custom Logo

1. **Appearance → Customize → Site Identity**
2. Click **Select logo** — upload SVG or PNG
3. Recommended: max height 56px, transparent background

### Footer Navigation

Create a second menu and assign to **Footer Navigation** location.

### Above-Header Strip

1. **Appearance → Customize → Collective Theme Options**
2. Enter short text (e.g. *"Full moon in 20 days"* or *"Subscribe to our newsletter"*)
3. Leave blank to hide the strip

### Author Bios

The author bio box appears on every article automatically **if** the author has a bio set:

1. **Users → Your Profile** (or edit any user)
2. Fill in **Biographical Info**
3. Optionally add **Twitter URL** and **Instagram URL** (new fields added by theme)

---

## Infinite Scroll — How It Works

1. User scrolls to the bottom of an article
2. An `IntersectionObserver` watches a 1px sentinel `<div>` at the page bottom
3. When it enters the viewport, the theme calls:
   ```
   GET /wp-json/wp/v2/posts?categories={id}&exclude={loadedIds}&per_page=1
   ```
4. Gets the next post ID, then calls the theme's custom endpoint:
   ```
   GET /wp-json/collective/v1/post-html/{id}
   ```
5. The server renders the full article HTML (featured image → categories → H1 → body → related → bio) and returns it as JSON
6. JavaScript appends it below a 1px divider line
7. A second `IntersectionObserver` watches the new article — when it's centred in the viewport the URL and `<title>` update

---

## Theme File Structure

```
collective/
├── style.css                           Theme header + all CSS
├── functions.php                       Setup, enqueue, REST endpoint
├── header.php                          Sticky header, search overlay, mobile nav
├── footer.php                          Site footer
├── index.php                           Blog index (fallback)
├── front-page.php                      Static front page (if set)
├── single.php                          Article page + infinite scroll container
├── archive.php                         Category / tag / author / date archives
├── search.php                          Search results
├── 404.php                             Not found page
├── searchform.php                      Custom search form markup
├── template-parts/
│   ├── content-card.php               Post card (image + date + category + title)
│   ├── content-single.php             Full article body
│   ├── content-single-infinite.php    Article rendered for AJAX appending
│   ├── related-posts.php              Text-only related articles block
│   └── author-bio.php                 Author box (avatar + name + bio + social)
├── js/
│   ├── infinite-scroll.js             Infinite scroll engine (vanilla JS)
│   └── main.js                        Header interactions
├── demo-content.xml                   Sample posts for import (WXR format)
└── README.md                          This file
```

---

## CSS Custom Properties

The entire theme is driven by CSS variables in `:root`:

```css
--color-bg        #ffffff   Page / margin background
--color-text      #1a1a1a   Body text
--color-heading   #111111   Headings
--color-meta      #888888   Dates, secondary text
--color-category  #555555   Category labels
--color-border    #e5e5e5   Dividers, borders
--font-serif      Georgia, 'Times New Roman', serif
--font-sans       'Montserrat', system-ui, sans-serif
--content-width   700px
--body-size       18px
--body-lh         1.8
```

To customise colours or widths, override these variables in a child theme's `style.css`.

---

## Creating a Child Theme

```css
/* child-theme/style.css */
/*
Theme Name:   Collective Child
Template:     collective
*/

:root {
  --content-width: 760px;           /* wider column */
  --color-category: #c0392b;        /* red category labels */
}
```

---

## License

GNU General Public License v2.0 or later  
https://www.gnu.org/licenses/gpl-2.0.html
