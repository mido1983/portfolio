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

    company: "Codere",
    role: "Senior Full Stack Developer",
    period: "Mar 2022 – Present",
    description:
      "Leading full stack development for marketing automation tools and performance-focused web platforms in a high-paced gaming environment.",
    achievements: [
      "Delivered a landing page generator with React, Node.js, and MySQL that increased campaign velocity by 30%.",
      "Shipped REST API integrations that streamlined communication across internal and external systems.",
      "Used AI tools such as GitHub Copilot and ChatGPT to accelerate delivery, documentation, and code quality reviews.",
      "Optimized database queries and application performance, cutting response times by 25%."
    ],
    tech: ["React", "Next.js", "Node.js", "MySQL", "AI tooling"]
  },
  {
    company: "Primis",
    role: "Web Developer",
    period: "Jan 2021 – Mar 2022",
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
    period: "Dec 2019 – Dec 2020",
    description:
      "Built custom WordPress and WooCommerce solutions from scratch for e-commerce and marketing clients.",
    achievements: [
      "Launched bespoke themes and plugins tailored to client requirements and branding.",
      "Integrated third-party REST APIs to automate inventory, fulfillment, and marketing flows.",
      "Improved SEO foundations and responsive design across new product launches."
    ],
    tech: ["WordPress", "WooCommerce", "PHP", "JavaScript", "REST APIs"]
  },
  {
    company: "Global on Media",
    role: "Full Stack Developer",
    period: "Nov 2017 – Dec 2019",
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
  devops: ["Git/GitHub", "Docker", "CI/CD (GitLab, Jenkins)", "Jira", "Agile/Scrum"],
  specialties: [
    "WordPress & WooCommerce",
    "SEO optimization",
    "Responsive design",
    "Performance tuning",
    "GitHub Copilot",
    "ChatGPT",
    "Workflow automation"
  ]

};
