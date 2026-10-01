# Șeptică Multiplayer — Asset Sources

## Playing cards
Source: https://github.com/hayeah/playing-cards-assets

Used files: the 32 rank/suit SVGs needed by the Șeptică 32-card deck.

Source repository README states the card artwork is courtesy of the original public-domain vector-playing-cards source. The repository itself is MIT licensed for its processing code. The copied card artwork is kept local under `public/cards/`.

Source page: https://github.com/hayeah/playing-cards-assets/tree/master/svg-cards

## Custom card back
`public/cards/card-back.svg` is original artwork created for Șeptică Multiplayer. It is included directly in this project.

## Other inspiration researched
- Kenney Playing Cards Pack — CC0. Useful as a general game-asset reference, but its pixel-art style was not used for the final card faces. https://kenney.nl/assets/playing-cards-pack
- Kenney Pattern Pack — CC0. Researched for table texture ideas; final table texture remains custom CSS/SVG treatment. https://kenney.nl/assets/pattern-pack

## Important data note
The current game engine only sends rank values to the client. The UI therefore selects deterministic suit artwork for visual testing when a real suit is not supplied. This does not change game rules. When the engine exposes authoritative `rank + suit + card id`, the renderer can switch to exact card instances without a visual redesign.

## Court card artwork added in UI redesign v2
- **Source:** AustinGabriel/Public-Domain-and-CC0-Playing-Cards
- **Repository:** https://github.com/AustinGabriel/Public-Domain-and-CC0-Playing-Cards
- **Used files:** the illustrated Jack, Queen and King SVGs from the four suit folders.
- **License statement:** the source repository README states that its assets are public domain / CC0 and that the deck includes ornate court-style face cards. The project uses those assets locally rather than hotlinking them.


## Next-level card/table pass
- The complete visible 32-card rank/suit set used by the current client renderer was refreshed from AustinGabriel/Public-Domain-and-CC0-Playing-Cards for a single cohesive illustrated deck style.
- The 12 Jack/Queen/King SVGs are the source deck's full illustrated court faces, replacing the earlier simplified court variants.
- The local `public/cards/card-back.svg` remains original Șeptică artwork and was rebuilt with layered borders, woven texture, and a central emblem for larger mobile presentation.
