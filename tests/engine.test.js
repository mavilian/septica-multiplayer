const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const game = require("../src/game");

function freshPlayingState() {
  const s = game.newState();
  game.startRound(s, false, 0);
  return s;
}

function assertReadyShape(s) {
  assert.equal(game.totalCards(s), 32, "all 32 cards must stay in the state");
  assert.equal(s.status, "playing");
  assert.equal(s.hands[0].length, 4);
  assert.equal(s.hands[1].length, 4);
  assert.equal(s.deck.length, 24);
  assert.equal(s.sequence.length, 0);
  assert.equal(s.piles[0].length, 0);
  assert.equal(s.piles[1].length, 0);
  assert.ok(s.turn === 0 || s.turn === 1);
  assert.equal(s.starter, null);
}

{
  const s = freshPlayingState();
  assertReadyShape(s);
  assert.equal(game.canPlay(s, s.turn, s.hands[s.turn][0]), true);
  assert.equal(game.canPlay(s, 1 - s.turn, s.hands[1 - s.turn][0]), false);
}

{
  const s = freshPlayingState();
  const p = s.turn;
  const first = s.hands[p][0];
  const second = s.hands[1 - p][0];

  const start = game.playCard(s, p, first);
  assert.equal(start.kind, "start");
  assert.deepEqual(s.sequence, [first]);
  assert.equal(s.starter, p);
  assert.equal(s.turn, 1 - p);

  const response = game.playCard(s, 1 - p, second);
  assert.equal(response.kind, second === first || second === "7" ? "continue" : "surrender");

  if (response.kind === "surrender") {
    assert.deepEqual(response.sequence, [first, second]);
    assert.equal(response.winner, p);
    assert.deepEqual(s.sequence, []);
    assert.equal(s.piles[p].length, 2);
    assert.equal(s.turn, p);
  } else {
    assert.deepEqual(s.sequence, [first, second]);
    assert.equal(s.turn, p);
  }
}

{
  const s = freshPlayingState();
  const p = s.turn;
  const first = s.hands[p].find(c => c !== "7");
  assert.ok(first, "starter needs a non-7 card");
  game.playCard(s, p, first);

  const q = 1 - p;
  const matching = s.hands[q].find(c => c === first);
  if (matching) {
    game.playCard(s, q, matching);
    assert.equal(s.starter, p);
    assert.equal(s.turn, p);
    const illegal = s.hands[p].find(c => c !== first && c !== "7");
    if (illegal) {
      assert.equal(game.canPlay(s, p, illegal), false, "tăiatul may only use reperul or 7");
      assert.throws(() => game.playCard(s, p, illegal), /INVALID_MOVE/);
    }
    if (s.hands[p].includes(first) || s.hands[p].includes("7")) {
      assert.throws(() => game.take(s, q), /INVALID_TAKE_ROLE/);
      const taken = game.take(s, p);
      assert.equal(taken.kind, "take");
      assert.equal(taken.winner, q);
      assert.deepEqual(taken.sequence, [first, matching]);
      assert.equal(s.sequence.length, 0);
      assert.equal(s.piles[q].length, 2);
    }
  }
}

{
  const index = fs.readFileSync(path.join(__dirname, "..", "public", "index.html"), "utf8");
  const server = fs.readFileSync(path.join(__dirname, "..", "server.js"), "utf8");

  assert.match(index, /Rândul adversarului./, "playing state must distinguish opponent turn from waiting for opponent");
  assert.match(index, /sessionStorage.getItem("septica-room")/, "room identity must be tab-scoped");
  assert.match(index, /socket.emit("reconnect_room",d)/, "client must reconnect to its reserved seat");
  assert.match(server, /s.on("reconnect_room"/, "server must support explicit seat reconnection");
  assert.doesNotMatch(server, /r.state.status="waiting";/, "disconnect must not reset an active game to waiting");
}

console.log("Șeptică smoke tests: PASS");
