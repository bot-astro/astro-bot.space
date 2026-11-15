# Home lab experiment (`/home-lab`)

A second homepage prototype, built next to the approved one (see `homepage-redesign.md`, which stays untouched at `/`). It is a scroll story in which a camera moves around a fake Discord server and then a fake dashboard. It is an experiment to compare against `/`, not a replacement yet.

Status: prototype, reviewed visually on desktop Chrome only. Not tested on real phones or old laptops yet (see "How to test"). Other locales are not synced.

## What the page does

1. **Hero** (`HomeHero`, reused as is): name, tagline, invite button, server count, open source badge, marquee of servers. A vertical "Scroll to explore" cue on the right edge fades out after the first scroll.
2. **Pinned stage** (`HomeLabStage`, desktop >= 1024px and no reduced motion): the section is pinned and a single GSAP timeline, scrubbed by scroll, drives everything.
   - A fake Discord server (3000x1700 design px, scaled down to fit) is the "world". A camera (translate + scale of the world) zooms into a target, a panel explains it, everything outside the target is darkened, then the camera zooms back out before the next target.
   - Discord steps: temporary voice channels, numbered channels (Squad Alpha, Bravo...), the default Astro interface (recreated from `public/guides/default_interface.png`), voice roles (member list). The generators on the first two steps are **clickable**: join creates your channel, Leave deletes it (same GSAP height animation as the old demo).
   - The Discord world exits through the top and a fake dashboard rises from below.
   - Dashboard steps: sidebar and sections, generator editor (name template, rename switches, then the real "unsaved changes" bar with the green save button), interface buttons layout, errors list.
   - The dashboard exits, the finale fades in: "Your server is ready for Astro" with the invite button.
3. **Footer** via the `lab` layout (`app/layouts/lab.vue`): the default layout plus `HomeLabFooterWordmark`, a giant outlined "ASTRO" under the footer whose letters rise on scroll and which has a gradient spotlight following the cursor. The footer itself is the existing one; the user said it is not great, ignore for now.
4. **Mobile, tablet, reduced motion**: no pinning and no camera, just stacked text cards (one per step). The dashboard steps are included in the cards.

## Files

- `app/pages/home-lab.vue`: page, Lenis smooth scroll (same setup as `index.vue`), scroll cue, uses layout `lab`.
- `app/layouts/lab.vue`: default layout + footer wordmark.
- `app/components/home/HomeLabStage.vue`: the stage (fake Discord, fake dashboard, panels, finale, timeline). One big file on purpose, nothing else uses its parts.
- `app/components/home/HomeLabFooterWordmark.vue`: the footer effect.
- Text in `i18n/locales/en-US.json` under `home.lab.*` (hint, try, finale, steps.*).
- The dashboard mock uses the **real dashboard components and classes** (`GroupSetting`, `Switch`, `Button*`, `IconGenerator`..., `.group-setting`, `.text-group-name`, `.dashboard-section-title`) and real i18n keys, so it follows the real UI. Differences: content is capped at ~768px wide so zooms read well, interface buttons use plain emoji instead of Discord custom emoji, sample names are English and hardcoded.

## How the camera works (and why)

- Every step has a target element (`data-target`), a ring element (`data-ring-id`), a side for the panel and optional reveal elements (`data-reveal`).
- Camera position is computed from the target's `offsetLeft/offsetTop` chain up to its world (ignores transforms, so it is stable while animating) and applied as GSAP `x`, `y`, `scale` with `transform-origin: 0 0`. Values are functions and the ScrollTrigger uses `invalidateOnRefresh`, so a resize recomputes everything.
- The darkening is one element: the ring has a 4000px spread box-shadow, and the world has `overflow: hidden`, so everything outside the target is dimmed. It is a single element animating opacity, no overlays.
- The Discord world is drawn at "2x Discord" size and the max zoom is capped at 1 so the layer stays crisp (the layer uses `will-change: transform`, text is rasterised at scale 1). The dashboard is drawn at real size and zooms up to 2x, without `will-change`.
- Pin length scales with the timeline duration (105px per timeline unit) so adding steps does not change the feel.
- Step counter (01...08) and the progress bar come from the timeline time.

### Decisions and alternatives

- **DOM + GSAP** instead of canvas/WebGL/video: text stays selectable, translatable, crisp, and it reuses real components. Cost: the world must stay at zoom <= 1 for crispness, and it is a big DOM layer.
- **Single scrubbed timeline** instead of one ScrollTrigger per step: easier to reason about overlaps (exit of one world while the next one enters) and one pin.
- **Panels in site style** (not sci-fi HUD): the first version had HUD corners and scanlines, the user wanted the site style.
- **Finale**: tried (1) dim overlay with a card, (2) zoom into the Astro icon, (3) current: demo shrinks and leaves through the top, dark background, content rises from below. The user picked (3).
- **Layout per page** (`lab`) for the footer effect so the shared layout is not touched.

## Performance and SEO measurements

Method: production build (`MOCK_DISCORD_GUILDS=true pnpm build`, `node .output/server/index.mjs`), Lighthouse CLI (mobile preset = 4x CPU slowdown and slow 4G, plus desktop preset), and a Puppeteer script that scrolls the whole page with mouse wheel events (touch-like `scrollBy` on a 390px viewport) while recording `requestAnimationFrame` deltas and long tasks, with CPU throttled 1x, 4x, 6x. Compared against `/`. Headless Chrome on an Apple Silicon Mac, software rendering.

|                        | `/` mobile | `/home-lab` mobile | `/` desktop | `/home-lab` desktop |
| ---------------------- | ---------- | ------------------ | ----------- | ------------------- |
| Lighthouse performance | 62         | 91                 | 100         | 98                  |
| LCP                    | 2.3s       | 2.4s               | 0.5s        | 0.5s                |
| TBT                    | 2,440ms    | 170ms              | 0           | 60ms                |
| CLS                    | 0.001      | 0.004              | 0           | 0                   |
| SEO score              | 100        | 100                | 100         | 100                 |

- Single Lighthouse runs vary a lot, so the 62 vs 91 mobile gap is not reliable on its own.
- JS transferred is about 1.28 MB on both pages, so GSAP and Lenis are a small part. The big chunks are existing site code (unused JS is flagged on both).
- Scroll test: ~60fps (16.7ms frames) at 1x, 4x and 6x CPU throttling, fewer than 0.5% of frames over 33ms at 4x/6x. Over-100ms frames: 5 at 1x, 2 at 4x, 0 at 6x. Long tasks happen at page load (hydration, ~1 to 1.5s total at 6x), same on `/`. Phone viewport (390px) with 4x/6x: flat 60fps (no pinned scene there).
- DOM size 1,245 elements vs 967 on `/`. JS heap ~21MB (1x) to ~37MB (6x), similar to `/`.
- SEO: SSR HTML contains the title, meta description, `h1`, hero text, step and finale text. The fake Discord and dashboard are `aria-hidden` and decorative; their content is repeated in the panels.

### Not measured

- Real devices (budget Android, old laptop, integrated GPU). Headless software rendering is not the same as real compositing.
- GPU memory (the Discord world layer is ~3000x1700, about 20MB of texture), input latency (INP) with real use.
- Accessibility with smooth scroll hijacking (Lenis) and a pin about 8,000px long, keyboard and screen reader behaviour.
- Slow network on a real phone.

## How to test on other devices

Same Wi-Fi as the dev machine. Use a production build, not `pnpm dev`, the dev server is much slower and gives misleading numbers.

```sh
MOCK_DISCORD_GUILDS=true pnpm build
HOST=0.0.0.0 PORT=3055 MOCK_DISCORD_GUILDS=true node .output/server/index.mjs
```

Then open `http://<machine LAN ip>:3055/home-lab` on the device (compare with `/`). On macOS the IP is `ipconfig getifaddr en0`. If it does not load, check the firewall allows node.

What to check: smoothness while scrolling the pinned part, hero load time, whether a click on "Join to create" works (touch devices below 1024px get the plain cards instead), footer wordmark. Chrome DevTools on a Mac: Performance tab, CPU 4x/6x slowdown, record a scroll. Lighthouse: `npx lighthouse http://localhost:3055/home-lab --preset=desktop` (or without preset for mobile).

## Ideas and open questions

- Make the dashboard mock clickable too (toggle a switch shows the save bar, Save dismisses it).
- Make the voice role step interactive (join "Gaming VC", get the role and the text channel).
- Device check that falls back to the plain cards on weak hardware, or skip Lenis and the dashboard section there. Only if device tests show a problem.
- Other footer effects, below the footer: glowing planet horizon, cursor image trail, curtain reveal (footer sits under the page and the content slides off it; needs layout changes). The curtain reveal needs the shared layout, so it would have to be opt-in per page.
- The footer itself is not great (user feedback), redo later.
- The voice role target sits at the far right edge of the fake Discord, so the zoom shows empty space past it.
- Dashboard panel text zoomed to 2x: check it is not soft mid-zoom on real displays.
- Translate the sample names and mock labels (currently English only), and sync `home.lab.*` to the other languages before shipping.
- A real mobile story (not only cards), if the desktop one is kept.
- Real server icons and counts from the API (`useHomeShowcase`).

## Before shipping

- Decide `/` vs `/home-lab`, or merge ideas, then move the winner to `index.vue` and delete the other.
- Sync `home.lab.*` (and the redesign keys) to `ar de es-ES fil fr id it ko pt-BR th` after the wording is confirmed (see `CLAUDE.md`).
- Remove the unused old keys `home.temp_vc`, `home.default_interface`, `home.custom_interface`, `home.voice_role` if `/` is replaced.
- Do not commit `.claude/skills/` or `skills-lock.json`.
