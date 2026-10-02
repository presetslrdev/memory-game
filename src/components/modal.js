import { el } from '../utils/create-element.js';

/**
 * Reusable modal window built on <dialog>.
 * One instance is shared by the win screen and the leaderboard:
 * the shell, open and close logic live here, content is passed in.
 *
 * Closes by: a button inside content (calls close), click on the
 * dark backdrop, Escape key (native <dialog> behaviour).
 */
export function createModal() {
  const content = el('div', { className: 'modal__content' });
  const dialog = el('dialog', { className: 'modal' }, [content]);

  // where the pointer was pressed — to ignore "press inside, release outside"
  let pressTarget = null;

  dialog.addEventListener('pointerdown', (event) => {
    pressTarget = event.target;
  });

  // a click on the backdrop has the <dialog> itself as a target,
  // because .modal__content fills the whole visible window
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog && pressTarget === dialog) {
      close();
    }
  });

  // 'close' fires for every way of closing, including Escape.
  // It is async, so check that the window was not opened again meanwhile.
  dialog.addEventListener('close', () => {
    if (!dialog.open) {
      document.body.classList.remove('is-modal-open');
      content.replaceChildren();
    }
  });

  document.body.append(dialog);

  /**
   * @param {Node} node - content of the window
   * @param {string} label - accessible name of the window
   */
  function open(node, label) {
    content.replaceChildren(node);
    dialog.setAttribute('aria-label', label);

    if (!dialog.open) {
      dialog.showModal();
    }
    // blocks page scroll under the window
    document.body.classList.add('is-modal-open');
  }

  function close() {
    if (dialog.open) {
      dialog.close();
    }
  }

  return { open, close };
}

/**
 * Common layout for modal content: small kicker, title, body and buttons.
 *
 * @param {object} parts
 * @param {string} parts.kicker - small line above the title
 * @param {string} parts.title
 * @param {Node[]} parts.body
 * @param {Node[]} parts.actions - buttons
 */
export function createModalLayout({ kicker, title, body, actions }) {
  return el('div', { className: 'modal__layout' }, [
    el('p', { className: 'modal__kicker', text: kicker }),
    el('h2', { className: 'modal__title', text: title }),
    el('div', { className: 'modal__body' }, body),
    el('div', { className: 'modal__actions' }, actions),
  ]);
}
