# Șeptică Multiplayer — Visual Interaction Spec

## Product feel
Șeptică trebuie să pară ca o masă reală transpusă într-un produs digital: calmă între mutări, clară în timpul deciziei și expresivă exact când se întâmplă ceva important.

Regula de bază: informația importantă primește mișcare, lumină sau sunet. Elementele secundare rămân aproape statice.

## Visual hierarchy
1. Cărțile jucătorului.
2. Secvența din centru.
3. Indicatorul de turn.
4. Scorul A X – Y B.
5. Acțiunea „Ia-le”.
6. Pachetul și grămezile.

## Card states
- Idle: card ridicat foarte puțin de suprafața mesei.
- Available: card activ, contrast complet, hover/tap lift.
- Played: card intră în secvență cu o animație scurtă.
- Disabled: card redus ca opacitate și fără cursor/interacțiune.
- Result: ultima carte din secvență primește o accentuare discretă.

## Turn state
Când este rândul jucătorului, masa respiră foarte discret în zona centrală, indicatorul de turn se aprinde și apare un mesaj de acțiune.

Nu folosim efecte continue puternice. Turnul trebuie să fie evident, dar să nu obosească ochiul.

## Action feedback
„Ia-le” este acțiunea principală și folosește tratamentul vizual auriu. Când este blocat, rămâne vizibil, dar nu pare disponibil.

## Audio
Feedback-ul audio este procedural și poate rămâne foarte discret:
- card play: click/tap scurt;
- turn: două note scurte;
- Ia-le: efect jos, scurt;
- final de rundă: secvență de trei note.

Audio trebuie să pornească doar după interacțiunea utilizatorului pentru a respecta politicile autoplay ale browserelor.

## Result state
Finalul de rundă folosește un overlay centrat pentru a opri temporar ritmul mesei și a face rezultatul imposibil de ratat. Scorul rămâne în formatul A X – Y B.

## Mobile
Pe mobil, mâna se poate derula orizontal. Nu micșorăm cărțile până când devin greu de apăsat.

Acțiunile principale ocupă suficient spațiu pentru tap. Elementele decorative se reduc înaintea elementelor de gameplay.

## Motion accessibility
Cu `prefers-reduced-motion: reduce`, animațiile sunt reduse sau dezactivate. Starea funcțională trebuie să rămână complet clară fără motion.