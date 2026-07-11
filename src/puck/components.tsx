import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type {
  AdvancedCareProps,
  CareStatementProps,
  ClinicalProps,
  CtaProps,
  FooterProps,
  HeroProps,
  IvAccordionProps,
  MarqueeProps,
  NavigationProps,
  PrpChapterProps,
  ServiceItem,
  ServiceOverviewProps,
} from "./types";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Benefits({ text }: { text: string }) {
  const benefits = text
    .split("\n")
    .map((benefit) => benefit.trim())
    .filter(Boolean);

  return (
    <ul className="benefit-list">
      {benefits.map((benefit) => (
        <li key={benefit}>{benefit}</li>
      ))}
    </ul>
  );
}

export function Navigation({
  visible,
  brandName,
  links,
  ctaLabel,
  ctaHref,
}: NavigationProps) {
  if (!visible) return <></>;

  return (
    <header className="site-nav-wrap">
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label={`${brandName} home`}>
          <span className="brand-dot" />
          {brandName}
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a href={link.href} key={`${link.label}-${link.href}`}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="button button-small button-light" href={ctaHref}>
          {ctaLabel}
          <Arrow />
        </a>
      </nav>
    </header>
  );
}

export function Hero({
  visible,
  eyebrow,
  headlineStart,
  headlineEnd,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  imageUrl,
  imageAlt,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".hero-copy > *", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
      });
      gsap.from(".hero-visual", {
        opacity: 0,
        scale: 0.9,
        y: 48,
        duration: 1.15,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  if (!visible) return <></>;

  return (
    <section className="hero section-dark" id="top" ref={sectionRef}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {headlineStart}{" "}
          <span
            className="inline-heading-image"
            role="img"
            aria-label={imageAlt}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />{" "}
          {headlineEnd}
        </h1>
        <p className="hero-description">{description}</p>
        <div className="hero-actions">
          <a className="button button-light" href={primaryHref}>
            {primaryLabel}
            <Arrow />
          </a>
          <a className="button button-ghost" href={secondaryHref}>
            {secondaryLabel}
          </a>
        </div>
      </div>
      <figure className="hero-visual image-hover">
        <img src={imageUrl} alt={imageAlt} />
        <figcaption>Personalized care. Considered protocols.</figcaption>
      </figure>
      <a className="scroll-cue" href="#services" aria-label="Scroll to services">
        Explore
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}

export function Marquee({ visible, items }: MarqueeProps) {
  if (!visible) return <></>;
  const repeated = [...items, ...items];

  return (
    <section className="marquee" aria-label="Treatment categories">
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {item.label}
            <i aria-hidden="true" />
          </span>
        ))}
      </div>
    </section>
  );
}

export function ServiceOverview({
  visible,
  heading,
  intro,
  cards,
}: ServiceOverviewProps) {
  if (!visible) return <></>;

  return (
    <section className="section section-light" id="services">
      <div className="section-heading split-heading">
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <div className="service-bento">
        {cards.map((card, index) => (
          <a
            className={`service-card service-card-${index + 1} tone-${card.tone}`}
            href={card.href}
            key={card.title}
          >
            <span className="service-count">{card.count}</span>
            <div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
            <Arrow />
          </a>
        ))}
      </div>
    </section>
  );
}

export function IvAccordion({
  visible,
  heading,
  intro,
  services,
}: IvAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!visible) return <></>;

  return (
    <section className="section section-dark iv-section" id="iv-therapy">
      <div className="section-heading split-heading">
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <div className="iv-accordion">
        {services.map((service, index) => {
          const active = index === activeIndex;
          return (
            <article className={`iv-panel ${active ? "is-active" : ""}`} key={service.title}>
              <button
                type="button"
                aria-expanded={active}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.title}</strong>
              </button>
              <div className="iv-panel-content" aria-hidden={!active}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Benefits text={service.benefits} />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function PrpChapter({
  visible,
  heading,
  intro,
  imageUrl,
  imageAlt,
  services,
}: PrpChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const media = gsap.matchMedia();
      media.add("(min-width: 1025px)", () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top+=80",
          end: "bottom bottom-=160",
          pin: headingRef.current,
          pinSpacing: false,
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  if (!visible) return <></>;

  return (
    <section className="section section-ivory prp-section" id="prp" ref={sectionRef}>
      <div className="prp-heading" ref={headingRef}>
        <p className="eyebrow eyebrow-dark">Regenerative care</p>
        <h2>{heading}</h2>
        <p>{intro}</p>
        <figure className="prp-image image-hover">
          <img src={imageUrl} alt={imageAlt} />
        </figure>
      </div>
      <div className="prp-list">
        {services.map((service, index) => (
          <article className="prp-card" key={service.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Benefits text={service.benefits} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function CareStatement({ visible, statement }: CareStatementProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const words = statement.split(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        ".care-word",
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.035,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            end: "bottom 58%",
            scrub: 1,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  if (!visible) return <></>;

  return (
    <section className="care-statement section-dark" ref={sectionRef}>
      <p>
        {words.map((word, index) => (
          <span className="care-word" key={`${word}-${index}`}>
            {word}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

function TreatmentColumn({ title, services }: { title: string; services: ServiceItem[] }) {
  return (
    <div className="treatment-column">
      <h3>{title}</h3>
      {services.map((service) => (
        <details key={service.title}>
          <summary>{service.title}</summary>
          <p>{service.description}</p>
          <Benefits text={service.benefits} />
        </details>
      ))}
    </div>
  );
}

export function AdvancedCare({
  visible,
  heading,
  intro,
  advancedServices,
  injectionServices,
  prolozone,
}: AdvancedCareProps) {
  if (!visible) return <></>;
  return (
    <section className="section section-steel" id="advanced-care">
      <div className="section-heading split-heading">
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <div className="treatment-grid">
        <TreatmentColumn title="Advanced IV treatments" services={advancedServices} />
        <TreatmentColumn title="Injections and support" services={injectionServices} />
        <TreatmentColumn title="Regenerative care" services={prolozone} />
      </div>
    </section>
  );
}

const clinicalPoints = [
  "Every treatment requires an appropriate medical assessment, individual screening, and provider authorization.",
  "Pregnancy, kidney or heart disease, diabetes, medication interactions, allergies, and suspected infection may change eligibility.",
  "Chest pain, difficulty breathing, altered mental status, severe headache, or persistent vomiting require urgent medical evaluation rather than wellness treatment.",
  "Services support hydration, recovery, and clinician-directed wellness goals. They are not presented as cures for infection, aging, chronic disease, or other medical conditions.",
];

export function Clinical({ heading, intro }: ClinicalProps) {
  return (
    <section className="clinical-section" id="clinical-guidance">
      <div>
        <p className="eyebrow eyebrow-dark">Before treatment</p>
        <h2>{heading}</h2>
        <p>{intro}</p>
      </div>
      <ul>
        {clinicalPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </section>
  );
}

export function Cta({
  visible,
  heading,
  description,
  ctaLabel,
  ctaHref,
}: CtaProps) {
  if (!visible) return <></>;
  return (
    <section className="cta-section" id="book">
      <div className="cta-orbit" aria-hidden="true" />
      <h2>{heading}</h2>
      <p>{description}</p>
      <a className="button button-dark" href={ctaHref}>
        {ctaLabel}
        <Arrow />
      </a>
    </section>
  );
}

export function Footer({
  visible,
  brandName,
  description,
  phone,
  email,
  address,
  hours,
  bookingLabel,
  bookingHref,
}: FooterProps) {
  if (!visible) return <></>;
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <a className="brand-mark" href="#top">
          <span className="brand-dot" />
          {brandName}
        </a>
        <p>{description}</p>
      </div>
      <div className="footer-column">
        <h3>Connect</h3>
        <a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>
        <a href={`mailto:${email}`}>{email}</a>
        <a href={bookingHref}>{bookingLabel}</a>
      </div>
      <div className="footer-column">
        <h3>Visit</h3>
        <p>{address}</p>
        <p>{hours}</p>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {brandName}</span>
        <span>Medical services require provider assessment.</span>
      </div>
    </footer>
  );
}
