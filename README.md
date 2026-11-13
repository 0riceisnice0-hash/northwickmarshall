# Northwick Marshall

Northwick Marshall Consulting website. A navy-and-gold visual direction with a dependency-free static build, automatically deployed to GitHub Pages from `main`. Ben's 10 November feedback, company copy, and the supplied portraits and biographies for Ben, Rebecca and Cate are incorporated.

## Preview and checks

```sh
npm run build
npm run check
npm run dev
```

Local preview: http://127.0.0.1:4173/northwickmarshall/

## Pages

Home, About, Services, Diagnose, Design & Deliver, Partner and Transform, Associates, Contact, Privacy and a custom 404. The renamed service retains `transform.html` for existing links.

## Content editing

Shared layouts, supplied text, people and placeholder copy live in `build.mjs`. Shared styles and interaction code live in `assets/styles.css` and `assets/site.js`; homepage layout and footer measurement live in `assets/home.css` and `assets/home.js`; the portrait gallery and inline biographies use `assets/people.css` and `assets/people.js`. Run the build after editing; `dist/` is generated and not committed.

## Design system

- Deep navy `#031f40`, gold `#dbb93d`, and warm white `#f5f3e9`. Three colours carry the whole interface.
- Upright DM Sans for all interface typography; the original-style serif wordmark is retained. No italics, monospaced UI or negative tracking.
- Measured responsive headings, a shared content width and consistent spacing. The homepage places business consultancy copy over a stationary city photograph.
- Services use large photographs and whitespace rather than bordered containers. Solid gold sections give the approach and final contact action a distinct hierarchy.
- Square controls and consistent 1.5px arrows. No pills, numbered sections, eyebrows, decorative diagrams, shadows or gradients.
- Gold buttons are the primary action; a navy inverse is used on gold sections. Focus states, reduced-motion support, keyboard menu dismissal, useful hover feedback and polite email-preparation feedback are included.
- The public site uses Latin copy for unfinished text and omits draft notices, waiting labels and placeholder captions.

## Stacked homepage sections

The hero, service introduction and company section each occupy exactly one stable viewport. CSS sticky positioning lets each following section rise over the previous one. The hero transition starts immediately; the services and company panels each have a short, responsive scroll runway after settling into place, giving time to read before the next panel enters. The yellow contact section fills the viewport remaining after the actual footer height, so the ending always covers the previous section completely. On standard desktop proportions this is a 75% contact / 25% footer split.

`assets/home.js` measures the footer when its size changes. Phone layouts prioritise the supplied text and omit the supporting stock photos to fit the viewport. Overflow remains scrollable on exceptionally short viewports, so content is never clipped. Scrolling is not intercepted and photographs remain static.

## Associates experience

The version switch shares direct `?version=1` and `?version=2` links. Version 2 arranges clickable hexagonal portraits around the full biography on desktop, reflowing into a compact honeycomb above the biography on phones. Version 1 uses a five-column, staggered monochrome portrait composition on desktop and a three-column grid on phones with colour returning on hover or keyboard focus. Hovering, focusing or tapping a portrait reveals the full supplied biography directly beneath the gallery, with no additional action. The selected portrait lifts slightly and stays in colour; the biography enters with a short fade and upward movement. All five portraits are visible without a horizontal scroller. Scrollbars are hidden while normal page scrolling remains available. Desktop biographies share a stable reading area to prevent page jumps, while phone layouts flow to fit the selected text. Reduced-motion preferences disable the text animation. Without JavaScript, all biographies remain available in normal document flow. Direct links select the corresponding person's inline profile.

## Prototype status

- The headline, introduction, company copy and associate biographies use Ben's supplied feedback. Service summaries and the detailed Diagnose paragraph originate in the supplied screenshots. The public copy spells out small and medium businesses rather than using the acronym.
- Additional paragraphs intentionally use Latin placeholder copy; this includes the Privacy policy, which is a layout draft, not a completed policy.
- WhatsApp/phone is TBC internally and displays a short Latin placeholder. No invented number or dead WhatsApp link is published.
- Ben Thompson, Rebecca Wood and Cate Hutchins-Emery have complete supplied profiles. Two additional associate slots use the requested placeholder names Matt Smith and Craig Charles with Latin biographies with neutral SVG portrait silhouettes until their details are supplied.
- The enquiry form prepares a `mailto:` message in the visitor's own email app. It does not submit data to a backend or claim an email has been sent.
- `northwickmarshall.co.uk` is shown as the intended business domain. No CNAME or DNS change is made; the preview stays at the GitHub Pages address.
- All pages carry `noindex,nofollow`, and robots.txt disallows crawling while this is a draft. Remove those only after approving final copy and launch details.
- The office image is an AI-generated design concept. Its provenance is recorded in `ASSETS.md`; the public caption is omitted.
- The SVG logo follows the separated outer diamonds and interwoven gaps in the original screenshot, with stronger strokes. An original vector master can replace it if supplied later.

## Deployment

`.github/workflows/pages.yml` builds, validates, uploads only `dist/`, and deploys it through the official GitHub Pages actions. The repository's Pages source must be set to GitHub Actions. Pushing to `main` updates the preview automatically.

## Before final launch

Replace remaining Latin copy and the privacy draft; confirm service details and WhatsApp number; decide whether to add LinkedIn; approve contact delivery; connect the business domain and update final metadata.

See `ASSETS.md` for image provenance and the office-generation prompt.
