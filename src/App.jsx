import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaBehance,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { SiFiverr, SiUpwork } from "react-icons/si";
import { TbMail, TbSparkles } from "react-icons/tb";

const projects = [
  {
    number: "01",
    type: "ARCHITECTURE & CONSTRUCTION",
    name: "DECO Studio + Builders",
    description:
      "A bold architecture, interiors, and construction portfolio combining immersive project imagery, an interactive 23-project gallery, clear service pathways, and consultation lead generation.",
    stack: "Web Design · Responsive Design · Interactive Portfolio",
    image: "/project-deco-studio-homepage.png",
    imagePosition: "center center",
    url: "https://decostudio-builders.com/",
  },
  {
    number: "02",
    type: "AUTOMATED PUBLISHING",
    name: "Technomalist",
    description:
      "An automated technology newsroom built around discovery, classification, editorial review, and reliable publishing.",
    stack: "Next.js · Node.js · Supabase · Cloudflare",
    image: "/project-technomalist-homepage.png",
    imagePosition: "top center",
    url: "https://technomalist.com/",
  },
  {
    number: "03",
    type: "DIGITAL AGENCY",
    name: "RV Multimedia",
    description:
      "A focused agency experience connecting web development, brand, content, video, and business support.",
    stack: "WordPress · Strategy · Responsive Design",
    image: "/project-rv-homepage.png",
    imagePosition: "center 49%",
    url: "https://rvmultimedia.com/",
  },
  {
    number: "04",
    type: "ONLINE LEARNING",
    name: "ImagineIF Institute",
    description:
      "A connected learning platform for lessons, subscriptions, payments, cohorts, access, and analytics.",
    stack: "WordPress · Masteriyo · WooCommerce",
    image: "/project-imagineif-homepage-v2.png",
    url: "https://imagineifinstitute.com/",
  },
  {
    number: "05",
    type: "MINING & DRILLING",
    name: "PacDrill",
    description:
      "A safety-led mining services website presenting blast hole drilling capabilities, site-ready equipment, operating standards, and a direct path to project enquiries.",
    stack: "WordPress · Responsive Design · Service UX · Content Design",
    image: "/project-pacdrill-homepage.png",
    imagePosition: "center center",
    url: "https://pacdrill.com.au/",
  },
  {
    number: "06",
    type: "MEDIA TRAINING",
    name: "Success in Media",
    description:
      "An executive media-training website designed around clear service discovery, industry expertise, strong credibility, and direct lead generation.",
    stack: "Web Design · Responsive Design · Conversion UX",
    image: "/project-success-in-media-homepage.png",
    imagePosition: "top center",
    url: "https://www.successinmedia.com/",
  },
  {
    number: "07",
    type: "MOTORCYCLE TOURISM",
    name: "Wild Roads Motorcycle Tours",
    description:
      "An adventure-led touring website that brings together destinations, guided experiences, live tour tools, and a streamlined booking journey.",
    stack: "WordPress · Responsive Design · Booking Journey",
    image: "/project-wild-roads-homepage.png",
    imagePosition: "top center",
    url: "https://wildroadsmotorcycletours.co.uk/",
  },
  {
    number: "08",
    type: "PROFESSIONAL SERVICES",
    name: "Maddock Hawkins",
    description:
      "A professional accountancy website shaped around services, trust, practical answers, and useful content.",
    stack: "WordPress · Divi · PHP · Content Design",
    image: "/project-maddock-homepage-v2.png",
    url: "https://maddockhawkins.com/",
  },
];

const projectsPerPage = 4;

const experiences = [
  {
    dates: "2026 — PRESENT",
    role: "Shopify Theme Developer",
    company: "Sports Apparel & Team Uniform Retailer",
    description:
      "Sole developer for a Shopify-based sports apparel retailer serving schools, athletic departments, and coaches. Built a custom Collection List page with 60+ Customizer settings, live search, and filterable tabs. Developed a custom landing page and standardized 13 product category pages into one consistent layout system. Wrote fully scoped, mobile responsive Liquid code with zero hardcoded values, every setting editable through the Shopify Customizer. Defined the site’s brand style guide covering typography, color, and component standards.",
    tags: ["Shopify", "Liquid", "Customizer", "Responsive Design"],
  },
  {
    dates: "2025 — PRESENT",
    role: "WordPress Developer (Part-time)",
    company: "Imagine If Institute",
    description:
      "Building and maintaining their online learning platform — Divi on the front end, Masteriyo LMS handling course delivery. WooCommerce manages subscriptions through Stripe, for both solo learners and group cohorts. Set up GA4 and Google Search Console from scratch so they have real visibility into what’s performing.",
    tags: [
      "WordPress",
      "Divi",
      "Masteriyo LMS",
      "WooCommerce",
      "Stripe",
      "GA4",
    ],
  },
  {
    dates: "2024 — 2025",
    role: "WordPress Support",
    company: "Lemonade IT",
    description:
      "Contributed to managing and maintaining over 30 client websites, providing ongoing WordPress support. Handled routine tasks such as backups, plugin updates, and troubleshooting broken sites. Customized and redesigned websites using Divi, Elementor, and Astra, and worked with fully custom-built WordPress themes.",
    tags: ["WordPress", "Divi", "Elementor", "WPMU", "Troubleshooting"],
  },
  {
    dates: "2023 — 2024",
    role: "Shopify, WordPress & Node.js Developer",
    company: "Strategiert",
    description:
      "Responsible for maintaining existing websites and platforms built on Shopify and WordPress. Developed a custom AI chatbot application that could intelligently assist users by showcasing and responding to queries about their products.",
    tags: ["Shopify", "WordPress", "Node.js", "AI Integration"],
  },
  {
    dates: "2021 — 2023",
    role: "WordPress Developer",
    company: "Ultimate WP Help",
    description:
      "Managed and maintained over 50 WordPress websites using MainWP. Handled the Help Desk, providing timely support and solutions. Built new websites and set up themes using Divi and Thrive Architect, including eCommerce stores and online course platforms.",
    tags: ["WordPress", "MainWP", "eCommerce", "Divi"],
  },
  {
    dates: "2020 — 2021",
    role: "WordPress & Shopify Developer",
    company: "Geeky Pandas",
    description:
      "Built and customized WordPress and Shopify sites, from product pages to course platforms. Handled theme tweaks, plugin setups, and app integrations, often stepping in to solve problems and streamline user experiences.",
    tags: ["WordPress", "Shopify", "HTML/CSS", "Theme Customization"],
  },
  {
    dates: "2019",
    role: "Front-end Developer — Intern",
    company: "Ignitron Digitals",
    description:
      "Designed and developed multiple responsive web pages from scratch using HTML5, CSS3, and jQuery. Used Bootstrap to ensure consistency in layout and mobile responsiveness.",
    tags: ["HTML5", "CSS3", "jQuery", "Bootstrap"],
  },
];

const defaultStages = [
  "Intro",
  "Profile",
  "Skills",
  "Experience",
  "Automation",
  "Work",
  "Contact",
];
const upworkStages = [
  "Intro",
  "Profile",
  "Skills",
  "Experience",
  "Automation",
  "Work",
  "Upwork",
];
const upworkProfileUrl =
  "https://www.upwork.com/freelancers/~016ad4e77ce9131447";
const socialProfiles = [
  {
    label: "GitHub",
    icon: FaGithub,
    url: "https://github.com/darkapocalypse58",
  },
  {
    label: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/diaz-al/",
  },
  {
    label: "Behance",
    icon: FaBehance,
    url: "https://www.behance.net/adrianlewisdiaz",
  },
  {
    label: "Contra",
    icon: TbSparkles,
    url: "https://contra.com/adrian_lewis_diaz_2dlq1f3e",
  },
  { label: "Fiverr", icon: SiFiverr, url: "https://www.fiverr.com/ad_diaz" },
  { label: "Upwork", icon: SiUpwork, url: upworkProfileUrl },
  {
    label: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/profile.php?id=61595489998439",
  },
];

function SocialIcon({ profile }) {
  const Icon = profile.icon;
  return <Icon aria-hidden="true" focusable="false" />;
}
const careerStartYear = 2019;
const experienceYears = Math.max(0, new Date().getFullYear() - careerStartYear);

function withCurrentExperience(node) {
  if (typeof node === "string") {
    return node
      .replace(/six years\. seven roles\./gi, "Experience across platforms.")
      .replace(/one evolving practice\./gi, "Built through real work.")
      .replace(/six years/gi, `${experienceYears} years`)
      .replace(/6\+/g, `${experienceYears}+`);
  }
  if (Array.isArray(node))
    return React.Children.map(node, withCurrentExperience);
  if (React.isValidElement(node) && node.props.children) {
    return cloneElement(
      node,
      node.props,
      withCurrentExperience(node.props.children),
    );
  }
  return node;
}

function useHorizontalJourney(trackRef) {
  const current = useRef(0);
  const target = useRef(0);
  const frame = useRef(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const limit = useCallback(
    () =>
      Math.max(0, (trackRef.current?.scrollWidth ?? innerWidth) - innerWidth),
    [trackRef],
  );
  const render = useCallback(() => {
    const distance = target.current - current.current;
    current.current += distance * 0.085;
    if (Math.abs(distance) < 0.2) current.current = target.current;
    if (trackRef.current)
      trackRef.current.style.transform = `translate3d(${-current.current}px,0,0)`;
    const max = limit();
    setProgress(max ? current.current / max : 0);
    setActive(Math.round(current.current / innerWidth));
    if (Math.abs(distance) >= 0.2)
      frame.current = requestAnimationFrame(render);
    else frame.current = 0;
  }, [limit, trackRef]);

  const moveTo = useCallback(
    (value) => {
      target.current = Math.max(0, Math.min(limit(), value));
      if (!frame.current) frame.current = requestAnimationFrame(render);
    },
    [limit, render],
  );

  useEffect(() => {
    let settleTimer = 0;
    let gestureStartStage = null;
    let gestureDirection = 1;
    const onWheel = (event) => {
      if (window.matchMedia("(max-width: 900px)").matches) return;
      event.preventDefault();
      const rawDelta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      const delta =
        rawDelta *
        (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(delta) < 0.5) return;
      if (gestureStartStage === null)
        gestureStartStage = Math.round(target.current / innerWidth);
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
    const onKey = (event) => {
      const directions = {
        ArrowRight: 1,
        PageDown: 1,
        " ": 1,
        ArrowLeft: -1,
        PageUp: -1,
      };
      if (!directions[event.key]) return;
      event.preventDefault();
      moveTo(
        (Math.round(target.current / innerWidth) + directions[event.key]) *
          innerWidth,
      );
    };
    const onResize = () =>
      moveTo(Math.round(target.current / innerWidth) * innerWidth);
    document.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame.current);
      clearTimeout(settleTimer);
    };
  }, [moveTo]);

  return { progress, active, goTo: (index) => moveTo(index * innerWidth) };
}

function Stage({ id, eyebrow, title, children, className = "" }) {
  const cleanEyebrow = eyebrow.replace(/^\d+\s*\/\s*/, "");
  return (
    <section id={id} className={`stage ${className}`}>
      <div className="stage-inner">
        <p className="eyebrow">{cleanEyebrow}</p>
        <h2>{withCurrentExperience(title)}</h2>
        {withCurrentExperience(children)}
      </div>
    </section>
  );
}

function TypewriterHeadline({ active }) {
  const lines = [
    "Websites that work.",
    "Systems that help.",
    "Built with care.",
  ];
  const fullText = lines.join("\n");
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    setVisibleLength(0);
    let timer;
    const startTimer = window.setTimeout(() => {
      const typeNext = () => {
        setVisibleLength((length) => {
          if (length >= fullText.length) return length;
          timer = window.setTimeout(
            typeNext,
            fullText[length] === "\n" ? 190 : 58,
          );
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
  const [typedFirst = "", typedSecond = "", typedThird = ""] =
    visibleText.split("\n");

  return (
    <span className="typewriter">
      <span className="sr-only">{lines.join(" ")}</span>
      <span className="typewriter-measure" aria-hidden="true">
        Websites that work.
        <br />
        <em>Systems that help.</em>
        <br />
        Built with care.
      </span>
      <span className="typewriter-output" aria-hidden="true">
        {typedFirst}
        {visibleText.includes("\n") && <br />}
        <em>{typedSecond}</em>
        {visibleText.split("\n").length > 2 && <br />}
        {typedThird}
        <i className={visibleLength >= fullText.length ? "is-finished" : ""} />
      </span>
    </span>
  );
}

function App() {
  const isUpwork = window.location.pathname.startsWith("/upwork");
  const stages = isUpwork ? upworkStages : defaultStages;
  const trackRef = useRef(null);
  const glowRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [workPage, setWorkPage] = useState(0);
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Website project",
    message: "",
  });
  const [inquiryStatus, setInquiryStatus] = useState("");
  const [inquiryStatusType, setInquiryStatusType] = useState("idle");
  const [isInquirySending, setIsInquirySending] = useState(false);
  const workPageCount = Math.ceil(projects.length / projectsPerPage);
  const visibleProjects = projects.slice(
    workPage * projectsPerPage,
    (workPage + 1) * projectsPerPage,
  );
  const { progress, active, goTo } = useHorizontalJourney(trackRef);
  const submitInquiry = async (event) => {
    event.preventDefault();
    if (isInquirySending) return;

    const formData = new FormData(event.currentTarget);
    setIsInquirySending(true);
    setInquiryStatusType("sending");
    setInquiryStatus("Sending your inquiry...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "dd5620c1-0e17-4e7d-ad6a-f42831a9029d",
          subject: `${inquiry.projectType} inquiry from ${inquiry.name}`,
          from_name: "Ian Diaz Code Portfolio",
          name: inquiry.name,
          email: inquiry.email,
          company: inquiry.company || "Not provided",
          project_type: inquiry.projectType,
          message: inquiry.message,
          botcheck: formData.get("botcheck") || "",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The inquiry could not be sent.");
      }

      setInquiry({
        name: "",
        email: "",
        company: "",
        projectType: "Website project",
        message: "",
      });
      setInquiryStatusType("success");
      setInquiryStatus("Thanks. Your inquiry has been sent successfully.");
    } catch (error) {
      console.error("Inquiry submission failed:", error);
      setInquiryStatusType("error");
      setInquiryStatus("Something went wrong. Please try again in a moment.");
    } finally {
      setIsInquirySending(false);
    }
  };
  const navigateTo = useCallback(
    (index) => {
      if (window.matchMedia("(max-width: 900px)").matches) {
        document
          .getElementById(stages[index].toLowerCase())
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      goTo(index);
    },
    [goTo, stages],
  );

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1900);
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const pointer = { x: innerWidth * 0.5, y: innerHeight * 0.5 };
    const glow = { x: pointer.x, y: pointer.y };
    let animationFrame = 0;
    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      glowRef.current?.classList.add("is-visible");
    };
    const onPointerLeave = () =>
      glowRef.current?.classList.remove("is-visible");
    const animateGlow = () => {
      glow.x += (pointer.x - glow.x) * 0.14;
      glow.y += (pointer.y - glow.y) * 0.14;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${glow.x}px,${glow.y}px,0) translate(-50%,-50%)`;
      animationFrame = requestAnimationFrame(animateGlow);
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    animationFrame = requestAnimationFrame(animateGlow);
    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main className={`viewport ${isLoading ? "is-loading" : "is-ready"}`}>
      {isLoading && (
        <div
          className="preloader"
          role="status"
          aria-label="Loading Adrian Diaz portfolio"
        >
          <div className="preloader-grid" />
          <div className="preloader-copy">
            <span className="preloader-code">&lt;/&gt;</span>
            <h1>Adrian Diaz</h1>
            <p>Web Developer</p>
            <div className="preloader-line">
              <i />
            </div>
            <small>INITIALIZING PORTFOLIO</small>
          </div>
        </div>
      )}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="cursor-glow" ref={glowRef} />
      <div className="grain" />
      <div className="progress">
        <i style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className="nav">
        <button
          className="mark"
          onClick={() => navigateTo(0)}
          aria-label="Home"
        >
          <img src="/ad-logo-v5-diagonal.png" alt="Adrian Diaz logo" />
        </button>
        <div className="nav-center">
          {stages.slice(1).map((label, index) => {
            const stageIndex = index + 1;
            return (
              <button
                key={label}
                className={active === stageIndex ? "active" : ""}
                onClick={() => navigateTo(stageIndex)}
              >
                {label}
              </button>
            );
          })}
        </div>
        {isUpwork ? (
          <a href={upworkProfileUrl}>View on Upwork</a>
        ) : (
          <a href="mailto:hello@iandiazcode.com">Let’s talk</a>
        )}
      </nav>
      <div className="track" ref={trackRef}>
        <Stage
          id="intro"
          eyebrow="ADRIAN DIAZ · WEB DEVELOPER"
          title={<TypewriterHeadline active={!isLoading} />}
          className="hero console-hero"
        >
          <div className="hero-layout">
            <div>
              <p className="lead">
                Full-stack websites, commerce systems, and workflow automation
                engineered to stay reliable after launch.
              </p>
              <div className="hero-actions">
                <button className="cta" onClick={() => navigateTo(5)}>
                  Explore the work <span>→</span>
                </button>
                {!isUpwork && (
                  <button className="resume-cta" onClick={() => navigateTo(3)}>
                    View résumé
                  </button>
                )}
              </div>
              {isUpwork ? (
                <a
                  className="upwork-proof"
                  href={upworkProfileUrl}
                  aria-label="View Adrian Diaz's verified Upwork profile with 100% Job Success and Rising Talent status"
                >
                  <span>Verified profile</span>
                  <span>100% Job Success</span>
                  <span>Rising Talent</span>
                </a>
              ) : (
                <div className="quick-contact">
                  <small>FIND ME ONLINE</small>
                  <div>
                    {socialProfiles.map((profile) => (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={profile.label}
                        title={profile.label}
                        key={profile.label}
                      >
                        <SocialIcon profile={profile} />
                      </a>
                    ))}
                    <a
                      href="mailto:hello@iandiazcode.com"
                      aria-label="Email Adrian Diaz"
                      title="Email"
                    >
                      <TbMail aria-hidden="true" focusable="false" />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <aside
              className="capability-console"
              aria-label="Development capabilities"
            >
              <header>
                <span>ADRIAN_OS / CAPABILITIES</span>
                <span>
                  <i /> ONLINE
                </span>
              </header>
              <div className="console-lines">
                <p>
                  <b>&gt;</b>
                  <span>shopify</span>Custom Themes · Liquid · Apps
                </p>
                <p>
                  <b>&gt;</b>
                  <span>wordpress</span>Custom Builds · WooCommerce
                </p>
                <p>
                  <b>&gt;</b>
                  <span>frontend</span>React · Next.js · TypeScript
                </p>
                <p>
                  <b>&gt;</b>
                  <span>backend</span>Node.js · Supabase · REST APIs
                </p>
                <p>
                  <b>&gt;</b>
                  <span>platforms</span>CMS · LMS · Commerce · Stripe
                </p>
                <p>
                  <b>&gt;</b>
                  <span>workflow</span>Automation · Analytics · Support
                </p>
              </div>
              <small>
                SYSTEM READY — ACCEPTING NEW INPUT
                {isUpwork ? " THROUGH UPWORK" : ""}
              </small>
            </aside>
          </div>
        </Stage>
        <Stage
          id="profile"
          eyebrow="PROFILE"
          title={
            <>
              Full-stack delivery.
              <br />
              Platform-level depth.
            </>
          }
          className="profile-stage"
        >
          <div className="profile-grid">
            <article className="background-card">
              <small>BACKGROUND</small>
              <p>
                I’m Adrian Diaz, a web developer with six years of professional
                experience building, maintaining, and improving websites, online
                stores, learning platforms, and web applications.
              </p>
              <p>
                I combine polished interface work with the systems behind
                it—content management, APIs, databases, commerce, analytics,
                integrations, monitoring, and long-term support.
              </p>
              <div className="profile-stats">
                <span>
                  <strong>6+</strong> years
                </span>
                <span>
                  <strong>80+</strong> sites managed
                </span>
                <span>
                  <strong>4</strong> core platforms
                </span>
              </div>
            </article>
            <article className="toolkit-card">
              <small>CORE TOOLKIT</small>
              <div className="skill-groups">
                <section>
                  <h3>Frontend & UI</h3>
                  <p>
                    HTML5 · CSS3 · JavaScript · TypeScript · React · Next.js ·
                    Tailwind · Bootstrap · Responsive Design
                  </p>
                </section>
                <section>
                  <h3>Backend & Data</h3>
                  <p>
                    Node.js · Express.js · PHP · PostgreSQL · MySQL · MongoDB ·
                    Supabase · REST APIs
                  </p>
                </section>
                <section>
                  <h3>CMS & Commerce</h3>
                  <p>
                    WordPress · Shopify · Liquid · Customizer · Divi · Elementor
                    · Astra · WooCommerce · Masteriyo · Stripe
                  </p>
                </section>
                <section>
                  <h3>Tools & Delivery</h3>
                  <p>
                    Git · GitHub · Cloudflare Workers · GA4 · Search Console ·
                    MainWP · WPMU DEV · SEO · AI Integration
                  </p>
                </section>
              </div>
            </article>
          </div>
        </Stage>
        <Stage
          id="skills"
          eyebrow="02 / TECHNICAL TOOLKIT"
          title={<>Skills & Technologies</>}
          className="skills-stage"
        >
          <p className="skills-intro">
            A practical full-stack toolkit shaped by six years of building,
            maintaining, and improving websites, online stores, and web apps.
          </p>
          <div className="platform-row">
            {["WordPress", "Shopify", "React / Next.js", "Node.js"].map(
              (item) => (
                <strong key={item}>{item}</strong>
              ),
            )}
          </div>
          <div className="skills-board">
            <article>
              <header>
                <span>&lt;/&gt;</span>
                <div>
                  <h3>Frontend & UI</h3>
                  <p>
                    Responsive, accessible interfaces built for speed and
                    clarity.
                  </p>
                </div>
              </header>
              <div className="skill-pills">
                {[
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Tailwind CSS",
                  "Bootstrap",
                  "Responsive Design",
                  "Web Design",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
            <article>
              <header>
                <span>DB</span>
                <div>
                  <h3>Backend & Data</h3>
                  <p>
                    Reliable application logic, APIs, databases, and
                    integrations.
                  </p>
                </div>
              </header>
              <div className="skill-pills">
                {[
                  "Node.js",
                  "Express.js",
                  "PHP",
                  "PostgreSQL",
                  "MySQL",
                  "MongoDB",
                  "Supabase",
                  "REST APIs",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
            <article>
              <header>
                <span>CMS</span>
                <div>
                  <h3>CMS & Commerce</h3>
                  <p>
                    Flexible content and commerce systems clients can manage.
                  </p>
                </div>
              </header>
              <div className="skill-pills">
                {[
                  "WordPress",
                  "Shopify",
                  "Liquid",
                  "Shopify Customizer",
                  "Divi",
                  "Elementor",
                  "Astra",
                  "WooCommerce",
                  "Masteriyo LMS",
                  "Stripe",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
            <article>
              <header>
                <span>OPS</span>
                <div>
                  <h3>Tools & Delivery</h3>
                  <p>
                    The workflow, analytics, and operations behind every launch.
                  </p>
                </div>
              </header>
              <div className="skill-pills">
                {[
                  "Git",
                  "GitHub",
                  "Cloudflare Workers",
                  "GA4",
                  "Google Search Console",
                  "MainWP",
                  "WPMU DEV",
                  "SEO",
                  "AI Integration",
                  "Discord.js",
                  "Troubleshooting",
                ].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </Stage>
        <Stage
          id="experience"
          eyebrow="02 / EXPERIENCE"
          title={
            <>
              Six years. Seven roles.
              <br />
              One evolving practice.
            </>
          }
          className="experience-stage"
        >
          <div className="experience-board">
            <div className="experience-list">
              {experiences.map((item, index) => (
                <button
                  key={`${item.dates}-${item.company}`}
                  className={selectedExperience === index ? "selected" : ""}
                  onClick={() => setSelectedExperience(index)}
                >
                  <time>{item.dates}</time>
                  <span>{item.role}</span>
                  <small>{item.company}</small>
                </button>
              ))}
            </div>
            <article className="experience-detail">
              <div>
                <p className="eyebrow">
                  {experiences[selectedExperience].dates}
                </p>
                <h3>{experiences[selectedExperience].role}</h3>
                <h4>{experiences[selectedExperience].company}</h4>
                <p>{experiences[selectedExperience].description}</p>
              </div>
              <div className="experience-tags">
                {experiences[selectedExperience].tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          </div>
        </Stage>
        <Stage
          id="automation"
          eyebrow="03 / AUTOMATION"
          title={
            <>
              Automation built from
              <br />
              real operational work.
            </>
          }
          className="automation-stage"
        >
          <p className="automation-intro">
            Systems I’ve personally designed, implemented, and operated—from
            content pipelines to multi-site maintenance and platform
            integrations.
          </p>
          <div className="metrics">
            <article>
              <div className="auto-top">
                <strong>01</strong>
                <small>PRODUCTION PROJECT</small>
              </div>
              <h3>Technomalist Content Automation</h3>
              <p>
                Designed an automated newsroom pipeline that collects RSS
                stories, classifies and filters them, routes candidates through
                human editorial review, queues approved articles, and publishes
                them to the live site.
              </p>
              <div className="auto-tags">
                <span>RSS Ingestion</span>
                <span>Discord.js</span>
                <span>Cloudflare Workers</span>
              </div>
            </article>
            <article>
              <div className="auto-top">
                <strong>02</strong>
                <small>OPERATIONAL EXPERIENCE</small>
              </div>
              <h3>WordPress Fleet Operations</h3>
              <p>
                Managed large WordPress portfolios through centralized updates,
                backups, monitoring, troubleshooting, and issue triage—making
                repetitive maintenance safer and more consistent.
              </p>
              <div className="auto-tags">
                <span>MainWP</span>
                <span>WPMU DEV</span>
                <span>Monitoring</span>
              </div>
            </article>
            <article>
              <div className="auto-top">
                <strong>03</strong>
                <small>PLATFORM INTEGRATION</small>
              </div>
              <h3>LMS & Commerce Integrations</h3>
              <p>
                Connected WooCommerce, Stripe, and Masteriyo LMS for
                subscriptions, payments, individual enrolment, group cohorts,
                analytics, and structured course access.
              </p>
              <div className="auto-tags">
                <span>WooCommerce</span>
                <span>Stripe</span>
                <span>Masteriyo LMS</span>
              </div>
            </article>
          </div>
        </Stage>
        <Stage
          id="work"
          eyebrow="SELECTED WORK"
          title={
            <>
              See the work.
              <br />
              <em>Hover for the story.</em>
            </>
          }
          className="work-stage"
        >
          <div className="work-heading-note">
            Website previews first. Details appear only when you want them.
          </div>
          <div className="main-work-grid" key={workPage}>
            {visibleProjects.map((project) => (
              <a
                className="main-work-card"
                href={project.url}
                target="_blank"
                rel="noreferrer"
                key={project.name}
              >
                <img
                  src={project.image}
                  alt={`${project.name} homepage preview`}
                  style={
                    project.imagePosition
                      ? { objectPosition: project.imagePosition }
                      : undefined
                  }
                />
                <div className="main-work-label">
                  <small>{project.number}</small>
                  <strong>{project.name}</strong>
                  <span>Hover to explore</span>
                </div>
                <div className="main-work-overlay">
                  <small>{project.type}</small>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <footer>{project.stack}</footer>
                  <b>Visit website ↗</b>
                </div>
              </a>
            ))}
          </div>
          <nav className="work-pagination" aria-label="Portfolio pages">
            {Array.from({ length: workPageCount }, (_, page) => (
              <button
                type="button"
                key={page}
                className={workPage === page ? "active" : ""}
                onClick={() => setWorkPage(page)}
                aria-label={`Show portfolio page ${page + 1}`}
                aria-current={workPage === page ? "page" : undefined}
              >
                {String(page + 1).padStart(2, "0")}
              </button>
            ))}
          </nav>
        </Stage>
        {isUpwork ? (
          <Stage
            id="upwork"
            eyebrow="UPWORK"
            title={
              <>
                Have a useful idea?
                <br />
                <em>Let’s move it forward.</em>
              </>
            }
            className="upwork-contact-stage"
          >
            <p>
              Contact me through Upwork. Project communication, contracts, and
              payments will remain on the Upwork platform.
            </p>
            <a className="cta" href={upworkProfileUrl}>
              Message me on Upwork <span>→</span>
            </a>
          </Stage>
        ) : (
          <Stage
            id="contact"
            eyebrow="05 / CONTACT"
            title={
              <>
                Have a useful idea?
                <br />
                <em>Let’s move it forward.</em>
              </>
            }
            className="contact-stage"
          >
            <div className="contact-grid">
              <div className="contact-directory">
                <p className="contact-kicker">A SIMPLE START</p>
                <p className="contact-note">
                  Tell me what you are building, improving, or trying to make
                  easier. I will reply directly by email.
                </p>
                <ol className="contact-steps">
                  <li>
                    <span>01</span>
                    <div>
                      <strong>Share the basics</strong>
                      <p>Tell me what you need and where you are now.</p>
                    </div>
                  </li>
                  <li>
                    <span>02</span>
                    <div>
                      <strong>I review the fit</strong>
                      <p>You will get a practical reply, not a generic pitch.</p>
                    </div>
                  </li>
                  <li>
                    <span>03</span>
                    <div>
                      <strong>We plan the next step</strong>
                      <p>If it is a match, we can talk through the right approach.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <form className="inquiry-form" onSubmit={submitInquiry}>
                <label className="form-honeypot" aria-hidden="true">
                  Leave this field blank
                  <input name="botcheck" tabIndex="-1" autoComplete="off" />
                </label>
                <div className="inquiry-form-heading">
                  <span>PROJECT INQUIRY</span>
                  <small>Usually replies within one business day.</small>
                </div>
                <div className="inquiry-fields two-columns">
                  <label>
                    Your name
                    <input
                      required
                      value={inquiry.name}
                      onChange={(event) => setInquiry({ ...inquiry, name: event.target.value })}
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    Email address
                    <input
                      type="email"
                      required
                      value={inquiry.email}
                      onChange={(event) => setInquiry({ ...inquiry, email: event.target.value })}
                      autoComplete="email"
                    />
                  </label>
                </div>
                <div className="inquiry-fields two-columns">
                  <label>
                    Company <small>optional</small>
                    <input
                      value={inquiry.company}
                      onChange={(event) => setInquiry({ ...inquiry, company: event.target.value })}
                      autoComplete="organization"
                    />
                  </label>
                  <label>
                    What can I help with?
                    <select
                      value={inquiry.projectType}
                      onChange={(event) => setInquiry({ ...inquiry, projectType: event.target.value })}
                    >
                      <option>Website project</option>
                      <option>E-commerce or Shopify</option>
                      <option>WordPress support</option>
                      <option>Automation or integration</option>
                      <option>SEO or site improvement</option>
                      <option>Something else</option>
                    </select>
                  </label>
                </div>
                <label className="message-field">
                  A little about the project
                  <textarea
                    required
                    rows="4"
                    value={inquiry.message}
                    onChange={(event) => setInquiry({ ...inquiry, message: event.target.value })}
                    placeholder="Goals, timeline, current site, or anything useful to know."
                  />
                </label>
                <div className="inquiry-submit-row">
                  <button className="inquiry-submit" type="submit" disabled={isInquirySending}>
                    {isInquirySending ? "Sending..." : "Send inquiry"} <span>→</span>
                  </button>
                  <p className={`inquiry-status ${inquiryStatusType}`} role="status" aria-live="polite">
                    {inquiryStatus || "Your details will be delivered securely by email."}
                  </p>
                </div>
              </form>
            </div>
          </Stage>
        )}
      </div>
      <button
        className="scroll-guide"
        type="button"
        onClick={() => navigateTo(Math.min(active + 1, stages.length - 1))}
        aria-label="Go to the next section"
      >
        <span className="mouse">
          <i />
        </span>
        <span className="scroll-copy">
          <strong>Scroll down</strong>
          <small>to move right</small>
        </span>
        <b>→</b>
      </button>
      <footer>
        <span>{stages[Math.min(active, stages.length - 1)]}</span>
        <span>
          {String(Math.min(active + 1, stages.length)).padStart(2, "0")} /{" "}
          {stages.length}
        </span>
      </footer>
    </main>
  );
}

export default App;
