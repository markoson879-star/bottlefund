const goal = 500;

// читаем сохранённое значение или ставим стартовое 24
let current = parseInt(localStorage.getItem("bottleProgress") || "24", 10);

function updateUI() {
  document.getElementById("progress-text").textContent = current + " / " + goal;
  document.getElementById("progress-fill").style.width = (current / goal * 100) + "%";
}

function saveProgress() {
  localStorage.setItem("bottleProgress", current);
}

function addAmount() {
  let input = document.getElementById("inputAmount");
  let value = parseInt(input.value, 10);
  if (!isNaN(value) && value > 0) {
    current += value;
    if (current > goal) current = goal;
    saveProgress();
    updateUI();
    dropCoin();
    input.value = "";
  }
}

function dropCoin() {
  const bottle = document.querySelector(".bottle");
  const coin = document.createElement("div");
  coin.classList.add("coin");
  coin.style.left = Math.random() * 80 + "%";
  bottle.appendChild(coin);
  setTimeout(() => coin.remove(), 2000);
}

document.getElementById("addButton").addEventListener("click", addAmount);

updateUI();
