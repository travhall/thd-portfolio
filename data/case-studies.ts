import type { CaseStudy } from "@/types/case-study";

const caseStudies: CaseStudy[] = [
  {
    id: "project-wylie-dog",
    title: "Project Wylie Dog",
    description:
      "An enterprise-grade design system built on OKLCH color science, a three-tier token architecture, and 42 fully-tested React components.",
    fullDescription:
      "A production-ready design system and component library engineered from the ground up — combining next-generation color science, W3C-compliant design tokens, a Figma plugin for design-to-code synchronization, and comprehensive Storybook documentation.",
    coverImage: "/images/screenshot-wyliedog.png",
    year: "2024",
    tags: ["Design Systems", "React", "TypeScript", "Tailwind CSS", "Storybook"],
    role: "Design System Architect & Lead Engineer",
    duration: "Ongoing",
    sections: [
      {
        type: "lede",
        content:
          "Most design systems start with components. This one started with color. The core challenge was building a system that could scale across teams, enforce consistency without constraining creativity, and remain genuinely maintainable as both the design and codebase evolved. That meant solving the token problem first — not as an afterthought, but as the structural foundation everything else would be built on.",
      },
      {
        type: "image-text",
        image: {
          url: "/images/screenshot-wyliedog.png",
          alt: "Wylie Dog design system Storybook documentation showing component library overview",
          caption: "Interactive component documentation in Storybook",
        },
        content:
          "The system is structured as a Turborepo monorepo with three core packages: a token pipeline, a React component library, and a Figma plugin. Turborepo's task graph ensures tokens are always compiled before components build, and Storybook only runs against verified artifacts — enforcing correctness at every layer of the pipeline. Build times stay under one second thanks to intelligent caching across the workspace.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "The token architecture follows a strict three-tier hierarchy: primitive values (275+ raw OKLCH color steps, spacing, and typography scales), semantic mappings (background-primary, text-danger, border-focus), and component-level tokens (button-primary-background, input-border-hover). Each tier is processed by Style Dictionary into CSS custom properties, TypeScript constants, and JSON — all from a single W3C DTCG-compliant source. OKLCH was chosen over HSL or RGB for its perceptual uniformity: equal numeric steps in lightness actually look equal to the human eye, which makes building accessible, predictable color ramps dramatically more reliable. The result is 12 full color palettes and a semantic layer that handles both light and dark mode without duplicating values.",
        alignment: "left",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-wylie-components.jpg",
          alt: "Component variants and states across the Wylie Dog component library",
          caption: "42 components with full variant and state coverage",
        },
        content:
          "The component library ships 42 React components built on Radix UI primitives, each with its own export path for tree-shaking, full TypeScript types, and a co-located Storybook story. Test coverage sits at 95.41% via Vitest and @testing-library/react, with axe-core integrated into the test suite to catch accessibility regressions automatically. The Figma plugin — Token Bridge — closes the design-to-code loop by syncing token values bidirectionally between the Figma variables panel and the repository, with conflict detection and a change preview UI built in Preact.",
        imagePosition: "left",
      },
      {
        type: "text",
        content:
          "The system has been externally assessed as a top-5% design token implementation. Bundle sizes run at 14–44% of enforced limits, enforced via size-limit in CI. The OKLCH approach is approximately two to three years ahead of mainstream adoption — making this as much a reference implementation and proof of concept as it is production infrastructure. The biggest lesson: the constraints you put on yourself upfront (W3C compliance, strict token naming, CI quality gates) are what let you move fast later without accumulating design debt.",
        alignment: "left",
      },
    ],
    featured: true,
  },
  {
    id: "el-camino-skate-shop",
    title: "El Camino Skate Shop",
    description:
      "A full-stack e-commerce storefront for a skater-owned shop in Eau Claire, WI — built on Astro, Square, and Netlify with real-time inventory and a persistent cart.",
    fullDescription:
      "A production e-commerce platform purpose-built for a local skate shop, combining Square's catalog and payment APIs with Astro's SSR capabilities and Netlify's edge infrastructure to deliver a fast, reliable shopping experience.",
    coverImage: "/images/placeholder-elcamino.jpg",
    year: "2024",
    tags: ["Astro", "TypeScript", "Tailwind CSS", "Square API", "Netlify"],
    client: "El Camino Skate Shop",
    role: "Lead Engineer & Designer",
    duration: "Ongoing",
    links: [
      { href: "https://elcaminoskateshop.com", label: "Visit El Camino" },
    ],
    sections: [
      {
        type: "lede",
        content:
          "El Camino is a skater-owned shop in Eau Claire, WI that needed more than a template storefront — they needed a platform that could reflect their identity and keep pace with real inventory, real customers, and real transactions. The challenge was building something genuinely production-ready: Square-integrated catalog sync, live inventory validation, a persistent cart that survives navigation, and a checkout flow that doesn't add friction between a customer and their next deck.",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-elcamino-catalog.jpg",
          alt: "El Camino product catalog showing skateboards, trucks, and accessories with brand filtering",
          caption: "Product catalog with real-time Square inventory sync",
        },
        content:
          "The catalog is driven entirely by Square's Items API, pulling live product data, pricing, and per-variation inventory at build time and revalidating via Netlify Blobs — a distributed caching layer that cuts API round-trips without staling data. Products support complex variation trees (size, color, brand), real-time in-stock and sold-out states, sale pricing with discount badges, and a QuickView modal for rapid browsing without leaving the current page. Brand-based filtering is computed from catalog metadata, not hardcoded — so it updates automatically as inventory changes.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "The cart is managed by a singleton CartManager class that persists state across Astro's View Transitions navigation — a deliberate decision to preserve the SPA-like feel while keeping SSR for performance and SEO. CartManager handles quantity updates, inventory re-validation on add, and graceful recovery when items sell out mid-session. Checkout hands off to Square's Payment Links API, keeping PCI scope off the application entirely. The architecture deliberately avoids client-side re-renders for catalog content, leaning on server-rendered HTML for first load and progressive enhancement for interactive state like filters and the cart drawer.",
        alignment: "left",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-elcamino-product.jpg",
          alt: "El Camino product detail page showing variation selection and add to cart flow",
          caption: "Product detail page with variation selection and cart integration",
        },
        content:
          "The codebase enforces quality at every layer: TypeScript strict mode with zero errors across 83 files, Vitest unit tests with an 80% coverage threshold, and Playwright end-to-end tests covering the full cart and checkout flow across browsers and devices. A performance monitoring module tracks Core Web Vitals and enforces budget thresholds in CI, with an admin dashboard surfacing regression data. Image delivery runs through a custom pipeline with AVIF and WebP format detection, blur-up placeholders, and sharp-powered optimization. The result is a sub-3-second build, consistently green Web Vitals, and a storefront that feels as considered as the shop itself.",
        imagePosition: "left",
      },
    ],
    featured: true,
  },
  {
    id: "moxie-beauty-studio",
    title: "Moxie Beauty Studio",
    description:
      "A bespoke marketing site for a solo lash and brow studio in Wisconsin — built on Next.js with a handcrafted design system, Square Appointments integration, and scroll-driven animations.",
    fullDescription:
      "A full-stack web presence for Moxie Beauty Studio, a solo practice specializing in lash extensions, microblading, and brow services — designed and engineered from scratch to match the studio's refined, personal aesthetic.",
    coverImage: "/images/placeholder-moxie.jpg",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Design Systems"],
    client: "Moxie Beauty Studio",
    role: "Designer & Engineer",
    duration: "Ongoing",
    links: [
      { href: "https://moxiebeautystudio.com", label: "Visit Moxie" },
    ],
    sections: [
      {
        type: "lede",
        content:
          "Moxie Beauty Studio is a solo practice — one artist, a carefully curated menu of services, and a clientele that values the personal touch. The site needed to carry that same energy: warm without being generic, polished without feeling corporate. The brief was essentially to build a luxury small-business web presence that didn't look like a template — one that could hold its own visually while still converting visitors into booked appointments.",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-moxie-services.jpg",
          alt: "Moxie Beauty Studio services section showing the service grid with hover overlays",
          caption: "Services grid with modal detail overlays",
        },
        content:
          "The design system is built from scratch on top of Tailwind CSS v4 with a custom OKLCH color palette — Ivory Rose, Rose Gold, and Midnight — paired with two typefaces: Mulish for body copy and the custom-licensed Nyght Serif (in both Light and Dark optical variants) for display headings. The result is a typographic hierarchy that feels editorial rather than functional. The services section uses a responsive CSS Grid with named areas that reshapes across breakpoints — a single-column stack on mobile, a two-column layout on tablet, and a six-column asymmetric grid on desktop — with service cards that expand into a full-detail modal overlay on interaction.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "Booking is handled through an embedded Square Appointments iframe surfaced inside a full-screen modal overlay. Rather than just dropping in the iframe, the implementation manages loading and error states, traps focus within the overlay for keyboard accessibility, locks body scroll while open, and restores focus to the trigger element on close. It behaves like a first-party modal despite being a third-party embed. Scroll-driven animations use a custom `useFadeInOnScroll` hook backed by IntersectionObserver — staggered reveal sequences on section entry without the overhead of a full animation library for static content. The Motion library is reserved for interactive UI elements like the navigation active indicator, which tracks the current section with spring physics.",
        alignment: "left",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-moxie-about.jpg",
          alt: "Moxie Beauty Studio about section featuring owner Jackie Schult",
          caption: "About section — personal, editorial layout",
        },
        content:
          "Navigation is sticky with a scroll progress bar and an animated section indicator that moves between anchors as the user scrolls — using IntersectionObserver to determine the active section rather than scroll position math, which keeps it accurate near section boundaries. The site is fully typed in TypeScript strict mode, deployed on Vercel with Vercel Analytics for real user monitoring, and includes a living style guide page for design system reference. Light and dark modes are supported via `next-themes` with system preference detection and localStorage persistence.",
        imagePosition: "left",
      },
    ],
    featured: true,
  },
  {
    id: "travishall-dot-design",
    title: "travishall.design",
    description:
      "A self-directed design and engineering project — building my own portfolio as a live laboratory for Tailwind v4, Framer Motion, and a handcrafted design system.",
    fullDescription:
      "A personal portfolio site designed and engineered from scratch — used as a living testbed for modern front-end techniques including Tailwind CSS v4's @theme token system, scroll-linked animations, and a fully custom design system without a component library.",
    coverImage: "/images/placeholder-portfolio.jpg",
    year: "2025",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    role: "Designer & Developer",
    duration: "Ongoing",
    links: [
      { href: "https://travishall.design", label: "You're looking at it" },
    ],
    sections: [
      {
        type: "lede",
        content:
          "A portfolio is a strange project — it has to do the job of showcasing work while being work itself. The brief I set for myself was to build something that reflected how I actually think about front-end: obsessive about tokens, deliberate about motion, fluent in the full stack from CSS architecture to component API design. No pre-built component libraries (beyond Radix UI primitives for accessibility), no off-the-shelf templates. Just a considered system built up from first principles, used as a live testing ground for techniques I'd been wanting to push further.",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-portfolio-design.jpg",
          alt: "Portfolio design system — token hierarchy, color palette, and component anatomy",
          caption: "Design system — OKLCH palette, token hierarchy, and component anatomy",
        },
        content:
          "The design system is built entirely inside Tailwind CSS v4's @theme block — the full color palette in OKLCH, semantic color aliases, custom easing curves, duration steps, blur utilities, and font aliases all defined as design tokens that become both CSS custom properties and Tailwind utilities simultaneously. This eliminates the traditional split between tokens and utilities: there's a single source of truth, and it generates everything downstream. A separate @layer base :root handles component-specific tokens (nav, card, case study) and runtime values like glass surfaces that need color-mix() — keeping the distinction between theme-time and runtime values explicit.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "Motion is handled with Framer Motion and Lenis for smooth scroll. The work list uses an AnimatePresence-driven hover interaction where the section heading swaps between 'Case studies' and 'Return to index' with a staggered exit/enter sequence. Case study pages feature scroll-linked blur and opacity animations driven by useScroll and useTransform, creating a depth effect on the hero as the user reads down. All animation variants are defined at module scope where possible — keeping components clean — with the exception of stateful variants that depend on runtime values. A MotionConfig wrapper enforces reduced-motion preferences globally rather than per-component.",
        alignment: "left",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-portfolio-case-study.jpg",
          alt: "Portfolio case study page showing scroll-linked hero animation and section layout",
          caption: "Case study layout — scroll-linked hero, section containers, tag system",
        },
        content:
          "Case studies are authored entirely in a typed data layer (data/case-studies.ts) with a discriminated union section type — text sections and image-text sections with configurable alignment and image position. The renderer is a single dynamic component that maps section types to layouts, keeping the authoring interface simple while the presentation layer handles all the visual complexity. The nav uses a Radix UI Collapsible on mobile and a custom hover-triggered drawer on desktop, with component tokens isolating nav-specific values from the global system. The style guide page documents the full design system live in the browser — palette swatches, type scale, motion tokens, and component states.",
        imagePosition: "left",
      },
    ],
    featured: false,
  },
  {
    id: "buddyhead",
    title: "Buddyhead",
    description:
      "A full redesign of the legendary punk and indie music publication — a multi-section editorial platform for news, reviews, a zine, and record label, built on Next.js and WordPress.",
    fullDescription:
      "A ground-up redesign and front-end build for Buddyhead, one of the original voices of early 2000s music internet — bringing the publication into the modern web while preserving the irreverent, no-rules energy that made it iconic.",
    coverImage: "/images/placeholder-buddyhead.jpg",
    year: "2024",
    tags: ["Next.js", "WordPress", "TypeScript", "Tailwind CSS", "Design"],
    client: "Buddyhead",
    role: "Designer & Front-End Engineer",
    duration: "Ongoing",
    links: [
      { href: "https://buddyhead.com", label: "Visit Buddyhead" },
    ],
    sections: [
      {
        type: "lede",
        content:
          "Buddyhead has been a fixture of punk, indie, and underground music culture since 1996 — founded by Travis Keller in Los Angeles, it was one of the first outlets to publish brutally honest music criticism and celebrity gossip on the early internet, and it's been going ever since. The redesign brief was deceptively simple: make it look like now without making it look like everything else. The site needed to support an active editorial operation — news, music reviews, a zine section, a record label roster, and a newsletter — while keeping the raw, irreverent tone that's always defined it. No corporate polish. No template energy. Just a fast, accessible, well-built site that gets out of the content's way.",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-buddyhead-home.jpg",
          alt: "Buddyhead homepage showing multi-section content grid with News, Reviews, Zine, and Label columns",
          caption: "Homepage — multi-section editorial grid",
        },
        content:
          "The design leans into high contrast and editorial density — a dark-first aesthetic with a tight typographic system, heavy use of monospace and grotesque type, and a content grid that surfaces four distinct content streams (News/Gossip, Reviews, Zine, Label) on the homepage simultaneously without feeling cluttered. The homepage layout is deliberately newspaper-like: section headers act as navigational anchors, recent articles stack beneath each, and a hero slot highlights a featured piece with a YouTube embed. The Figma prototype captured the full intended design; the live site reflects the design with some evolution since launch.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "The front end is built on Next.js with TypeScript, using WordPress as a headless CMS via the WP REST API. Content types — posts, reviews, zine articles, artists — are mapped to typed interfaces and fetched server-side, keeping the front end fully static where possible and falling back to ISR for frequently updated sections. The reviews section features a pinned post system and category tagging (Record Reviews, etc.) with metadata-driven timestamps and contributor bylines. The W. Axl Rose rating system — a Buddyhead tradition — is implemented as a custom field surfaced via the REST API and rendered as a reusable component. Dark and light modes are supported via a theme toggle with localStorage persistence.",
        alignment: "left",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-buddyhead-review.jpg",
          alt: "Buddyhead record review article page showing the W. Axl Rose rating system and editorial layout",
          caption: "Review article — custom rating system and editorial typography",
        },
        content:
          "The breadcrumb navigation, scroll-aware header, and newsletter signup in the footer are all handled as lightweight client components to preserve SSR performance elsewhere. The site includes a dedicated LA Fires resource page — a community mutual aid hub added in response to the 2025 wildfires — which reflects how the CMS-driven architecture allows rapid new content types to be stood up without touching the application layer. The Figma designs for the original prototype are available as a reference for the intended design direction.",
        imagePosition: "left",
      },
    ],
    featured: true,
  },
];

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.id === id);
}

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return caseStudies.filter((study) => study.featured);
}

// Navigation wraps around — the last study links back to the first and vice versa,
// creating a continuous loop through the case study sequence.
export function getAdjacentCaseStudies(id: string): {
  prevStudy: CaseStudy | undefined;
  nextStudy: CaseStudy | undefined;
} {
  const index = caseStudies.findIndex((study) => study.id === id);
  if (index === -1) return { prevStudy: undefined, nextStudy: undefined };
  return {
    prevStudy: index > 0 ? caseStudies[index - 1] : caseStudies[caseStudies.length - 1],
    nextStudy: index < caseStudies.length - 1 ? caseStudies[index + 1] : caseStudies[0],
  };
}
