(function () {
  const BASE = '/stitch_innovax_bom_validator_pro';
  const routes = {
    dashboard: '/',
    search: `${BASE}/assembly_search/`,
    explorer: `${BASE}/bom_explorer/`,
    bom: `${BASE}/bom_explorer/`,
    validation: `${BASE}/validation_engine/`,
    validations: `${BASE}/validation_engine/`,
    compare: `${BASE}/bom_comparator/`,
    comparator: `${BASE}/bom_comparator/`,
    reports: `${BASE}/reports_history/`,
    history: `${BASE}/reports_history/`,
    analytics: `${BASE}/reports_history/`,
    database: `${BASE}/reports_history/`,
    admin: `${BASE}/reports_history/`,
    settings: `${BASE}/reports_history/`
  };

  const screenName = document.title.replace(/\s*\|\s*/g, ' - ') || 'Innovax BOM Validator Pro';
  const storeKey = `innovax-demo:${location.pathname}`;
  const toastStack = document.createElement('div');
  toastStack.className = 'demo-toast-stack';
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    document.body.appendChild(toastStack);
    wirePwa();
    wireNavigation();
    wireInputs();
    wireButtons();
    markCurrentRoute();
    persistVisit();
  }

  function persistVisit() {
    const visits = JSON.parse(localStorage.getItem('innovax-demo:visits') || '[]');
    visits.unshift({ screen: screenName, path: location.pathname, at: new Date().toISOString() });
    localStorage.setItem('innovax-demo:visits', JSON.stringify(visits.slice(0, 20)));
  }

  function toast(title, detail) {
    const node = document.createElement('div');
    node.className = 'demo-toast';
    node.innerHTML = `${escapeHtml(title)}${detail ? `<small>${escapeHtml(detail)}</small>` : ''}`;
    toastStack.appendChild(node);
    setTimeout(() => node.remove(), 3200);
  }

  function normalize(text) {
    return (text || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function routeForText(text) {
    const t = normalize(text);
    if (t.includes('dashboard') || t.includes('home')) return routes.dashboard;
    if (t.includes('search') || t.includes('assembly')) return routes.search;
    if (t.includes('explorer') || t === 'bom' || t.includes('view bom') || t.includes('inventory')) return routes.explorer;
    if (t.includes('validat') || t.includes('run')) return routes.validation;
    if (t.includes('compar')) return routes.compare;
    if (t.includes('report') || t.includes('history') || t.includes('analytics') || t.includes('database')) return routes.reports;
    if (t.includes('admin') || t.includes('setting')) return routes.admin;
    return '';
  }

  function wireNavigation() {
    document.querySelectorAll('a[href="#"], nav div, aside a, header a').forEach((el) => {
      const route = routeForText(el.textContent);
      if (!route) return;
      el.classList.add('demo-clickable');
      if (el.tagName === 'A') {
        el.setAttribute('href', route);
      } else {
        el.setAttribute('role', 'link');
        el.setAttribute('tabindex', '0');
        el.addEventListener('click', () => navigate(route));
        el.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') navigate(route);
        });
      }
    });
  }

  function wireInputs() {
    const saved = JSON.parse(localStorage.getItem(storeKey) || '{}');
    document.querySelectorAll('input, select, textarea').forEach((input, index) => {
      const key = input.name || input.id || `field-${index}`;
      if (saved[key] && input.type !== 'checkbox') input.value = saved[key];
      input.addEventListener('input', () => {
        const next = JSON.parse(localStorage.getItem(storeKey) || '{}');
        next[key] = input.type === 'checkbox' ? input.checked : input.value;
        localStorage.setItem(storeKey, JSON.stringify(next));
        localStorage.setItem('innovax-demo:last-save', new Date().toISOString());
      });
    });
  }

  function wireButtons() {
    document.querySelectorAll('button').forEach((button) => {
      if (button.dataset.demoWired) return;
      button.dataset.demoWired = 'true';
      button.addEventListener('click', (event) => {
        const label = normalize(button.textContent);
        const route = routeForText(label);
        if (route && !label.includes('export') && !label.includes('download')) {
          event.preventDefault();
          navigate(route);
          return;
        }
        handleAction(label, button);
      });
    });
  }

  function handleAction(label, button) {
    if (label.includes('csv')) return downloadFile('innovax-validation-export.csv', 'Assembly,Status,Variance\nINV-5400-ASM,Pass,0.0%\nTRQ-2100-ASM,Review,2.4%\n');
    if (label.includes('pdf') || label.includes('download')) return downloadFile('innovax-demo-report.txt', 'Innovax BOM Validator Pro demo report\nStatus: saved\n');
    if (label.includes('share')) return shareDemo();
    if (label.includes('view all') || label.includes('view log')) return navigate(routes.reports);
    if (label.includes('visibility')) return navigate(routes.validation);
    if (label.includes('add') || button.querySelector('[data-icon="add"]')) return openModal('New Assembly Saved', 'Demo assembly INV-DEMO-2048 was added to the local PWA session.');
    if (label.includes('search')) return toast('Search complete', '2 matching assemblies loaded and saved for this session.');
    if (label.includes('filter')) return toast('Filters applied', 'The current report view was updated.');
    if (label.includes('sync')) return toast('ERP sync complete', 'Demo sync finished with 1.2s latency.');
    toast('Demo action saved', 'This control is wired and persisted locally for the PWA demo.');
  }

  function downloadFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    toast('File generated', filename);
  }

  function shareDemo() {
    if (navigator.share) {
      navigator.share({ title: screenName, url: location.href }).catch(() => toast('Share cancelled'));
    } else {
      navigator.clipboard?.writeText(location.href);
      toast('Link copied', 'Demo URL copied to clipboard.');
    }
  }

  function openModal(title, detail) {
    const backdrop = document.createElement('div');
    backdrop.className = 'demo-modal-backdrop';
    backdrop.innerHTML = `
      <div class="demo-modal" role="dialog" aria-modal="true">
        <h2>${escapeHtml(title)}</h2>
        <p>${escapeHtml(detail)}</p>
        <div class="demo-modal-actions">
          <button class="demo-action secondary" data-close>Close</button>
          <button class="demo-action" data-open-report>Open report</button>
        </div>
      </div>`;
    backdrop.querySelector('[data-close]').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('[data-open-report]').addEventListener('click', () => navigate(routes.reports));
    backdrop.addEventListener('click', (event) => {
      if (event.target === backdrop) backdrop.remove();
    });
    document.body.appendChild(backdrop);
  }

  function wirePwa() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    let deferredPrompt;
    const install = document.createElement('button');
    install.className = 'demo-install';
    install.textContent = 'Install PWA';
    document.body.appendChild(install);
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      deferredPrompt = event;
      install.style.display = 'block';
    });
    install.addEventListener('click', async () => {
      if (!deferredPrompt) return toast('PWA ready', 'Use your browser menu to install this demo.');
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      install.style.display = 'none';
    });
  }

  function markCurrentRoute() {
    document.querySelectorAll('a[href], [role="link"]').forEach((el) => {
      const href = el.getAttribute('href');
      if (!href) return;
      if (href === location.pathname || (href !== '/' && location.pathname.startsWith(href))) {
        el.classList.add('demo-active-link');
      }
    });
  }

  function navigate(route) {
    localStorage.setItem('innovax-demo:last-route', route);
    location.href = route;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char]);
  }
})();
