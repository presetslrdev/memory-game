import { shuffle } from '../utils/shuffle.js';

/** How long a mismatched pair stays open, ms (task allows 700–1500). */
export const MISMATCH_DELAY = 1000;

/**
 * Game core. Knows nothing about the DOM: it only keeps the state,
 * applies the rules and notifies the UI through callbacks.
 *
 * @param {object} config
 * @param {Array<{id: string, label: string, icon: string}>} config.cards - unique cards
 * @param {(state: GameState) => void} [config.onChange] - state changed, re-render
 * @param {(event: MoveEvent) => void} [config.onMove] - a move (two cards) was made
 * @param {(result: {moves: number}) => void} [config.onWin] - all pairs found
 */
export function createGame({
  cards,
  onChange = () => {},
  onMove = () => {},
  onWin = () => {},
}) {
  const totalPairs = cards.length;

  let deck = [];
  let opened = []; // indexes of open cards that are not matched yet (0, 1 or 2)
  let matched = new Set(); // indexes of matched cards
  let moves = 0;
  let pairs = 0;
  let isLocked = false; // true while a mismatched pair is shown
  let isFinished = false;
  let hideTimerId = null;

  /** @typedef {ReturnType<typeof getState>} GameState */
  function getState() {
    return {
      deck,
      opened: [...opened],
      matched: new Set(matched),
      moves,
      pairs,
      totalPairs,
      isLocked,
      isFinished,
    };
  }

  function notify() {
    onChange(getState());
  }

  function newGame() {
    // the old mismatch timer must not close cards of the new game
    clearTimeout(hideTimerId);
    hideTimerId = null;

    deck = shuffle(cards.flatMap((card) => [{ ...card }, { ...card }]));
    opened = [];
    matched = new Set();
    moves = 0;
    pairs = 0;
    isLocked = false;
    isFinished = false;

    notify();
  }

  function canFlip(index) {
    return (
      !isFinished &&
      !isLocked &&
      index >= 0 &&
      index < deck.length &&
      !opened.includes(index) &&
      !matched.has(index)
    );
  }

  function hideMismatch() {
    opened = [];
    isLocked = false;
    hideTimerId = null;
    notify();
  }

  /**
   * Opens a card. Returns false when the click must be ignored.
   * @param {number} index - position of the card on the board
   */
  function flip(index) {
    if (!canFlip(index)) {
      return false;
    }

    opened.push(index);

    if (opened.length < 2) {
      notify();
      return true;
    }

    // the second card is open — this is one move
    moves += 1;
    const [first, second] = opened;
    const isMatch = deck[first].id === deck[second].id;

    if (isMatch) {
      matched.add(first);
      matched.add(second);
      pairs += 1;
      opened = [];
      isFinished = pairs === totalPairs;
    } else {
      isLocked = true;
      hideTimerId = setTimeout(hideMismatch, MISMATCH_DELAY);
    }

    onMove({ isMatch, moves, cards: [deck[first], deck[second]] });
    notify();

    if (isFinished) {
      onWin({ moves });
    }

    return true;
  }

  return { newGame, flip, getState };
}

/**
 * @typedef {object} MoveEvent
 * @property {boolean} isMatch
 * @property {number} moves - moves counter after this move
 * @property {Array<{id: string, label: string}>} cards - the two opened cards
 */
