import Rellax from 'rellax';
import projects from './projects.json';
import './styles/main.scss';

// Init parallax
new Rellax('.parallax', { center: true });

// Fade in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.content-wrapper').forEach((el) => {
  observer.observe(el);
});

// Render projects
const projectContainer = document.querySelector('#projects .cards');
if (projectContainer) {
  projects.forEach((prj) => {
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <img src="${prj.screenshot}" alt="Screenshot of ${prj.title}" />
      <h3>${prj.title}</h3>
      <p>${prj.blurb}</p>
      <ul class="tags">${prj.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
      <div class="actions">
        <a href="${prj.demo}" class="btn">View Demo</a>
        <a href="${prj.source}" class="btn">Source</a>
      </div>
    `;
    projectContainer.append(article);
  });
}

// Hamburger toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Contact form handling
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Sending...';
    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        statusEl.textContent = 'Message sent!';
        form.reset();
      } else {
        statusEl.textContent = 'Error sending message.';
      }
    } catch {
      statusEl.textContent = 'Error sending message.';
    }
  });
}
