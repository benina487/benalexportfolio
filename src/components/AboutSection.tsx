import { Code2, Database, Brain, Shield, BarChart3, Monitor } from "lucide-react";

const highlights = [
  { icon: Code2, label: "DSA & Programming", desc: "Strong in Data Structures, Algorithms" },
  { icon: Database, label: "DBMS & Backend", desc: "MySQL, REST APIs, Flask" },
  { icon: Brain, label: "ML & AI", desc: "Machine Learning, Computer Vision" },
  { icon: Shield, label: "Cybersecurity", desc: "Security fundamentals & tools" },
  { icon: BarChart3, label: "Data Analytics", desc: "Power BI, Tableau, Excel" },
  { icon: Monitor, label: "Full Stack", desc: "React, HTML/CSS/JS, APIs" },
];

const tools = ["VS Code", "Power BI", "Tableau", "Excel", "R Studio", "MySQL", "GitHub"];

const AboutSection = () => (
  <section id="about" className="py-24 relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">About Me</p>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold">
          Who I <span className="gradient-text">Am</span>
        </h2>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-muted-foreground leading-relaxed text-lg">
          I'm a dedicated B.Tech student in Artificial Intelligence and Data Science at
          Francis Xavier Engineering College. I specialize in building scalable web
          applications, integrating REST APIs, and developing AI-powered solutions. With
          hands-on experience in projects like voice biometric authentication and IoT-based
          disaster management, I bring a problem-solving mindset to every challenge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {highlights.map(({ icon: Icon, label, desc }, i) => (
          <div
            key={label}
            className="glass rounded-xl p-6 hover:glow-primary transition-shadow duration-300 group"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Icon size={22} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold mb-1">{label}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">Tools I Use</p>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
