import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

type Msg = { role: "user" | "bot"; text: string };

const responses: Record<string, string> = {
  "who are you": "I'm Benina A, a B.Tech student in AI & Data Science at Francis Xavier Engineering College. I'm passionate about full-stack development, machine learning, and building intelligent systems!",
  "skills": "My key skills include Python, Java, C, JavaScript, React, HTML/CSS, MySQL, Machine Learning, Computer Vision, Power BI, Tableau, and Cybersecurity fundamentals.",
  "projects": "Some of my projects:\n• Hawk Eye – Secure access management system\n• BioPulse – AI-based plant stress detection\n• Voice Biometric Auth – Vocal characteristic verification\n• Landslide Detection – IoT-based monitoring system\n• Mental Health Chatbot – Mood tracker with AI",
  "contact": "You can reach me at ben10alexantony@gmail.com or +91 8122072978. I'm based in TamilNadu, India.",
  "experience": "I interned at Clear Trust, Bangalore as an AI Engineer (Jul-Aug 2025), where I developed a voice biometric authentication system.",
  "education": "I'm pursuing B.Tech in AI & Data Science at Francis Xavier Engineering College, Tirunelveli (2023-2027) with a CGPA of 9.5.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(responses)) {
    if (lower.includes(key)) return val;
  }
  if (lower.includes("hello") || lower.includes("hi")) return "Hey there! 👋 I'm Benina's portfolio assistant. Ask me about her skills, projects, experience, or education!";
  if (lower.includes("resume") || lower.includes("cv")) return "You can download Benina's resume using the 'Download Resume' button in the hero section!";
  return "Interesting question! I can tell you about Benina's skills, projects, experience, education, or contact info. What would you like to know?";
}

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! 👋 I'm Benina's portfolio assistant. Ask me anything about her skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Msg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getResponse(userMsg.text) }]);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity animate-pulse-glow"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass rounded-xl overflow-hidden animate-fade-in-up flex flex-col" style={{ maxHeight: "480px" }}>
          <div className="px-4 py-3 border-b border-border flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-heading font-semibold text-sm">Portfolio Assistant</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask about skills, projects..."
              className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
