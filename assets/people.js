const personLinks = [...document.querySelectorAll('[data-person]')];
const biographies = [...document.querySelectorAll('.person-biography')];
let selectedPerson = null;

function selectPerson(slug) {
  if (selectedPerson === slug || !biographies.some(bio => bio.id === slug)) return;
  selectedPerson = slug;
  biographies.forEach(bio => {
    const selected = bio.id === slug;
    bio.classList.toggle('is-active', selected);
    bio.inert = !selected;
    if (selected) bio.removeAttribute('aria-hidden');
    else bio.setAttribute('aria-hidden', 'true');
  });
  personLinks.forEach(link => {
    const selected = link.dataset.person === slug;
    link.classList.toggle('is-selected', selected);
    if (selected) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

if (personLinks.length && biographies.length) {
  document.body.classList.add('people-interactive');
  personLinks.forEach(link => {
    link.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') selectPerson(link.dataset.person);
    });
    link.addEventListener('focus', () => selectPerson(link.dataset.person));
    link.addEventListener('click', event => {
      event.preventDefault();
      selectPerson(link.dataset.person);
    });
  });
  const selectFromHash = () => {
    const slug = window.location.hash.slice(1);
    selectPerson(biographies.some(bio => bio.id === slug) ? slug : personLinks[0].dataset.person);
  };
  selectFromHash();
  window.addEventListener('hashchange', selectFromHash);
}
