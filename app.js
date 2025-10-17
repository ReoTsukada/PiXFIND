const dom = {
  startScreen: document.getElementById('startScreen'),
  gameScreen: document.getElementById('gameScreen'),
  startButton: document.getElementById('startButton'),
  backButton: document.getElementById('backButton'),
  resetButton: document.getElementById('resetButton'),
  foundCount: document.getElementById('foundCount'),
  totalCount: document.getElementById('totalCount'),
  timerLabel: document.getElementById('timerLabel'),
};

const state = {
  playing: false,
  found: 0,
  total: 2,
  startTimestamp: null,
  timerId: null,
};

function init() {
  dom.totalCount.textContent = state.total;
  dom.timerLabel.textContent = formatTime(0);

  dom.startButton?.addEventListener('click', () => {
    enterGame();
  });

  dom.backButton?.addEventListener('click', () => {
    exitGame();
  });

  dom.resetButton?.addEventListener('click', () => {
    resetRound();
  });

  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && state.playing) {
      exitGame();
    }
  });
}

function enterGame() {
  state.playing = true;
  state.startTimestamp = performance.now();
  state.timerId = requestAnimationFrame(updateTimer);
  dom.startScreen.hidden = true;
  dom.gameScreen.hidden = false;
  resetRound();
}

function exitGame() {
  state.playing = false;
  state.startTimestamp = null;
  cancelAnimationFrame(state.timerId ?? 0);
  dom.gameScreen.hidden = true;
  dom.startScreen.hidden = false;
}

function resetRound() {
  state.found = 0;
  dom.foundCount.textContent = String(state.found);
  state.startTimestamp = performance.now();
  dom.timerLabel.textContent = formatTime(0);
}

function updateTimer(now) {
  if (!state.playing || state.startTimestamp == null) {
    dom.timerLabel.textContent = formatTime(0);
    return;
  }
  const elapsed = Math.max(0, now - state.startTimestamp);
  dom.timerLabel.textContent = formatTime(elapsed);
  state.timerId = requestAnimationFrame(updateTimer);
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

init();
