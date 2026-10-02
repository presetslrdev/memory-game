import { el } from './utils/create-element.js';
import { CARDS } from './data/cards.js';
import { createGame } from './game/game.js';
import { addResult, getResults } from './storage/leaderboard.js';
import { createHeader } from './components/header.js';
import { createStats } from './components/stats.js';
import { createBoard } from './components/board.js';
import { createTrainingLog } from './components/training-log.js';
import { createModal } from './components/modal.js';
import { createWinContent } from './components/win-content.js';
import { createLeaderboardContent } from './components/leaderboard-content.js';

const header = createHeader({
  onNewGame: startNewGame,
  onLeaderboard: showLeaderboard,
});
const stats = createStats();
const trainingLog = createTrainingLog();
const board = createBoard({ onFlip: (index) => game.flip(index) });
const modal = createModal();

const game = createGame({
  cards: CARDS,
  onChange: (state) => {
    stats.update(state);
    board.render(state);
  },
  onMove: trainingLog.logMove,
  onWin: showWin,
});

function startNewGame() {
  modal.close();
  const runLabel = header.nextRun();
  trainingLog.reset(runLabel);
  game.newGame();
}

function showWin({ moves }) {
  // the game calls onWin only once per game, so the result is saved once
  const { rank } = addResult(moves);
  trainingLog.logWin(moves);

  const content = createWinContent({
    moves,
    rank,
    onNewGame: startNewGame,
    onClose: modal.close,
  });
  modal.open(content, 'Game won');
}

function showLeaderboard() {
  // only shows the window: the game and its mismatch timer keep going
  const content = createLeaderboardContent({
    results: getResults(),
    onClose: modal.close,
  });
  modal.open(content, 'Leaderboard');
}

const app = el('div', { className: 'app' }, [
  header.element,
  el('main', { className: 'lab' }, [
    board.element,
    el('aside', { className: 'sidebar' }, [stats.element, trainingLog.element]),
  ]),
]);

document.body.append(app);
startNewGame();
