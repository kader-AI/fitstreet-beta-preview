'use strict';
// Standalone prototype: no requests, email storage, analytics or backend calls.
const form = document.querySelector('#beta-form');
const email = document.querySelector('#email');
const signup = document.querySelector('#signup');
const result = document.querySelector('#result');
const error = document.querySelector('#email-error');
const selectedPlatform = () => form.elements.platform.value;
const updatePlatform = () => {
  const ios = selectedPlatform() === 'ios';
  document.querySelector('label[for="email"]').textContent = ios ? 'Ton adresse email' : 'Email de ton compte Google';
  document.querySelector('#platform-note').textContent = ios
    ? 'Sur iPhone, l’installation passe par TestFlight.'
    : 'Un compte Google est nécessaire pour télécharger l’APK privé. Gmail, Hotmail ou Outlook : utilise l’adresse associée à ce compte.';
};
form.querySelectorAll('[name=platform]').forEach(input => input.addEventListener('change', updatePlatform));
document.querySelector('#demo-fill').addEventListener('click', () => {
  email.value = 'demo@exemple.fr';
  email.removeAttribute('aria-invalid');
  error.hidden = true;
  form.requestSubmit();
});
email.addEventListener('input', () => { error.hidden = true; email.removeAttribute('aria-invalid'); });
form.addEventListener('submit', event => {
  event.preventDefault();
  email.value = email.value.trim();
  if (!email.validity.valid) {
    error.hidden = false;
    email.setAttribute('aria-invalid', 'true');
    email.focus();
    return;
  }
  const ios = selectedPlatform() === 'ios';
  document.querySelector('#recipient').textContent = email.value;
  document.querySelector('#result-description').textContent = ios
    ? 'Voici les étapes pour découvrir FitStreet sur ton iPhone.'
    : 'Voici les étapes pour découvrir FitStreet sur ton Android.';
  document.querySelector('#ios-steps').hidden = !ios;
  document.querySelector('#android-steps').hidden = ios;
  document.querySelector('#download-note').hidden = true;
  signup.hidden = true;
  result.hidden = false;
  email.blur();
  result.focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
document.querySelector('#reset').addEventListener('click', () => {
  const next = selectedPlatform() === 'ios' ? 'android' : 'ios';
  form.querySelector(`[value="${next}"]`).checked = true;
  updatePlatform();
  result.hidden = true;
  signup.hidden = false;
  signup.focus({ preventScroll: true });
  window.scrollTo(0, 0);
});
document.querySelector('#apk-demo').addEventListener('click', () => {
  document.querySelector('#download-note').hidden = false;
  document.querySelector('#download-note').scrollIntoView({ block: 'nearest' });
});
document.querySelector('#theme').addEventListener('click', event => {
  const light = document.body.classList.toggle('light');
  event.currentTarget.textContent = light ? '☾' : '☀';
  event.currentTarget.setAttribute('aria-label', light ? 'Passer au thème sombre' : 'Passer au thème clair');
  document.querySelector('meta[name="theme-color"]').content = light ? '#f8faf9' : '#08121f';
});
