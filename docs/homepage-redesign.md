# Homepage redesign (branch `task/better-homepage-acquisition`)

Goal: make the homepage drive acquisition. Show the bot name, a short pitch, an invite CTA, the main features (with small interactive demos), the open source aspect, and social proof (biggest servers and total server count). Mobile friendly, efficient, visually impactful. Follow the existing site style (dark, purple/pink gradient, Evolve display font).

Status: iteration 3 of N, user said "good point", kept as is. Other languages not updated yet. A second prototype with a different approach lives at `/home-lab`, see `home-lab-experiment.md`.

## Stack choices

- **GSAP + ScrollTrigger** for choreographed scroll animation, plus the plugins `SplitText` and `ScrambleTextPlugin` (all plugins are free and ship in the `gsap` package).
- **Lenis** for smooth scrolling, enabled only on the homepage (`app/pages/index.vue`), synced with ScrollTrigger through `gsap.ticker`.
- Framer Motion was ruled out (React only, the site is Nuxt/Vue).
- Why GSAP: framework agnostic, best for pinned/scrubbed timelines and `gsap.matchMedia` for mobile/desktop/reduced-motion variants. Alternative `@vueuse/motion` or CSS scroll-driven animations are lighter but weak for scroll storytelling.
- Skills installed for the session (untracked, do not commit): `.claude/skills/` and `skills-lock.json` (from `greensock/gsap-skills` and `justinebijupaul/frontend-ai-skills --skill 24-lenis`). `.agents/skills/` is already gitignored.
- Dependencies added: `gsap`, `lenis`. The lockfile was reformatted with `prettier --write pnpm-lock.yaml` to keep the diff small (the repo keeps it prettier formatted).

## Page structure (`app/pages/index.vue`)

All sections live in `app/components/home/`:

1. `HomeHero` – logo (floats, tilts in 3D toward the mouse), ASTRO letters sliding in, tagline, "Add to Discord" (uses `useInvite().invite`) and "How it works" (`/guides`) buttons (magnetic), pill with animated server count, "100% open source" badge linking to the GitHub repo. Contains `HomeServers` at the bottom so the social proof is inside the first viewport.
2. `HomeServers` – marquee rows of server cards (gradient initials avatar, name, member count). Rows are GSAP tweens that speed up with scroll velocity (`ScrollTrigger` velocity -> `quickTo` on timeScale, reset on `scrollEnd`). Two copies per row, `pr-3` equal to the gap so the `-50%` loop is seamless. Third row only shows on viewports taller than 900px.
3. `HomeStatement` – one sentence revealed word by word, scrubbed to scroll (SplitText).
4. `HomeFeatures` – the main storytelling section. Desktop (>= 1024px): section is pinned and scrubbed through 7 steps, left text, right a square frame (3D crossfade/rotation between steps, progress bar). Steps: 4 interactive generator scenarios (`HomeDemoPanel`), then default interface, custom interface and voice roles images. Mobile/tablet: plain stacked cards revealed with `ScrollTrigger.batch`, no pinning (pinning is the usual source of jank on phones).
5. `HomeBigText` – two huge rows of text (outlined and gradient) moving in opposite directions while scrolling.
6. `HomeOpenSource` – card revealed with a scrubbed clip-path, GitHub icon rotates with scroll.
7. `HomeCta` – final card that tilts flat as it scrolls in (3D), scrambled title, magnetic invite button, glow that grows with scroll.

## Demo (`HomeDemoPanel.vue` + `app/constants/homeShowcase.ts`)

Each scenario shows the name template with variables highlighted and a fake Discord voice channel list: a "Create your channel" generator row the user can join (creates their own channel, animated with GSAP via `<Transition :css="false">`), a Leave button that deletes it, and non interactive example channels with voice icons and member avatars.

Scenarios (data in `homeShowcase.ts`): gaming (`{activity_emoji} {activity_name} | {nickname}`), incremental (`Lounge {n}`), squad (`Squad {nato}`), personal (`📚 {nickname}'s study room`). The first three use Ultimate-only variables (see `DashboardVariablesButton.vue`), so they get the "Ultimate" badge; personal is free.

## Mock data (to replace with the API)

- `app/data/astro/mocks/home-showcase.ts` holds the mocked total server count and the list of servers (name, members, optional `icon` URL).
- `app/composables/useHomeShowcase.ts` is the single access point. When the real API exists, change only this composable (the components just read `serverCount` and `servers`). If `icon` is set the card shows the image, otherwise a gradient with initials.

## Other new code

- `app/composables/useHomeMotion.ts` – registers GSAP plugins once, exposes `gsap`, `ScrollTrigger`, `SplitText`, `reducedMotion()`.
- `app/composables/useHomeMagnetic.ts` – magnetic effect for `.magnetic` elements (`quickTo` elastic), only for `(hover: hover) and (pointer: fine)`.
- Every component creates its animations in `onMounted` inside `gsap.context(...)` and reverts in `onUnmounted`. `prefers-reduced-motion` skips all animations.

## Text (i18n)

Only `i18n/locales/en-US.json` was edited, per `CLAUDE.md`. New/changed keys under `home`: `hero.*`, `statement`, `demo.*`, `features.*`, `showcase.*` (4 scenarios + 3 image steps), `servers.*`, `big_text.*`, `open_source.*`. The old keys `home.temp_vc`, `home.default_interface`, `home.custom_interface`, `home.voice_role` are no longer used by the page (their text was copied into `home.showcase`) and can be removed. Before pushing, once the user confirms the wording: sync the same keys to `ar de es-ES fil fr id it ko pt-BR th`.

## Techniques tried (sources used)

- Pin + scrub storytelling, matchMedia desktop/mobile split, transform/opacity only: GSAP ScrollTrigger docs, dev.to "pin: true nearly broke my portfolio", Codrops Horeca case study (scrub numbers on mobile).
- Magnetic buttons, text scramble, horizontal scroll ideas: `vixonoffice/gsap-motion-lab`.
- SVG/clip-path mask reveals: abduzeedo "SVG Mask Transitions on Scroll".
- Infinite gallery with Observer, Flip, SplitText (not used yet): Codrops "Building an Infinite GSAP Scroll Gallery".

## Verified / not verified

- Verified in Chrome desktop (1492px wide, dev server `pnpm dev:mock` on :3010): every section renders, pinned steps crossfade, Join/Leave works, marquee, big text, CTA scramble and tilt, lint (`eslint`, `prettier`) and `nuxi typecheck` clean for the new files.
- NOT verified: mobile layout (resizing the Chrome window did not change the viewport), hero logo tilt and magnetic buttons in motion, real devices performance, Lighthouse/bundle size, other locales.
- Console shows hydration warnings from the navbar profile dropdown (pre-existing, auth related) and Nuxt hints flagging `HomeHero`/`index` because GSAP changes styles after hydration (probably harmless, unconfirmed).

## Ideas not done yet

Horizontal pinned gallery, image distortion, page-load curtain/preloader, Flip transitions between scenarios, Observer based section snapping, real server icons from the API, a sticky mobile CTA, analytics on the invite button.
