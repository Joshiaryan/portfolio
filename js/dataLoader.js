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
  const logo = document.querySelector('.logo');
  const heroTitle = document.querySelector('.hero-content h1');
  const subtitle = document.querySelector('.subtitle');
  
  if (logo) logo.textContent = data.logo;
  if (heroTitle) heroTitle.innerHTML = `<span class="text-gradient">${escapeHtml(data.title.split('&')[0].trim())}</span> & <br>${escapeHtml(data.title.split('&')[1].trim())}`;
  if (subtitle) subtitle.textContent = data.subtitle;
  
  // Update contact section
  const emailLink = document.querySelector('a[href^="mailto"]');
  const emailSpan = document.querySelector('a[href^="mailto"] span:last-child');
  const phoneLink = document.querySelector('a[href^="tel"]');
  const phoneSpan = document.querySelector('a[href^="tel"] span:last-child');
  
  if (emailLink) emailLink.href = `mailto:${data.email}?subject=Hello&body=Hi ${escapeHtml(data.name.split(' ')[0])},`;
  if (emailSpan) emailSpan.textContent = data.email;
  if (phoneLink) phoneLink.href = `tel:${data.phone}`;
  if (phoneSpan) phoneSpan.textContent = data.phone;
  
  document.querySelectorAll('footer .logo').forEach(el => el.textContent = data.logo);
  
  // Update footer social links
  const socialLinks = document.querySelectorAll('footer .social-links a');
  if (data.social.linkedin && socialLinks[0]) socialLinks[0].href = data.social.linkedin;
  if (data.social.github && socialLinks[1]) socialLinks[1].href = data.social.github;
}

// Utility function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render about section
function renderAbout(data) {
  const aboutSection = document.querySelector('#about .card');
  if (aboutSection) {
    aboutSection.innerHTML = `
      <p style="font-size: 1.25rem; line-height: 1.8; color: var(--text-secondary);">
        ${escapeHtml(data.about.intro)}
      </p>
      <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary); margin-top: 1.5rem;">
        ${escapeHtml(data.about.description)}
      </p>
    `;
  }
}

// Render education section
function renderEducation(data) {
  const educationGrid = document.querySelector('#education .grid-1');
  if (educationGrid && data.education) {
    educationGrid.innerHTML = data.education.map(edu => `
      <div class="card" style="display: flex; flex-direction: row; gap: 2rem; align-items: center; padding: 2rem;">
        <div style="font-size: 0.85rem; color: var(--accent-color); font-weight: 600; min-width: 100px;">${escapeHtml(edu.duration)}</div>
        <div>
          <h3 class="card-title" style="margin-bottom: 0.25rem;">${escapeHtml(edu.degree)}</h3>
          <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 0.75rem;">${escapeHtml(edu.institution)} | ${escapeHtml(edu.organization)}</p>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span class="tag">GPA: ${escapeHtml(edu.gpa)}</span>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// Render skills section
function renderSkills(data) {
  const skillsGrid = document.querySelector('#skills .grid-2');
  if (skillsGrid && data.skills) {
    skillsGrid.innerHTML = `
      <div class="card">
        <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem;">Development</h3>
        <div class="tags-container">
          ${data.skills.development ? data.skills.development.map(skill => `<span class="tag">${escapeHtml(skill)}</span>`).join('') : ''}
        </div>
      </div>
      
      <div class="card">
        <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem;">Tools & Others</h3>
        <div class="tags-container">
          ${data.skills.tools ? data.skills.tools.map(tool => `<span class="tag">${escapeHtml(tool)}</span>`).join('') : ''}
        </div>
      </div>
      
      <div class="card" style="grid-column: 1 / -1;">
        <h3 class="card-title" style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-secondary); margin-bottom: 1.5rem; text-align: center;">Languages</h3>
        <div class="tags-container" style="justify-content: center;">
          ${data.skills.languages ? data.skills.languages.map(lang => `<span class="tag">${escapeHtml(lang)}</span>`).join('') : ''}
        </div>
      </div>
    `;
  }
}

// Render projects section
function renderProjects(data) {
  const projectsGrid = document.querySelector('#projects .grid-2');
  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = data.projects.map(project => `
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h3 class="card-title">${escapeHtml(project.title)}</h3>
            <p class="card-subtitle">${escapeHtml(project.subtitle)}</p>
          </div>
          <div class="tags-container">
            ${project.technologies ? project.technologies.map(tech => `<span class="tag">${escapeHtml(tech)}</span>`).join('') : ''}
          </div>
        </div>
        <div class="card-body">
          <p>${escapeHtml(project.description)}</p>
        </div>
        <div style="margin-top: auto; display: flex; gap: 1rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
          <a href="${escapeHtml(project.liveDemo)}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">Live Demo</a>
          <a href="${escapeHtml(project.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;">View Code</a>
        </div>
      </div>
    `).join('');
  }
}

// Render activity section
function renderActivity(data) {
  const activityCard = document.querySelector('#activity .grid-2 .card:first-child');
  if (activityCard && data.activities) {
    activityCard.innerHTML = data.activities.map((activity, index) => `
      <div style="display: flex; gap: 1rem; align-items: flex-start; ${index > 0 ? 'margin-top: 1.5rem;' : ''}">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${activity.status === 'active' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}; margin-top: 6px;"></div>
        <div>
          <p style="color: var(--text-primary); font-weight: 500;">${escapeHtml(activity.title)}</p>
          <p style="color: var(--text-secondary); font-size: 0.85rem;">${escapeHtml(activity.description)}</p>
        </div>
      </div>
    `).join('');
  }
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
