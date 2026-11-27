# Astro dashboard

## Translations

UI strings live in `i18n/locales`, `en-US.json` is the source and the other languages are managed on Crowdin.

When you add, change or remove a text key, only edit `en-US.json` while working on the change. Once the PR is ready and the user confirmed the text changes are ok, as a pre-push step update the same keys in all the other languages (`ar`, `de`, `es-ES`, `fil`, `fr`, `id`, `it`, `ko`, `pt-BR`, `th`) so they stay in sync. Never do this earlier, the wording can still change during review.

## Homepage

The homepage (`/`) is a scroll story: a pinned stage where a GSAP camera moves around a fake Discord server and then a fake dashboard, followed by the open source card, the "Voice Channels Exclusive" card and a footer marquee. Full description, camera details and performance notes are in `docs/homepage.md`, read it before changing the page. `docs/homepage-redesign.md` is the history of the previous homepage.

Files: `app/pages/index.vue` (Lenis), `app/components/home/` (`HomeHero`, `HomeServers`, `HomeStage`, `HomeOpenSource`, `HomeCta`, `HomeFooterMarquee`, which is rendered by the `default` and `guide` layouts so every non-dashboard page has it).

Things that are easy to break:

- Intro animations use GSAP `from`, so the server render would flash before them. Elements are hidden with CSS under `html.motion-ok` (class set by an inline script in `index.vue`, skipped with reduced motion), and the two fake worlds in `HomeStage` start `invisible`. A new `from` animation above the fold needs the same gate.
- `HomeStage` has a negative bottom margin (desktop only) so the next section is pulled over the empty pinned stage, and the timeline ends with a hold of about one screen after the dashboard leaves. Changing either one changes when the open source card appears.
- `HomeFooterMarquee` captures wheel and touch input on `window` in the capture phase (before Lenis) only when the page is at the bottom and the input goes down. Scrolling up is never captured.
- Below 1024px or with reduced motion there is no stage, only `CoreFeatureBox` cards with images (same concept as the old homepage).
- Interface button emojis are the default Astro custom emojis (ids in `Emojis.kt` of the astro repo), saved in `public/img/emojis/`.

State (2026-11-27): all requested changes are implemented, lint passes, and the page was checked in Chrome: no horizontal overflow from 320 to 1920px, stage only from 1024px, story, open source card and footer marquee overscroll work on desktop. Not tested on a real touch device. Nothing is committed.

Before pushing: sync the changed `home.*` keys to the other languages (see Translations). Removed from en-US: `home.features`, `home.showcase`, `home.statement`, `home.demo.channel_name|voice_channels|generator|you`, `home.lab.finale`; `home.lab` was renamed to `home.stage` (with `home.stage.hint` kept), `home.get_started` was unused and removed. Do not commit `.claude/skills/` or `skills-lock.json`.
