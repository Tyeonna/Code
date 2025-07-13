const letters = document.querySelectorAll(".letter");
const lettersContainer = document.querySelector(".letters");
let zIndexCounter = 10;

// Use the letters in the order they appear in the HTML
letters.forEach((letter) => {
  const center = document.querySelector(".cssletter").offsetWidth / 2 - letter.offsetWidth / 2;
  letter.style.left = `${center}px`;

  function isOverflown(element) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }

  if (!isOverflown(letter)) {
    letter.classList.add("center");
  }

  let offsetX, offsetY;
  letter.addEventListener("mousedown", (e) => {
    if (e.target.tagName !== "BUTTON") {
      const rect = e.target.getBoundingClientRect();

      letter.style.position = "fixed";
      letter.style.left = `${rect.left}px`;
      letter.style.top = `${rect.top}px`;

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      letter.style.zIndex = zIndexCounter++;
      const moveAt = (posX, posY) => {
        letter.style.left = `${posX - offsetX}px`;
        letter.style.top = `${posY - offsetY}px`;
      };
      const onMouseMove = (moveEvent) => moveAt(moveEvent.clientX, moveEvent.clientY);
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    }
  });
});

// Open envelope action
document.querySelector("#openEnvelope").addEventListener("click", () => {
  document.querySelector(".envelope").classList.add("active");
});

// Close letter buttons
const closeButtons = document.querySelectorAll(".closeLetter");
closeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const letter = e.target.closest(".letter");
    if (letter) {
      letter.style.display = "none";
    }
  });
});

// Create starry night background
document.addEventListener('DOMContentLoaded', function() {
  // Create stars container
  const stars = document.createElement('div');
  stars.className = 'stars';
  
  // Create 200 twinkling stars
  for (let i = 0; i < 200; i++) {
    const star = document.createElement('span');
    // Random star size (0.5px to 2px)
    const size = Math.random() * 1.5 + 0.5;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Random position
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // Random twinkle duration (3-8 seconds)
    star.style.animationDuration = `${Math.random() * 5 + 3}s`;
    // Random twinkle delay
    star.style.animationDelay = `${Math.random() * 5}s`;
    
    stars.appendChild(star);
  }
  
  document.body.insertBefore(stars, document.body.firstChild);
  
  // Create shooting stars occasionally
  function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    
    // Random angle
    const angle = 215 + (Math.random() * 20 - 10);
    shootingStar.style.transform = `rotate(${angle}deg)`;
    
    // Random duration (2-4 seconds)
    const duration = Math.random() * 2 + 2;
    shootingStar.style.animationDuration = `${duration}s`;
    
    document.body.appendChild(shootingStar);
    
    // Remove after animation completes
    setTimeout(() => {
      shootingStar.remove();
    }, duration * 1000);
  }
  
  // Create shooting stars every 2-5 seconds
  setInterval(createShootingStar, 2000 + Math.random() * 3000);
  
  // Create initial shooting stars
  for (let i = 0; i < 3; i++) {
    setTimeout(createShootingStar, i * 1000);
  }
});