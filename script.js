const path = location.pathname.toLowerCase();

const CONFIG = path.includes("stock")
  ? {
      goal: 1000,
      key: "bottlefund_stock_progress",
      defaultValue: 0,
      label: "бутылок"
    }
  : {
      goal: 500,
      key: "bottlefund_progress",
      defaultValue: 24,
      label: "₪"
    };

const progressTextEl = document.getElementById("progressText");
const progressFillEl = document.getElementById("progressFill");
const amountEl = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

let current = (() => {
  const saved = localStorage.getItem(CONFIG.key);
  const n = Number.parseInt(saved ?? String(CONFIG.defaultValue), 10);
  return Number.isFinite(n) && n >= 0 ? n : CONFIG.defaultValue;
})();

function render() {
  const clamped = Math.min(current, CONFIG.goal);
  const percent = Math.max(0, Math.min((clamped / CONFIG.goal) * 100, 100));
  progressTextEl.textContent = `${clamped} / ${CONFIG.goal} ${CONFIG.label}`;
  progressFillEl.style.width = `${percent}%`;
}

function persist() {
  localStorage.setItem(CONFIG.key, String(current));
}

function addAmount() {
  const val = Number.parseInt(amountEl.value, 10);
  if (!Number.isFinite(val) || val <= 0) {
    amountEl.focus();
    return;
  }
  current = Math.min(current + val, CONFIG.goal);
  persist();
  render();
  amountEl.value = "";
  amountEl.focus();
}

addBtn.addEventListener("click", addAmount);
amountEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addAmount();
});

render();
