// Load all portfolio data from JSON files
async function loadPortfolioData() {
  try {
    const [personal, about, education, skills, projects, activity] = await Promise.all([
      fetch('personal.json').then(res => res.json()),
      fetch('about.json').then(res => res.json()),
      fetch('education.json').then(res => res.json()),
      fetch('skills.json').then(res => res.json()),
      fetch('projects.json').then(res => res.json()),
      fetch('activity.json').then(res => res.json())
    ]);

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
  
  if (heroTitle) {
    heroTitle.innerHTML = '';
    const span = document.createElement('span');
    span.className = 'text-gradient';
    span.textContent = data.title.split('&')[0].trim();
    heroTitle.appendChild(span);
    heroTitle.appendChild(document.createTextNode(' & '));
    const br = document.createElement('br');
    heroTitle.appendChild(br);
    heroTitle.appendChild(document.createTextNode(data.title.split('&')[1].trim()));
  }
  
  if (subtitle) subtitle.textContent = data.subtitle;
  
  const emailLink = document.querySelector('a[href^="mailto"]');
  const emailSpan = document.querySelector('a[href^="mailto"] span:last-child');
  const phoneLink = document.querySelector('a[href^="tel"]');
  const phoneSpan = document.querySelector('a[href^="tel"] span:last-child');
  
  if (emailLink) emailLink.href = `mailto:${data.email}?subject=Hello&body=Hi ${data.name.split(' ')[0]},`;
  if (emailSpan) emailSpan.textContent = data.email;
  if (phoneLink) phoneLink.href = `tel:${data.phone}`;
  if (phoneSpan) phoneSpan.textContent = data.phone;
  
  document.querySelectorAll('footer .logo').forEach(el => el.textContent = data.logo);
  
  const socialLinks = document.querySelectorAll('footer .social-links a');
  if (data.social.linkedin && socialLinks[0]) socialLinks[0].href = data.social.linkedin;
  if (data.social.github && socialLinks[1]) socialLinks[1].href = data.social.github;
}

// Render about section
function renderAbout(data) {
  const aboutSection = document.querySelector('#about .card');
  if (aboutSection && data.about) {
    aboutSection.innerHTML = '';
    
    const p1 = document.createElement('p');
    p1.style.fontSize = '1.25rem';
    p1.style.lineHeight = '1.8';
    p1.style.color = 'var(--text-secondary)';
    p1.textContent = data.about.intro;
    
    const p2 = document.createElement('p');
    p2.style.fontSize = '1.1rem';
    p2.style.lineHeight = '1.8';
    p2.style.color = 'var(--text-secondary)';
    p2.style.marginTop = '1.5rem';
    p2.textContent = data.about.description;
    
    aboutSection.appendChild(p1);
    aboutSection.appendChild(p2);
  }
}

// Render education section
function renderEducation(data) {
  const educationGrid = document.querySelector('#education .grid-1');
  if (educationGrid && data.education) {
    educationGrid.innerHTML = '';
    
    data.education.forEach(edu => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.display = 'flex';
      card.style.flexDirection = 'row';
      card.style.gap = '2rem';
      card.style.alignItems = 'center';
      card.style.padding = '2rem';
      
      const duration = document.createElement('div');
      duration.style.fontSize = '0.85rem';
      duration.style.color = 'var(--accent-color)';
      duration.style.fontWeight = '600';
      duration.style.minWidth = '100px';
      duration.textContent = edu.duration;
      
      const content = document.createElement('div');
      
      const title = document.createElement('h3');
      title.className = 'card-title';
      title.style.marginBottom = '0.25rem';
      title.textContent = edu.degree;
      
      const institution = document.createElement('p');
      institution.style.color = 'var(--text-secondary)';
      institution.style.fontSize = '0.95rem';
      institution.style.marginBottom = '0.75rem';
      institution.textContent = `${edu.institution} | ${edu.organization}`;
      
      const gpaDiv = document.createElement('div');
      gpaDiv.style.display = 'flex';
      gpaDiv.style.gap = '1rem';
      gpaDiv.style.alignItems = 'center';
      
      const gpaSpan = document.createElement('span');
      gpaSpan.className = 'tag';
      gpaSpan.textContent = `GPA: ${edu.gpa}`;
      
      gpaDiv.appendChild(gpaSpan);
      content.appendChild(title);
      content.appendChild(institution);
      content.appendChild(gpaDiv);
      
      card.appendChild(duration);
      card.appendChild(content);
      educationGrid.appendChild(card);
    });
  }
}

// Render skills section
function renderSkills(data) {
  const skillsGrid = document.querySelector('#skills .grid-2');
  if (skillsGrid && data.skills) {
    skillsGrid.innerHTML = '';
    
    // Development skills
    const devCard = document.createElement('div');
    devCard.className = 'card';
    
    const devTitle = document.createElement('h3');
    devTitle.className = 'card-title';
    devTitle.style.fontSize = '1rem';
    devTitle.style.textTransform = 'uppercase';
    devTitle.style.letterSpacing = '0.05em';
    devTitle.style.color = 'var(--text-secondary)';
    devTitle.style.marginBottom = '1.5rem';
    devTitle.textContent = 'Development';
    
    const devContainer = document.createElement('div');
    devContainer.className = 'tags-container';
    if (data.skills.development) {
      data.skills.development.forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = skill;
        devContainer.appendChild(tag);
      });
    }
    
    devCard.appendChild(devTitle);
    devCard.appendChild(devContainer);
    skillsGrid.appendChild(devCard);
    
    // Tools skills
    const toolsCard = document.createElement('div');
    toolsCard.className = 'card';
    
    const toolsTitle = document.createElement('h3');
    toolsTitle.className = 'card-title';
    toolsTitle.style.fontSize = '1rem';
    toolsTitle.style.textTransform = 'uppercase';
    toolsTitle.style.letterSpacing = '0.05em';
    toolsTitle.style.color = 'var(--text-secondary)';
    toolsTitle.style.marginBottom = '1.5rem';
    toolsTitle.textContent = 'Tools & Others';
    
    const toolsContainer = document.createElement('div');
    toolsContainer.className = 'tags-container';
    if (data.skills.tools) {
      data.skills.tools.forEach(tool => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tool;
        toolsContainer.appendChild(tag);
      });
    }
    
    toolsCard.appendChild(toolsTitle);
    toolsCard.appendChild(toolsContainer);
    skillsGrid.appendChild(toolsCard);
    
    // Languages
    const langCard = document.createElement('div');
    langCard.className = 'card';
    langCard.style.gridColumn = '1 / -1';
    
    const langTitle = document.createElement('h3');
    langTitle.className = 'card-title';
    langTitle.style.fontSize = '1rem';
    langTitle.style.textTransform = 'uppercase';
    langTitle.style.letterSpacing = '0.05em';
    langTitle.style.color = 'var(--text-secondary)';
    langTitle.style.marginBottom = '1.5rem';
    langTitle.style.textAlign = 'center';
    langTitle.textContent = 'Languages';
    
    const langContainer = document.createElement('div');
    langContainer.className = 'tags-container';
    langContainer.style.justifyContent = 'center';
    if (data.skills.languages) {
      data.skills.languages.forEach(lang => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = lang;
        langContainer.appendChild(tag);
      });
    }
    
    langCard.appendChild(langTitle);
    langCard.appendChild(langContainer);
    skillsGrid.appendChild(langCard);
  }
}

// Render projects section
function renderProjects(data) {
  const projectsGrid = document.querySelector('#projects .grid-2');
  if (projectsGrid && data.projects) {
    projectsGrid.innerHTML = '';
    
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'card';
      
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'flex-start';
      
      const titleDiv = document.createElement('div');
      const title = document.createElement('h3');
      title.className = 'card-title';
      title.textContent = project.title;
      const subtitle = document.createElement('p');
      subtitle.className = 'card-subtitle';
      subtitle.textContent = project.subtitle;
      titleDiv.appendChild(title);
      titleDiv.appendChild(subtitle);
      
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'tags-container';
      if (project.technologies) {
        project.technologies.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tag';
          tag.textContent = tech;
          tagsContainer.appendChild(tag);
        });
      }
      
      header.appendChild(titleDiv);
      header.appendChild(tagsContainer);
      
      const body = document.createElement('div');
      body.className = 'card-body';
      const desc = document.createElement('p');
      desc.textContent = project.description;
      body.appendChild(desc);
      
      const footer = document.createElement('div');
      footer.style.marginTop = 'auto';
      footer.style.display = 'flex';
      footer.style.gap = '1rem';
      footer.style.paddingTop = '1.5rem';
      footer.style.borderTop = '1px solid var(--border-color)';
      
      const demoBtn = document.createElement('a');
      demoBtn.href = project.liveDemo;
      demoBtn.className = 'btn btn-primary';
      demoBtn.style.padding = '0.5rem 1rem';
      demoBtn.style.fontSize = '0.85rem';
      demoBtn.textContent = 'Live Demo';
      
      const codeBtn = document.createElement('a');
      codeBtn.href = project.github;
      codeBtn.target = '_blank';
      codeBtn.rel = 'noopener noreferrer';
      codeBtn.className = 'btn btn-outline';
      codeBtn.style.padding = '0.5rem 1rem';
      codeBtn.style.fontSize = '0.85rem';
      codeBtn.textContent = 'View Code';
      
      footer.appendChild(demoBtn);
      footer.appendChild(codeBtn);
      
      card.appendChild(header);
      card.appendChild(body);
      card.appendChild(footer);
      projectsGrid.appendChild(card);
    });
  }
}

// Render activity section
function renderActivity(data) {
  const activityCard = document.querySelector('#activity .grid-2 .card:first-child');
  if (activityCard && data.activities) {
    activityCard.innerHTML = '';
    
    data.activities.forEach((activity, index) => {
      const actItem = document.createElement('div');
      actItem.style.display = 'flex';
      actItem.style.gap = '1rem';
      actItem.style.alignItems = 'flex-start';
      if (index > 0) actItem.style.marginTop = '1.5rem';
      
      const dot = document.createElement('div');
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.borderRadius = '50%';
      dot.style.background = activity.status === 'active' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)';
      dot.style.marginTop = '6px';
      
      const content = document.createElement('div');
      
      const actTitle = document.createElement('p');
      actTitle.style.color = 'var(--text-primary)';
      actTitle.style.fontWeight = '500';
      actTitle.textContent = activity.title;
      
      const actDesc = document.createElement('p');
      actDesc.style.color = 'var(--text-secondary)';
      actDesc.style.fontSize = '0.85rem';
      actDesc.textContent = activity.description;
      
      content.appendChild(actTitle);
      content.appendChild(actDesc);
      
      actItem.appendChild(dot);
      actItem.appendChild(content);
      activityCard.appendChild(actItem);
    });
  }
}

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', loadPortfolioData);
