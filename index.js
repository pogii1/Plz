const pictures = [
  { src: "https://flagcdn.com/w320/us.png", answer: "usa" },
  { src: "https://flagcdn.com/w320/gb.png", answer: "united kingdom" },
  { src: "https://flagcdn.com/w320/fr.png", answer: "france" },
  { src: "https://flagcdn.com/w320/jp.png", answer: "japan" },
  { src: "https://flagcdn.com/w320/ca.png", answer: "canada" },
  { src: "https://flagcdn.com/w320/br.png", answer: "brazil" },
  { src: "https://flagcdn.com/w320/in.png", answer: "india" },
  { src: "https://flagcdn.com/w320/au.png", answer: "australia" },
  { src: "https://flagcdn.com/w320/de.png", answer: "germany" },
  { src: "https://flagcdn.com/w320/it.png", answer: "italy" }
];

const allAnswers = pictures.map(p => p.answer);

let currentIndex = 0;
let score = 0;
let audio;
if (typeof Audio !== "undefined") {
  audio = new Audio('Pagsuko - JIreh Lim (Lyrics) (mp3cut.net).mp3');
}

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

window.onload = function() {
  loadPicture();
  if (document.getElementById('heart-rain-container')) {
    createHearts();
  }
  document.getElementById("score").textContent = `Score: ${score}/${pictures.length}`;
};

function loadPicture() {
  if (pictures[currentIndex]) {
    document.getElementById("picture").src = pictures[currentIndex].src;
  }
  document.getElementById("result").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";
  generateChoices();
}

function generateChoices() {
  const choicesContainer = document.getElementById("choices-container");
  choicesContainer.innerHTML = "";

  const correctAnswer = pictures[currentIndex].answer;
  let possibleChoices = [correctAnswer];

  const incorrectAnswers = allAnswers.filter(answer => answer !== correctAnswer);
  while (possibleChoices.length < 3 && incorrectAnswers.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectAnswers.length);
    const randomIncorrect = incorrectAnswers.splice(randomIndex, 1)[0];
    possibleChoices.push(randomIncorrect);
  }

  possibleChoices.sort(() => Math.random() - 0.5);

  possibleChoices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
    button.classList.add("choice-button");
    button.onclick = () => checkGuess(choice);
    choicesContainer.appendChild(button);
  });
}

function checkGuess(selectedChoice) {
  const correctAnswer = pictures[currentIndex].answer;
  const resultDiv = document.getElementById("result");
  const choicesContainer = document.getElementById("choices-container");
  const choiceButtons = choicesContainer.querySelectorAll('.choice-button');

  choiceButtons.forEach(button => button.disabled = true);

  if (selectedChoice === correctAnswer) {
    resultDiv.innerHTML = "🎀 NAKS ALAM AH 🎀";
    resultDiv.className = "correct";
    score++;
    document.getElementById("score").textContent = `Score: ${score}/${pictures.length}`;

    if (currentIndex === pictures.length - 1) {
      if (audio) audio.play().catch(e => console.log("Audio play failed:", e));
      setTimeout(() => {
        showCustomAlert("MAY PAG ASA PABA AKO????? 💘");
      }, 1500);
    } else {
      setTimeout(() => {
        nextPicture();
      }, 1500);
    }
  } else {
    resultDiv.innerHTML = `🌸 HAHAHAHAHA MALIIII ANG SAGOT AY ${correctAnswer.charAt(0).toUpperCase() + correctAnswer.slice(1)} 🌸`;
    resultDiv.className = "incorrect";
  }
}

function nextPicture() {
  if (currentIndex < pictures.length - 1) {
    currentIndex++;
    loadPicture();
  }
}

function endGame() {
  document.getElementById("result").innerHTML =
    `💖 Game Over! Your Final Score: <strong>${score}/${pictures.length}</strong> 💖`;
  document.getElementById("picture").style.display = "none";
  document.getElementById("choices-container").style.display = "none";
  document.getElementById("next-btn").style.display = "none";
}

function restartGame() {
  currentIndex = 0;
  score = 0;
  document.getElementById("score").textContent = `Score: 0/${pictures.length}`;
  document.getElementById("picture").style.display = "block";
  document.getElementById("choices-container").style.display = "flex";
  loadPicture();
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

function showCustomAlert(message) {
  document.getElementById("customAlertMessage").textContent = message;
  document.getElementById("customAlert").classList.add('show');
}

function hideCustomAlert() {
  document.getElementById("customAlert").classList.remove('show');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  endGame();
}
