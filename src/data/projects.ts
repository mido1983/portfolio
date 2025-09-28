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
    slug: "fintech-analytics",
    title: "Fintech Analytics Platform",
    summary:
      "Многоуровневая платформа, агрегирующая банковские данные в реальном времени и предоставляющая визуализацию рисков.",
    year: 2024,
    tags: ["Next.js", "TypeScript", "Kafka", "D3.js"],
    links: {
      demo: "https://fintech.example.com",
      repo: "https://github.com/ivanpetrov/fintech-analytics"
    },
    content:
      "Разработал архитектуру микросервисов, построил пайплайн данных на Kafka и реализовал дашборды с интерактивной аналитикой."
  },
  {
    slug: "ml-ops-platform",
    title: "ML Ops Control Center",
    summary:
      "Платформа управления жизненным циклом ML-моделей с автодеплоем, мониторингом и A/B экспериментами.",
    year: 2023,
    tags: ["React", "GraphQL", "Python", "Kubernetes"],
    links: {
      demo: "https://mlops.example.com",
      repo: "https://github.com/ivanpetrov/ml-ops-platform"
    },
    content:
      "Вёл команду из 6 инженеров, внедрил безопасные пайплайны деплоя и наблюдаемость с оповещениями по SLA."
  },
  {
    slug: "design-system",
    title: "Корпоративный дизайн-систем",
    summary:
      "Единая дизайн-система с поддержкой темизации, live-документацией и библиотекой компонентов.",
    year: 2022,
    tags: ["Storybook", "TypeScript", "Styled Components", "Accessibility"],
    links: {
      demo: "https://design.example.com",
      repo: "https://github.com/ivanpetrov/design-system"
    },
    content:
      "Создал 40+ компонентов, внедрил автоматическую проверку доступности и унифицированные гайды по использованию."
  }
];

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
