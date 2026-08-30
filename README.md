# Legacy Minerals Limited — corporate website

Single-page corporate site for Legacy Minerals Limited, built so that changing words, images,
colours or contact details never requires touching a component.

**Stack:** React 19 · TypeScript (strict) · Vite 6 · CSS Modules · no UI framework, no runtime dependencies beyond React.

## Quick start

Requires Node.js 20.19 or newer (`.nvmrc` pins 20).

```bash
npm install          # first time only
npm run format       # once after the first install, to normalise formatting
npm run dev          # local preview at http://localhost:5173 with hot reload
npm run build        # production build → dist/
npm run preview      # serve dist/ locally to check the build
```

Quality checks (also run in CI on every push and pull request):

```bash
npm run typecheck    # TypeScript, strict mode
npm run lint         # ESLint (typescript-eslint + React hooks rules)
npm run check        # both of the above
```

## Where things live

```
index.html                 Page shell: <title>, meta description, Open Graph, JSON-LD, fonts
public/                    Static files served as-is at the site root
  images/logo-full.jpg     Full logo lockup (footer)
  images/logo-emblem.png   Round LM emblem (header, favicons)
  images/founder.jpg       Founder photo slot — currently the logo, replace when a portrait exists
  favicon.png, apple-touch-icon.png, icons/, og-image.jpg, site.webmanifest, robots.txt
src/
  content/site.ts          Company name, tagline, RC number, contact details, navigation, image paths
  content/sections.ts      Every sentence on the page, section by section
  types/content.ts         The shapes the content files must follow (TypeScript enforces them)
  styles/tokens.css        Design tokens: brand colours, fonts, spacing, and the light/dark "tones"
  styles/global.css        Reset, base typography, a few shared text utilities
  components/ui/           Section, Container, Eyebrow, Button, Reveal — small reusable pieces
  components/layout/       Header and Footer
  components/QuarryCrossSection.tsx   The hero drawing (SVG)
  sections/                One folder-free file per page section, each with its own .module.css
  hooks/                   useScrolled, useInView
  lib/                     cx (class names), format (tel:/mailto: helpers), enquiry (form sending)
  App.tsx                  Page order
  main.tsx                 Entry point
```

## Everyday edits

### Change any text

Open `src/content/sections.ts`. Each section is a plain object; edit the strings and save.
If you remove a required field, `npm run typecheck` tells you exactly what is missing.

### Contact details, RC number, navigation

Open `src/content/site.ts`. Anything in square brackets, such as `[Add phone number]`, is a
placeholder and renders as plain text. As soon as you replace it with a real value it becomes a
clickable `tel:` or `mailto:` link automatically. Several phones or emails are fine — they are arrays.

### Images

Replace the file in `public/images/` and keep the filename; nothing else needs to change.

- `founder.jpg` — the logo is standing in for the founder's portrait. Use a portrait at least
  800 px wide, ideally 4:5 (e.g. 1200 × 1500). Then update `photoAlt` in `content/sections.ts`.
- `logo-full.jpg` / `logo-emblem.png` — regenerate from the master logo if it changes.
- Favicons and the Open Graph image were cut from the same logo; regenerate them together.

### Colours, fonts, spacing

Everything is in `src/styles/tokens.css`. The palette was sampled from the logo
(`--navy-950` is the exact logo background, so the header and footer blend with it).

Sections declare a **tone** — `light`, `alt`, `dark` or `brand` — and components only read
semantic variables (`--bg`, `--fg`, `--accent`, `--btn-bg`, …). To restyle a whole tone, edit
its block in `tokens.css`; to move a section onto a different background, change its `tone` prop.
Components never hard-code colours.

### Add a section

1. Add a content object (and its type in `types/content.ts`) to `content/sections.ts`.
2. Create `src/sections/NewSection.tsx` with a matching `NewSection.module.css`. Use
   `Section`, `Container`, `Eyebrow` and `Reveal` from `components/ui` so it matches the rest.
3. Add it to the page order in `App.tsx`.
4. If it should appear in the menu, add a link to `nav` in `content/site.ts`.

### Enquiry form

The site is static, so the form hands the message to a hosted relay. The mode is chosen
automatically from `contact.formEndpoint` in `content/site.ts`:

- **Set to a POST endpoint (current setup):** the form submits as JSON and shows a confirmation.
  It currently points at FormSubmit, which forwards each enquiry to `umaralfaruq02@gmail.com`.
  Formspree, Basin, Getform or your own API work the same way — paste the URL and nothing else
  changes. `_subject` and `_replyto` are sent along, so replying to the notification answers the
  visitor directly.
- **Empty:** the form falls back to opening the visitor's email app with the message prepared,
  addressed to the first entry in `contact.emails`. That entry is still a placeholder, so the
  fallback does nothing until a real address replaces it.

**First submission activates the address.** FormSubmit needs no account, but the very first POST
to a new address triggers a confirmation email from them. Open it and click Activate; enquiries
are only delivered from then on.

**Then hide the address.** The endpoint above contains the inbox in plain text, and it ships in
the JavaScript bundle where scrapers can read it. Once activated, FormSubmit shows a hashed
endpoint (`https://formsubmit.co/ajax/<random-hash>`) that relays to the same inbox without
naming it — swap it into `formEndpoint` and the address is no longer public.

A hidden `_honey` field sits in the form as a spam trap. Visitors never see it; submissions that
fill it are silently dropped in the browser and never reach the relay.

### SEO

Title, description, canonical URL and the Organization JSON-LD block are in `index.html`.
Replace `https://www.legacyminerals.example/` with the live domain when it exists.

## Deploying

The build is static, so any static host works. Build command `npm run build`, output directory `dist`.

- **Cloudflare Pages / Netlify / Vercel** — connect the Git repository; they build on every push,
  give a preview URL per pull request, and handle HTTPS for the custom domain.
- **Any web host / cPanel** — upload the contents of `dist/`.

Because the site is a single page there are no routes to configure. If it grows to multiple
pages, add `react-router` (client-side) or migrate to Next.js if server rendering matters for SEO.

## Conventions

- Content lives in `src/content`; components are content-agnostic and receive data by import.
- One CSS Module per component; class names in camelCase; no global class names except the few
  utilities in `global.css` (`prose`, `lede`, `ledeSm`, `skipLink`, `visuallyHidden`).
- Accessibility floor: semantic landmarks, skip link, visible focus ring, labelled form fields,
  `aria-expanded` on the menu button, alt text on images, reduced-motion respected.
- No dependencies are added without a reason written in the pull request.

## Ideas for the next iteration

- Operations / projects section with site photographs and the minerals produced
- Downloadable company profile (PDF) in the header
- Privacy-friendly analytics (Cloudflare Web Analytics or Plausible, no cookie banner needed)
- News or announcements once there is something to announce
