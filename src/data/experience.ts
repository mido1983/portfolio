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
    company: "QuantumSoft",
    role: "Principal Engineer",
    period: "2022 — наст. время",
    description:
      "Руководил трансформацией монолита в модульную архитектуру и внедрял инженерные практики DevEx.",
    achievements: [
      "Сократил время вывода фич с 14 до 5 дней",
      "Разработал внутреннюю платформу компонентов и CLI",
      "Настроил обсервабилити и SLO для критических сервисов"
    ],
    tech: ["Next.js", "NestJS", "GraphQL", "AWS", "Terraform"]
  },
  {
    company: "DataForge",
    role: "Lead Frontend Engineer",
    period: "2019 — 2022",
    description:
      "Выстроил фронтенд-архитектуру с микрофронтендами и CI/CD пайплайном для 8 команд.",
    achievements: [
      "Внедрил дизайн-систему с автоматической документацией",
      "Снизил технический долг, покрыв 70% критичного кода тестами",
      "Организовал гильдию по DX и performance"
    ],
    tech: ["React", "TypeScript", "Webpack Module Federation", "Storybook", "Playwright"]
  }
];

export const skills = {
  languages: ["TypeScript", "Python", "Go", "Rust"],
  frameworks: ["Next.js", "React", "Node.js", "FastAPI"],
  tooling: ["CI/CD", "Docker", "Kubernetes", "Terraform"],
  soft: ["Лидерство", "Менторство", "Продуктовое мышление", "Публичные выступления"]
};
