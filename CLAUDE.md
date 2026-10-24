# version `Hyperion` re-write

this repo is the rewrite of `../astro-bot.space-old`.
most code has been ported over, but the preliminary step is to check if anything has not been ported over, but I don't wanna waste too much time on that so don't loose an insane amount of time on this.

it keeps the same exact logic but with some improvements in the code.

the APIs of the backend changed, the goal is to make the current api client use the new v2 apis from `../astro/services/api-central`

step 1. migrate existing api calls to the V2 endpoints
step 2. mark in `hyperion-rewrite.md` file the list of new features that the V2 endpoints supports and that need implementation in this frontend

do one endpoint at a time
