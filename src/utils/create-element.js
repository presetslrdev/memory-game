/**
 * Small wrapper over document.createElement.
 *
 * @example
 * el('button', { className: 'btn', text: 'Go', on: { click: start } });
 *
 * @param {string} tag - tag name, e.g. 'div'
 * @param {object} [options]
 * @param {string} [options.className] - value for the class attribute
 * @param {string|number} [options.text] - text content (safe, no HTML parsing)
 * @param {Record<string, string>} [options.attrs] - any attributes (aria-*, type, src...)
 * @param {Record<string, EventListener>} [options.on] - event listeners
 * @param {Array<Node|string>} [children] - nodes appended inside the element
 * @returns {HTMLElement}
 */
export function el(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  const { className, text, attrs = {}, on = {} } = options;

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = String(text);
  }

  Object.entries(attrs).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  Object.entries(on).forEach(([eventName, handler]) => {
    element.addEventListener(eventName, handler);
  });

  element.append(...children);

  return element;
}
