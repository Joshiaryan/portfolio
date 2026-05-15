// Load all portfolio data from JSON files
async function loadPortfolioData() {
  try {
    // Fetch all JSON files
    const [personal, about, education, skills, projects, activity] = await Promise.all([
      fetch('personal.json').then(res => res.json()),
      fetch('about.json').then(res => res.json()),
      fetch('education.json').then(res => res.json()),
      fetch('skills.json').then(res => res.json()),
      fetch('projects.json').then(res => res.json()),
      fetch('activity.json').then(res => res.json())
    ]);

    // Render all sections
    renderPersonalInfo(personal);
    renderAbout(about);
    renderEducation(education);
    renderSkills(skills);
    renderProjects(projects);
    renderActivity(activity);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Render personal information
function renderPersonalInfo(data) {
  document.querySelector('.logo').textContent = data.logo;
  document.querySelector('.hero-content h1').innerHTML = `<span class="text-gradient">${data.title.split('&')[0].trim()}</span> & <br>${data.title.split('&')[1].trim()}`;
  document.querySelector('.subtitle').textContent = data.subtitle;
  
  // Update contact section
  document.querySelector('a[href^="mailto"]').href = `mailto:${data.email}?subject=Hello&body=Hi ${data.name.split(' ')[0]},`;
  document.querySelector('a[href^="mailto"] span:last-child').textContent = data.email;
  document.querySelector('a[href^="tel"]').href = `tel:${data.phone}`;
  document.querySelector('a[href^="tel"] span:last-child').textContent = data.phone;
  document.querySelectorAll('footer .logo').forEach(el => el.textContent = data.logo);
}

// Render about section
function renderAbout(data) {
  const aboutSection = document.querySelector('#about .card');
  aboutSection.innerHTML = `
    <p style="font-size: 1.25rem; line-height: 1.8; color: var(--text-secondary);">
      ${data.about.intro}
    </p>
    <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-top: 1.5rem;">
      ${data.about.description}
    </p>
  `;
}

// Render education section
function renderEducation(data) {
  const educationGrid = document.querySelector('#education .grid-1');
  educationGrid.innerHTML = data.education.map(edu => `
    <div class="card" style="display: flex; flex-direction: row; gap: 2rem; align-items: center; padding: 2rem;">
      <div style="font-size: 0.85rem; color: var(--accent-color); font-weight: 600; min-width: 100px;">${edu.duration}</div>
      <div>
        <h3 class="card-title" style="margin-bottom: 0.25rem;">${edu.degree}</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.75rem;">${edu.institution} | ${edu.organization}</p>
        <div style="display: flex; gap: 1rem; align-items: center;">
          <span class="tag">GPA: ${edu.gpa}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Render skills section
function renderSkills(data) {
  const skillsGrid = document.querySelector('#skills .grid-2');
  skillsGrid.innerHTML = `
    <div class="card">
      <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem;">Development</h3>
      <div class="tags-container">
        ${data.skills.development.map(skill => `<span class="tag">${skill}</span>`).join('')}
      </div>
    </div>
    
    <div class="card">
      <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem;">Tools & Others</h3>
      <div class="tags-container">
        ${data.skills.tools.map(tool => `<span class="tag">${tool}</span>`).join('')}
      </div>
    </div>
    
    <div class="card" style="grid-column: 1 / -1;">
      <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem; text-align: center;">Languages</h3>
      <div class="tags-container" style="justify-content: center;">
        ${data.skills.languages.map(lang => `<span class="tag">${lang}</span>`).join('')}
      </div>
    </div>
  `;
}

// Render projects section
function renderProjects(data) {
  const projectsGrid = document.querySelector('#projects .grid-2');
  projectsGrid.innerHTML = data.projects.map(project => `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div>
          <h3 class="card-title">${project.title}</h3>
          <p class="card-subtitle">${project.subtitle}</p>
        </div>
        <div class="tags-container">
          ${project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('')}
        </div>
      </div>
      <div class="card-body">
        <p>${project.description}</p>
      </div>
      <div style="margin-top: auto; display: flex; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <a href="${project.liveDemo}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Live Demo</a>
        <a href="${project.github}" target="_blank" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;">View Code</a>
      </div>
    </div>
  `).join('');
}

// Render activity section
function renderActivity(data) {
  const activityCard = document.querySelector('#activity .grid-2 .card:first-child');
  activityCard.innerHTML = data.activities.map((activity, index) => `
    <div style="display: flex; gap: 1rem; align-items: flex-start; ${index > 0 ? 'margin-top: 1.5rem;' : ''}">
      <div style="width: 8px; height: 8px; border-radius: 50%; background: ${activity.status === 'active' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}; margin-top: 6px;"></div>
      <div>
        <p style="color: var(--text-primary); font-weight: 500;">${activity.title}</p>
        <p style="color: var(--text-secondary); font-size: 0.85rem;">${activity.description}</p>
      </div>
    </div>
  `).join('');
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
