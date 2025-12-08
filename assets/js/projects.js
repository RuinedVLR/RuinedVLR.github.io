// Lazy-load видео и автоплей/пауза в зависимости от видимости карточки
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.project-video');

  // IntersectionObserver: когда видео попадает в viewport — подставляем источники и запускаем.
  const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
      const v = entry.target;
      if (entry.isIntersecting) {
        // Если источники ещё не подставлены, подставим их из data-атрибутов
        if (!v.querySelector('source')) {
          const webm = v.dataset.srcWebm || v.getAttribute('data-src-webm');
          const mp4 = v.dataset.srcMp4 || v.getAttribute('data-src-mp4');
          if (webm) {
            const s1 = document.createElement('source');
            s1.src = webm; s1.type = 'video/webm';
            v.appendChild(s1);
          }
          if (mp4) {
            const s2 = document.createElement('source');
            s2.src = mp4; s2.type = 'video/mp4';
            v.appendChild(s2);
          }
          // загрузим новый источник
          v.load();
        }

        // Попытка autoplay (видео muted => обычно разрешено)
        v.play().catch(() => {/* silent */});
      } else {
        // Если видео вышло из зоны — ставим на паузу и возвращаем в начало, чтобы не грузить CPU
        try { v.pause(); v.currentTime = 0; } catch(e) { /* ignore */ }
      }
    });
  };

  // threshold: 0.45 — видео считается видимым, когда ~45% его видно
  const observer = new IntersectionObserver(onIntersect, { threshold: 0.45 });
  videos.forEach(v => observer.observe(v));
});
