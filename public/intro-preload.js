(function bootstrapIntroPreload() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (navigator.connection && navigator.connection.saveData) return;
    if (window.sessionStorage.getItem('project-bharti-opening-intro-played') === 'true') return;

    // Poster only on the critical path — keeps the splash surface ready without
    // competing with CSS/JS for bandwidth.
    var poster = new Image();
    poster.fetchPriority = 'high';
    poster.src = '/videos/project-bharti-opening-poster.jpg';

    var video = document.getElementById('project-bharti-intro-preload');
    if (!video) return;
    video.poster = '/videos/project-bharti-opening-poster.jpg';

    function attachIntroSource() {
      if (video.getAttribute('src') || video.currentSrc) {
        video.dataset.srcAttached = 'true';
        return;
      }
      video.src = '/videos/project-bharti-opening.mp4';
      video.dataset.srcAttached = 'true';
      if (video.readyState < 2) {
        try {
          video.load();
        } catch (error) {
          // Ignore load() races during early bootstrap.
        }
      }
    }

    // Double rAF runs after the browser has committed a paint, then
    // requestIdleCallback (timeout 200ms) yields to remaining critical work.
    // setTimeout(0) is only the idle-callback fallback — not an arbitrary delay.
    function scheduleAfterCriticalPaint(task) {
      var run = function () {
        if (typeof window.requestIdleCallback === 'function') {
          window.requestIdleCallback(task, { timeout: 200 });
        } else {
          window.setTimeout(task, 0);
        }
      };

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(run);
      });
    }

    scheduleAfterCriticalPaint(attachIntroSource);
  } catch (error) {
    // Intro preload must never block page startup.
  }
})();
