import { experiences, skills } from "@/data/experience";
import { ResumeActions } from "@/components/resume-actions";

const education = [
  {
    title: "МГУ им. М.В. Ломоносова",
    degree: "Прикладная математика и информатика",
    period: "2009 — 2014"
  }
];

export default function ResumePage() {
  return (
    <div className="container-grid py-24 print:py-12">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Резюме</p>
        <h1 className="text-4xl font-semibold">Иван Петров</h1>
        <p className="max-w-2xl text-white/70">
          Senior Full-Stack Engineer с опытом построения продуктовых команд, развития архитектуры и вывода сложных
          решений в production.
        </p>
        <ResumeActions />
      </header>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px] print:grid-cols-1">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Опыт</h2>
            <div className="mt-6 space-y-6">
              {experiences.map((item) => (
                <div
                  key={item.company}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 print:border-none print:bg-transparent"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/60">
                    <span className="font-semibold text-white/80">{item.role}</span>
                    <span>{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-accent">{item.company}</p>
                  <p className="mt-3 text-sm text-white/70">{item.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>• {achievement}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Образование</h2>
            <div className="mt-4 space-y-4">
              {education.map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 print:border-none print:bg-transparent"
                >
                  <p className="text-sm font-semibold text-white/80">{item.title}</p>
                  <p className="text-sm text-accent">{item.degree}</p>
                  <p className="text-xs text-white/60">{item.period}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 print:border-none print:bg-transparent">
            <h3 className="text-lg font-semibold">Навыки</h3>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white">Языки</p>
                <p>{skills.languages.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Фреймворки</p>
                <p>{skills.frameworks.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Инструменты</p>
                <p>{skills.tooling.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Soft Skills</p>
                <p>{skills.soft.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 print:border-none print:bg-transparent">
            <h3 className="text-lg font-semibold text-white">Контакты</h3>
            <p className="mt-3">Email: hello@ivanpetrov.dev</p>
            <p>GitHub: github.com/ivanpetrov</p>
            <p>LinkedIn: linkedin.com/in/ivanpetrov</p>
          </div>
        </aside>
      </section>
    </div>
  );
}
