# Șeptică Multiplayer — Release QA

## Automated/static checks
- [ ] Parse the inline client script before every UI PR.
- [ ] Verify required DOM IDs exist.
- [ ] Verify no gameplay engine file is changed by UI-only PRs.
- [ ] Verify the branch diff against its intended base.

## Multiplayer smoke test
- [ ] Player A can create a room.
- [ ] Player B can join using the room code.
- [ ] Both players receive state updates.
- [ ] Only the active player can interact with cards.
- [ ] TAKE remains governed by the server.
- [ ] Round result appears without refreshing.
- [ ] New round button respects the existing server-side permission.
- [ ] A disconnected opponent produces a visible state.
- [ ] Reconnection does not break the UI shell.

## Visual QA
### Desktop
- [ ] 1280px viewport.
- [ ] 1440px viewport.
- [ ] 1920px viewport.
- [ ] No horizontal overflow.
- [ ] Cards remain readable.
- [ ] Score remains visually dominant.
- [ ] Center sequence stays balanced.

### Mobile
- [ ] 320px viewport.
- [ ] 360px viewport.
- [ ] 390px viewport.
- [ ] 430px viewport.
- [ ] Hand can be scrolled when needed.
- [ ] Primary actions remain thumb-friendly.
- [ ] Room-code sharing remains usable.
- [ ] Offline banner does not cover controls.

## PWA QA
- [ ] Manifest loads at `/manifest.json`.
- [ ] Service worker registers after page load.
- [ ] Socket.IO requests are not cached by the service worker.
- [ ] App shell can be served after a navigation failure.
- [ ] Installation behavior is checked in Chromium.
- [ ] iOS Safari home-screen behavior is checked separately.
- [ ] Android Chrome installation is checked separately.

## Accessibility QA
- [ ] Keyboard can reach lobby controls.
- [ ] Enter submits the room code.
- [ ] Active turn status uses aria-live.
- [ ] Important controls have visible focus.
- [ ] Reduced-motion preference disables non-essential animations.
- [ ] Card action does not rely only on hover.

## Release gate
A UI PR is ready to move toward release when:
1. Static checks pass.
2. One complete 1v1 smoke test passes.
3. Desktop and mobile screenshots show no layout break.
4. No engine/scoring changes are included.
5. Open product decisions are documented rather than silently implemented.