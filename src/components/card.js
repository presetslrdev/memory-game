import { el } from '../utils/create-element.js';

const TAGS = {
  matched: 'learned ✓',
  mismatch: 'loss ↑',
};

/**
 * One card. It is a <button>, so it works with the keyboard too.
 * The click itself is handled by the board (event delegation).
 *
 * @param {{id: string, label: string, icon: string}} card
 * @param {number} index - position on the board
 */
export function createCard(card, index) {
  const hex = `0x${index.toString(16).toUpperCase().padStart(2, '0')}`;
  const label = el('span', { className: 'card__label', text: card.label });
  const tag = el('span', { className: 'card__tag' });

  const element = el(
    'button',
    {
      className: 'card',
      attrs: { type: 'button', 'data-index': String(index) },
    },
    [
      el('span', { className: 'card__back', attrs: { 'aria-hidden': 'true' } }, [
        el('span', { className: 'card__hex', text: hex }),
      ]),
      el('span', { className: 'card__face', attrs: { 'aria-hidden': 'true' } }, [
        el('img', {
          className: 'card__icon',
          attrs: { src: card.icon, alt: '', draggable: 'false' },
        }),
        label,
        tag,
      ]),
    ],
  );

  let currentStatus = '';

  /**
   * @param {'hidden' | 'open' | 'matched' | 'mismatch'} status
   */
  function setStatus(status) {
    if (status === currentStatus) {
      return;
    }
    currentStatus = status;

    const isVisible = status !== 'hidden';
    element.classList.toggle('is-open', isVisible);
    element.classList.toggle('is-matched', status === 'matched');
    element.classList.toggle('is-mismatch', status === 'mismatch');

    tag.textContent = TAGS[status] ?? '';
    element.setAttribute(
      'aria-label',
      isVisible ? `Card ${index + 1}: ${card.label}` : `Card ${index + 1}: hidden`,
    );
  }

  setStatus('hidden');

  return { element, setStatus };
}
