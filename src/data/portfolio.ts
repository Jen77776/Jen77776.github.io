export interface Experience {
  company: string;
  dates: string;
  title: string;
  description: string;
  outcome: string;
  technologies: string[];
}
export interface Project {
  title: string;
  category: string;
  visualLabel: string;
  description: string;
  technologies: string[];
  href: string | null;
  linkLabel: string;
  screenshot: { src: string; alt: string } | null;
}
// Replace null values with verified destinations before publication.
export const portfolio = {
  name: "Jen Kang",
  location: "Minneapolis, MN",
  role: "Software Engineer",
  title: "Jen Kang — Software Engineer",
  description:
    "Jen Kang — Software engineer building full-stack products and practical AI experiences. Explore experience at 3M, Star Tribune, and the University of Minnesota.",
  siteUrl: "https://jen77776.github.io" as string | null, // Full production origin, e.g. your verified HTTPS domain.
  links: {
    github: "https://github.com/Jen77776",
    resume: null as string | null, // Add PDF to public/ and set /resume.pdf, or use an HTTPS URL.
    email: null as string | null, // Plain email address, without mailto:.
    linkedin: null as string | null,
  },
  navigation: [
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact ↗" },
  ],
  hero: {
    introduction: "I'm",
    specialty: "full-stack development and practical AI",
    summary:
      "I enjoy turning complex workflows into thoughtful, reliable products.",
    note: "Previously at 3M & Star Tribune · M.S. in Computer Science, UMN",
  },
  featured: {
    year: "2026",
    category: "3M · Software Engineering Internship",
    heading: "Improving review workflows.",
    label: "Text review turnaround",
    before: "24h",
    after: "1h",
    caption:
      "Reduced text review turnaround time with an AI-assisted workflow built during my internship.",
    technologies: "React · .NET · Azure OpenAI",
  },
  experiences: [
    {
      company: "3M",
      dates: "Jun — Aug 2026",
      title: "Software Engineering Intern",
      description:
        "Built full-stack dashboards and role-based workflows; integrated Azure OpenAI into a text review process,",
      outcome: "reducing turnaround from 24 hours to 1 hour.",
      technologies: ["React", "TypeScript", ".NET 8", "Azure", "Cosmos DB"],
    },
    {
      company: "Star Tribune",
      dates: "Jan — May 2026",
      title: "Software Engineering Intern",
      description:
        "Shipped digital sports features, improved accessibility and page performance, and optimized content delivery to",
      outcome: "reduce payload size by 40%.",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "GraphQL",
        "Tailwind",
        "Playwright",
      ],
    },
    {
      company: "University of Minnesota",
      dates: "Jun — Sep 2025",
      title: "Software Engineering Intern",
      description:
        "Modularized Flask services and added automated testing to improve backend maintainability. Built a Gemini-based AI tutor that",
      outcome: "supported 100+ students.",
      technologies: ["Python", "Flask", "PostgreSQL", "Gemini"],
    },
  ] satisfies Experience[],
  projects: [
    {
      title: "Multi-Agent Study Assistant",
      category: "AI & Backend engineering",
      visualLabel: "AI / Agent systems",
      description:
        "A study assistant that explores how specialized AI agents can work together to support learning and answer complex questions.",
      technologies: ["Python", "FastAPI", "LangGraph"],
      href: null,
      linkLabel: "Project link pending",
      screenshot: null,
    },
    {
      title: "AI Art Museum",
      category: "Full-stack & ML",
      visualLabel: "Recommender systems",
      description:
        "An art exploration experience combining image generation and personalized recommendations to help people discover artwork.",
      technologies: ["Python", "AI recommendations"],
      href: "https://github.com/Jen77776/AI-artMuesum",
      linkLabel: "View GitHub",
      screenshot: null,
    },
  ] satisfies Project[],
  about:
    "I enjoy working across the stack—from thoughtful interfaces to reliable APIs and cloud services. Lately, I'm especially interested in how AI can become a useful part of real products, not just a demo.",
  education: [
    {
      school: "University of Minnesota, Twin Cities",
      degree: "M.S. in Computer Science",
    },
    {
      school: "Huazhong University of Science and Technology",
      degree: "B.E. in Computer Science & Technology",
    },
  ],
  contact: {
    heading: "Let's build something",
    headingEnd: "meaningful together.",
    description:
      "Have a question about my work, an interesting project, or just want to connect?",
  },
};
