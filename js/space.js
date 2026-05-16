// Generate stars for space background
function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;

  const starCount = 200;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = Math.random();
    
    // Determine star size class
    if (size > 0.8) {
      star.className = 'star large';
    } else if (size > 0.5) {
      star.className = 'star medium';
    } else {
      star.className = 'star small';
    }
    
    // Random position
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random animation duration and delay
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.animationDelay = Math.random() * 3 + 's';
    
    starsContainer.appendChild(star);
  }
  
  // Create shooting stars
  createShootingStars();
}

function createShootingStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;
  
  const shootingStarCount = 3;
  
  for (let i = 0; i < shootingStarCount; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position (top area)
    shootingStar.style.left = Math.random() * 50 + '%';
    shootingStar.style.top = Math.random() * 30 + '%';
    
    // Random animation delay
    shootingStar.style.animationDelay = (Math.random() * 5 + i * 3) + 's';
    
    starsContainer.appendChild(shootingStar);
  }
}

// Initialize stars when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createStars);
} else {
  createStars();
}
