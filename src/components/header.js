import { el } from '../utils/create-element.js';
import { createButton } from './button.js';

/**
 * Top bar: brand, current run id and two main buttons.
 * @param {object} handlers
 * @param {() => void} handlers.onNewGame
 * @param {() => void} handlers.onLeaderboard
 */
export function createHeader({ onNewGame, onLeaderboard }) {
  const runId = el('span', { className: 'brand__run' });

  const brand = el('div', { className: 'brand' }, [
    el('span', { className: 'brand__dots', attrs: { 'aria-hidden': 'true' } }, [
      el('span'),
      el('span'),
      el('span'),
    ]),
    el('h1', { className: 'brand__title', text: 'neural.memory' }),
    runId,
  ]);

  const actions = el('nav', { className: 'header__actions' }, [
    createButton({
      icon: '▶',
      text: 'new run',
      ariaLabel: 'New game',
      primary: true,
      onClick: onNewGame,
    }),
    createButton({
      icon: '▤',
      text: 'benchmark',
      ariaLabel: 'Leaderboard',
      onClick: onLeaderboard,
    }),
  ]);

  const element = el('header', { className: 'header' }, [brand, actions]);

  /** Shows a new random run number, e.g. "run #0427". */
  function nextRun() {
    const id = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    runId.textContent = `run #${id}`;
  }

  return { element, nextRun };
}
