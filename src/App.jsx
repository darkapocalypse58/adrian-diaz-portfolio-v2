import React, { cloneElement, useCallback, useEffect, useRef, useState } from 'react';

const projects = [
  { number: '01', type: 'AUTOMATED PUBLISHING', name: 'Technomalist', description: 'An automated technology newsroom built around discovery, classification, editorial review, and reliable publishing.', stack: 'Next.js · Node.js · Supabase · Cloudflare', tone: 'gold', image: '/project-technomalist.png', imageType: 'logo' },
  { number: '02', type: 'DIGITAL AGENCY', name: 'RV Multimedia', description: 'A focused agency experience connecting web development, brand, content, video, and business support.', stack: 'WordPress · Strategy · Responsive Design', tone: 'violet', image: '/project-rv.png', imageType: 'logo' },
  { number: '03', type: 'ONLINE LEARNING', name: 'ImagineIF Institute', description: 'A connected learning platform for lessons, subscriptions, payments, cohorts, access, and analytics.', stack: 'WordPress · Masteriyo · WooCommerce', tone: 'coral', image: '/project-imagineif.png', imageType: 'showcase' },
  { number: '04', type: 'PROFESSIONAL SERVICES', name: 'Maddock Hawkins', description: 'A professional accountancy website shaped around services, trust, practical answers, and useful content.', stack: 'WordPress · Divi · PHP · Content Design', tone: 'green', image: '/project-maddock.png', imageType: 'showcase' },
];

const experiences = [
  { dates: '2026 — PRESENT', role: 'Shopify Theme Developer', company: 'Sports Apparel & Team Uniform Retailer', description: 'Sole developer for a Shopify-based sports apparel retailer serving schools, athletic departments, and coaches. Built a custom Collection List page with 60+ Customizer settings, live search, and filterable tabs. Developed a custom landing page and standardized 13 product category pages into one consistent layout system. Wrote fully scoped, mobile responsive Liquid code with zero hardcoded values, every setting editable through the Shopify Customizer. Defined the site’s brand style guide covering typography, color, and component standards.', tags: ['Shopify', 'Liquid', 'Customizer', 'Responsive Design'] },
  { dates: '2025 — PRESENT', role: 'WordPress Developer (Part-time)', company: 'Imagine If Institute', description: 'Building and maintaining their online learning platform — Divi on the front end, Masteriyo LMS handling course delivery. WooCommerce manages subscriptions through Stripe, for both solo learners and group cohorts. Set up GA4 and Google Search Console from scratch so they have real visibility into what’s performing.', tags: ['WordPress', 'Divi', 'Masteriyo LMS', 'WooCommerce', 'Stripe', 'GA4'] },
  { dates: '2024 — 2025', role: 'WordPress Support', company: 'Lemonade IT', description: 'Contributed to managing and maintaining over 30 client websites, providing ongoing WordPress support. Handled routine tasks such as backups, plugin updates, and troubleshooting broken sites. Customized and redesigned websites using Divi, Elementor, and Astra, and worked with fully custom-built WordPress themes.', tags: ['WordPress', 'Divi', 'Elementor', 'WPMU', 'Troubleshooting'] },
  { dates: '2023 — 2024', role: 'Shopify, WordPress & Node.js Developer', company: 'Strategiert', description: 'Responsible for maintaining existing websites and platforms built on Shopify and WordPress. Developed a custom AI chatbot application that could intelligently assist users by showcasing and responding to queries about their products.', tags: ['Shopify', 'WordPress', 'Node.js', 'AI Integration'] },
  { dates: '2021 — 2023', role: 'WordPress Developer', company: 'Ultimate WP Help', description: 'Managed and maintained over 50 WordPress websites using MainWP. Handled the Help Desk, providing timely support and solutions. Built new websites and set up themes using Divi and Thrive Architect, including eCommerce stores and online course platforms.', tags: ['WordPress', 'MainWP', 'eCommerce', 'Divi'] },
  { dates: '2020 — 2021', role: 'WordPress & Shopify Developer', company: 'Geeky Pandas', description: 'Built and customized WordPress and Shopify sites, from product pages to course platforms. Handled theme tweaks, plugin setups, and app integrations, often stepping in to solve problems and streamline user experiences.', tags: ['WordPress', 'Shopify', 'HTML/CSS', 'Theme Customization'] },
  { dates: '2019', role: 'Front-end Developer — Intern', company: 'Ignitron Digitals', description: 'Designed and developed multiple responsive web pages from scratch using HTML5, CSS3, and jQuery. Used Bootstrap to ensure consistency in layout and mobile responsiveness.', tags: ['HTML5', 'CSS3', 'jQuery', 'Bootstrap'] },
];

const stages = ['Intro', 'Profile', 'Skills', 'Experience', 'Automation', 'Work', 'Contact'];
const careerStartYear = 2019;
const experienceYears = Math.max(0, new Date().getFullYear() - careerStartYear);

function withCurrentExperience(node) {
  if (typeof node === 'string') {
    return node
      .replace(/six years/gi, `${experienceYears} years`)
      .replace(/6\+/g, `${experienceYears}+`);
  }
  if (Array.isArray(node)) return node.map(withCurrentExperience);
  if (React.isValidElement(node) && node.props.children) {
    return cloneElement(node, node.props, withCurrentExperience(node.props.children));
  }
  return node;
}

function useHorizontalJourney(trackRef) {
  const current = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const limit = useCallback(() => Math.max(0, (trackRef.current?.scrollWidth ?? innerWidth) - innerWidth), [trackRef]);
  const render = useCallback(() => {
    const distance = target.current - current.current;
    current.current += distance * 0.085;
    if (Math.abs(distance) < 0.2) current.current = target.current;
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${-current.current}px,0,0)`;
    const max = limit();
    setProgress(max ? current.current / max : 0);
    setActive(Math.round(current.current / innerWidth));
    if (Math.abs(distance) >= 0.2) frame.current = requestAnimationFrame(render);
    else frame.current = 0;
  }, [limit, trackRef]);

  const moveTo = useCallback((value) => {
    target.current = Math.max(0, Math.min(limit(), value));
    if (!frame.current) frame.current = requestAnimationFrame(render);
  }, [limit, render]);

  useEffect(() => {
    let settleTimer = 0;
    let gestureStartStage = null;
    let gestureDirection = 1;
    const onWheel = event => {
      event.preventDefault();
      const rawDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      const delta = rawDelta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(delta) < 0.5) return;
      if (gestureStartStage === null) gestureStartStage = Math.round(target.current / innerWidth);
      gestureDirection = Math.sign(delta);
      moveTo(target.current + delta * 1.35);
      clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        let destination = Math.round(target.current / innerWidth);
        if (destination === gestureStartStage) destination += gestureDirection;
        moveTo(destination * innerWidth);
        gestureStartStage = null;
      }, 170);
    };
    const onKey = event => {
      const directions = { ArrowRight: 1, PageDown: 1, ' ': 1, ArrowLeft: -1, PageUp: -1 };
      if (!directions[event.key]) return;
      event.preventDefault();
      moveTo((Math.round(target.current / innerWidth) + directions[event.key]) * innerWidth);
    };
    const onResize = () => moveTo(Math.round(target.current / innerWidth) * innerWidth);
    document.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('wheel', onWheel, { capture: true });
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frame.current);
      clearTimeout(settleTimer);
    };
  }, [moveTo]);

  return { progress, active, goTo: index => moveTo(index * innerWidth) };
}

function Stage({ id, eyebrow, title, children, className = '' }) {
  const cleanEyebrow = eyebrow.replace(/^\d+\s*\/\s*/, '');
  return <section id={id} className={`stage ${className}`}><div className="stage-inner"><p className="eyebrow">{cleanEyebrow}</p><h2>{withCurrentExperience(title)}</h2>{withCurrentExperience(children)}</div></section>;
}

function TypewriterHeadline({ active }) {
  const lines = ['Websites that work.', 'Systems that help.', 'Built with care.'];
  const fullText = lines.join('\n');
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    setVisibleLength(0);
    let timer;
    const startTimer = window.setTimeout(() => {
      const typeNext = () => {
        setVisibleLength(length => {
          if (length >= fullText.length) return length;
          timer = window.setTimeout(typeNext, fullText[length] === '\n' ? 190 : 58);
          return length + 1;
        });
      };
      typeNext();
    }, 280);
    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(timer);
    };
  }, [active, fullText]);

  const visibleText = fullText.slice(0, visibleLength);
  const [typedFirst = '', typedSecond = '', typedThird = ''] = visibleText.split('\n');

  return <span className="typewriter" aria-label={lines.join(' ')}>
    <span className="typewriter-measure" aria-hidden="true">Websites that work.<br/><em>Systems that help.</em><br/>Built with care.</span>
    <span className="typewriter-output" aria-hidden="true">{typedFirst}{visibleText.includes('\n') && <br/>}<em>{typedSecond}</em>{visibleText.split('\n').length > 2 && <br/>}{typedThird}<i className={visibleLength >= fullText.length ? 'is-finished' : ''}/></span>
  </span>;
}

function App() {
  const trackRef = useRef(null);
  const glowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const { progress, active, goTo } = useHorizontalJourney(trackRef);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1900);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const pointer = { x: innerWidth * 0.5, y: innerHeight * 0.5 };
    const glow = { x: pointer.x, y: pointer.y };
    let animationFrame = 0;
    const onPointerMove = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      glowRef.current?.classList.add('is-visible');
    };
    const onPointerLeave = () => glowRef.current?.classList.remove('is-visible');
    const animateGlow = () => {
      glow.x += (pointer.x - glow.x) * 0.14;
      glow.y += (pointer.y - glow.y) * 0.14;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glow.x}px,${glow.y}px,0) translate(-50%,-50%)`;
      animationFrame = requestAnimationFrame(animateGlow);
    };
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    animationFrame = requestAnimationFrame(animateGlow);
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <main className={`viewport ${isLoading ? 'is-loading' : 'is-ready'}`}>
    {isLoading && <div className="preloader" role="status" aria-label="Loading Adrian Diaz portfolio"><div className="preloader-grid"/><div className="preloader-copy"><span className="preloader-code">&lt;/&gt;</span><h1>Adrian Diaz</h1><p>Web Developer</p><div className="preloader-line"><i/></div><small>INITIALIZING PORTFOLIO</small></div></div>}
    <div className="ambient ambient-one"/><div className="ambient ambient-two"/><div className="cursor-glow" ref={glowRef}/><div className="grain"/>
    <div className="progress"><i style={{ transform: `scaleX(${progress})` }} /></div>
    <nav className="nav"><button className="mark" onClick={() => goTo(0)} aria-label="Home"><img src="/ad-logo.png" alt="Adrian Diaz" /></button><div className="nav-center">{stages.slice(1).map((label, index) => {const stageIndex=index+1;return <button key={label} className={active === stageIndex ? 'active' : ''} onClick={() => goTo(stageIndex)}>{label}</button>})}</div><a href="mailto:hello@iandiazcode.com">Let’s talk</a></nav>
    <div className="track" ref={trackRef}>
      <Stage id="intro" eyebrow="ADRIAN DIAZ · WEB DEVELOPER" title={<TypewriterHeadline active={!isLoading}/>} className="hero console-hero"><div className="hero-layout"><div><p className="lead">Full-stack websites, commerce systems, and workflow automation engineered to stay reliable after launch.</p><div className="hero-actions"><button className="cta" onClick={() => goTo(5)}>Explore the work <span>→</span></button><button className="resume-cta" onClick={() => goTo(3)}>View résumé</button></div><div className="quick-contact"><small>QUICK CONTACT</small><div><a href="https://github.com/darkapocalypse58" target="_blank" rel="noreferrer" aria-label="GitHub"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg></a><a href="https://www.linkedin.com/in/diaz-al/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.25H3V21h3.5V8.25ZM4.75 3A2.05 2.05 0 1 0 4.75 7.1 2.05 2.05 0 0 0 4.75 3ZM21 13.68c0-3.84-2.05-5.63-4.79-5.63-2.2 0-3.19 1.21-3.74 2.06V8.25H9V21h3.47v-6.31c0-1.66.31-3.26 2.37-3.26 2.03 0 2.06 1.9 2.06 3.37V21H21v-7.32Z"/></svg></a><a href="mailto:hello@iandiazcode.com" aria-label="Email Adrian Diaz"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm9 7.2L20.1 7H3.9L12 12.2ZM3 17h18V9l-9 5.8L3 9v8Z"/></svg></a></div></div></div><aside className="capability-console" aria-label="Development capabilities"><header><span>ADRIAN_OS / CAPABILITIES</span><span><i/> ONLINE</span></header><div className="console-lines"><p><b>&gt;</b><span>shopify</span>Custom Themes · Liquid · Apps</p><p><b>&gt;</b><span>wordpress</span>Custom Builds · WooCommerce</p><p><b>&gt;</b><span>frontend</span>React · Next.js · TypeScript</p><p><b>&gt;</b><span>backend</span>Node.js · Supabase · REST APIs</p><p><b>&gt;</b><span>platforms</span>CMS · LMS · Commerce · Stripe</p><p><b>&gt;</b><span>workflow</span>Automation · Analytics · Support</p></div><small>SYSTEM READY — ACCEPTING NEW INPUT</small></aside></div></Stage>
      <Stage id="profile" eyebrow="PROFILE" title={<>Full-stack delivery.<br/>Platform-level depth.</>} className="profile-stage"><div className="profile-grid"><article className="background-card"><small>BACKGROUND</small><p>I’m Adrian Diaz, a web developer with six years of professional experience building, maintaining, and improving websites, online stores, learning platforms, and web applications.</p><p>I combine polished interface work with the systems behind it—content management, APIs, databases, commerce, analytics, integrations, monitoring, and long-term support.</p><div className="profile-stats"><span><strong>6+</strong> years</span><span><strong>80+</strong> sites managed</span><span><strong>4</strong> core platforms</span></div></article><article className="toolkit-card"><small>CORE TOOLKIT</small><div className="skill-groups"><section><h3>Frontend & UI</h3><p>HTML5 · CSS3 · JavaScript · TypeScript · React · Next.js · Tailwind · Bootstrap · Responsive Design</p></section><section><h3>Backend & Data</h3><p>Node.js · Express.js · PHP · PostgreSQL · MySQL · MongoDB · Supabase · REST APIs</p></section><section><h3>CMS & Commerce</h3><p>WordPress · Shopify · Liquid · Customizer · Divi · Elementor · Astra · WooCommerce · Masteriyo · Stripe</p></section><section><h3>Tools & Delivery</h3><p>Git · GitHub · Cloudflare Workers · GA4 · Search Console · MainWP · WPMU DEV · SEO · AI Integration</p></section></div></article></div></Stage>
      <Stage id="skills" eyebrow="02 / TECHNICAL TOOLKIT" title={<>Skills & Technologies</>} className="skills-stage"><p className="skills-intro">A practical full-stack toolkit shaped by six years of building, maintaining, and improving websites, online stores, and web apps.</p><div className="platform-row">{['WordPress','Shopify','React / Next.js','Node.js'].map(item=><strong key={item}>{item}</strong>)}</div><div className="skills-board"><article><header><span>&lt;/&gt;</span><div><h3>Frontend & UI</h3><p>Responsive, accessible interfaces built for speed and clarity.</p></div></header><div className="skill-pills">{['HTML5','CSS3','JavaScript','TypeScript','React','Next.js','Tailwind CSS','Bootstrap','Responsive Design','Web Design'].map(item=><span key={item}>{item}</span>)}</div></article><article><header><span>DB</span><div><h3>Backend & Data</h3><p>Reliable application logic, APIs, databases, and integrations.</p></div></header><div className="skill-pills">{['Node.js','Express.js','PHP','PostgreSQL','MySQL','MongoDB','Supabase','REST APIs'].map(item=><span key={item}>{item}</span>)}</div></article><article><header><span>CMS</span><div><h3>CMS & Commerce</h3><p>Flexible content and commerce systems clients can manage.</p></div></header><div className="skill-pills">{['WordPress','Shopify','Liquid','Shopify Customizer','Divi','Elementor','Astra','WooCommerce','Masteriyo LMS','Stripe'].map(item=><span key={item}>{item}</span>)}</div></article><article><header><span>OPS</span><div><h3>Tools & Delivery</h3><p>The workflow, analytics, and operations behind every launch.</p></div></header><div className="skill-pills">{['Git','GitHub','Cloudflare Workers','GA4','Google Search Console','MainWP','WPMU DEV','SEO','AI Integration','Discord.js','Troubleshooting'].map(item=><span key={item}>{item}</span>)}</div></article></div></Stage>
      <Stage id="experience" eyebrow="02 / EXPERIENCE" title={<>Six years. Seven roles.<br/>One evolving practice.</>} className="experience-stage"><div className="experience-board"><div className="experience-list">{experiences.map((item, index) => <button key={`${item.dates}-${item.company}`} className={selectedExperience === index ? 'selected' : ''} onClick={() => setSelectedExperience(index)}><time>{item.dates}</time><span>{item.role}</span><small>{item.company}</small></button>)}</div><article className="experience-detail"><div><p className="eyebrow">ROLE {String(selectedExperience + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}</p><h3>{experiences[selectedExperience].role}</h3><h4>{experiences[selectedExperience].company}</h4><p>{experiences[selectedExperience].description}</p></div><div className="experience-tags">{experiences[selectedExperience].tags.map(tag => <span key={tag}>{tag}</span>)}</div></article></div></Stage>
      <Stage id="automation" eyebrow="03 / AUTOMATION" title={<>Automation built from<br/>real operational work.</>} className="automation-stage"><p className="automation-intro">Systems I’ve personally designed, implemented, and operated—from content pipelines to multi-site maintenance and platform integrations.</p><div className="metrics"><article><div className="auto-top"><strong>01</strong><small>PRODUCTION PROJECT</small></div><h3>Technomalist Content Automation</h3><p>Designed an automated newsroom pipeline that collects RSS stories, classifies and filters them, routes candidates through human editorial review, queues approved articles, and publishes them to the live site.</p><div className="auto-tags"><span>RSS Ingestion</span><span>Discord.js</span><span>Cloudflare Workers</span></div></article><article><div className="auto-top"><strong>02</strong><small>OPERATIONAL EXPERIENCE</small></div><h3>WordPress Fleet Operations</h3><p>Managed large WordPress portfolios through centralized updates, backups, monitoring, troubleshooting, and issue triage—making repetitive maintenance safer and more consistent.</p><div className="auto-tags"><span>MainWP</span><span>WPMU DEV</span><span>Monitoring</span></div></article><article><div className="auto-top"><strong>03</strong><small>PLATFORM INTEGRATION</small></div><h3>LMS & Commerce Integrations</h3><p>Connected WooCommerce, Stripe, and Masteriyo LMS for subscriptions, payments, individual enrolment, group cohorts, analytics, and structured course access.</p><div className="auto-tags"><span>WooCommerce</span><span>Stripe</span><span>Masteriyo LMS</span></div></article></div></Stage>
      <Stage id="work" eyebrow="04 / SELECTED WORK" title={<>Selected projects.<br/>Built with purpose.</>} className="work-stage"><div className="project-grid">{projects.map(project => <article className={`project-card ${project.tone}`} key={project.name}><div className={`project-mark ${project.imageType}`}><img src={project.image} alt=""/><i/></div><div className="project-details"><small>{project.number} / {project.type}</small><h3>{project.name}</h3><p>{project.description}</p><footer>{project.stack}</footer></div></article>)}</div></Stage>
      <Stage id="contact" eyebrow="05 / CONTACT" title={<>Have a useful idea?<br/><em>Let’s move it forward.</em></>} className="contact-stage"><a href="mailto:hello@iandiazcode.com">hello@iandiazcode.com ↗</a></Stage>
    </div>
    <button className="scroll-guide" type="button" onClick={() => goTo(Math.min(active + 1, stages.length - 1))} aria-label="Go to the next section"><span className="mouse"><i/></span><span className="scroll-copy"><strong>Scroll down</strong><small>to move right</small></span><b>→</b></button>
    <footer><span>{stages[Math.min(active, stages.length - 1)]}</span><span>{String(Math.min(active + 1, stages.length)).padStart(2, '0')} / {stages.length}</span></footer>
  </main>;
}

export default App;
