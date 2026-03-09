const app = document.querySelector('.container');
const GOAL = Number(app?.dataset.goal || 500);
const UNIT = app?.dataset.unit || '₪';
const STORAGE_KEY = app?.dataset.storageKey || 'bottlefund_progress';
const START_VALUE = Number(app?.dataset.start || 0);

const progressTextEl = document.getElementById('progressText');
const progressFillEl = document.getElementById('progressFill');
const amountEl = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');

let current = (() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  const n = Number.parseInt(saved ?? String(START_VALUE), 10);
  return Number.isFinite(n) && n >= 0 ? n : START_VALUE;
})();

function render() {
  const clamped = Math.min(current, GOAL);
  const percent = Math.max(0, Math.min((clamped / GOAL) * 100, 100));
  progressTextEl.textContent = `${clamped} / ${GOAL} ${UNIT}`;
  progressFillEl.style.width = `${percent}%`;
}

function persist() {
  localStorage.setItem(STORAGE_KEY, String(current));
}

function addAmount() {
  const val = Number.parseInt(amountEl.value, 10);
  if (!Number.isFinite(val) || val <= 0) {
    amountEl.focus();
    return;
  }
  current = Math.min(current + val, GOAL);
  persist();
  render();
  amountEl.value = '';
  amountEl.focus();
}

addBtn?.addEventListener('click', addAmount);
amountEl?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addAmount();
});

render();
