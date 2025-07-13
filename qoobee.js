const input = document.getElementById('username');
const greeting = document.getElementById('greeting');
const qoobeeImg = document.getElementById('qoobee-img');
const bubbleText = document.getElementById('speech-text');
const container = document.querySelector('.container');
const responseButtons = document.getElementById('response-buttons');
const helloBtn = document.getElementById('hello-btn');
const whateverBtn = document.getElementById('whatever-btn');
const takeGiftBtn = document.getElementById('take-gift-btn');
const envelopeContainer = document.querySelector('.envelope-container');

// Initialize take gift button as hidden
takeGiftBtn.style.display = "none";

const keywords = ["maria", "krisela", "nierva", "quisido", "ela"];
let isHoveringButton = false;
let whateverClickCount = 0;
let quizState = null;

input.addEventListener('input', function () {
  const name = input.value.toLowerCase().trim();
  const isMatch = keywords.some(keyword => name.includes(keyword));

  qoobeeImg.classList.remove('happy-animation', 'sad-animation');
  bubbleText.classList.remove('animate__animated', 'animate__tada', 'animate__headShake');

  const existingHearts = document.querySelectorAll('.heart');
  existingHearts.forEach(heart => heart.remove());

  if (isMatch) {
    qoobeeImg.src = "qoobeehap.gif";
    bubbleText.textContent = "My Babyyyyy! 💖";
    input.style.display = "none";

    qoobeeImg.classList.add('happy-animation');
    bubbleText.classList.add('animate__animated', 'animate__tada');

    greeting.textContent = `Hello my baby ${input.value}! 💕`;
    greeting.classList.add('animate__animated', 'animate__fadeIn');

    createHearts();
    launchConfetti();
    playSound('happy-sound.mp3');
    responseButtons.style.display = "block";
  } else if (name.length > 0) {
    qoobeeImg.src = "qoobeedk.gif";
    bubbleText.textContent = "Sorry I don't know you 😢";
    input.style.display = "block";

    qoobeeImg.classList.add('sad-animation');
    bubbleText.classList.add('animate__animated', 'animate__headShake');

    greeting.textContent = "Try another name...";
    greeting.classList.add('animate__animated', 'animate__fadeIn');

    playSound('sad-sound.mp3');
    responseButtons.style.display = "none";
  } else {
    qoobeeImg.src = "qoobee.gif";
    bubbleText.textContent = "What's your name?";
    greeting.textContent = "";
    input.style.display = "block";
    responseButtons.style.display = "none";
    quizState = null;
  }
});

// Button hover events
helloBtn.addEventListener('mouseenter', () => {
  isHoveringButton = true;
  qoobeeImg.src = "qoobeehello.gif";
  playSound('hello-sound.mp3');
});

whateverBtn.addEventListener('mouseenter', () => {
  isHoveringButton = true;
  qoobeeImg.src = "qoobeecry.gif";
  playSound('whatever-sound.mp3');
});

helloBtn.addEventListener('mouseleave', () => {
  isHoveringButton = false;
  setTimeout(() => {
    if (!isHoveringButton) qoobeeImg.src = quizState ? "qoobeewait.gif" : "qoobeehap.gif";
  }, 100);
});

whateverBtn.addEventListener('mouseleave', () => {
  isHoveringButton = false;
  setTimeout(() => {
    if (!isHoveringButton) qoobeeImg.src = quizState ? "qoobeewait.gif" : "qoobeehap.gif";
  }, 100);
});

whateverBtn.addEventListener('click', () => {
  whateverClickCount++;

  if (whateverClickCount < 10) {
    const containerRect = container.getBoundingClientRect();
    const btnWidth = whateverBtn.offsetWidth;
    const btnHeight = whateverBtn.offsetHeight;

    const maxX = container.clientWidth - btnWidth;
    const maxY = container.clientHeight - btnHeight;

    const randomX = Math.max(0, Math.min(Math.random() * maxX, maxX));
    const randomY = Math.max(0, Math.min(Math.random() * maxY, maxY));

    whateverBtn.style.position = "absolute";
    whateverBtn.style.opacity = "1";
    whateverBtn.style.display = "block";  
    whateverBtn.style.transition = "all 0.3s ease";
    whateverBtn.style.left = `${randomX}px`;
    whateverBtn.style.top = `${randomY}px`;
    whateverBtn.style.zIndex = "20";
  } else {
    whateverBtn.style.transition = "opacity 0.5s ease";
    whateverBtn.style.opacity = "0";
    setTimeout(() => {
      whateverBtn.style.display = "none";
    }, 500);
  }
});

helloBtn.addEventListener('click', () => {
  qoobeeImg.src = "qoobeewait.gif";
  qoobeeImg.classList.remove('happy-animation', 'sad-animation');
  bubbleText.textContent = "Are you really my baby?";
  greeting.textContent = "";
  responseButtons.innerHTML = `
    <button id="yes-btn">Yes! 💖</button>
    <button id="no-btn">No 😢</button>
  `;
  quizState = 'initial';
  playSound('quiz-start-sound.mp3');

  const yesBtn = document.getElementById('yes-btn');
  const noBtn = document.getElementById('no-btn');

  yesBtn.addEventListener('click', () => {
    qoobeeImg.src = "qoobeereal.gif";
    qoobeeImg.classList.remove('happy-animation', 'sad-animation');
    bubbleText.textContent = "What is my name?";
    quizState = 'name';
    responseButtons.innerHTML = '';
    const quizInput = document.createElement('input');
    quizInput.type = 'text';
    quizInput.id = 'quiz-input';
    quizInput.placeholder = "Type your answer here";
    quizInput.className = 'quiz-input';
    container.insertBefore(quizInput, greeting);
    playSound('question-sound.mp3');

    quizInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleQuizInput();
      }
    });
  });

  noBtn.addEventListener('click', () => {
    playSound('wrong-answer-sound.mp3');
    handleIncorrectAnswer();
  });
});

function handleQuizInput() {
  const quizInput = document.getElementById('quiz-input');
  const answer = quizInput.value.toLowerCase().trim();

  if (!answer) return;

  if (quizState === 'name') {
    const validNames = ["marko", "mako", "karlo", "yara"];
    const isCorrect = validNames.some(name => answer.includes(name));
    if (isCorrect) {
      playSound('correct-answer-sound.mp3');
      bubbleText.textContent = "When is my birthday?";
      quizState = 'birthday';
      quizInput.value = '';
      quizInput.placeholder = "Type my birthday (e.g., October 28, 2003)";
    } else {
      playSound('wrong-answer-sound.mp3');
      handleIncorrectAnswer();
    }
  } else if (quizState === 'birthday') {
    const validDate = answer.replace(/[-/]/g, ' ').toLowerCase();
    const validFormats = ["january 27, 2005", "01 27, 2005", "1-27-2005"];
    const isCorrect = validFormats.some(format => validDate.includes(format));
    if (isCorrect) {
      playSound('correct-answer-sound.mp3');
      bubbleText.textContent = "What is the name of our two baby plushies?";
      quizState = 'plushies';
      quizInput.value = '';
      quizInput.placeholder = "Type the names (e.g., blank and blank)";
    } else {
      playSound('wrong-answer-sound.mp3');
      handleIncorrectAnswer();
    }
  } else if (quizState === 'plushies') {
    const validAnswers = ["primo and suzie", "suzie and primo"];
    const isCorrect = validAnswers.includes(answer.replace(/[^a-z\s]/g, '').trim());
    if (isCorrect) {
      playSound('correct-answer-sound.mp3');
      bubbleText.textContent = "What's my favorite color?";
      quizState = 'color';
      quizInput.value = '';
      quizInput.placeholder = "Type my favorite color";
    } else {
      playSound('wrong-answer-sound.mp3');
      handleIncorrectAnswer();
    }
  } else if (quizState === 'color') {
    if (answer === "blue") {
      playSound('correct-answer-sound.mp3');
      bubbleText.textContent = "When is our anniversary?";
      quizState = 'anniversary';
      quizInput.value = '';
      quizInput.placeholder = "Type our anniversary (e.g., february 14)";
    } else {
      playSound('wrong-answer-sound.mp3');
      handleIncorrectAnswer();
    }
  } else if (quizState === 'anniversary') {
    const validDates = ["july 17", "july 17 2023", "july 17 2025"];
    const isCorrect = validDates.some(date => answer.includes(date));
    if (isCorrect) {
      playSound('happy-sound.mp3');
      bubbleText.textContent = "You got them all right, my baby! 💖";
      qoobeeImg.src = "qoobeehap.gif";
      quizState = null;
      quizInput.remove();
      responseButtons.style.display = "none";
      createHearts();
      launchConfetti();
      playSound('happy-sound.mp3');
      
      setTimeout(showGift, 3000);
    } else {
      playSound('wrong-answer-sound.mp3');
      handleIncorrectAnswer();
    }
  }
}

function showGift() {
  qoobeeImg.src = "qoobeeso.gif";
  qoobeeImg.classList.remove('happy-animation');
  bubbleText.textContent = "Since my baby got it all right, I have a gift for you";
  
  // Ensure button is hidden before showing it after delay
  takeGiftBtn.style.display = "none";
  
  setTimeout(() => {
    takeGiftBtn.style.display = "block";
    takeGiftBtn.style.animation = "pulse 2s infinite";
  }, 3000);
}

function handleIncorrectAnswer() {
  qoobeeImg.src = "qoobeelost.gif";
  qoobeeImg.classList.remove('happy-animation', 'sad-animation');
  bubbleText.textContent = "Goodbye you're not my baby";
  const quizInput = document.getElementById('quiz-input');
  if (quizInput) quizInput.remove();
  responseButtons.style.display = "none";
  greeting.textContent = "";
  playSound('wrong-answer-sound.mp3');
  setTimeout(() => {
    window.location.reload();
  }, 3000);
}

function createHearts() {
  const heartsContainer = document.createElement('div');
  heartsContainer.className = 'floating-hearts';
  container.appendChild(heartsContainer);

  const heartColors = ['#D63484', '#FF9BD2', '#FFD4D4', '#FF6B6B'];
  
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.transform = `scale(${Math.random() * 0.7 + 0.3})`;
      
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      heart.style.backgroundImage = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>')`;
      
      heartsContainer.appendChild(heart);
      animateHeart(heart);
    }, i * 150);
  }
}

function animateHeart(heart) {
  const animationDuration = Math.random() * 3 + 2;
  heart.style.animation = `float-up ${animationDuration}s ease-in forwards`;
  heart.style.opacity = '1';

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float-up {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    heart.remove();
    style.remove();
  }, animationDuration * 1000);
}

function launchConfetti() {
  const count = 300;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FF9BD2', '#D63484', '#FFD4D4', '#FF6B6B', '#F8F4E6'],
    shapes: ['circle', 'heart'],
    spread: 90,
    ticks: 100
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });  
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
  
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { y: 0.6 },
      shapes: ['heart'],
      colors: ['#D63484', '#FF9BD2'],
      scalar: 1.5
    });
  }, 300);
}

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.volume = 0.3;
  audio.play();
}