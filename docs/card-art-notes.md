# Șeptică Multiplayer — Card Art Notes

## Current prototype
The UI now renders a realistic playing-card treatment with rank corners, standard suit glyphs, pip layouts for numbered cards, and court-card styling.

## Data boundary
The current server state sends card values as rank strings only (A, K, Q, J, 10, 9, 8, 7). It does not send suit or card-instance IDs.

Because of that, the suit glyphs in this UI pass are presentation-only placeholders used to test the visual direction. They must not be treated as authoritative game data.

## Next engine-safe card step
When the product owner confirms the engine data change, expose a stable card instance with at least rank, suit, and an ID. The visual layer can then render the exact real card consistently for both players without changing the game rules themselves.

## Visual target
- Standard paper card proportions.
- Cream paper surface with subtle print texture.
- Clear top-left and rotated bottom-right indices.
- Real suit glyphs in the corners and center.
- Seven through ten use pip layouts.
- Jack, Queen, King use framed court-card compositions.
- Cards stay large enough for touch interaction on mobile.
- Card collection animation remains slow enough for the player to read what happened.