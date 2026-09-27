'use strict';
// Native POST navigation: only the server confirms registration and access.
const form = document.querySelector('#beta-form');
const email = document.querySelector('#email');
const error = document.querySelector('#email-error');
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.innerHTML;
const status = document.querySelector('#submission-status');
let submitting = false;
let recoveryTimer;
const selectedPlatform = () => form.elements.platform.value;
const updatePlatform = () => {
  const ios = selectedPlatform() === 'ios';
  document.querySelector('label[for="email"]').textContent = ios ? 'Ton adresse email' : 'Email de ton compte Google';
  document.querySelector('#platform-note').textContent = ios
    ? 'Sur iPhone, l’installation passe par TestFlight.'
    : 'Un compte Google est nécessaire pour télécharger l’APK privé. Gmail, Hotmail ou Outlook : utilise l’adresse associée à ce compte.';
};
form.querySelectorAll('[name=platform]').forEach(input => input.addEventListener('change', updatePlatform));
email.addEventListener('input', () => { error.hidden = true; email.removeAttribute('aria-invalid'); });
const resetSubmission = message => {
  clearTimeout(recoveryTimer);
  submitting = false;
  submitButton.disabled = false;
  submitButton.innerHTML = submitLabel;
  form.removeAttribute('aria-busy');
  status.textContent = message || '';
  status.hidden = !message;
};
form.addEventListener('submit', event => {
  if (submitting) { event.preventDefault(); return; }
  email.value = email.value.trim();
  if (!form.checkValidity()) {
    event.preventDefault();
    error.hidden = email.validity.valid;
    if (!email.validity.valid) email.setAttribute('aria-invalid', 'true');
    form.reportValidity();
    return;
  }
  // Keep named fields enabled so the browser includes all three POST fields.
  submitting = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Inscription en cours…';
  form.setAttribute('aria-busy', 'true');
  status.textContent = 'Ouverture de la page de confirmation…';
  status.hidden = false;
  recoveryTimer = setTimeout(() => resetSubmission('La confirmation tarde à s’ouvrir. Vérifie ta connexion et réessaie avec le même email. Ton inscription peut déjà avoir été enregistrée.'), 45000);
  // No preventDefault on a valid first submission: navigate with the native POST.
});
window.addEventListener('pagehide', () => clearTimeout(recoveryTimer));
window.addEventListener('pageshow', () => { resetSubmission(''); updatePlatform(); });
document.querySelector('#theme').addEventListener('click', event => {
  const light = document.body.classList.toggle('light');
  event.currentTarget.textContent = light ? '☾' : '☀';
  event.currentTarget.setAttribute('aria-label', light ? 'Passer au thème sombre' : 'Passer au thème clair');
  document.querySelector('meta[name="theme-color"]').content = light ? '#f8faf9' : '#08121f';
});
updatePlatform();
