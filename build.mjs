import { mkdir, rm, writeFile, cp } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(new URL('./assets/', import.meta.url), new URL('assets/', out), { recursive: true });
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const longer = `${lorem} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
const introduction = 'Helping businesses Diagnose, Design, Develop and Transform, working in partnership with our customers to grow their business.';
const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const link = (href, label, style = 'text-link') => `<a class="${style}" href="${href}"><span>${label}</span>${arrow}</a>`;
const photo = (file, alt, eager = false) => `<img src="assets/${file}" alt="${alt}" width="1600" height="1067" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;

const services = [
  { slug: 'diagnose', name: 'Diagnose', summary: 'A comprehensive business health audit identifying operational gaps and growth goals.', description: 'We provide detailed business assessments to uncover bottlenecks. Deliverables include a SWOT analysis, financial health check, and a feasibility report. Structured as a fixed-fee diagnostic package, this offers SME owners total clarity on their current standing.', image: 'meeting.jpg', alt: 'Stock photograph of colleagues reviewing their work around a table', heading: 'Clarity on where you stand', sections: ['Business assessment', 'SWOT analysis', 'Financial health check', 'Feasibility report'] },
  { slug: 'design-deliver', name: 'Design & Deliver', summary: 'Building custom roadmaps and delivering frameworks for immediate tactical improvements.', description: lorem, image: 'workspace.jpg', alt: 'A sunlit meeting space with a long table and glass partitions', heading: 'Turn direction into delivery', sections: ['Your roadmap', 'Practical frameworks', 'Delivery approach', 'Next steps'] },
  { slug: 'transform', name: 'Transform', summary: 'Embedded partnership focusing on long-term value creation and organizational evolution.', description: lorem, image: 'london-dusk.jpg', alt: 'The City of London skyline across the River Thames at dusk', heading: 'Build what comes next', sections: ['Our partnership', 'Business evolution', 'Long-term value', 'Next steps'] },
];

function brand() {
  return `<a href="index.html" class="brand" aria-label="Northwick Marshall home"><img src="assets/mark.svg" width="65" height="44" alt=""><span>Northwick Marshall<small>Consulting</small></span></a>`;
}
function nav(active) {
  const items = [['about', 'About'], ['services', 'Services'], ['associates', 'Associates'], ['contact', 'Contact']];
  return `<header class="header"><div class="wrap header-inner">${brand()}<button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">+</span></button><nav id="navigation" aria-label="Main navigation">${items.map(([key, label]) => `<a href="${key}.html" ${active === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}${link('contact.html', 'Book a call', 'button button-small')}</nav></div></header>`;
}
function footer() {
  return `<footer class="footer"><div class="wrap footer-main">${brand()}<div class="footer-links"><a href="about.html">About</a><a href="services.html">Services</a><a href="associates.html">Associates</a><a href="contact.html">Contact</a></div><a class="footer-email" href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com</a></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Northwick Marshall</span><span>northwickmarshall.co.uk</span><a href="privacy.html">Privacy policy</a></div></footer>`;
}
const cta = () => `<section class="cta"><div class="wrap cta-inner"><h2>Let’s move your<br>business forward</h2>${link('contact.html', 'Book a call', 'button button-dark')}</div></section>`;
const office = () => `<figure class="office-image">${photo('office-concept.jpg', 'AI visualisation of a Northwick Marshall meeting room with brass signage on a navy wall')}<figcaption>AI-generated office visualisation</figcaption></figure>`;

function serviceList(items = services, heading = 'h3') {
  return `<div class="service-grid">${items.map(s => `<article class="service-card"><a class="service-photo" href="${s.slug}.html" aria-label="Explore ${s.name}">${photo(s.image, s.alt)}</a><${heading}><a href="${s.slug}.html">${s.name}${arrow}</a></${heading}><p>${s.summary}</p></article>`).join('')}</div>`;
}
const approach = () => `<section class="section approach"><div class="wrap"><div class="section-top"><h2>Clear thinking<br>Practical progress</h2><p>${lorem}</p></div><div class="approach-words">${['Diagnose', 'Design', 'Develop', 'Transform'].map(word => `<h3>${word}</h3>`).join('')}</div></div></section>`;
const intro = (title, body = lorem, className = '') => `<section class="page-intro wrap ${className}"><h1>${title}</h1>${body ? `<p>${body}</p>` : ''}</section>`;

const pages = {};
pages['index.html'] = {
  title: 'Smart business support', active: '',
  content: `<section class="hero"><div class="wrap hero-content"><h1><span>Smart business</span><span class="accent">support</span></h1><div class="hero-bottom"><p>${introduction}</p>${link('contact.html', 'Book a call', 'button')}</div></div><div class="hero-image">${photo('london-dusk.jpg', 'The City of London skyline across the Thames at dusk', true)}</div></section>
  <section class="section services-section" id="services"><div class="wrap"><div class="section-top"><h2>Support for your<br>next chapter</h2>${link('services.html', 'Explore our services')}</div>${serviceList()}</div></section>
  <section class="section about-section"><div class="wrap"><div class="about-heading"><h2>Working with you<br>Moving forward</h2><div><p>${longer}</p>${link('about.html', 'About Northwick Marshall')}</div></div>${office()}</div></section>${approach()}
  <section class="section team-intro"><div class="wrap team-intro-layout"><h2>People behind<br>your progress</h2><div><p>${lorem}</p>${link('associates.html', 'Meet our associates')}</div></div></section>${cta()}`,
};
pages['about.html'] = {
  title: 'About us', active: 'about',
  content: `${intro('Business is personal<br><span class="accent">So are we</span>', introduction)}<section class="about-visual wrap">${office()}</section><section class="section"><div class="wrap reading-split"><h2>Working<br>in partnership</h2><div><p class="lead">${longer}</p><p>${lorem}</p></div></div></section>${approach()}<section class="section"><div class="wrap editorial-split">${photo('meeting.jpg', 'Stock photograph of colleagues collaborating around a shared table')}<div><h2>The people<br>behind the thinking</h2><p>${longer}</p>${link('associates.html', 'Meet our associates')}</div></div></section>${cta()}`,
};
pages['services.html'] = {
  title: 'Our services', active: 'services',
  content: `${intro('Clarity to begin<br><span class="accent">Confidence to grow</span>', introduction)}<section class="section service-directory"><div class="wrap">${serviceList(services, 'h2')}</div></section><section class="section service-explanation"><div class="wrap reading-split"><h2>Start with<br>a clearer picture</h2><div><p class="lead">${services[0].description}</p>${link('diagnose.html', 'Explore Diagnose')}</div></div></section>${approach()}${cta()}`,
};
for (const service of services) {
  const title = service.slug === 'design-deliver' ? 'Design<br>& Deliver' : service.name;
  pages[`${service.slug}.html`] = {
    title: service.name, active: 'services',
    content: `<section class="service-hero wrap"><div><h1>${title}</h1><p>${service.summary}</p>${link('contact.html', 'Book a call', 'button')}</div>${photo(service.image, service.alt, true)}</section><section class="section"><div class="wrap reading-split"><h2>${service.heading}</h2><p class="lead">${service.description}</p></div></section><section class="section deliverables"><div class="wrap"><div class="section-top"><h2>What’s included</h2><p>${lorem}</p></div><div class="detail-grid">${service.sections.map(title => `<article><h3>${title}</h3><p>${lorem}</p></article>`).join('')}</div></div></section><section class="section"><div class="wrap"><div class="section-top"><h2>Keep exploring</h2>${link('services.html', 'All services')}</div>${serviceList(services.filter(s => s.slug !== service.slug))}</div></section>${cta()}`,
  };
}
const portrait = `<svg viewBox="0 0 360 420" fill="none" aria-hidden="true"><circle cx="180" cy="150" r="46"/><path d="M70 365c0-76 48-128 110-128s110 52 110 128"/></svg>`;
pages['associates.html'] = {
  title: 'Our associates', active: 'associates',
  content: `${intro('Good people<br><span class="accent">Fresh perspective</span>')}<section class="section team-section"><div class="wrap team-grid">${['Ben Thompson', 'Associate two', 'Associate three', 'Associate four'].map(name => `<article class="person"><div class="portrait">${portrait}<span>Portrait to follow</span></div><h2>${name}</h2><p>${lorem}</p></article>`).join('')}</div></section><section class="section"><div class="wrap reading-split"><h2>Individual experience<br>Shared thinking</h2><p class="lead">${longer}</p></div></section>${cta()}`,
};
pages['contact.html'] = {
  title: 'Contact us', active: 'contact',
  content: `${intro('Your next chapter<br><span class="accent">Starts here</span>', '', 'contact-intro')}<section class="section contact-section"><div class="wrap contact-grid"><div class="contact-details"><h2>Let’s talk</h2><div><h3>Email</h3><a href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com${arrow}</a></div><div><h3>Phone & WhatsApp</h3><p>To be confirmed</p></div><div><h3>Website</h3><p>northwickmarshall.co.uk</p></div></div><form id="enquiry-form"><h2>Make an enquiry</h2><div class="field-row"><div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required></div></div><div class="field"><label for="company">Company <span>(optional)</span></label><input id="company" name="company" autocomplete="organization"></div><div class="field"><label for="service">I’m interested in</label><select id="service" name="service"><option>A first conversation</option>${services.map(s => `<option>${s.name}</option>`).join('')}</select></div><div class="field"><label for="message">How can we help?</label><textarea id="message" name="message" rows="4" required></textarea></div><p class="form-note">Opens your email app with your enquiry ready to send.</p><button class="button" type="submit"><span>Prepare email</span>${arrow}</button><p id="form-status" role="status" aria-live="polite"></p></form></div></section>`,
};
pages['privacy.html'] = {
  title: 'Privacy policy', active: '',
  content: `${intro('Privacy policy', 'Draft for review · Policy wording to follow')}<section class="section policy-section"><div class="wrap policy">${['About this policy', 'Information you share with us', 'How information is used', 'Storage and retention', 'Your choices and rights', 'Website hosting and cookies'].map(title => `<section><h2>${title}</h2><p>${longer}</p></section>`).join('')}<section><h2>Contact</h2><a href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com</a></section></div></section>`,
};
pages['404.html'] = { title: 'Page not found', active: '', content: `<section class="page-intro wrap error-page"><h1>Page not found</h1><p>The page you’re looking for may have moved.</p>${link('index.html', 'Back to home', 'button')}</section>` };

for (const [path, page] of Object.entries(pages)) {
  await writeFile(new URL(path, out), `<!doctype html>
<html lang="en-GB"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#031f40"><meta name="robots" content="noindex,nofollow">
<title>${page.title} | Northwick Marshall</title><meta name="description" content="Northwick Marshall Consulting — smart business support. Diagnose, Design & Deliver, Transform.">
<meta property="og:title" content="${page.title} | Northwick Marshall"><meta property="og:description" content="Smart business support. Clarity, direction and a partnership for your next chapter."><meta property="og:type" content="website"><meta property="og:image" content="https://0riceisnice0-hash.github.io/northwickmarshall/assets/london-dusk.jpg">
<link rel="icon" href="assets/mark.svg" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/styles.css?v=2"><script src="assets/site.js?v=2" defer></script>
</head><body class="page-${path.replace('.html', '')}"><a class="skip-link" href="#main">Skip to content</a>${nav(page.active)}<main id="main">${page.content}</main>${footer()}</body></html>\n`);
}
await writeFile(new URL('.nojekyll', out), '');
await writeFile(new URL('robots.txt', out), 'User-agent: *\nDisallow: /\n');
console.log(`Built ${Object.keys(pages).length} pages in dist`);
