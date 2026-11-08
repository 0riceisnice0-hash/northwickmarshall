const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header'))closeMenu();});
window.matchMedia('(min-width: 851px)').addEventListener('change',closeMenu);
const form=document.querySelector('#enquiry-form');
form?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const data=new FormData(form);
  const button=form.querySelector('button[type="submit"]');
  const label=button.querySelector('span');
  const status=document.querySelector('#form-status');
  button.disabled=true;button.setAttribute('aria-busy','true');label.textContent='Preparing email…';
  const subject=`${data.get('service')} — ${data.get('name')}`;
  const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')||'Not provided'}\nInterested in: ${data.get('service')}\n\n${data.get('message')}`;
  const href=`mailto:northwickmarshall@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // Keep the fields intact if no local email app is configured.
  window.setTimeout(()=>{
    window.location.href=href;
    status.replaceChildren(document.createTextNode('Email prepared. If your email app did not open, '));
    const fallback=document.createElement('a');fallback.href=href;fallback.textContent='open your prepared email';fallback.style.textDecoration='underline';status.append(fallback,document.createTextNode(' or email us directly.'));
    label.textContent='Prepare email';button.disabled=false;button.removeAttribute('aria-busy');
  },200);
});
