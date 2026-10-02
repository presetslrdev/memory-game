const STORAGE_KEY = 'neural-memory:leaderboard';
export const MAX_RESULTS = 10;

/**
 * @typedef {object} GameResult
 * @property {number} moves - moves to finish the game
 * @property {number} date - when the game was finished, ms
 */

/** Fewer moves first; with equal moves the earlier game goes first. */
export function sortResults(results) {
  return [...results].sort((a, b) => a.moves - b.moves || a.date - b.date);
}

function isValidResult(item) {
  return item && Number.isFinite(item.moves) && Number.isFinite(item.date);
}

/**
 * Reads saved results. Broken or foreign data in storage gives an empty list.
 * @param {Storage} [storage]
 * @returns {GameResult[]}
 */
export function getResults(storage = localStorage) {
  try {
    const parsed = JSON.parse(storage.getItem(STORAGE_KEY));
    return Array.isArray(parsed) ? sortResults(parsed.filter(isValidResult)) : [];
  } catch {
    return [];
  }
}

/**
 * Adds a finished game and keeps only the best results.
 * @param {number} moves
 * @param {number} [date]
 * @param {Storage} [storage]
 * @returns {{results: GameResult[], rank: number | null}} rank of the new
 *   result (1-based) or null when it did not get into the top
 */
export function addResult(moves, date = Date.now(), storage = localStorage) {
  const entry = { moves, date };
  const results = sortResults([...getResults(storage), entry]).slice(0, MAX_RESULTS);

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    // storage can be full or disabled — the game still works
  }

  const index = results.indexOf(entry);
  return { results, rank: index === -1 ? null : index + 1 };
}
