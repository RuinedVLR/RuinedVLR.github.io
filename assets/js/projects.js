// projects.js
// Небольшая логика для переключения между статичной превью и GIF (опционально).
// По умолчанию в HTML в src указана GIF; data-static содержит статичную PNG/ JPG.
// Скрипт ставит статичную картинку на мобильных устройствах для экономии трафика,
// и включает GIF при наведении (hover) на десктопе.

(function() {
  const media = document.querySelectorAll('.project-media');

  // На mobile: подставим статичную превью (если она задана) вместо GIF, чтобы не грузить автоплей
  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  media.forEach(img => {
    const staticSrc = img.dataset.static;
    const gifSrc = img.dataset.gif;

    if (isTouch && staticSrc) {
      img.src = staticSrc;
    } else {
      // Desktop: поведение hover - показать статичный по умолчанию (если захотите) и GIF по наведению:
      if (staticSrc) {
        // Начинаем с GIF (если src уже GIF, то оставляем); если хотите начать со статик — раскомментируйте следующую строку:
        // img.src = staticSrc;
        // Переключаемся на GIF при hover
        img.addEventListener('mouseenter', () => { if (gifSrc) img.src = gifSrc; });
        img.addEventListener('mouseleave', () => { if (staticSrc) img.src = staticSrc; });
      }
    }
  });
})();
