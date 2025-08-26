const goal = 500;

// загружаем сохранённый прогресс или ставим стартовые 24
let current = parseInt(localStorage.getItem("bottleProgress") || "24", 10);

const progressEl = document.getElementById("progress");
const barEl = document.getElementById("progress-bar");
const addBtn = document.getElementById("add-btn");
const inputEl = document.getElementById("amount");

// функция обновления интерфейса
function updateProgress() {
  progressEl.textContent = `${current} ₪ / ${goal} ₪`;
  const percent = (current / goal) * 100;
  barEl.style.width = percent + "%";
  localStorage.setItem("bottleProgress", current); // сохраняем
}

// обработчик кнопки
addBtn.addEventListener("click", () => {
  const amount = parseInt(inputEl.value, 10);
  if (!isNaN(amount) && amount > 0) {
    current += amount;
    inputEl.value = "";
    updateProgress();
  }
});

// начальная отрисовка
updateProgress();
