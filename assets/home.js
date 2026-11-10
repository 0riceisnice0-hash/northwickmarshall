// The closing contact section occupies exactly the viewport left by the footer.
// The main surfaces use CSS viewport sizing and ordinary sticky positioning.
const footer = document.querySelector('.page-index .footer');
let layoutFrame = 0;

function measurePanels() {
  layoutFrame = 0;
  if (footer) document.documentElement.style.setProperty('--footer-height', `${footer.offsetHeight}px`);
}

function scheduleLayout() {
  if (!layoutFrame) layoutFrame = requestAnimationFrame(measurePanels);
}

const observer = new ResizeObserver(scheduleLayout);
if (footer) observer.observe(footer);
window.addEventListener('resize', scheduleLayout);
window.addEventListener('pageshow', scheduleLayout);
document.fonts.ready.then(scheduleLayout);
measurePanels();
