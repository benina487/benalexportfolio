import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  category: string;
  github: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "Hawk Eye – Access Management",
    desc: "Secure access management system with role-based auth, real-time monitoring, and encrypted communication channels.",
    tech: ["Python", "Flask", "MySQL", "JWT"],
    category: "Security",
    github: "https://github.com/benina487",
  },
  {
    title: "BioPulse – Plant Stress Detection",
    desc: "AI-powered plant health analysis using Computer Vision to detect stress patterns and recommend treatments.",
    tech: ["Python", "TensorFlow", "OpenCV", "React"],
    category: "AI",
    github: "https://github.com/benina487",
  },
  {
    title: "Voice Biometric Auth System",
    desc: "Authenticates users via unique vocal characteristics – pitch, cadence, tone, and pronunciation analysis.",
    tech: ["Python", "ML", "Signal Processing", "Flask"],
    category: "AI",
    github: "https://github.com/benina487",
  },
  {
    title: "Landslide Detection IoT System",
    desc: "Sensor-based real-time monitoring with threshold alerts and automated warnings for landslide-prone areas.",
    tech: ["IoT", "Python", "Data Logging", "APIs"],
    category: "Data",
    github: "https://github.com/benina487",
  },
  {
    title: "Gold vs Silver Rate Dashboard",
    desc: "Interactive data analytics dashboard comparing precious metal rates with trend analysis and visualizations.",
    tech: ["Power BI", "Python", "Data Analysis"],
    category: "Data",
    github: "https://github.com/benina487",
  },
  {
    title: "Mental Health Chatbot",
    desc: "AI chatbot with mood tracking, emotional analysis, and personalized meditation recommendations for employees.",
    tech: ["Python", "NLP", "React", "APIs"],
    category: "Web",
    github: "https://github.com/benina487",
  },
];

const filters = ["All", "AI", "Web", "Data", "Security"];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">Projects</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                active === f
                  ? "bg-primary text-primary-foreground glow-primary"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="glass rounded-xl overflow-hidden group hover:glow-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-2 w-full" style={{ background: "var(--gradient-primary)" }} />
              <div className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={14} /> Code
                  </a>
                  {p.live && (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
