# Homepage

The homepage is a scroll story. A stage stays pinned while a camera moves around a fake Discord server and then a fake dashboard, followed by the open source card, the "Voice Channels Exclusive" card and a footer marquee. `docs/homepage.md` has the full description, camera details and performance notes, `docs/homepage-redesign.md` is the history of the previous homepage.

## Structure

- The page owns smooth scrolling and wires the sections together.
- The hero is the intro: logo, title, tagline, call to action buttons and the server count.
- A marquee of real servers sits under the hero.
- The stage is the pinned part and holds the two fake worlds the camera travels through.
- The open source card comes after the stage.
- A call to action closes the page.
- The footer marquee is rendered by the layouts, not by the page, so every non-dashboard page has it.
- Showcase data (server count, server list) is mocked and read through a composable, so a real source can replace it later.

## Things that are easy to break

- Intro animations animate from a hidden state, so the server render would flash before them. Elements are hidden with CSS only when motion is allowed, a class set by an inline script in the page head (skipped with reduced motion), and the two fake worlds start invisible. Any new above the fold animation of this kind needs the same gate.
- The stage has a negative bottom margin on desktop so the next section is pulled over the empty pinned area, and its timeline ends with a hold of about one screen after the dashboard leaves. Changing either one changes when the open source card appears.
- The footer marquee captures wheel and touch input on the window, before the smooth scroll library sees it, only when the page is at the bottom and the input goes down. Scrolling up is never captured.
- Below 1024px, or with reduced motion, there is no stage, only feature cards with images.
- Interface button emojis are the default Astro custom emojis, saved as static images.
