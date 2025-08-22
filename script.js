let current = 24;
const goal = 500;

function addAmount() {
  let input = prompt("Введите сумму для добавления:");
  if (!input) return;
  let value = parseInt(input);
  if (isNaN(value) || value <= 0) {
    alert("Введите положительное число!");
    return;
  }
  current += value;
  if (current > goal) current = goal;

  document.getElementById("progress-text").textContent = current + " / " + goal;
  document.getElementById("progress-fill").style.width = (current / goal * 100) + "%";

  spawnCoin();
}

function spawnCoin() {
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.style.left = Math.random() * 80 + "px";
  document.getElementById("coins").appendChild(coin);
  setTimeout(() => coin.remove(), 2000);
}
