import { el } from '../utils/create-element.js';
import { createButton } from './button.js';
import { createModalLayout } from './modal.js';

/**
 * Content of the win window.
 *
 * @param {object} options
 * @param {number} options.moves - moves of the finished game
 * @param {number | null} options.rank - place in the leaderboard or null
 * @param {() => void} options.onNewGame
 * @param {() => void} options.onClose
 */
export function createWinContent({ moves, rank, onNewGame, onClose }) {
  const rankText = rank ? `#${rank} in benchmark` : 'not in the top 10 this time';

  return createModalLayout({
    kicker: 'training complete',
    title: 'Model converged!',
    body: [
      el('p', { className: 'win__note', text: 'All 8 patterns learned. Loss → 0.000' }),
      el('div', { className: 'win__result' }, [
        el('span', { className: 'win__moves', text: moves }),
        el('span', { className: 'win__unit', text: moves === 1 ? 'move' : 'moves' }),
      ]),
      el('p', { className: 'win__rank', text: rankText }),
    ],
    actions: [
      createButton({ text: 'close', onClick: onClose }),
      createButton({
        icon: '▶',
        text: 'new run',
        ariaLabel: 'New game',
        primary: true,
        onClick: onNewGame,
      }),
    ],
  });
}
