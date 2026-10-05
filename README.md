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
| `e-ucilnica.html` | Е-училница, materials per year | “1–4 година” buttons (the pages were empty) |
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

## Documents: files that still need to be uploaded

These are still missing. Put them in `dokumenti/` with exactly these names. Until a file exists, its row shows
“Наскоро достапно” instead of a broken link. Once uploaded, it becomes an “Отвори” link automatically.

| Document | File name |
| --- | --- |
| Програма за развој 2024–2028 | `Programa-za-razvoj-2024-2028.pdf` |
| Годишна програма за работа | `Godishna-programa-za-rabota.pdf` |
| Годишен извештај за работа | `Godishen-izveshtaj-za-rabota.pdf` |
| Самоевалуација | `Samoevaluacija.pdf` |

The other documents, the annual accounts (`787.pdf`, `903.pdf`, `603.pdf`) and the payment slips
(`uplatnici.pdf`, with the account details valid from 01.09.2026) are uploaded.

To add a new document, copy an existing `<li class="doc">…</li>` row in `dokumenti.html`
and change the title and file name. Keep the `data-doc` attribute on PDF links.

## Adding Е-училница materials

In `e-ucilnica.html`, each year has a commented example. Put the files in `materijali/1-godina/` (etc.),
replace the “сè уште не се објавени” paragraph with the list, and uncomment it.

## Notes

- The header, footer and contact block are repeated in every page. When changing the menu,
  change it in all `.html` files (a find-and-replace works).
- Colours and fonts are defined at the top of `assets/css/style.css`: navy `#001937`,
  crimson `#9b0b22`, with Oswald for headings and Onest for text, both from Google Fonts.
- Images are converted to WebP (the original ~55 MB of media became ~3.8 MB).
- Facebook: <https://www.facebook.com/marijakirisklodovska.skopje/>, Instagram: <https://www.instagram.com/sugs_mks/>.
  The old site linked to them, but the URLs weren't in the export, so they were looked up. Check that they are still the official accounts.
