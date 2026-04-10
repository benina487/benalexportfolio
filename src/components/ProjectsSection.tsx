import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  github_url: string | null;
  live_url: string | null;
};

const staticProjects: Project[] = [
  {
    id: "1", title: "Hawk Eye – Access Management",
    desc: "Secure access management system with role-based auth, real-time monitoring, and encrypted communication.",
    tech_stack: ["Python", "Flask", "MySQL", "JWT"], category: "Security",
    github_url: "https://github.com/benina487", live_url: null,
  },
  {
    id: "2", title: "BioPulse – Plant Stress Detection",
    desc: "AI-powered plant health analysis using Computer Vision to detect stress patterns.",
    tech_stack: ["Python", "TensorFlow", "OpenCV", "React"], category: "AI",
    github_url: "https://github.com/benina487", live_url: null,
  },
  {
    id: "3", title: "Voice Biometric Auth System",
    desc: "Authenticates users via unique vocal characteristics – pitch, cadence, tone analysis.",
    tech_stack: ["Python", "ML", "Signal Processing", "Flask"], category: "AI",
    github_url: "https://github.com/benina487", live_url: null,
  },
  {
    id: "4", title: "Landslide Detection IoT System",
    desc: "Sensor-based real-time monitoring with threshold alerts for landslide-prone areas.",
    tech_stack: ["IoT", "Python", "Data Logging", "APIs"], category: "Data",
    github_url: "https://github.com/benina487", live_url: null,
  },
  {
    id: "5", title: "Gold vs Silver Rate Dashboard",
    desc: "Interactive data analytics dashboard comparing precious metal rates with trend analysis.",
    tech_stack: ["Power BI", "Python", "Data Analysis"], category: "Data",
    github_url: "https://github.com/benina487", live_url: null,
  },
  {
    id: "6", title: "Mental Health Chatbot",
    desc: "AI chatbot with mood tracking, emotional analysis, and personalized meditation recommendations.",
    tech_stack: ["Python", "NLP", "React", "APIs"], category: "Web",
    github_url: "https://github.com/benina487", live_url: null,
  },
].map((p) => ({ ...p, description: (p as any).desc }));

const filters = ["All", "AI", "Web", "Data", "Security"];

const ProjectsSection = () => {
  const [active, setActive] = useState("All");
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    supabase.from("projects").select("*").eq("is_visible", true).order("display_order").then(({ data }) => {
      if (data && data.length > 0) setProjects(data);
    });
  }, []);

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
              key={p.id}
              className="glass rounded-xl overflow-hidden group hover:glow-primary transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-2 w-full" style={{ background: "var(--gradient-primary)" }} />
              <div className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech_stack.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {p.github_url && (
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Github size={14} /> Code
                    </a>
                  )}
                  {p.live_url && (
                    <a href={p.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
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
