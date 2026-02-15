import type { CaseStudy } from "@/types/case-study";

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "El Camino Skate Shop",
description: "User-centered design process for a fintech application",
    fullDescription:
      "A comprehensive exploration of user-centered design principles applied to modern fintech solutions.",
    coverImage: "/images/placeholder-1.jpg",
    year: "2023",
    tags: ["UX Design", "UI Design", "Research"],
    client: "FinTech Innovators Inc.",
    role: "Lead Product Designer",
    duration: "6 months",
    sections: [
      {
        type: "text",
        content:
          "Our challenge was to create an intuitive and accessible financial management platform that simplifies complex banking operations for users of all technical backgrounds.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-2.jpg",
          alt: "Dashboard interface mockup",
          caption: "Early dashboard interface mockups",
        },
        content:
          "Through extensive user research and iterative design, we developed a human-centered approach that prioritizes clarity and efficiency, while maintaining the robust functionality required for financial operations.",
        imagePosition: "right",
      },
      {
        type: "text",
        content:
          "The result was a 40% reduction in user task completion time and a 92% user satisfaction rate.",
        alignment: "left",
      },
    ],
    nextProject: "2",
    prevProject: "6",
    featured: true,
  },
  {
    id: "2",
    title: "Moxie Beauty Studio",
description: "Complete brand identity system for a tech startup",
    fullDescription:
      "A strategic brand development project that established a distinctive visual identity for an emerging technology company in the AI space.",
    coverImage: "/images/placeholder-2.jpg",
    year: "2023",
    tags: ["Branding", "Identity", "Strategy"],
    client: "AI Solutions Co.",
    role: "Brand Strategist & Designer",
    duration: "4 months",
    sections: [
      {
        type: "text",
        content:
          "Our goal was to develop a brand identity that communicates technical expertise while remaining approachable and trustworthy to potential clients.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-3.jpg",
          alt: "Brand identity exploration",
          caption: "Early brand identity exploration",
        },
        content:
          "We created a sophisticated yet friendly brand system that balances innovation with reliability through thoughtful use of color, typography, and imagery.",
        imagePosition: "left",
      },
    ],
    nextProject: "3",
    prevProject: "1",
    featured: false,
  },
  {
    id: "3",
    title: "Buddyhead",
description: "Full-stack development of a SaaS platform",
    fullDescription:
      "A comprehensive web application development project that transformed a complex business process into an intuitive SaaS solution.",
    coverImage: "/images/placeholder-3.jpg",
    year: "2023",
    tags: ["Development", "React", "Node.js"],
    client: "Enterprise Solutions Ltd.",
    role: "Lead Developer",
    duration: "8 months",
    sections: [
      {
        type: "text",
        content:
          "The challenge was to build a scalable and performant web application that handles complex data processing while maintaining a smooth user experience.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-4.jpg",
          alt: "Application interface",
          caption: "Main application dashboard",
        },
        content:
          "We implemented a modern tech stack with React and Node.js, utilizing efficient state management and caching strategies to optimize performance.",
        imagePosition: "right",
      },
    ],
    nextProject: "4",
    prevProject: "2",
    featured: true,
  },
  {
    id: "4",
    title: "Denver Digital Agency",
description: "Modern e-commerce solution with headless architecture",
    fullDescription:
      "A cutting-edge e-commerce platform built with a headless architecture, offering seamless shopping experiences across multiple channels and devices.",
    coverImage: "/images/placeholder-4.jpg",
    year: "2023",
    tags: ["E-commerce", "Next.js", "Shopify"],
    sections: [
      {
        type: "text",
        content:
          "We needed to create a high-performance e-commerce platform that maintains fast page loads while handling complex product configurations and high traffic.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-1.jpg",
          alt: "E-commerce interface",
          caption: "Mobile-first shopping experience",
        },
        content:
          "The solution was a headless architecture using Next.js and Shopify's Storefront API, with advanced caching and optimization strategies.",
        imagePosition: "left",
      },
    ],
    nextProject: "5",
    prevProject: "3",
    featured: false,
  },
  {
    id: "5",
    title: "Project Wylie Dog",
description: "Health and wellness tracking application",
    fullDescription:
      "A comprehensive mobile application designed to help users track their health and wellness goals through an intuitive and engaging interface.",
    coverImage: "/images/placeholder-1.jpg",
    year: "2024",
    tags: ["Mobile Design", "UI/UX", "Health Tech"],
    sections: [
      {
        type: "text",
        content:
          "The challenge was to design an engaging and intuitive mobile experience that encourages daily user engagement while handling complex health data visualization.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-2.jpg",
          alt: "Mobile app interface",
          caption: "Main tracking dashboard",
        },
        content:
          "We created a minimalist yet powerful interface with gamification elements and clear data visualization to encourage regular app usage.",
        imagePosition: "right",
      },
    ],
    nextProject: "6",
    prevProject: "4",
    featured: true,
  },
  {
    id: "6",
    title: "Not-a-Robot",
description: "Enterprise analytics platform with AI capabilities",
    fullDescription:
      "An advanced analytics platform that leverages artificial intelligence to provide actionable insights from complex business data.",
    coverImage: "/images/placeholder-2.jpg",
    year: "2024",
    tags: ["AI/ML", "Data Visualization", "Enterprise"],
    sections: [
      {
        type: "text",
        content:
          "We needed to create an intuitive interface for complex AI-driven analytics that makes advanced insights accessible to non-technical users.",
        alignment: "center",
      },
      {
        type: "image-text",
        image: {
          url: "/images/placeholder-3.jpg",
          alt: "Analytics dashboard",
          caption: "AI-powered insights dashboard",
        },
        content:
          "The solution was a modular design system with progressive disclosure of complexity, making advanced analytics accessible while maintaining depth.",
        imagePosition: "left",
      },
    ],
    nextProject: "1",
    prevProject: "5",
    featured: false,
  },
];

export async function getCaseStudy(id: string): Promise<CaseStudy | undefined> {
  return Promise.resolve(caseStudies.find((study) => study.id === id));
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return Promise.resolve(caseStudies);
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return Promise.resolve(caseStudies.filter((study) => study.featured));
}
