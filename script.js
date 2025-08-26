// Настройки цели
const GOAL = 500;

// Элементы
const progressTextEl = document.getElementById("progressText");
const progressFillEl = document.getElementById("progressFill");
const amountEl = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

// Прогресс — читаем из localStorage, иначе старт = 24
let current = (() => {
  const saved = localStorage.getItem("bottlefund_progress");
  const n = Number.parseInt(saved ?? "24", 10);
  return Number.isFinite(n) && n >= 0 ? n : 24;
})();

// Обновление интерфейса
function render() {
  const clamped = Math.min(current, GOAL);
  const percent = Math.max(0, Math.min((clamped / GOAL) * 100, 100));
  progressTextEl.textContent = `${clamped} / ${GOAL} ₪`;
  progressFillEl.style.width = `${percent}%`;
}

// Сохранение
function persist() {
  localStorage.setItem("bottlefund_progress", String(current));
}

// Добавление суммы
function addAmount() {
  const val = Number.parseInt(amountEl.value, 10);
  if (!Number.isFinite(val) || val <= 0) {
    amountEl.focus();
    return;
  }
  current = Math.min(current + val, GOAL);
  persist();
  render();
  amountEl.value = "";
  amountEl.focus();
}

// События
addBtn.addEventListener("click", addAmount);
amountEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addAmount();
});

// Первичная отрисовка
render();
