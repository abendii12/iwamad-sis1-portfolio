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
// ===== Contact form validation =====
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(input, message) {
  const errorElement = document.getElementById(input.id + '-error');
  errorElement.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

form.addEventListener('submit', (event) => {
  event.preventDefault(); // nothing is sent, the page does not reload
  successMessage.textContent = '';

  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  let firstInvalid = null;

  // name
  if (name.value.trim() === '') {
    showError(name, 'Please enter your name.');
    firstInvalid = firstInvalid || name;
  } else {
    showError(name, '');
  }

  // email: empty and malformed get different messages
  const emailValue = email.value.trim();
  if (emailValue === '') {
    showError(email, 'Please enter your email address.');
    firstInvalid = firstInvalid || email;
  } else if (!emailPattern.test(emailValue)) {
    showError(email, 'This email does not look right. Use the format name@example.com.');
    firstInvalid = firstInvalid || email;
  } else {
    showError(email, '');
  }

  // message
  if (message.value.trim() === '') {
    showError(message, 'Please write a message.');
    firstInvalid = firstInvalid || message;
  } else {
    showError(message, '');
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  successMessage.textContent = `Thank you, ${name.value.trim()}! Your message is ready (this demo does not send it).`;
  form.reset();
});