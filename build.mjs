import { mkdir, rm, writeFile, cp } from 'node:fs/promises';

const out = new URL('./dist/', import.meta.url);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(new URL('./assets/', import.meta.url), new URL('assets/', out), { recursive: true });
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const longer = `${lorem} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
const introduction = "We're here to help with everything from health checks, strategic roadmaps and long-term partnerships, supporting small and medium-sized business owners to move their business forward.";
const companyParagraphs = [
  "We're here to help and support our clients to achieve a positive outcome, gaining their trust through developing step by step plans and working alongside them to hit their targets. We've been around for 12 years, and even during that time, the things that matter to our customers have changed. We want to make an impact every time we engage and bring our experience to bear on whatever business problem is presented.",
  "The clients we've worked with are some of the most well known, blue chip organisations across Financial Services and Banking, Automotive, Telecoms, Travel and Tourism, and Retail.",
];
const companyCopy = () => companyParagraphs.map(text => `<p>${text}</p>`).join('');
const people = [
  {
    role: 'Business analysis & project delivery', name: 'Ben Thompson', slug: 'ben-thompson', image: 'people/ben.png', width: 780, height: 1080,
    paragraphs: [
      'Ben Thompson is an experienced Business Analyst and Project Manager with over two decades of experience delivering change across the automotive, financial services, travel, and retail sectors.',
      'A Principal Business Analyst for more than 20 years and the owner of Northwick Marshall Consulting since 2015, he has led more than 40 successfully delivered projects and initiatives for clients including Mercedes-Benz, Volkswagen Financial Services, Weatherbys Private Bank, ParcelForce Worldwide, Barclaycard Corporate, and Premier Inn.',
      'Ben has experience in delivering strategic business analysis and design, IT consulting, and change management. Focussed on value through revenue generation or cost savings, he takes a top-down approach and works at all levels within his clients’ organisations. Ben is dedicated to a thorough and rigorous process, ensuring positive outcomes.',
    ],
  },
  {
    role: 'Learning & development', name: 'Rebecca Wood', slug: 'rebecca-wood', image: 'people/rebecca.jpg', width: 391, height: 521,
    paragraphs: [
      'Rebecca Wood is a dynamic and results-driven learning and development consultant with a proven track record of leading transformational programmes across the UK and internationally. With deep expertise spanning multiple sectors, from housing and local government to automotive, finance, retail, and aviation, Rebecca has partnered with some of the world’s most respected organisations, including Clarion Housing, Orbit Housing, Vodafone, Unilever, Jaguar Land Rover, Mercedes-Benz, Royal Bank of Scotland, Network Rail, and South African Airways.',
      'As a specialist in behavioural change and performance coaching, Rebecca empowers individuals and teams to unlock their full potential and drive meaningful impact. Her strategic approach blends insight with action, helping organisations shift culture, strengthen leadership, and elevate performance.',
    ],
  },
  {
    role: 'Organisational development', name: 'Cate Hutchins-Emery', slug: 'cate-hutchins-emery', image: 'people/cate.jpg', width: 1158, height: 1544,
    paragraphs: [
      'Cate Hutchins-Emery brings over 25 years of experience in key roles spanning organisational and community development in the UK, Ireland and India. She has worked extensively across the charity, education, and business sectors and holds professional qualifications in mediation and business analysis.',
      'Cate excels in managing complex processes and workflows, collaborating with teams to cultivate a positive and productive culture. Her passion is empowering individuals to achieve their full potential through training, mentorship, and nurturing a supportive organisational environment.',
    ],
  },
  {
    name: 'Lorem ipsum', slug: 'associate-four', role: 'Lorem ipsum dolor sit amet',
    image: 'people/placeholder.svg', width: 600, height: 800,
    paragraphs: [longer, lorem],
  },
  {
    name: 'Dolor sit amet', slug: 'associate-five', role: 'Consectetur adipiscing elit',
    image: 'people/placeholder.svg', width: 600, height: 800,
    paragraphs: [longer, lorem],
  },
];
const arrow = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const link = (href, label, style = 'text-link') => `<a class="${style}" href="${href}"><span>${label}</span>${arrow}</a>`;
const photo = (file, alt, eager = false) => `<img src="assets/${file}" alt="${alt}" width="1600" height="1067" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;

const services = [
  { slug: 'diagnose', name: 'Diagnose', summary: 'A comprehensive business health audit identifying operational gaps and growth goals.', description: 'We provide detailed business assessments to uncover bottlenecks. Deliverables include a SWOT analysis, financial health check, and a feasibility report. Structured as a fixed-fee diagnostic package, this offers small and medium-sized business owners total clarity on their current standing.', image: 'meeting.jpg', alt: 'Stock photograph of colleagues reviewing their work around a table', heading: 'Clarity on where you stand', sections: ['Business assessment', 'SWOT analysis', 'Financial health check', 'Feasibility report'] },
  { slug: 'design-deliver', name: 'Design & Deliver', summary: 'Building custom roadmaps and delivering frameworks for immediate tactical improvements.', description: lorem, image: 'workspace.jpg', alt: 'A sunlit meeting space with a long table and glass partitions', heading: 'Turn direction into delivery', sections: ['Your roadmap', 'Practical frameworks', 'Delivery approach', 'Next steps'] },
  { slug: 'transform', name: 'Partner and Transform', summary: 'Embedded partnership focusing on long-term value creation and organisational evolution.', description: lorem, image: 'london-dusk.jpg', alt: 'The City of London skyline across the River Thames at dusk', heading: 'Build what comes next', sections: ['Our partnership', 'Business evolution', 'Long-term value', 'Next steps'] },
];

function brand() {
  return `<a href="index.html" class="brand" aria-label="Northwick Marshall home"><img src="assets/mark.svg?v=5" width="65" height="44" alt=""><span>Northwick Marshall<small>Consulting</small></span></a>`;
}
function nav(active) {
  const items = [['about', 'About'], ['services', 'Services'], ['associates', 'Associates'], ['contact', 'Contact']];
  return `<header class="header"><div class="wrap header-inner">${brand()}<button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">+</span></button><nav id="navigation" aria-label="Main navigation">${items.map(([key, label]) => `<a href="${key}.html" ${active === key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}${link('contact.html', 'Book a call', 'button button-small')}</nav></div></header>`;
}
function footer(compact = false) {
  return `<footer class="footer"><div class="wrap footer-main">${brand()}<div class="footer-links"><a href="about.html">About</a><a href="services.html">Services</a><a href="associates.html">Associates</a><a href="contact.html">Contact</a></div>${compact ? '' : '<a class="footer-email" href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com</a>'}</div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Northwick Marshall</span><span>northwickmarshall.co.uk</span><a href="privacy.html">Privacy policy</a></div></footer>`;
}
const cta = () => `<section class="cta"><div class="wrap closing-content"><div class="closing-copy"><h2>Let’s talk about<br> your business</h2><p>A health check, a strategic roadmap or support through a wider business change. Tell us what you want to work on.</p>${link('contact.html', 'Book a call', 'button button-dark')}<p class="closing-preparation">Tell us about your current challenge, the outcome you want and any key timescales.</p></div><div class="closing-details"><h3>Contact Ben</h3><p class="closing-experience">Business analysis and project delivery, backed by over 20 years of experience.</p><a class="closing-email" href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com${arrow}</a><div class="closing-service-links">${services.map(service => link(`${service.slug}.html`, service.name)).join('')}</div></div></div></section>`;
const office = () => `<figure class="office-image">${photo('office-concept.jpg', 'AI visualisation of a Northwick Marshall meeting room with brass signage on a navy wall')}</figure>`;

function serviceList(items = services, heading = 'h3') {
  return `<div class="service-grid">${items.map(s => `<article class="service-card"><a class="service-photo" href="${s.slug}.html" aria-label="Explore ${s.name}">${photo(s.image, s.alt)}</a><${heading}><a href="${s.slug}.html">${s.name}${arrow}</a></${heading}><p>${s.summary}</p></article>`).join('')}</div>`;
}
const approach = () => `<section class="section approach"><div class="wrap"><div class="section-top"><h2>Clear thinking<br>Practical progress</h2><p>${lorem}</p></div><div class="approach-words">${services.map(service => `<h3>${service.name}</h3>`).join('')}</div></div></section>`;
const intro = (title, body = lorem, className = '') => `<section class="page-intro wrap ${className}"><h1>${title}</h1>${body ? `<p>${body}</p>` : ''}</section>`;

const support = () => `<section class="support-section" data-stack-panel><div class="wrap">
  <div class="support-intro"><h2>From business health checks<br> to business transformation</h2><p>A focussed diagnostic, a practical delivery plan or an ongoing partnership.</p></div>
  <div class="support-layout"><div class="support-image">${photo('workspace.jpg', 'Stock photograph of a bright meeting room with a long table and glass partitions')}</div>
    <div class="support-services">${services.map(service => `<article class="support-service"><h3><a href="${service.slug}.html">${service.name}${arrow}</a></h3><p>${service.summary}</p></article>`).join('')}</div>
  </div>
</div></section>`;

const pages = {};
pages['index.html'] = {
  title: 'Consultancy for small and medium businesses', active: '',
  content: `<section class="home-hero" data-stack-panel aria-labelledby="hero-title">
    <div class="hero-backdrop" aria-hidden="true"><img src="assets/london-dusk.jpg" alt="" width="1800" height="1200" fetchpriority="high"></div>
    <div class="wrap hero-composition"><div class="hero-copy"><h1 id="hero-title">Consultancy for<br> <span class="accent">small and medium<br> businesses</span></h1><p>${introduction}</p>${link('contact.html', 'Book a call', 'button')}</div></div>
  </section>
  <div class="home-content">${support()}<div class="panel-pause" aria-hidden="true"></div>
  <section class="section home-partnership" data-stack-panel><div class="wrap partnership-layout"><div><h2>Northwick Marshall<br>Consulting</h2>${companyCopy()}<div class="partnership-links">${link('about.html', 'About Northwick Marshall')}${link('associates.html', 'Meet our associates')}</div></div>${office()}</div></section><div class="panel-pause" aria-hidden="true"></div>${cta()}</div>`,
};
pages['about.html'] = {
  title: 'About us', active: 'about',
  content: `${intro('About<br> Northwick Marshall', "We're here to help and support our clients to achieve a positive outcome.")}<section class="about-visual wrap">${office()}</section><section class="section"><div class="wrap reading-split"><h2>Working<br>in partnership</h2><div>${companyCopy()}</div></div></section>${approach()}<section class="section"><div class="wrap editorial-split">${photo('meeting.jpg', 'Stock photograph of colleagues collaborating around a shared table')}<div><h2>Our associates</h2><p>Business analysis and project management, learning and development, and organisational and community development.</p>${link('associates.html', 'Meet our associates')}</div></div></section>${cta()}`,
};
pages['services.html'] = {
  title: 'Our services', active: 'services',
  content: `${intro('Clarity to begin<br><span class="accent">Confidence to grow</span>', introduction)}<section class="section service-directory"><div class="wrap">${serviceList(services, 'h2')}</div></section><section class="section service-explanation"><div class="wrap reading-split"><h2>Start with<br>a clearer picture</h2><div><p class="lead">${services[0].description}</p>${link('diagnose.html', 'Explore Diagnose')}</div></div></section>${approach()}${cta()}`,
};
for (const service of services) {
  const title = service.slug === 'design-deliver' ? 'Design<br>& Deliver' : service.slug === 'transform' ? 'Partner and<br> Transform' : service.name;
  pages[`${service.slug}.html`] = {
    title: service.name, active: 'services',
    content: `<section class="service-hero wrap"><div><h1>${title}</h1><p>${service.summary}</p>${link('contact.html', 'Book a call', 'button')}</div>${photo(service.image, service.alt, true)}</section><section class="section"><div class="wrap reading-split"><h2>${service.heading}</h2><p class="lead">${service.description}</p></div></section><section class="section deliverables"><div class="wrap"><div class="section-top"><h2>What’s included</h2><p>${lorem}</p></div><div class="detail-grid">${service.sections.map(title => `<article><h3>${title}</h3><p>${lorem}</p></article>`).join('')}</div></div></section><section class="section"><div class="wrap"><div class="section-top"><h2>Keep exploring</h2>${link('services.html', 'All services')}</div>${serviceList(services.filter(s => s.slug !== service.slug))}</div></section>${cta()}`,
  };
}
pages['associates.html'] = {
  title: 'Our associates', active: 'associates',
  content: `<section class="people-hero wrap"><div class="people-heading"><h1>Our<br> <span class="accent">associates</span></h1><p>Different experience. A shared commitment to your business. Meet the people behind Northwick Marshall.</p></div><div class="people-stage"><div class="people-gallery">${people.map((person, index) => `<a class="person-link person-link-${person.slug}" href="#${person.slug}" data-person="${person.slug}" aria-controls="${person.slug}" aria-label="About ${person.name}"><div class="person-frame associate-image-${person.slug}"><img src="assets/${person.image}" alt="" width="${person.width}" height="${person.height}" fetchpriority="${index === 0 ? 'high' : 'auto'}"></div><div class="person-name"><h2>${person.name}</h2>${arrow}</div><p>${person.role}</p></a>`).join('')}</div>
  <div class="people-biographies">${people.map(person => `<article class="person-biography" id="${person.slug}" aria-labelledby="bio-title-${person.slug}"><h2 id="bio-title-${person.slug}">${person.name}</h2>${person.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('')}</article>`).join('')}</div></div></section>${cta()}`,
};
pages['contact.html'] = {
  title: 'Contact us', active: 'contact',
  content: `${intro('Your next chapter<br><span class="accent">Starts here</span>', '', 'contact-intro')}<section class="section contact-section"><div class="wrap contact-grid"><div class="contact-details"><h2>Let’s talk</h2><div><h3>Email</h3><a href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com${arrow}</a></div><div><h3>Phone & WhatsApp</h3><p>Lorem ipsum</p></div><div><h3>Website</h3><p>northwickmarshall.co.uk</p></div></div><form id="enquiry-form"><h2>Make an enquiry</h2><div class="field-row"><div class="field"><label for="name">Your name</label><input id="name" name="name" autocomplete="name" required></div><div class="field"><label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required></div></div><div class="field"><label for="company">Company <span>(optional)</span></label><input id="company" name="company" autocomplete="organization"></div><div class="field"><label for="service">I’m interested in</label><select id="service" name="service"><option>A first conversation</option>${services.map(s => `<option>${s.name}</option>`).join('')}</select></div><div class="field"><label for="message">How can we help?</label><textarea id="message" name="message" rows="4" required></textarea></div><p class="form-note">Opens your email app with your enquiry ready to send.</p><button class="button" type="submit"><span>Prepare email</span>${arrow}</button><p id="form-status" role="status" aria-live="polite"></p></form></div></section>`,
};
pages['privacy.html'] = {
  title: 'Privacy policy', active: '',
  content: `${intro('Privacy policy')}<section class="section policy-section"><div class="wrap policy">${['About this policy', 'Information you share with us', 'How information is used', 'Storage and retention', 'Your choices and rights', 'Website hosting and cookies'].map(title => `<section><h2>${title}</h2><p>${longer}</p></section>`).join('')}<section><h2>Contact</h2><a href="mailto:northwickmarshall@gmail.com">northwickmarshall@gmail.com</a></section></div></section>`,
};
pages['404.html'] = { title: 'Page not found', active: '', content: `<section class="page-intro wrap error-page"><h1>Page not found</h1><p>The page you’re looking for may have moved.</p>${link('index.html', 'Back to home', 'button')}</section>` };

for (const [path, page] of Object.entries(pages)) {
  await writeFile(new URL(path, out), `<!doctype html>
<html lang="en-GB"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#031f40"><meta name="robots" content="noindex,nofollow">
<title>${page.title} | Northwick Marshall</title><meta name="description" content="Northwick Marshall Consulting — consultancy for small and medium businesses. Diagnose, Design & Deliver, Partner and Transform.">
<meta property="og:title" content="${page.title} | Northwick Marshall"><meta property="og:description" content="Smart business support. Clarity, direction and a partnership for your next chapter."><meta property="og:type" content="website"><meta property="og:image" content="https://0riceisnice0-hash.github.io/northwickmarshall/assets/london-dusk.jpg">
<link rel="icon" href="assets/favicon.svg?v=5" type="image/svg+xml"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link rel="stylesheet" href="assets/styles.css?v=8"><script src="assets/site.js?v=3" defer></script>${path === 'index.html' ? '<link rel="stylesheet" href="assets/home.css?v=7"><script src="assets/home.js?v=6" defer></script>' : ''}${path === 'associates.html' ? '<link rel="stylesheet" href="assets/people.css?v=10"><script src="assets/people.js?v=8" defer></script>' : ''}
</head><body class="page-${path.replace('.html', '')}"><a class="skip-link" href="#main">Skip to content</a>${nav(page.active)}<main id="main">${page.content}</main>${footer(path === 'index.html')}</body></html>\n`);
}
await writeFile(new URL('.nojekyll', out), '');
await writeFile(new URL('robots.txt', out), 'User-agent: *\nDisallow: /\n');
console.log(`Built ${Object.keys(pages).length} pages in dist`);
