import { experiences, skills } from "@/data/experience";
import { ResumeActions } from "@/components/resume-actions";
import { siteConfig } from "@/data/site";

const education = [
  {
    title: "Next.js & Python Professional Courses",
    degree: "Advanced certificates",
    period: "2024"
  },
  {
    title: "ReactJS Web Development",
    degree: "Professional course",
    period: "2020"
  },
  {
    title: "Full Stack Developer Course (John Bryce)",
    degree: "Diploma program",
    period: "2016"
  },
  {
    title: "BA Studies, Tel Aviv University",
    degree: "Undergraduate program",
    period: "2007"
  }
];

const spokenLanguages = [
  { name: "Hebrew", level: "Fluent" },
  { name: "English", level: "Professional working proficiency (B2)" },
  { name: "Russian", level: "Native" }
];

export default function ResumePage() {
  return (
    <div className="container-grid py-24 print:py-12">
      <header className="space-y-6">
        <p className="text-sm uppercase tracking-[0.25em] text-accent">Résumé</p>
        <h1 className="text-4xl font-semibold">Michael Doroshenko</h1>
        <p className="max-w-2xl text-white/70">
          Full stack web developer with 7+ years of experience delivering practical web solutions for business and
          e-commerce. Skilled in React, Next.js, Node.js, PHP, WordPress, and modern databases, with a passion for
          performance, scalable systems, and automation.
        </p>
        <ResumeActions />
      </header>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px] print:grid-cols-1">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold">Experience</h2>
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
            <h2 className="text-2xl font-semibold">Education</h2>
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
            <h3 className="text-lg font-semibold">Skills</h3>
            <div className="mt-4 space-y-3 text-sm text-white/80">
              <div>
                <p className="font-semibold text-white">Frontend</p>
                <p>{skills.frontend.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Backend</p>
                <p>{skills.backend.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Databases</p>
                <p>{skills.databases.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">DevOps & Process</p>
                <p>{skills.devops.join(", ")}</p>
              </div>
              <div>
                <p className="font-semibold text-white">Specialties & AI Tools</p>
                <p>{skills.specialties.join(", ")}</p>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 print:border-none print:bg-transparent">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <p className="mt-3">Email: {siteConfig.email}</p>
            <p>Phone: {siteConfig.phone}</p>
            <p>Location: {siteConfig.location}</p>
            <p>
              LinkedIn: <a href={siteConfig.socials.linkedin}>{siteConfig.socials.linkedin}</a>
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/70 print:border-none print:bg-transparent">
            <h3 className="text-lg font-semibold text-white">Languages</h3>
            <ul className="mt-3 space-y-2">
              {spokenLanguages.map((language) => (
                <li key={language.name}>
                  <span className="font-semibold text-white">{language.name}</span>: {language.level}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
