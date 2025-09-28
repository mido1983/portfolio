export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: number;
  tags: string[];
  links: {
    repo?: string;
    demo?: string;
  };
  content: string;
};

export const projects: Project[] = [
  {

    slug: "codere-landing-engine",
    title: "Codere Landing Automation Engine",
    summary:
      "Marketing landing page generator that empowers growth teams to launch localized campaigns 30% faster.",
    year: 2024,
    tags: ["React", "Next.js", "Node.js", "MySQL"],
    links: {},
    content:
      "Architected a modular generator that assembles reusable React components, orchestrates data flows through Node.js services, and persists variations in MySQL. Added role-based workflows, live preview tooling, and performance monitoring to keep response times under 200 ms."
  },
  {
    slug: "codere-integration-suite",
    title: "Codere API Integration Suite",
    summary:
      "Unified REST API layer that synchronizes marketing, analytics, and operations data across business units.",
    year: 2023,
    tags: ["Node.js", "REST APIs", "TypeScript", "Monitoring"],
    links: {},
    content:
      "Consolidated fragmented services into a documented REST interface with automated validation, testing, and observability hooks. Leveraged AI-assisted code generation to accelerate implementation and established dashboards that highlight contract health and SLA adherence."
  },
  {
    slug: "primis-monetization-dashboard",
    title: "Primis Monetization Dashboard Refresh",
    summary:
      "Rebuilt partner-facing dashboards to improve usability, stability, and monetization insights for media publishers.",
    year: 2021,
    tags: ["PHP", "AngularJS", "JavaScript", "MySQL"],
    links: {},
    content:
      "Refined AngularJS modules, modernized PHP backend endpoints, and optimized MySQL queries to keep latency low under heavy usage. Rolled out UX enhancements validated with client feedback that increased engagement metrics and reduced support requests."
  },
  {
    slug: "init-commerce-launchpad",
    title: "Init Commerce Launchpad",
    summary:
      "Suite of custom WordPress and WooCommerce builds tailored for e-commerce marketing campaigns.",
    year: 2020,
    tags: ["WordPress", "WooCommerce", "PHP", "SEO"],
    links: {},
    content:
      "Delivered pixel-perfect storefronts with bespoke themes, automated product feeds, and third-party service integrations. Embedded SEO best practices, responsive layouts, and performance optimizations that lifted organic traffic and conversion rates."

  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
