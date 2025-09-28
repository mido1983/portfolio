import { HeroSection } from "@/components/hero-section";
import { ProjectGrid } from "@/components/project-grid";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { SkillMatrix } from "@/components/skill-matrix";
import { ContactForm } from "@/components/contact-form";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectGrid />
      <SkillMatrix />
      <ExperienceTimeline />
      <ContactForm />
    </>
  );
}
