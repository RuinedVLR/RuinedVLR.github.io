// Lazy-load видео и автоплей при появлении в viewport
document.addEventListener('DOMContentLoaded', function() {
  const videos = document.querySelectorAll('.project-video');

  // Подставляем src только при первом появлении в области видимости
  const onIntersect = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const v = entry.target;
        // если источники ещё не загружены, присвоим их (data-src-*)
        if (v.dataset.srcWebm || v.dataset.srcWebm === undefined) {
          // если в разметке уже есть <source src=...>, можно не менять — этот шаг для случаев preload="none"
          const webm = v.dataset.srcWebm || v.getAttribute('data-src-webm');
          const mp4 = v.dataset.srcMp4 || v.getAttribute('data-src-mp4');
          if (webm || mp4) {
            // удаляем существующие <source> чтобы заменить их (без перезагрузки можно просто установить src)
            while (v.firstChild) v.removeChild(v.firstChild);
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
            // загрузим и запустим
            v.load();
          }
        }
        // Попробуем autoplay (видео muted, поэтому обычно разрешено)
        v.play().catch(()=>{/*silent*/});
        obs.unobserve(v);
      }
    });
  };

  const obs = new IntersectionObserver(onIntersect, { root: null, threshold: 0.4 });
  videos.forEach(v => obs.observe(v));
});
