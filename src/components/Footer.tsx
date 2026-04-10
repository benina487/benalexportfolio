import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2025 Benina A. Built with ❤️
      </p>
      <div className="flex gap-4">
        {[
          { icon: Github, href: "https://github.com/benina487" },
          { icon: Linkedin, href: "https://www.linkedin.com/in/benina-a-914025366" },
          { icon: Mail, href: "mailto:ben10alexantony@gmail.com" },
        ].map(({ icon: Icon, href }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
