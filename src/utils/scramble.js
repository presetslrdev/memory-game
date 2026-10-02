const GLYPHS = '01ABCDEF#%&*<>/\\';

/**
 * "Decodes" a text: shows random symbols that turn into the real
 * letters one by one, from left to right.
 *
 * @param {HTMLElement} element - where to write the text
 * @param {string} finalText - text that must be shown in the end
 * @param {number} [duration] - animation time, ms
 * @returns {() => void} function that stops the animation
 */
export function scrambleText(element, finalText, duration = 360) {
  const start = performance.now();
  let frameId = null;

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);

    const text = [...finalText]
      .map((char, i) => {
        if (i < revealed) {
          return char;
        }
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join('');

    element.textContent = text;

    if (progress < 1) {
      frameId = requestAnimationFrame(frame);
    } else {
      element.textContent = finalText;
    }
  }

  frameId = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(frameId);
    element.textContent = finalText;
  };
}
