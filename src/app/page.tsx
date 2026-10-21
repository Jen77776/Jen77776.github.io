import {
  Header,
  Hero,
  ExperienceSection,
  ProjectsSection,
  AboutSection,
  ContactSection,
  Footer,
} from "@/components/portfolio";
export default function Home() {
  return (
    <>
      <Header />
      <main id="home" tabIndex={-1}>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
