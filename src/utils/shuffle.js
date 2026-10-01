/**
 * Fisher–Yates shuffle.
 * Walks from the last element to the first and swaps each element
 * with a random element that has not been fixed yet (index 0..i).
 * Every permutation has the same probability.
 *
 * Returns a NEW array, the original one is not changed.
 *
 * @template T
 * @param {T[]} items
 * @param {() => number} [random] - source of numbers in [0, 1), Math.random by default
 * @returns {T[]}
 */
export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
