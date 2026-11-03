# KennCo homepage

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
- Header and hero span the full viewport. The artwork uses the transparent photo and SVG frame from the supplied `hero-tailwind.html` reference. The six stars use the exact supplied `hero image (2).png` as one transparent layer, preserving the shapes, gradients and spacing. Its absolutely positioned 680 px desktop stage floats within the left column, revealing the full width on large screens and clipping at the viewport's left edge on smaller desktops. The fixed 544 px desktop hero clips the artwork precisely at its bottom edge. Reference screenshots are not used as page assets. Lower sections use a maximum 1200 px content area. Product cards have one column below 360 px, two from 360 px, and four from 1024 px.
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
- Browser layout checks at 320, 360, 390, 768, 1024, 1280 and 1440 px; no horizontal document overflow.
- Desktop and mobile screenshot inspection, local asset loading and console checks.
- Mobile menu opening, reverse Tab containment, Escape and focus restoration.
- FAQ exclusive opening/collapse, invalid-email rejection and required newsletter consent.
- Key text contrast ratios: body 5.87:1, primary CTA 5.47:1, brand-blue headings 8.41:1 and white newsletter headings 8.41:1.

Local QA screenshots and reports are in `.qa/` and are intentionally excluded from Git.

## GitHub source package

The source ZIP contains repository files, source code, local assets and optional asset extraction scripts. It excludes dependencies, build output, QA captures, machine-specific files and superseded hero artwork. Extract the ZIP and upload its contents to the repository root. Install with `pnpm install --frozen-lockfile`, then run `pnpm typecheck` and `pnpm build`.

The original Figma file is not required to run or build the app. Asset provenance in the source manifest includes historical references used during extraction.
