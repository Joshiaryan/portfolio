// Generate stars for space background with parallax layers
function createStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;

  // Create 3 parallax layers
  const layer1 = document.createElement('div');
  const layer2 = document.createElement('div');
  const layer3 = document.createElement('div');
  
  layer1.className = 'star-layer star-layer-1';
  layer2.className = 'star-layer star-layer-2';
  layer3.className = 'star-layer star-layer-3';
  
  starsContainer.appendChild(layer1);
  starsContainer.appendChild(layer2);
  starsContainer.appendChild(layer3);

  const layers = [layer1, layer2, layer3];
  const starCounts = [100, 80, 50];
  
  layers.forEach((layer, layerIndex) => {
    for (let i = 0; i < starCounts[layerIndex]; i++) {
      const star = document.createElement('div');
      const size = Math.random();
      
      // Determine star size class
      if (size > 0.9) {
        star.className = 'star glow';
      } else if (size > 0.7) {
        star.className = 'star large';
      } else if (size > 0.4) {
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
      
      layer.appendChild(star);
    }
  });
  
  // Create shooting stars
  createShootingStars();
  
  // Create floating particles
  createParticles();
}

function createShootingStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;
  
  const shootingStarCount = 5;
  
  for (let i = 0; i < shootingStarCount; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    
    // Random starting position (top area)
    shootingStar.style.left = Math.random() * 50 + '%';
    shootingStar.style.top = Math.random() * 30 + '%';
    
    // Random animation delay
    shootingStar.style.animationDelay = (Math.random() * 8 + i * 2) + 's';
    
    starsContainer.appendChild(shootingStar);
  }
}

function createParticles() {
  const spaceBackground = document.querySelector('.space-background');
  if (!spaceBackground) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation duration and delay
    particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    spaceBackground.appendChild(particle);
  }
}

// Initialize stars when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createStars);
} else {
  createStars();
}
