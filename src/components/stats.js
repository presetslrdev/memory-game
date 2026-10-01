import { el } from '../utils/create-element.js';

/** One counter: label, big value and a small caption. */
function createMetric(label, caption) {
  const value = el('span', { className: 'metric__value' });
  const element = el('div', { className: 'metric' }, [
    el('span', { className: 'metric__label', text: label }),
    value,
    el('span', { className: 'metric__caption', text: caption }),
  ]);
  return { element, value };
}

/**
 * Moves and pairs counters + convergence bar.
 */
export function createStats() {
  const moves = createMetric('moves', 'training steps');
  const pairs = createMetric('pairs', 'patterns learned');

  const barFill = el('span', { className: 'progress__fill' });
  const barValue = el('span', { className: 'progress__value' });
  const bar = el('div', { className: 'progress' }, [
    el('div', { className: 'progress__head' }, [
      el('span', { text: 'convergence' }),
      barValue,
    ]),
    el('div', { className: 'progress__track', attrs: { 'aria-hidden': 'true' } }, [barFill]),
  ]);

  const element = el(
    'section',
    { className: 'panel stats', attrs: { 'aria-label': 'Stats' } },
    [el('div', { className: 'stats__metrics' }, [moves.element, pairs.element]), bar],
  );

  /** @param {{moves: number, pairs: number, totalPairs: number}} state */
  function update(state) {
    moves.value.textContent = String(state.moves).padStart(3, '0');
    pairs.value.textContent = `${state.pairs}/${state.totalPairs}`;

    const percent = Math.round((state.pairs / state.totalPairs) * 100);
    barValue.textContent = `${percent}%`;
    barFill.style.width = `${percent}%`;
  }

  return { element, update };
}
