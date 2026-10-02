import { el } from '../utils/create-element.js';

const MAX_LINES = 8;

/**
 * Small console that prints every move like a training log.
 * Only the last MAX_LINES lines are kept.
 */
export function createTrainingLog() {
  const list = el('ol', { className: 'log__list' });

  const element = el(
    'section',
    { className: 'panel log', attrs: { 'aria-label': 'Training log' } },
    [el('h2', { className: 'log__title', text: 'training.log' }), list],
  );

  /**
   * @param {string} text
   * @param {'info' | 'match' | 'miss' | 'win'} type - affects the color
   */
  function write(text, type) {
    list.append(el('li', { className: `log__line log__line--${type}`, text }));

    while (list.children.length > MAX_LINES) {
      list.firstElementChild.remove();
    }
  }

  /** @param {string} runLabel - e.g. "run #0427" */
  function reset(runLabel) {
    list.replaceChildren();
    write(`init ${runLabel} · 8 classes`, 'info');
  }

  /** @param {import('../game/game.js').MoveEvent} event */
  function logMove({ isMatch, moves, cards }) {
    const step = String(moves).padStart(3, '0');
    const [first, second] = cards.map((card) => card.label.toLowerCase());

    if (isMatch) {
      write(`${step} │ ${first} = ${second} │ ok`, 'match');
    } else {
      write(`${step} │ ${first} ≠ ${second} │ loss ↑`, 'miss');
    }
  }

  function logWin(moves) {
    write(`converged in ${moves} steps ✓`, 'win');
  }

  return { element, reset, logMove, logWin };
}
