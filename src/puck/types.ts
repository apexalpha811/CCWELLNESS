export type LinkItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  benefits: string;
};

export type OverviewItem = {
  title: string;
  description: string;
  count: string;
  href: string;
  tone: "dark" | "light" | "steel" | "accent";
};

export type NavigationProps = {
  visible: boolean;
  brandName: string;
  links: LinkItem[];
  ctaLabel: string;
  ctaHref: string;
  callLabel: string;
  callHref: string;
};

export type HeroProps = {
  visible: boolean;
  eyebrow: string;
  headlineStart: string;
  headlineEnd: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  imageUrl: string;
  imageAlt: string;
};

export type MarqueeProps = {
  visible: boolean;
  items: { label: string }[];
};

export type ServiceOverviewProps = {
  visible: boolean;
  heading: string;
  intro: string;
  cards: OverviewItem[];
};

export type IvAccordionProps = {
  visible: boolean;
  heading: string;
  intro: string;
  services: ServiceItem[];
};

export type PrpChapterProps = {
  visible: boolean;
  heading: string;
  intro: string;
  services: ServiceItem[];
};

export type CareStatementProps = {
  visible: boolean;
  statement: string;
};

export type AdvancedCareProps = {
  visible: boolean;
  heading: string;
  intro: string;
  advancedServices: ServiceItem[];
  injectionServices: ServiceItem[];
  prolozone: ServiceItem[];
};

export type ClinicalProps = {
  heading: string;
  intro: string;
};

export type CtaProps = {
  visible: boolean;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  callLabel: string;
  callHref: string;
};

export type FooterProps = {
  visible: boolean;
  brandName: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  bookingLabel: string;
  bookingHref: string;
};

export type PageComponents = {
  Navigation: NavigationProps;
  Hero: HeroProps;
  Marquee: MarqueeProps;
  ServiceOverview: ServiceOverviewProps;
  IvAccordion: IvAccordionProps;
  PrpChapter: PrpChapterProps;
  CareStatement: CareStatementProps;
  AdvancedCare: AdvancedCareProps;
  Clinical: ClinicalProps;
  Cta: CtaProps;
  Footer: FooterProps;
};
