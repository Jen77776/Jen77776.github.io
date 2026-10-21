import Image from "next/image";
import type { ReactNode } from "react";
import { portfolio, type Project } from "@/data/portfolio";

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
function Tags({ items }: { items: string[] }) {
  return (
    <ul className="tags" aria-label="Technologies">
      {items.map((item) => (
        <li className="tag" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
  id,
}: {
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  id: string;
}) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow">
          {number} / {eyebrow}
        </div>
        <h2 id={id}>
          {title}
          <span className="text-[#4f66ae]">.</span>
        </h2>
      </div>
      <p className="section-subtitle">{subtitle}</p>
    </div>
  );
}
export function Header() {
  return (
    <header className="topbar">
      <a href="#home" className="skip-link">
        Skip to main content
      </a>
      <div className="container topbar-inner">
        <a
          href="#home"
          className="brand"
          aria-label={`${portfolio.name}, back to top`}
        >
          <span className="brand-mark" aria-hidden="true">
            jk
          </span>
          <span className="brand-name">
            {portfolio.name}
            <span className="text-[#8291a8]">.</span>
          </span>
        </a>
        <nav className="nav" aria-label="Primary">
          {portfolio.navigation.map((link) => (
            <a href={`#${link.id}`} key={link.id}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
export function FeaturedWork() {
  const work = portfolio.featured;
  return (
    <aside className="hero-showcase" aria-label="Featured work at 3M">
      <div className="showcase-top">
        <span>Featured work</span>
        <span className="showcase-year">{work.year}</span>
      </div>
      <div className="showcase-content">
        <div className="showcase-category">{work.category}</div>
        <h2 className="showcase-heading">{work.heading}</h2>
        <div className="showcase-kpi-label uppercase">{work.label}</div>
        <div
          className="showcase-metric"
          aria-label={`${work.before} to ${work.after}`}
        >
          {work.before}
          <span className="metric-arrow" aria-hidden="true">
            →
          </span>
          {work.after}
        </div>
        <p className="showcase-caption">{work.caption}</p>
        <div className="showcase-bottom">
          <span>{work.technologies}</span>
          <a href="#experience">Experience ↓</a>
        </div>
      </div>
    </aside>
  );
}
export function Hero() {
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div>
          <span className="status">
            <span className="status-dot" aria-hidden="true" />
            {portfolio.role} · {portfolio.location}
          </span>
          <h1 id="hero-title">
            Hi, I&apos;m Jen.
            <br />I build <span className="serif">useful</span>
            <br />
            software.
          </h1>
          <p className="hero-copy">
            {portfolio.hero.introduction} <strong>{portfolio.name}</strong>, a
            software engineer focused on{" "}
            <strong>{portfolio.hero.specialty}</strong>.{" "}
            {portfolio.hero.summary}
          </p>
          <div className="cta">
            <a href="#experience" className="btn btn-primary">
              Explore my work <Arrow />
            </a>
            {portfolio.links.resume ? (
              <a href={portfolio.links.resume} className="btn btn-outline">
                Résumé <Arrow />
              </a>
            ) : (
              <span className="placeholder btn-placeholder">
                Résumé · PDF pending
              </span>
            )}
            <ExternalLink
              href={portfolio.links.github}
              className="btn btn-outline"
            >
              GitHub <Arrow />
            </ExternalLink>
          </div>
          <p className="hero-note">{portfolio.hero.note}</p>
        </div>
        <FeaturedWork />
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="section container"
      aria-labelledby="exp-title"
    >
      <SectionHeading
        number="01"
        eyebrow="Professional work"
        title="Experience"
        id="exp-title"
        subtitle="What I built, why it mattered, and the technologies behind it."
      />
      {portfolio.experiences.map((role, index) => (
        <article className="role" key={role.company}>
          <div>
            <div className="role-company">{role.company}</div>
            <span className="role-when">{role.dates}</span>
          </div>
          <div>
            <div className="role-title">
              <h3>{role.title}</h3>
              <span className="top-number" aria-hidden="true">
                0{index + 1}
              </span>
            </div>
            <p className="role-body">
              {role.description} <strong>{role.outcome}</strong>
            </p>
            <Tags items={role.technologies} />
          </div>
        </article>
      ))}
    </section>
  );
}
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project">
      <div
        className={`project-visual ${index === 0 ? "project-one" : "project-two"}`}
      >
        {project.screenshot ? (
          <Image
            src={project.screenshot.src}
            alt={project.screenshot.alt}
            fill
            sizes="(max-width: 700px) 100vw, 550px"
            className="object-contain"
          />
        ) : (
          <div className="project-placeholder">
            <small className="uppercase tracking-widest">
              {project.visualLabel} · 0{index + 1}
            </small>
            <strong>Project preview</strong>
            <span>Screenshot pending</span>
          </div>
        )}
      </div>
      <div className="project-body">
        <div className="project-kicker">{project.category}</div>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <Tags items={project.technologies} />
        {project.href ? (
          <ExternalLink href={project.href} className="project-link">
            {project.linkLabel} <Arrow />
            <span className="sr-only"> for {project.title}</span>
          </ExternalLink>
        ) : (
          <p className="placeholder mt-5 mb-0">{project.linkLabel}</p>
        )}
      </div>
    </article>
  );
}
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="section container"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        number="02"
        eyebrow="Selected work"
        title="Projects"
        id="projects-title"
        subtitle="A few things I've enjoyed designing, building, and learning from."
      />
      <div className="projects">
        {portfolio.projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
export function AboutSection() {
  return (
    <section
      id="about"
      className="about container"
      aria-labelledby="about-title"
    >
      <div>
        <div className="eyebrow">03 / More about me</div>
        <h2 id="about-title">
          A little more
          <br />
          about Jen<span className="text-[#4f66ae]">.</span>
        </h2>
        <p>{portfolio.about}</p>
      </div>
      <div>
        <h3 className="eyebrow mb-4">Education</h3>
        <div className="edu">
          {portfolio.education.map((item) => (
            <div className="edu-item" key={item.school}>
              <div>
                <div className="edu-school">{item.school}</div>
                <div className="edu-degree">{item.degree}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ContactSection() {
  return (
    <section
      id="contact"
      className="contact container"
      aria-labelledby="contact-title"
    >
      <div>
        <div className="eyebrow">04 / Get in touch</div>
        <h2 id="contact-title">
          {portfolio.contact.heading}
          <br />
          {portfolio.contact.headingEnd}
        </h2>
        <p>{portfolio.contact.description}</p>
      </div>
      <div className="contact-links">
        {portfolio.links.email ? (
          <a className="btn" href={`mailto:${portfolio.links.email}`}>
            Email Jen <Arrow />
          </a>
        ) : (
          <span className="placeholder">Email · address pending</span>
        )}
        {portfolio.links.linkedin ? (
          <ExternalLink href={portfolio.links.linkedin}>
            LinkedIn <Arrow />
          </ExternalLink>
        ) : (
          <span className="placeholder">LinkedIn · profile pending</span>
        )}
        <ExternalLink
          href={portfolio.links.github}
          className="text-sm underline"
        >
          Find me on GitHub <Arrow />
        </ExternalLink>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="container">
      <span>
        © {new Date().getFullYear()} {portfolio.name}. Crafted with care.
      </span>
      <span>
        <ExternalLink href={portfolio.links.github}>
          GitHub <Arrow />
        </ExternalLink>
        <span aria-hidden="true"> &nbsp;·&nbsp; </span>
        <a href="#home">Back to top ↑</a>
      </span>
    </footer>
  );
}
