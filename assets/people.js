const personLinks = [...document.querySelectorAll('[data-person]')];
const personDialogs = [...document.querySelectorAll('.person-dialog')];
if (personDialogs.length && typeof personDialogs[0].showModal === 'function') {
  let opener = null;
  let previousOverflow = '';
  personLinks.forEach(link => link.addEventListener('click', event => {
    const dialog = document.querySelector(`#dialog-${link.dataset.person}`);
    if (!dialog) return;
    event.preventDefault();
    opener = link;
    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
  }));
  personDialogs.forEach(dialog => {
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = previousOverflow;
      opener?.focus({preventScroll:true});
    });
  });
  document.body.classList.add('people-interactive');
  const linkedPerson = personLinks.find(link => `#${link.dataset.person}` === window.location.hash);
  linkedPerson?.click();
}
