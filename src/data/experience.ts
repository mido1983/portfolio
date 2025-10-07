export type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
};

export const experiences: Experience[] = [
{
  company: "Freelance",
  role: "Full Stack Developer & Consultant",
  period: "Jan 2014 - Present",
  description:
    "Delivering end-to-end web & e-commerce solutions from zero to production for startups and SMBs — from discovery and UX to development, launch, and ops — aligning tech with measurable business outcomes.",
  achievements: [
    "Built greenfield e-commerce stacks from scratch (WordPress/WooCommerce, OpenCart, PrestaShop) incl. multilingual, multi-currency, taxes/shipping, and custom themes/plugins/modules.",
    "Launched 15+ custom platforms (e-commerce, booking, internal tools) with clear GTM focus and lean MVP scope.",
    "Integrated payments and compliance: Stripe/PayPal, 3-D Secure, invoicing/VAT, order flows, refunds, and anti-fraud checks.",
    "Connected ops: inventory/fulfillment and ERP/CRM integrations (REST/GraphQL), webhooks, email/SMS notifications.",
    "Improved performance & SEO: Core Web Vitals, schema.org/JSON-LD, WP Recipe Maker integration, image/CDN optimization.",
    "Set up CI/CD (GitHub Actions) and monitoring (Sentry/Uptime) with containerized deploys and staged releases.",
    "Ran technical strategy workshops to validate MVP scope, prioritize features, and de-risk delivery."
  ],
  tech: [
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PHP",
    "Slim PHP",
    "WordPress",
    "WooCommerce",
    "OpenCart",
    "PrestaShop",
    "PostgreSQL",
    "MySQL",
    "Docker",
    "Nginx",
    "AWS",
    "Vercel",
    "Cloudflare",
    "REST",
    "GraphQL",
    "GitHub Actions",
    "Sentry"
  ]
},
  {

    company: "Codere",
    role: "Senior Full Stack Developer",
    period: "Mar 2022 - Sep 2025",
    description:
      "Leading full stack development for marketing automation tools and performance-focused web platforms in a high-paced gaming environment.",
    achievements: [
      "Delivered a landing page generator with React, Node.js, and MySQL that increased campaign velocity by 30%.",
      "Shipped REST API integrations that streamlined communication across internal and external systems.",
      "Used AI tools such as GitHub Copilot and ChatGPT to accelerate delivery, documentation, and code quality reviews.",
      "Optimized database queries and application performance, cutting response times by 25%."
    ],
    tech: ["React", "Next.js", "Node.js", "MySQL", "PHP","AWS", "AI tooling"]
  },
  {
    company: "Primis",
    role: "Web Developer",
    period: "Jan 2021 - Mar 2022",
    description:
      "Maintained and extended advertising technology platforms, focusing on stability, user experience, and measurable business impact.",
    achievements: [
      "Resolved production issues rapidly to keep monetization services running around the clock.",
      "Implemented new UX features that improved customer engagement and partner conversions.",
      "Collaborated across teams using Agile practices to prioritize the highest-value enhancements."
    ],
    tech: ["PHP", "AngularJS", "JavaScript", "MySQL", "MVC"]
  },
  {
    company: "Init",
    role: "Full Stack Developer",
    period: "Dec 2019 - Dec 2020",
    description:
      "Built custom WordPress and WooCommerce solutions from scratch for e-commerce and marketing clients.",
    achievements: [
      "Launched bespoke themes and plugins tailored to client requirements and branding.",
      "Integrated third-party REST APIs to automate inventory, fulfillment, and marketing flows.",
      "Improved SEO foundations and responsive design across new product launches."
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "JavaScript","MySQL", "REST APIs"]
  },
  {
    company: "Global on Media",
    role: "Full Stack Developer",
    period: "Nov 2017 - Dec 2019",
    description:
      "Delivered full stack marketing platforms with a focus on responsive user interfaces, data visibility, and lead management.",
    achievements: [
      "Designed and implemented REST APIs and PHP services to support high-volume lead funnels.",
      "Developed responsive UIs optimized for performance and SEO across key properties.",
      "Built an internal lead management system to centralize campaign insights."
    ],
    tech: ["PHP", "MySQL", "REST APIs", "JavaScript", "SEO"]

  }
];

export const skills = {

  frontend: [
    "React",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Redux",
    "Material-UI",
    "Bootstrap",
    "Sass"
  ],
  backend: [
    "Node.js",
    "Express.js",
    "PHP (OOP, MVC)",
    "RESTful APIs",
    "Python"
  ],
  databases: ["MySQL", "PostgreSQL", "MongoDB", "MS SQL"],
  aiTools: ["GitHub Copilot", "ChatGPT", "Workflow automation"],
  devops: ["Git/GitHub", "Docker", "CI/CD (GitLab, Jenkins)", "Jira", "Agile/Scrum"],
  specialties: [
    "WordPress & WooCommerce",
    "SEO optimization",
    "Responsive design",
    "Performance tuning"
  ]

};

