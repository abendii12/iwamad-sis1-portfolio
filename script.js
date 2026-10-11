// ===== Theme toggle =====
const html = document.documentElement;
const themeButton = document.getElementById('theme-toggle');

function applyTheme(theme) {
  html.dataset.theme = theme;
  const isDark = theme === 'dark';
  themeButton.textContent = isDark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-pressed', String(isDark));
}

// use the saved choice, or the system setting the first time
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

themeButton.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});