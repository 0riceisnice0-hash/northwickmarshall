const journey = document.querySelector('.journey');
const heroImage = document.querySelector('.hero-backdrop img');
const chapters = [...document.querySelectorAll('[data-chapter]')];
const scenes = [...document.querySelectorAll('[data-scene]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const compact = window.matchMedia('(max-width: 600px)');
let pendingFrame = 0;
let activeChapter = -1;

function updateStory() {
  pendingFrame = 0;
  const height = window.innerHeight;
  const hero = document.querySelector('.story-hero').getBoundingClientRect();
  const chapterRects = chapters.map(chapter => chapter.getBoundingClientRect());
  const copyRects = chapters.map(chapter => chapter.querySelector('.chapter-copy').getBoundingClientRect());
  const readingPoint = height * (compact.matches ? .64 : .5);
  let nextChapter = 0;
  copyRects.forEach((rect, index) => {
    if (rect.top <= readingPoint) nextChapter = index;
  });

  // Read geometry first, then write transforms and scene state together.
  if (hero.bottom > 0) {
    const shift = reducedMotion.matches ? 0 : Math.min(90, Math.max(0, -hero.top * .19));
    heroImage.style.setProperty('--hero-shift', `${shift.toFixed(2)}px`);
  }
  if (nextChapter !== activeChapter) {
    scenes.forEach((scene, index) => scene.classList.toggle('is-active', index === nextChapter));
    activeChapter = nextChapter;
    journey.dataset.activeChapter = String(nextChapter);
  }
  const activeRect = chapterRects[nextChapter];
  const shift = reducedMotion.matches ? 0 : Math.max(-20, Math.min(20, (readingPoint - activeRect.top - activeRect.height / 2) * .055));
  journey.style.setProperty('--scene-shift', `${shift.toFixed(2)}px`);
}

function scheduleUpdate() {
  if (!pendingFrame) pendingFrame = requestAnimationFrame(updateStory);
}

if (journey && heroImage && chapters.length === scenes.length) {
  journey.classList.add('has-scroll-story');
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);
  window.addEventListener('pageshow', scheduleUpdate);
  reducedMotion.addEventListener('change', scheduleUpdate);
  compact.addEventListener('change', scheduleUpdate);
  document.fonts.ready.then(scheduleUpdate);
  updateStory();
}
