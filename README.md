# Northwick Marshall

First-stage design prototype for Northwick Marshall Consulting. Built as a dependency-free static website, automatically deployed to GitHub Pages from `main`.

## Preview and checks

```sh
npm run build
npm run check
npm run dev
```

Local preview: http://127.0.0.1:4173/northwickmarshall/

## Pages

Home, About, Services, Diagnose, Design & Deliver, Transform, Associates, Contact, Privacy and a custom 404.

## Content editing

Shared layouts, supplied text and placeholder copy live in `build.mjs`. Styles and interaction code live in `assets/styles.css` and `assets/site.js`. Run the build after editing; `dist/` is generated and not committed.

## Design system

- Navy `#062444`, gold `#d1ad43`, warm white `#f7f6f0`, neutral surface `#eeeee5`, body text `#445465`.
- Upright Libre Caslon Display for main headings; DM Sans for body, navigation and controls. No italics or monospaced UI.
- Responsive heading sizes, a shared content width, a shared section spacing scale and two-column editorial layouts.
- Solid backgrounds, square controls, consistent 1.5px arrow strokes. No pills, numbered sections, bordered cards, decorative diagrams or gradients.
- Gold buttons are the primary action. Focus states, reduced-motion support, keyboard menu dismissal and polite email-preparation feedback are included.

## Prototype status

- The headline, introduction, service summaries and detailed Diagnose paragraph come from Ben's supplied screenshots.
- Additional paragraphs intentionally use Latin placeholder copy; this includes the Privacy policy, which is a layout draft, not a completed policy.
- WhatsApp/phone is TBC. No invented number or dead WhatsApp link is published.
- Ben Thompson is the only supplied team name. Three associates and all portraits await real details. Portrait placeholders are deliberately neutral.
- The enquiry form prepares a `mailto:` message in the visitor's own email app. It does not submit data to a backend or claim an email has been sent.
- `northwickmarshall.co.uk` is shown as the intended business domain. No CNAME or DNS change is made; the preview stays at the GitHub Pages address.
- All pages carry `noindex,nofollow`, and robots.txt disallows crawling while this is a draft. Remove those only after approving final copy and launch details.
- The office image is an AI-generated design concept and is visibly labelled as such. It is not a claim about a real office.
- `assets/mark.svg` is a provisional vector reconstruction of the supplied screenshot emblem, pending the original logo asset.

## Deployment

`.github/workflows/pages.yml` builds, validates, uploads only `dist/`, and deploys it through the official GitHub Pages actions. The repository's Pages source must be set to GitHub Actions. Pushing to `main` updates the preview automatically.

## Before final launch

Replace Latin copy and the privacy draft; confirm service details; supply original logo, four portraits, bios and WhatsApp number; decide whether to add LinkedIn; approve contact delivery; connect the business domain and update final metadata.

See `ASSETS.md` for image provenance and the office-generation prompt.
