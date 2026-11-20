const portraits = document.querySelector('.people-portraits');
const gallery = document.querySelector('.people-gallery');
const personLinks = [...document.querySelectorAll('[data-person]')];
const biographies = [...document.querySelectorAll('.person-biography')];
const navigation = [...document.querySelectorAll('[data-direction]')];
const status = document.querySelector('.people-status');
const mobile = window.matchMedia('(max-width: 700px)');
let selectedIndex = 0;
let gestureStart;

function updateNavigation() {
  navigation.forEach(button => { button.hidden = !mobile.matches; });
  personLinks.forEach((link, index) => {
    link.inert = mobile.matches && index !== selectedIndex;
  });
  status.textContent = mobile.matches
    ? personLinks[selectedIndex].querySelector('h2').textContent
    : '';
}

function selectPerson(index) {
  selectedIndex = index;
  const slug = personLinks[index].dataset.person;
  biographies.forEach(bio => {
    const selected = bio.id === slug;
    bio.classList.toggle('is-active', selected);
    bio.inert = !selected;
    if (selected) bio.removeAttribute('aria-hidden');
    else bio.setAttribute('aria-hidden', 'true');
  });
  personLinks.forEach((link, linkIndex) => {
    const selected = linkIndex === index;
    link.classList.toggle('is-selected', selected);
    if (selected) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  updateNavigation();
}

function step(direction) {
  portraits.classList.add('has-navigated');
  selectPerson((selectedIndex + direction + personLinks.length) % personLinks.length);
}

function selectFromHash() {
  const slug = window.location.hash.slice(1);
  const index = personLinks.findIndex(link => link.dataset.person === slug);
  selectPerson(Math.max(0, index));
}

if (personLinks.length && biographies.length) {
  document.body.classList.add('people-interactive');
  personLinks.forEach((link, index) => {
    link.addEventListener('pointerenter', event => {
      if (!mobile.matches && event.pointerType !== 'touch') selectPerson(index);
    });
    link.addEventListener('focus', () => selectPerson(index));
    link.addEventListener('click', event => {
      event.preventDefault();
      selectPerson(index);
    });
  });
  navigation.forEach(button => button.addEventListener('click', () => step(Number(button.dataset.direction))));
  gallery.addEventListener('touchstart', event => {
    gestureStart = event.touches.length === 1 ? event.touches[0] : undefined;
  }, { passive: true });
  gallery.addEventListener('touchend', event => {
    if (!mobile.matches || !gestureStart) return;
    const end = [...event.changedTouches].find(touch => touch.identifier === gestureStart.identifier);
    const start = gestureStart;
    gestureStart = undefined;
    if (!end) return;
    const horizontal = end.clientX - start.clientX;
    const vertical = end.clientY - start.clientY;
    if (Math.abs(horizontal) >= 45 && Math.abs(horizontal) > Math.abs(vertical) * 1.5) {
      step(horizontal < 0 ? 1 : -1);
    }
  }, { passive: true });
  gallery.addEventListener('touchcancel', () => { gestureStart = undefined; }, { passive: true });
  mobile.addEventListener('change', updateNavigation);
  window.addEventListener('hashchange', selectFromHash);
  selectFromHash();
}
