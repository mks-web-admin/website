# ДСУ – РЦСОО „Марија Кири – Склодовска“ – Скопје

Static website for the school, rebuilt from the WordPress export (`WordPress.2026-09-28.xml`),
the page screenshots and the media library of the deleted WordPress site.

Plain HTML + CSS + a little vanilla JS. No build step, no dependencies, so it runs as-is on GitHub Pages.

## Pages

| File | Page | Source on the old site |
| --- | --- | --- |
| `index.html` | Почетна | ПОЧЕТНА page |
| `istorijat.html` | Историјат (with timeline) | ИСТОРИЈАТ |
| `misija-vizija.html` | Мисија и визија | МИСИЈА, ВИЗИЈА |
| `organizacija.html` | Org chart + 37 job positions | ОРГАНИЗАЦИЈА |
| `id-podatoci.html` | Идентификациони податоци + flyer | Идентификациони податоци |
| `fotografii.html` | Photo gallery (15 photos, lightbox) | ФОТОГРАФИИ |
| `dokumenti.html` | All documents + curriculum links | Програмски документи, Годишни сметки, Наставни планови |
| `404.html` | Not-found page | |

## Preview locally

```sh
cd website
python3 -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` straight from disk also works. The only thing that needs a server is the
“missing document” check (see below).

## Deploy to GitHub Pages

1. Create a repository and push the **contents of this folder** as the repository root.
2. On GitHub, go to **Settings → Pages → Build and deployment**. Pick **Deploy from a branch**, then `main` and `/ (root)`.
3. The site goes live at `https://<user>.github.io/<repo>/`. All links are relative, so it also works under a sub-path.

To use the school domain `marijakirisklodovska.edu.mk`, add a file named `CNAME` containing just
`marijakirisklodovska.edu.mk`. Then point the domain's DNS at GitHub Pages: A records to
185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, or a `www` CNAME to `<user>.github.io`.

## Documents

Only documents that exist are listed. Four from the old site are not on the site yet, because the files
received were blank: Програма за развој 2024–2028, Годишна програма за работа, Годишен извештај за работа
and Самоевалуација.

To add a document, put the PDF in `dokumenti/` and copy an existing `<li class="doc">…</li>` row in
`dokumenti.html` (and in `index.html` if it should show on the home page), then change the title and file name.
Keep the `data-doc` attribute on PDF links: if a file is ever missing, its row shows “Наскоро достапно”
instead of a broken link.

## Removed for now

The Е-училница page (`e-ucilnica.html`, materials per year) and its band on the home page were removed
because there are no materials yet. They are in the git history (commit `d06096d`) to restore later.

## Notes

- The header, footer and contact block are repeated in every page. When changing the menu,
  change it in all `.html` files (a find-and-replace works).
- Colours and fonts are defined at the top of `assets/css/style.css`: navy `#001937`,
  crimson `#9b0b22`, with Oswald for headings and Onest for text, both from Google Fonts.
- Images are converted to WebP (the original ~55 MB of media became ~3.8 MB).
- Facebook: <https://www.facebook.com/marijakirisklodovska.skopje/>, Instagram: <https://www.instagram.com/sugs_mks/>.
  The old site linked to them, but the URLs weren't in the export, so they were looked up. Check that they are still the official accounts.
