# Developer Guide — statwizard

Personal academic website for Subhrajyoty Roy, built with [Quarto](https://quarto.org/).

---

## Framework

The site uses **Quarto** (`.qmd` files), a scientific publishing system built on Pandoc. Pages are written in Markdown with optional R/Python code chunks embedded using ```` ```{r} ```` or ```` ```{python} ```` fences. Quarto renders these into HTML and places the output in `docs/`, which is the GitHub Pages source directory.

**Key concepts:**
- Each `.qmd` file compiles to one HTML page.
- The global config lives in `_quarto.yml` — navbar, footer, theme, and output directory are all set there.
- The active theme is `litera` (light) / `cyborg` (dark) from [Bootswatch](https://bootswatch.com/).
- Custom CSS goes in `static/css/styles.css`; it is applied globally via `_quarto.yml`.

**Build command:**
```bash
quarto render        # renders everything into docs/
quarto preview       # live-reload local dev server
```

---

## Folder Structure

```
statwizard/
├── _quarto.yml              # global site configuration (navbar, theme, output dir)
├── index.qmd                # home page
├── about.qmd                # About Me page
├── software.qmd             # OSS packages & projects page
├── 404.qmd                  # custom 404 page
│
├── research/
│   ├── index.qmd            # research publications listing
│   ├── talks.qmd            # talks & seminars listing
│   └── rsvddpd.qmd          # supplementary material for the rsvddpd paper
│
├── notes/
│   ├── index.qmd            # notes landing page (aggregates all sub-listings)
│   ├── concepts/            # concept guides / learning notes (.qmd files)
│   └── technicals/          # proof techniques & technical notes (.qmd files)
│
├── static/
│   ├── css/styles.css       # site-wide custom CSS
│   ├── images/              # profile photo and other site images
│   ├── cv.pdf               # curriculum vitae
│   └── teaching/            # teaching PDFs (problem sets, slide decks)
│
└── docs/                    # auto-generated output (GitHub Pages source — do not edit manually)
```

---

## Adding & Editing Site Components

### Navbar links

Edit the `website.navbar.left` list in `_quarto.yml`. Each entry needs `href` (path to a `.qmd` file) and `text` (label shown in the nav).

```yaml
- href: my-new-page.qmd
  text: My Page
```

Social/icon links are under `website.navbar.tools`. Icons come from [Bootstrap Icons](https://icons.getbootstrap.com/).

---

### New top-level page

1. Create `my-page.qmd` at the project root.
2. Add a YAML front matter block at the top:
   ```yaml
   ---
   title: My Page
   format:
     html:
       toc: true
   ---
   ```
3. Add it to the navbar in `_quarto.yml` (see above).

---

### Research publications

Edit `research/index.qmd`. Publications are written as plain Markdown lists, grouped under `###` headings by topic area. No special Quarto listing machinery is used here — just prose.

To add a new paper, append a numbered list item under the appropriate section following the existing citation style:

```markdown
1. Author, A., and Author, B. "**Title.**" *Journal* volume (year): pages.
   [Link](https://...) | [Open Access Link](https://arxiv.org/abs/...)
```

---

### Talks & seminars

Edit `research/talks.qmd`. Talks are grouped by year (`## 2025`, `## 2024`, …) and formatted with Bootstrap badge spans for the talk type:

```markdown
#### Talk Title

<span class="badge bg-primary">Invited Talk</span>
**Conference Name**, Location.
[Slide deck](https://...)
```

Available badge colours: `bg-primary` (blue), `bg-secondary` (grey), `bg-warning` (yellow), `bg-success` (green).

---

### Notes / blog posts

Notes are split into two sub-collections, both auto-listed from their respective folders via Quarto `listing` blocks in `notes/index.qmd`:

| Collection | Folder | Purpose |
|---|---|---|
| Concept Guides | `notes/concepts/` | Learning notes on a new topic |
| Technical Materials | `notes/technicals/` | Proof techniques, derivations |

To add a new note, create a `.qmd` file in the appropriate folder with this front matter:

```yaml
---
title: "My Note Title"
date: "2025-06-06"
description: "A short description shown in the listing."
toc: true
categories:
    - Statistics
    - Machine Learning
---
```

The listing page picks it up automatically — no manual registration needed.

To add a new collection (e.g. `notes/reflections/`):
1. Create the folder and add `.qmd` files to it.
2. Add a new listing block in `notes/index.qmd` pointing to `"./reflections/*.qmd"`.
3. Add a corresponding `:::{#reflections}` div where you want the listing rendered on that page.

---

### OSS packages & projects

Edit `software.qmd`. It uses standard Markdown lists. Add a new package under the relevant `##` section (Packages & Tools vs Projects) following the existing format:

```markdown
- **package-name**
  Short description.
  - 📦 PyPI/CRAN: <https://...>
  - 💻 GitHub: <https://...>
  - ![Badge](https://img.shields.io/...)
```

---

### Static assets

| Asset type | Where to put it |
|---|---|
| Profile image | `static/images/` |
| Teaching PDFs | `static/teaching/` |
| Custom CSS | `static/css/styles.css` |
| CV PDF | `static/cv.pdf` |

Reference static files in `.qmd` pages using relative paths from the project root, e.g. `../static/teaching/myfile.pdf` (from inside a subfolder) or `./static/images/profile.jpg` (from the root).

---

### Custom CSS

Add all custom styles to `static/css/styles.css`. It is already wired into every page via `_quarto.yml`:

```yaml
format:
  html:
    css: ./static/css/styles.css
```

---

### External links

- Links to pages outside `statwizard.in` automatically open in a new tab (`link-external-newwindow: true` in `_quarto.yml`).
- The filter pattern `^((?!statwizard\.in).)*$` identifies external links; internal links open in the same tab.

---

## Deployment

The site renders into `docs/` (set via `output-dir: docs` in `_quarto.yml`). GitHub Pages is configured to serve from the `docs/` folder on the `main` branch. To deploy:

```bash
quarto render
git add docs/
git commit -m "rebuild site"
git push
```

The `_site/` directory (Quarto's default output name) is git-ignored; only `docs/` is committed.

---

## Todo

- [ ] Optimize the images for the notes. Too large size.
