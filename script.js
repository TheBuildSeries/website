document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('projects-gallery');

  fetch('projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load projects');
      return res.json();
    })
    .then(projects => {
      gallery.innerHTML = '';
      projects.forEach(project => {
        const card = document.createElement('a');
        card.href = project.url;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        card.className = 'project-card';

        const metrics = Object.entries(project.metrics)
          .map(([key, val]) => `<span class="metric">${key}: ${val}</span>`)
          .join('');

        card.innerHTML = `
          <div class="card-titlebar">
            <span class="card-dot red"></span>
            <span class="card-dot yellow"></span>
            <span class="card-dot green"></span>
            <span class="card-titlebar-text">${project.name}</span>
          </div>
          <div class="card-body">
            <div class="card-name">${project.name}</div>
            <div class="card-desc">${project.description}</div>
            <div class="card-metrics">${metrics}</div>
          </div>
        `;

        gallery.appendChild(card);
      });
    })
    .catch(err => {
      gallery.innerHTML = `<p class="loading">Error: ${err.message}</p>`;
    });
});
