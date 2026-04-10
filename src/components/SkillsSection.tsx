import { useEffect, useRef, useState } from "react";

type Skill = { name: string; level: number };

const categories: { title: string; color: string; skills: Skill[] }[] = [
  {
    title: "Programming",
    color: "hsl(187 80% 48%)",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 75 },
      { name: "C", level: 70 },
      { name: "JavaScript", level: 80 },
    ],
  },
  {
    title: "Web Development",
    color: "hsl(270 60% 60%)",
    skills: [
      { name: "HTML/CSS", level: 90 },
      { name: "React.js", level: 78 },
      { name: "REST APIs", level: 82 },
      { name: "Node.js", level: 65 },
    ],
  },
  {
    title: "Data & AI",
    color: "hsl(150 60% 50%)",
    skills: [
      { name: "Machine Learning", level: 80 },
      { name: "Computer Vision", level: 72 },
      { name: "Data Analysis", level: 85 },
      { name: "Power BI", level: 78 },
    ],
  },
  {
    title: "Backend & DB",
    color: "hsl(35 90% 55%)",
    skills: [
      { name: "MySQL", level: 82 },
      { name: "MongoDB", level: 65 },
      { name: "API Integration", level: 85 },
      { name: "Cybersecurity", level: 60 },
    ],
  },
];

const SkillBar = ({ name, level, color, visible }: Skill & { color: string; visible: boolean }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-foreground font-medium">{name}</span>
      <span className="text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{
          width: visible ? `${level}%` : "0%",
          background: color,
        }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-2">Skills</p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            My <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <div key={cat.title} className="glass rounded-xl p-6">
              <h3 className="font-heading font-semibold text-lg mb-6" style={{ color: cat.color }}>
                {cat.title}
              </h3>
              {cat.skills.map((s) => (
                <SkillBar key={s.name} {...s} color={cat.color} visible={visible} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
