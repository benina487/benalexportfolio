import { useState, useEffect } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import profileImg from "@/assets/profile.png";

const roles = ["Full Stack Developer", "ML Engineer", "Data Analyst", "AI Enthusiast"];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [zoom, setZoom] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("profile-zoom") : null;
    return saved ? parseFloat(saved) : 1.15;
  });
  const [offsetY, setOffsetY] = useState(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("profile-offset-y") : null;
    return saved ? parseInt(saved, 10) : 40;
  });

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  const resetCrop = () => {
    setZoom(1.15);
    setOffsetY(40);
  };

  useEffect(() => {
    localStorage.setItem("profile-zoom", zoom.toString());
  }, [zoom]);

  useEffect(() => {
    localStorage.setItem("profile-offset-y", offsetY.toString());
  }, [offsetY]);


  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container relative mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">
        <div className="flex-1 text-center lg:text-left animate-fade-in-up">
          <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Welcome to my portfolio
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Hi, I'm{" "}
            <span className="gradient-text">Benina A</span>
          </h1>
          <div className="h-10 mb-6">
            <span className="font-heading text-xl sm:text-2xl text-muted-foreground">
              {text}
              <span className="border-r-2 border-primary ml-0.5 animate-typing-cursor">
                &nbsp;
              </span>
            </span>
          </div>
          <p className="text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
            B.Tech student in AI & Data Science passionate about building scalable
            web apps, intelligent systems, and data-driven solutions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              className="px-6 py-3 rounded-lg glass text-foreground font-medium hover:border-primary/30 transition-colors flex items-center gap-2"
            >
              <Download size={16} /> Download Resume
            </a>
          </div>

          <div className="flex gap-4 justify-center lg:justify-start">
            {[
              { icon: Github, href: "https://github.com/benina487" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/benina-a-914025366" },
              { icon: Mail, href: "mailto:ben10alexantony@gmail.com" },
            ].map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 relative flex flex-col items-center gap-4">
          <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden gradient-border glow-primary animate-float">
            <img
              src={profileImg}
              alt="Benina A"
              className="w-full h-full object-cover"
              style={{ objectPosition: `center ${offsetY}%`, transform: `scale(${zoom})` }}
            />
          </div>

          <div className="w-56 sm:w-64 p-4 rounded-2xl glass space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Zoom</span>
                <span>{zoom.toFixed(2)}x</span>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={2}
                step={0.01}
                onValueChange={(value) => setZoom(value[0])}
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Vertical position</span>
                <span>{offsetY}%</span>
              </div>
              <Slider
                value={[offsetY]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setOffsetY(value[0])}
              />
            </div>
            <button
              type="button"
              onClick={resetCrop}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default HeroSection;
