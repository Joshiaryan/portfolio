document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    });
  });

  // Navigation: show only selected section
  const showSection = (id) => {
    document.querySelectorAll('.section').forEach(sec => {
      sec.style.display = 'none';
    });
    const targetSec = document.getElementById(id);
    if (targetSec) targetSec.style.display = 'block';
  };
  // Initialize: show home
  showSection('home');
  const homeSec = document.getElementById('home');
  if (homeSec) homeSec.classList.add('visible');
  
  // Highlight home in nav
  const homeLink = document.querySelector('.nav-links a[href="#home"]');
  if (homeLink) homeLink.classList.add('active');

  // Handle navigation clicks
  document.querySelectorAll('.nav-links a, #heroViewProjects').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      
      // Update URL hash without jumping
      history.pushState(null, null, `#${id}`);
      
      showSection(id);
      
      // Update active state in nav
      document.querySelectorAll('.nav-links a').forEach(navLink => {
        navLink.classList.remove('active');
        if (navLink.getAttribute('href') === `#${id}`) {
          navLink.classList.add('active');
        }
      });

      // Scroll to top of the new section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Hero Mouse Tracking Animation - Disabled
  // const heroVisual = document.querySelector('.hero-visual');
  // if (heroVisual) {
  //   document.addEventListener('mousemove', (e) => {
  //     const { clientX, clientY } = e;
  //     const x = (clientX / window.innerWidth - 0.5) * 30;
  //     const y = (clientY / window.innerHeight - 0.5) * 30;
  //     heroVisual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  //   });
  // }

  // Intersection Observer for scroll animations (fade-in)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Form Submission Handling (Prevent default for demo)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      btn.disabled = true;
      
      // Simulate network request
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        btn.style.background = '#10b981'; // Green
        form.reset();
        
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = ''; // Revert to original
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  });
});
