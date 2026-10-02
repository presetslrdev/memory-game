import { el } from '../utils/create-element.js';

/**
 * Button with an optional decorative icon.
 *
 * @param {object} options
 * @param {string} options.text - visible text
 * @param {() => void} options.onClick
 * @param {string} [options.icon] - decorative symbol, hidden from screen readers
 * @param {string} [options.ariaLabel] - accessible name if it differs from the text
 * @param {boolean} [options.primary] - accent style
 */
export function createButton({ text, onClick, icon, ariaLabel, primary = false }) {
  const attrs = { type: 'button' };
  if (ariaLabel) {
    attrs['aria-label'] = ariaLabel;
  }

  const children = [text];
  if (icon) {
    children.unshift(
      el('span', {
        className: 'btn__icon',
        text: icon,
        attrs: { 'aria-hidden': 'true' },
      }),
    );
  }

  return el(
    'button',
    {
      className: primary ? 'btn btn--primary' : 'btn',
      attrs,
      on: { click: onClick },
    },
    children,
  );
}
