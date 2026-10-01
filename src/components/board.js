import { el } from '../utils/create-element.js';
import { createCard } from './card.js';

/** Which status a card has in the current game state. */
function getStatus(state, index) {
  if (state.matched.has(index)) {
    return 'matched';
  }
  if (state.opened.includes(index)) {
    return state.isLocked ? 'mismatch' : 'open';
  }
  return 'hidden';
}

/**
 * Game board with 16 cards.
 * @param {object} config
 * @param {(index: number) => void} config.onFlip - a card was clicked
 */
export function createBoard({ onFlip }) {
  const element = el('section', {
    className: 'board',
    attrs: { 'aria-label': 'Game board' },
  });

  let cards = [];
  let renderedDeck = null;

  // one listener for all cards instead of 16 separate ones
  element.addEventListener('click', (event) => {
    const cardElement = event.target.closest('.card');
    if (cardElement) {
      onFlip(Number(cardElement.dataset.index));
    }
  });

  /** Rebuilds cards for a new deck or updates statuses of existing ones. */
  function render(state) {
    if (state.deck !== renderedDeck) {
      renderedDeck = state.deck;
      cards = state.deck.map((card, index) => createCard(card, index));
      element.replaceChildren(...cards.map((card) => card.element));
    }

    cards.forEach((card, index) => card.setStatus(getStatus(state, index)));
    element.classList.toggle('is-locked', state.isLocked);
  }

  return { element, render };
}
