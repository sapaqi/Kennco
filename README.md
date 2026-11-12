# KennCo — Homepage & Home Insurance

Local React + TypeScript + Vite prototype, styled with Tailwind CSS 4 and its official Vite plugin. The design is based on the supplied **KennCo UI (Antti) (Copy).fig**, frames **Homepage 1281** (`2003:1165`) and **Homepage 390** (`2007:2791`).

## Run

Use Node.js 22.15+ or 24+ and pnpm.

```sh
pnpm install
pnpm dev
```

Open the Local URL printed by Vite, normally **http://127.0.0.1:5173/**.

```sh
pnpm typecheck
pnpm build
pnpm preview
```

The app is a frontend prototype. There is no backend, analytics, subscription service or production deployment. The newsletter preserves the original fields and consent checkbox, uses native validation, and does not send or store personal information. Prototype notices are kept out of the customer-facing layout.

## Design

- Preserves the source logo, product icons, hero photograph, three article photographs, Plus Jakarta Sans headings and Poppins body text.
- Retains the original blue/green brand. Amber is limited to the Travel card and small decorative accents.
- Preserves the approved header and hero composition, with the stronger headline/underline and refreshed primary and outlined secondary buttons. The cover cards and Quick Links retain their accepted visual refresh.
- Header and hero backgrounds span the viewport. From 1440 px, their inner layout shares the same fluid container as all lower sections, including the newsletter and footer. The logo aligns with this content grid instead of the viewport edge. From 1440 px, the hero reveals the upper 80% of its artwork: the section bottom clips the image just below the fingertips while keeping the bottom arc hidden. A wider text column sits beside it with a smaller gap and a balanced heading. Smaller screens retain their approved cropped composition. The supplied star PNG preserves its original shapes, gradients and spacing.
- Desktop dimensions use rem units alongside Tailwind's rem utilities. The root scale grows smoothly from 16 px at 1440 px to 20 px at 2560 px, capped at 22 px. The shared container grows between 83 rem and 110 rem using an 81 vw target. This fills wider screens while allowing the outer margins to grow, particularly above 1920 px. Below 1440 px, the original 16 px scale and responsive layouts are retained.
- The newsletter is approximately 20% taller at every breakpoint than the previous fluid-layout revision, using responsive vertical padding (6.4 rem desktop, 5.45 rem tablet, 6.6 rem mobile). Its fields stay in one row on desktop. Mobile keeps its stacked layout. Product cards have one column below 360 px, two from 360 px, and four from 1024 px.
- Section taglines and the FAQ introduction/help block are restored as requested. Enabled testimonial arrows have matching hover, active and keyboard-focus states.
- Uses CSS transitions and IntersectionObserver for one-time section reveals. `prefers-reduced-motion` removes animations, smooth scrolling and hover movement; content defaults to visible before enhancement.
- Mobile navigation supports focus containment, Escape, focus restoration and scroll locking. FAQ buttons expose their expanded state and reference the controlled answer regions.

## Source assets and content

`public/assets/source-manifest.json` records the original image hashes and asset mapping. All site images and fonts are served locally. Font licences are in `public/assets/fonts/`.

The supplied Figma file embeds the logo and four product icons as **raster images**, even though they are wrapped in Figma components. The prototype retains those exact originals rather than redrawing the brand artwork or claiming it is vector. Icon exports only trim transparent padding and resize for delivery; photographs have responsive WebP versions. Genuine vector masters can replace these assets when available.

The two draft article titles **12 Last-Minute Checks Before Your Irish Driving Test** and **Are E-scooters Legal in Ireland?** are preserved from the design. Neither had a matching published article in KennCo's public catalogue during verification. Their CTAs retain the source wording **Read full article**, with the working KennCo blog as the current destination. The published home insurance article links directly to its article page.

Visible copy follows the supplied design unless a change is explicitly requested. FAQ questions, the first substantive answer and the six unfinished Lorem ipsum answers are preserved. Customer review excerpts and names are retained; the source Trustpilot summary sits on the left with no quote CTA. Article metadata is restored from the design: 24/09/26 and News/Learn categories.

To regenerate assets from the supplied local file (not needed to run the app):

```sh
node scripts/extract-assets.cjs "path/to/KennCo UI (Antti) (Copy).fig"
node scripts/export-original-hero.cjs "path/to/KennCo UI (Antti) (Copy).fig"
node scripts/download-fonts.mjs
```

The extraction script reads the embedded Kiwi schema and original image files directly. It does not upload or modify the `.fig` file. The font script downloads the two original families and their OFL licences from Google Fonts. The optional `node scripts/check-links.mjs` checks public KennCo links and writes a report under ignored `.qa/`.

## Verification

- TypeScript check and production Vite build.
- Latest browser layout checks at 320, 390, 768, 1024, 1280, 1440, 1920, 2560 and 3840 px: no horizontal document overflow, hero copy contained, artwork clear of copy with a stable 80% vertical crop from 1440 px, and shared desktop container alignment.
- Desktop and mobile screenshot inspection, local asset loading and console checks. Desktop carousel advances using the measured card width and gap so navigation follows the fluid scale.
- Mobile menu opening, reverse Tab containment, Escape and focus restoration.
- FAQ exclusive opening/collapse, invalid-email rejection and required newsletter consent.
- Key text contrast ratios: body 5.87:1, primary CTA 5.47:1, brand-blue headings 8.41:1 and white newsletter headings 8.41:1.

Local QA screenshots and reports are in `.qa/` and are intentionally excluded from Git.

## GitHub source package

The source ZIP contains repository files, source code, local assets and optional asset extraction scripts. It excludes dependencies, build output, QA captures, machine-specific files and superseded hero artwork. Extract the ZIP and upload its contents to the repository root. Install with `pnpm install --frozen-lockfile`, then run `pnpm typecheck` and `pnpm build`.

The original Figma file is not required to run or build the app. Asset provenance in the source manifest includes historical references used during extraction.

## Home Insurance

Open `/home-insurance/` or use Home in the header or cover cards. The product page uses the supplied frame **Home Insurance** (`2021:2096`, 1280 × 3745), preserving the section order and all 64 extracted text strings. Shared UI primitives live in `src/ui.tsx`; page-specific copy and styles are in `src/home-insurance-content.ts` and `src/home-insurance.css`. The product hero uses the supplied house2.png as a softly faded backdrop behind the original summary table.

The original source has unfinished copy: 10% in the summary versus 30% in the intro, car-related descriptions in several Home cover cards, a duplicated FAQ, six Lorem ipsum answers, and a Claims form badge on the Policy Booklet. These remain unchanged as requested. The source snapshot is in `public/assets/home-insurance-source.json`. Related links without a separate verified destination use the main KennCo Home Insurance page or the local standard-cover section.

The header quote button uses the Home quote destination on this page; the logo and breadcrumb return to the local homepage. Quote and PDF destinations were verified on KennCo. The Netlify `_redirects` file supports direct entry and refresh on the product URL. There is no new API or backend.

Validation: TypeScript and production build; DOM layout checks at 320, 360, 390, 768, 1024, 1280, 1440, 1920, 2560 and 3840 px; no horizontal overflow or table/copy overlap. Desktop screenshots inspected across hero, cover cards and documents. Mobile geometry and keyboard interactions verified; the browser screenshot service failed under viewport overrides, so no mobile visual screenshot was available in this run. FAQ exclusive expansion, expand-all, menu Escape/focus restoration, local cross-page navigation and product-route refresh passed. The page loaded both logo instances correctly and had no console errors.

### Optional extras update

The supplied `das.jpg` adds Optional extras / Tailor your policy as the first section immediately after the product hero. Four cards preserve its wording, with large vector icons, layered circular motifs and blue, green, teal and amber accents. Layout uses four columns on desktop, two on tablet and one below 600 px. Related links above the footer use inline arrows with a 0.625 rem gap. Layout checks passed at 320, 390, 600, 768, 1024, 1440 and 2560 px without document overflow; four cards remain present at every size.

## Full source delivery - 12 November 2026

This package includes all current pages and the Get a quote start screen at `/get-a-quote/`, using existing KennCo product icons and shared UI components.

Unzip and upload the contents to the root of your GitHub repository (not the ZIP itself). Include `.gitignore`. This is the complete source project, not just changed files.

Prerequisites: Node.js 22.15+ or 24+ and pnpm. Install pnpm with `npm install -g pnpm` if needed.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

For hosting: run `pnpm build` and publish `dist`. Configure SPA fallback to `/index.html` for page routes; `public/_redirects` includes the Netlify fallback. Uploading source to GitHub alone does not publish a running website. GitHub Pages under a repository subpath requires additional base-path and routing configuration.

Delivery validation: TypeScript passed on 12 November 2026. Production build was attempted but blocked by the execution environment (`spawn EPERM` starting esbuild), so this delivery's build and visual preview are not verified. Earlier validation notes above describe earlier revisions.
