const countdown = document.getElementById("countdown");
const endDate = new Date("2023-12-31T23:59:59");
const now = new Date();
const diff = endDate - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);

countdown.innerHTML = `${days} ${hours} ${minutes} ${seconds}`;