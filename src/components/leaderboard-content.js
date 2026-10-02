import { el } from '../utils/create-element.js';
import { formatDate } from '../utils/format-date.js';
import { createButton } from './button.js';
import { createModalLayout } from './modal.js';

/** Table with places, moves and dates. */
function createTable(results) {
  const head = el('thead', {}, [
    el('tr', {}, [
      el('th', { text: '#', attrs: { scope: 'col' } }),
      el('th', { text: 'moves', attrs: { scope: 'col' } }),
      el('th', { text: 'date', attrs: { scope: 'col' } }),
    ]),
  ]);

  const rows = results.map((result, index) =>
    el('tr', { className: index === 0 ? 'is-best' : '' }, [
      el('td', { text: String(index + 1).padStart(2, '0') }),
      el('td', { text: result.moves }),
      el('td', { text: formatDate(result.date) }),
    ]),
  );

  return el('table', { className: 'leaderboard' }, [head, el('tbody', {}, rows)]);
}

/**
 * Content of the leaderboard window.
 *
 * @param {object} options
 * @param {Array<{moves: number, date: number}>} options.results - sorted top results
 * @param {() => void} options.onClose
 */
export function createLeaderboardContent({ results, onClose }) {
  const body =
    results.length > 0
      ? createTable(results)
      : el('p', {
          className: 'leaderboard__empty',
          text: 'No results yet. Finish a run to get on the board.',
        });

  return createModalLayout({
    kicker: 'benchmark',
    title: 'Top 10 runs',
    body: [body],
    actions: [createButton({ text: 'close', onClick: onClose, primary: true })],
  });
}
