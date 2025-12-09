// copy-email.js
// Копирование e‑mail по клику и показ toast‑уведомления.
// Подключается после main.js в index.html.

(function () {
  'use strict';

  function showToast(text) {
    // если уже есть toast — удалим его чтобы показать новый
    var existing = document.querySelector('.copy-toast');
    if (existing) existing.remove();

    var t = document.createElement('div');
    t.className = 'copy-toast';
    t.setAttribute('role', 'status');
    t.setAttribute('aria-live', 'polite');
    t.textContent = text;
    document.body.appendChild(t);

    // add show class for CSS animation
    window.getComputedStyle(t).opacity;
    t.classList.add('copy-toast--visible');

    setTimeout(function () {
      t.classList.remove('copy-toast--visible');
      setTimeout(function () { t.remove(); }, 300);
    }, 1600);
  }

  function fallbackCopy(text, cb) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, ta.value.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      if (ok) cb && cb('E‑mail скопирован: ' + text);
      else cb && cb('Не удалось скопировать. Выделите и нажмите Ctrl+C');
    } catch (e) {
      cb && cb('Не удалось скопировать. Попробуйте вручную.');
    }
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('.copy-email');
    if (!el) return;
    e.preventDefault();

    var email = el.getAttribute('data-email') || el.textContent.trim();
    if (!email) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function () {
        showToast('E‑mail скопирован: ' + email);
      }).catch(function () {
        fallbackCopy(email, showToast);
      });
    } else {
      fallbackCopy(email, showToast);
    }
  });
})();
