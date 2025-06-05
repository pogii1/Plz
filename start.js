function createHearts() {
  const heartCount = 15;
  for (let i = 0; i < heartCount; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 500);
  }
  setTimeout(maintainHeartRain, heartCount * 500);
}

function maintainHeartRain() {
  createHeart();
  setTimeout(maintainHeartRain, Math.random() * 2000 + 1000);
}

function createHeart() {
  const heartContainer = document.getElementById('heart-rain-container');
  if (!heartContainer) return;

  const heart = document.createElement('div');
  heart.innerHTML = '❤';
  heart.classList.add('heart');

  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 5 + 7) + 's';
  heart.style.fontSize = (Math.random() * 10 + 10) + 'px';
  heart.style.opacity = Math.random() * 0.4 + 0.3;

  heartContainer.appendChild(heart);

  setTimeout(() => {
    if (heart && heart.parentNode) {
      heart.remove();
    }
  }, 12000);
}

function showCustomAlert(title, message, imgSrc = null) {
  document.getElementById("customAlertTitle").textContent = title;
  document.getElementById("customAlertMessage").textContent = message;

  const imageElement = document.getElementById("customAlertImage");
  if (imgSrc) {
    imageElement.src = imgSrc;
    imageElement.style.display = 'block';
  } else {
    imageElement.src = '';
    imageElement.style.display = 'none';
  }

  document.getElementById("customAlert").classList.add('show');
}

function handleAlertDismiss() {
  document.getElementById("customAlert").classList.remove('show');
  window.location.href = 'index.html';
}

document.getElementById('startGameForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const imagePathForAlert = 'naillong.jpg';

  showCustomAlert('Game Rules! 🎮', 'IF MALI SAGOT MO RESTART MOO NALALNG HAHAH', imagePathForAlert);
});

window.onload = function() {
  if (document.getElementById('heart-rain-container')) {
    createHearts();
  }
};
