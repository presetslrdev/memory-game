import { el } from './utils/create-element.js';
import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';

const header = createHeader({
  onNewGame: startNewGame,
  onLeaderboard: () => {},
});
const stats = createStats();
const board = createBoard({ onFlip: (index) => game.flip(index) });

const game = createGame({
  cards: CARDS,
  onChange: (state) => {
    stats.update(state);
    board.render(state);
  },
});

function startNewGame() {
  header.nextRun();
  game.newGame();
}

const app = el('div', { className: 'app' }, [
  header.element,
  el('main', { className: 'lab' }, [
    board.element,
    el('aside', { className: 'sidebar' }, [stats.element]),
  ]),
]);

document.body.append(app);
startNewGame();
