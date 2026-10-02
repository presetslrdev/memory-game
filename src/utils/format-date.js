/**
 * Formats a timestamp as DD.MM.YYYY (local time, no hours).
 * @param {number} timestamp - milliseconds, e.g. Date.now()
 * @returns {string}
 */
export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months start from 0
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
