# Șeptică UI redesign v2

## Reference direction

The redesign is structured around the strongest patterns found in current mobile game and card-table references:

1. **Core play first.** The table should dominate the screen and the next action should be obvious.
2. **Portrait-first composition.** The player area, action controls, opponent information, shared sequence and hand are vertically prioritized for a phone-sized viewport.
3. **Physical table metaphor.** Felt, wood, card stock, depth, stacks and restrained highlights create the sensation of a real tabletop instead of a generic web dashboard.
4. **Compact HUD.** Score and round metadata stay visible without competing with the cards.
5. **Touch-first action.** The hand is large, separated from non-action UI and responds immediately to press/selection.
6. **Moment hierarchy.** Deal, play, collection, turn change and score changes receive distinct micro-interactions.
7. **Keep the loop clean.** Lobby -> table -> action -> resolution -> next round, without decorative screens blocking entry to play.

## Screen order

### 01 — Lobby

Brand -> one primary "Creează masa" action -> join code -> secondary QA/preview utilities.

### 02 — Table header

Minimal branding -> room/share -> compact score HUD.

### 03 — Opponent

Identity -> card backs -> active-turn state.

### 04 — Shared table

Piles -> deck -> turn cue -> active sequence.

### 05 — Action

Status -> contextual "IA-LE" / round controls.

### 06 — Player hand

Identity strip -> four large physical-feeling cards -> touch feedback.

### 07 — Resolution

Collection animation -> pile impact -> round/game result overlay.

## Card art

The face-card artwork uses the AustinGabriel public-domain/CC0 playing-card source. Its README states that it contains a complete standard deck with ornate Jack, Queen and King faces and provides both SVG and PNG versions. The redesign imports the full court artwork locally for J/Q/K rather than the previous simplified court treatment.

Source:
https://github.com/AustinGabriel/Public-Domain-and-CC0-Playing-Cards

The existing local numbered-card set and custom Șeptică back remain part of the project.