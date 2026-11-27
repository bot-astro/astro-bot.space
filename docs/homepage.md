# Homepage (`/`)

The homepage is a scroll story in which a camera moves around a fake Discord server and then a fake dashboard. It replaced the previous GSAP homepage (`homepage-redesign.md`, kept for history) after the `/` experiment was picked.

Status: reviewed visually on desktop Chrome only. Not tested on real phones or old laptops yet. Other locales are not synced.

## What the page does

1. **Hero** (`HomeHero`): name, tagline, invite button, server count, open source badge, marquee of servers. The purple glow behind it has a mask so it fades out instead of being cut by the section edge.
2. **Pinned stage** (`HomeStage`, desktop >= 1024px and no reduced motion): the section is pinned and a single GSAP timeline, scrubbed by scroll, drives everything.
   - A fake Discord server (3000x1700 design px, scaled to fit) is the "world". A camera (translate + scale) zooms into a target, a panel explains it, everything outside the target is darkened, then the camera zooms out.
   - Discord steps: temporary voice channels, numbered channels (Squad Alpha, Bravo, Charlie), the default Astro interface, voice roles. The generators on the first two steps are **clickable**: join creates your channel at the **end** of the category list (Squad Delta for squads), Leave deletes it.
   - The Discord world exits through the top and a fake dashboard rises from below. Dashboard steps: sidebar, generator editor, interface buttons layout, errors list. Then the dashboard exits through the top and the pin ends.
   - A "Scroll to explore" chip sits at the bottom of the stage when the demo starts and fades out on the first scroll.
3. **Open source card and "Voice Channels Exclusive" card** (`HomeOpenSource`, `HomeCta`), outside the demo.
4. **Footer**: the footer plus `HomeFooterMarquee` (rendered by the `default` and `guide` layouts, so every non-dashboard page has it), two rows ("Temporary voice channels" / "Voice roles") that move horizontally with the page scroll. When the page is already at the bottom, wheel and touch input moves the rows further instead (the page does not move). Scrolling up is never captured: the page scrolls up right away and the rows keep their position. The wheel listener runs in the capture phase so it runs before Lenis. Disabled with reduced motion.
5. **Mobile, tablet, reduced motion**: no pinning and no camera, just `CoreFeatureBox` cards with their image (temp VC gif, default interface, custom interface, voice role gif), same concept as the old homepage.

## Flash before the intro animation

The server render shows the final content and GSAP only hides it after hydration, which causes a flash in production too (more visible in dev). The hero elements are hidden with CSS under `html.motion-ok`, a class added by an inline script in the page head unless the user prefers reduced motion. Both fake worlds start `invisible` in the markup and the timeline shows them. Elements further down the page are not an issue, they are below the fold.

## Files

- `app/pages/index.vue`: page, Lenis smooth scroll.
- `app/components/home/HomeStage.vue`: the stage. One big file on purpose.
- `app/components/home/HomeFooterMarquee.vue`: footer marquee and overscroll (used by `app/layouts/default.vue` and `guide.vue`).
- `app/data/astro/mocks/home-showcase.ts`: real largest servers (from BigQuery `GUILD_SNAPSHOT`), icons still to fetch from the Discord API.
- Text in `i18n/locales/en-US.json` under `home.stage.*` (try, steps.*), plus the old `home.temp_vc`, `home.default_interface`, `home.custom_interface`, `home.voice_role` (mobile cards), `home.exclusive`, `home.open_source`, `home.big_text`.
- Interface button emojis are the default Astro custom emojis (`Emojis.kt` in the astro repo), saved as `public/img/emojis/*.png` (downloaded from the Discord CDN by emoji id). The Discord mock and the dashboard mock share one list in `HomeStage.vue`.
- The dashboard mock uses the **real dashboard components and classes** and real i18n keys. Differences: content capped at ~768px wide, sample names are English and hardcoded.

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
- **Footer marquee in the shared layouts** (`default` and `guide`) so every non-dashboard page has it.

## Performance and SEO measurements

Method: production build (`MOCK_DISCORD_GUILDS=true pnpm build`, `node .output/server/index.mjs`), Lighthouse CLI (mobile preset = 4x CPU slowdown and slow 4G, plus desktop preset), and a Puppeteer script that scrolls the whole page with mouse wheel events (touch-like `scrollBy` on a 390px viewport) while recording `requestAnimationFrame` deltas and long tasks, with CPU throttled 1x, 4x, 6x. Compared against the previous homepage, measured before the swap (numbers are from the experiment, not re-measured after the latest changes). Headless Chrome on an Apple Silicon Mac, software rendering.

|                        | `/` mobile | `/` (new) mobile | `/` desktop | `/` (new) desktop |
| ---------------------- | ---------- | ---------------- | ----------- | ----------------- |
| Lighthouse performance | 62         | 91               | 100         | 98                |
| LCP                    | 2.3s       | 2.4s             | 0.5s        | 0.5s              |
| TBT                    | 2,440ms    | 170ms            | 0           | 60ms              |
| CLS                    | 0.001      | 0.004            | 0           | 0                 |
| SEO score              | 100        | 100              | 100         | 100               |

- Re-measured 2026-11-27 on the final page (prod build served by plain `node`, so no compression, which inflates FCP): mobile simulated 56 (LCP 11.7s), mobile with real throttling 76 (FCP and LCP 3.6s, CLS 0.001), desktop 84 (LCP 2.0s, CLS 0). Before the hero/font/script changes the same setup gave 56 (LCP 18s), 69 (LCP 5.0s) and 76 (LCP 3.3s). What moved LCP: the tagline is the LCP element and is never hidden (it used to wait for GSAP), the Evolve font is preloaded in `index.vue`, the particles script is `defer`, the hero buttons fade in with CSS instead of GSAP.
- SEO: Lighthouse 100 on both presets. `app.vue` sets canonical, `og:url`, `og:title` and `og:description` as `property` (they were `name`), `nuxt.config.ts` sets `og:type`, `og:site_name`, `og:image` and the twitter card, `index.vue` adds JSON-LD (`WebSite` and `SoftwareApplication`).
- Not fixed (site-wide, outside the homepage): the Chargebee and hCaptcha scripts load on every page, two 300 KB GIFs in the mobile cards, some `text-dimmed` contrast failures.
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

Then open `http://<machine LAN ip>:3055/` on the device (compare with `/`). On macOS the IP is `ipconfig getifaddr en0`. If it does not load, check the firewall allows node.

What to check: smoothness while scrolling the pinned part, hero load time, whether a click on "Join to create" works (touch devices below 1024px get the plain cards instead), footer marquee. Chrome DevTools on a Mac: Performance tab, CPU 4x/6x slowdown, record a scroll. Lighthouse: `npx lighthouse http://localhost:3055/ --preset=desktop` (or without preset for mobile).

## Ideas and open questions

- Make the dashboard mock clickable too (toggle a switch shows the save bar, Save dismisses it).
- Make the voice role step interactive (join "Gaming VC", get the role and the text channel).
- Device check that falls back to the plain cards on weak hardware, or skip Lenis and the dashboard section there. Only if device tests show a problem.
- Other footer effects, below the footer: glowing planet horizon, cursor image trail, curtain reveal (footer sits under the page and the content slides off it; needs layout changes). The curtain reveal needs the shared layout, so it would have to be opt-in per page.
- The footer itself is not great (user feedback), redo later.
- The voice role target sits at the far right edge of the fake Discord, so the zoom shows empty space past it.
- Dashboard panel text zoomed to 2x: check it is not soft mid-zoom on real displays.
- Translate the sample names and mock labels (currently English only), and sync `home.stage.*` to the other languages before shipping.
- A real mobile story (not only cards), if the desktop one is kept.
- Server icons from the Discord API (`GET /guilds/{id}` with the prod bot token, `guildId` is in the mock data) and a real server count.

## Before shipping

- Sync `home.stage.*` (and the other changed home keys) to `ar de es-ES fil fr id it ko pt-BR th` after the wording is confirmed (see `CLAUDE.md`). Keys removed from en-US (`home.features`, `home.showcase`, `home.statement`, `home.demo.*` except join/leave, `home.stage.hint`, `home.stage.finale`) should be removed there too.
- Do not commit `.claude/skills/` or `skills-lock.json`.
