import type { Config } from "@puckeditor/core";
import {
  AdvancedCare,
  CareStatement,
  Clinical,
  Cta,
  Footer,
  Hero,
  IvAccordion,
  Marquee,
  Navigation,
  PrpChapter,
  ServiceOverview,
} from "./components";
import type { PageComponents } from "./types";

const visibilityField = {
  visible: {
    type: "radio" as const,
    label: "Section visibility",
    options: [
      { label: "Visible", value: true },
      { label: "Hidden", value: false },
    ],
  },
};

const serviceArrayField = {
  type: "array" as const,
  label: "Treatments",
  arrayFields: {
    title: { type: "text" as const, label: "Treatment name" },
    description: { type: "textarea" as const, label: "Description" },
    benefits: {
      type: "textarea" as const,
      label: "Benefits, one per line",
    },
  },
  getItemSummary: (item: { title?: string }) => item.title || "Treatment",
};

export const pageConfig: Config<PageComponents> = {
  categories: {
    structure: {
      title: "Page structure",
      components: ["Navigation", "Hero", "Marquee", "ServiceOverview", "Cta", "Footer"],
    },
    treatments: {
      title: "Treatment content",
      components: ["IvAccordion", "PrpChapter", "AdvancedCare", "Clinical"],
    },
    narrative: {
      title: "Narrative",
      components: ["CareStatement"],
    },
  },
  components: {
    Navigation: {
      label: "Navigation",
      fields: {
        ...visibilityField,
        brandName: { type: "text", label: "Brand name" },
        links: {
          type: "array",
          label: "Navigation links",
          arrayFields: {
            label: { type: "text", label: "Label" },
            href: { type: "text", label: "Link" },
          },
          getItemSummary: (item) => item.label || "Link",
        },
        ctaLabel: { type: "text", label: "Booking label" },
        ctaHref: { type: "text", label: "Booking link" },
        callLabel: { type: "text", label: "Call label" },
        callHref: { type: "text", label: "Call link" },
      },
      defaultProps: {
        visible: true,
        brandName: "Culver City Wellness",
        links: [
          { label: "IV Therapy", href: "#iv-therapy" },
          { label: "PRP", href: "#prp" },
          { label: "Advanced Care", href: "#advanced-care" },
        ],
        ctaLabel: "Book a consultation",
        ctaHref: "#book",
        callLabel: "Call now",
        callHref: "tel:310-837-8808",
      },
      render: Navigation,
    },
    Hero: {
      label: "Hero",
      fields: {
        ...visibilityField,
        eyebrow: { type: "text", label: "Eyebrow" },
        headlineStart: { type: "text", label: "Headline before image" },
        headlineEnd: { type: "text", label: "Headline after image" },
        description: { type: "textarea", label: "Description" },
        primaryLabel: { type: "text", label: "Primary button" },
        primaryHref: { type: "text", label: "Primary link" },
        secondaryLabel: { type: "text", label: "Secondary button" },
        secondaryHref: { type: "text", label: "Secondary link" },
        imageUrl: { type: "text", label: "Image URL" },
        imageAlt: { type: "text", label: "Image alt text" },
      },
      defaultProps: {
        visible: true,
        eyebrow: "Physician-directed wellness",
        headlineStart: "Precision care for",
        headlineEnd: "how you recover.",
        description: "Personalized IV therapy and regenerative care, planned around your goals.",
        primaryLabel: "Book a consultation",
        primaryHref: "#book",
        secondaryLabel: "Explore treatments",
        secondaryHref: "#services",
        imageUrl: "https://images.pexels.com/photos/3952241/pexels-photo-3952241.jpeg?auto=compress&cs=tinysrgb&w=1600",
        imageAlt: "A gloved clinician preparing a treatment vial",
      },
      render: Hero,
    },
    Marquee: {
      label: "Treatment marquee",
      fields: {
        ...visibilityField,
        items: {
          type: "array",
          label: "Marquee items",
          arrayFields: {
            label: { type: "text", label: "Label" },
          },
          getItemSummary: (item) => item.label || "Item",
        },
      },
      defaultProps: {
        visible: true,
        items: [
          { label: "IV Therapy" },
          { label: "PRP" },
          { label: "Injections" },
          { label: "Advanced Care" },
        ],
      },
      render: Marquee,
    },
    ServiceOverview: {
      label: "Service overview",
      fields: {
        ...visibilityField,
        heading: { type: "text", label: "Heading" },
        intro: { type: "textarea", label: "Introduction" },
        cards: {
          type: "array",
          label: "Service cards",
          arrayFields: {
            title: { type: "text", label: "Title" },
            description: { type: "textarea", label: "Description" },
            count: { type: "text", label: "Service count" },
            href: { type: "text", label: "Link" },
            tone: {
              type: "select",
              label: "Color treatment",
              options: [
                { label: "Dark", value: "dark" },
                { label: "Light", value: "light" },
                { label: "Steel", value: "steel" },
                { label: "Accent", value: "accent" },
              ],
            },
          },
          getItemSummary: (item) => item.title || "Service family",
          max: 5,
        },
      },
      defaultProps: {
        visible: true,
        heading: "Care that meets you where you are.",
        intro: "Explore hydration, nutrient support, and regenerative protocols tailored through clinical assessment.",
        cards: [],
      },
      render: ServiceOverview,
    },
    IvAccordion: {
      label: "IV treatment accordion",
      fields: {
        ...visibilityField,
        heading: { type: "text", label: "Heading" },
        intro: { type: "textarea", label: "Introduction" },
        services: serviceArrayField,
      },
      defaultProps: {
        visible: true,
        heading: "A considered IV menu.",
        intro: "Each infusion begins with appropriate screening and is tailored to your clinical needs.",
        services: [],
      },
      render: IvAccordion,
    },
    PrpChapter: {
      label: "PRP chapter",
      fields: {
        ...visibilityField,
        heading: { type: "text", label: "Heading" },
        intro: { type: "textarea", label: "Introduction" },
        services: serviceArrayField,
      },
      defaultProps: {
        visible: true,
        heading: "Regenerative care, directed with precision.",
        intro: "PRP protocols use a concentrated preparation derived from your own blood and are tailored to your goals and anatomy.",
        services: [],
      },
      render: PrpChapter,
    },
    CareStatement: {
      label: "Animated care statement",
      fields: {
        ...visibilityField,
        statement: { type: "textarea", label: "Statement" },
      },
      defaultProps: {
        visible: true,
        statement: "The strongest protocol is not the most complicated one. It is the one selected for your history, goals, and current needs.",
      },
      render: CareStatement,
    },
    AdvancedCare: {
      label: "Advanced care catalog",
      fields: {
        ...visibilityField,
        heading: { type: "text", label: "Heading" },
        intro: { type: "textarea", label: "Introduction" },
        advancedServices: { ...serviceArrayField, label: "Advanced IV treatments" },
        injectionServices: { ...serviceArrayField, label: "Injections and support" },
        prolozone: { ...serviceArrayField, label: "Additional regenerative care" },
      },
      defaultProps: {
        visible: true,
        heading: "Advanced options. Clear clinical guardrails.",
        intro: "Specialized services require individual assessment, appropriate screening, and provider direction.",
        advancedServices: [],
        injectionServices: [],
        prolozone: [],
      },
      render: AdvancedCare,
    },
    Clinical: {
      label: "Clinical guidance",
      fields: {
        heading: { type: "text", label: "Heading" },
        intro: { type: "textarea", label: "Introduction" },
      },
      defaultProps: {
        heading: "Good care starts with good screening.",
        intro: "Your provider reviews your history, medications, symptoms, and goals before recommending a service. Essential qualification language in this section is intentionally locked.",
      },
      render: Clinical,
    },
    Cta: {
      label: "Booking call to action",
      fields: {
        ...visibilityField,
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
        ctaLabel: { type: "text", label: "Button label" },
        ctaHref: { type: "text", label: "Button link" },
        callLabel: { type: "text", label: "Call label" },
        callHref: { type: "text", label: "Call link" },
      },
      defaultProps: {
        visible: true,
        heading: "Begin with a conversation.",
        description: "Tell us what you are working toward. We will help you identify the most appropriate next step.",
        ctaLabel: "Request a consultation",
        ctaHref: "#",
        callLabel: "Call now",
        callHref: "tel:310-837-8808",
      },
      render: Cta,
    },
    Footer: {
      label: "Footer",
      fields: {
        ...visibilityField,
        brandName: { type: "text", label: "Brand name" },
        description: { type: "textarea", label: "Description" },
        phone: { type: "text", label: "Phone" },
        email: { type: "text", label: "Email" },
        address: { type: "textarea", label: "Address" },
        hours: { type: "textarea", label: "Hours" },
        bookingLabel: { type: "text", label: "Booking label" },
        bookingHref: { type: "text", label: "Booking link" },
      },
      defaultProps: {
        visible: true,
        brandName: "Culver City Wellness",
        description: "Physician-directed IV therapy, injections, PRP, and regenerative care.",
        phone: "310-837-8808",
        email: "culvercitywellness@gmail.com",
        address: "3831 Hughes Ave, Suite 702, Culver City, CA 90232",
        hours: "Hours by appointment",
        bookingLabel: "Call now",
        bookingHref: "tel:310-837-8808",
      },
      render: Footer,
    },
  },
};