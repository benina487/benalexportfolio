import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Mail,
  BarChart3,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  category: string;
  github_url: string | null;
  live_url: string | null;
  display_order: number;
  is_visible: boolean;
  created_at: string;
};

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

type Tab = "overview" | "projects" | "messages";

const AdminDashboard = () => {
  const [tab, setTab] = useState<Tab>("overview");
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/admin"); return; }
    const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" });
    if (!isAdmin) { navigate("/admin"); return; }
  };

  const fetchData = async () => {
    setLoading(true);
    const [projRes, msgRes] = await Promise.all([
      supabase.from("projects").select("*").order("display_order"),
      supabase.from("contact_messages").select("*").order("created_at", { ascending: false }),
    ]);
    if (projRes.data) setProjects(projRes.data);
    if (msgRes.data) setMessages(msgRes.data);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const saveProject = async () => {
    if (!editingProject?.title || !editingProject?.description) {
      toast({ title: "Title and description required", variant: "destructive" });
      return;
    }
    const payload = {
      title: editingProject.title,
      description: editingProject.description,
      tech_stack: editingProject.tech_stack || [],
      category: editingProject.category || "Web",
      github_url: editingProject.github_url || null,
      live_url: editingProject.live_url || null,
      display_order: editingProject.display_order || 0,
      is_visible: editingProject.is_visible !== false,
    };

    if (editingProject.id) {
      const { error } = await supabase.from("projects").update(payload).eq("id", editingProject.id);
      if (error) { toast({ title: "Error updating project", variant: "destructive" }); return; }
    } else {
      const { error } = await supabase.from("projects").insert(payload);
      if (error) { toast({ title: "Error creating project", variant: "destructive" }); return; }
    }
    toast({ title: editingProject.id ? "Project updated" : "Project created" });
    setEditingProject(null);
    fetchData();
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", id);
    toast({ title: "Project deleted" });
    fetchData();
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    await supabase.from("projects").update({ is_visible: !visible }).eq("id", id);
    fetchData();
  };

  const markRead = async (id: string) => {
    await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    fetchData();
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: FolderOpen },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border p-6 flex flex-col">
        <h2 className="font-heading text-lg font-bold gradient-text mb-8">Admin Panel</h2>
        <nav className="space-y-2 flex-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                tab === id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={18} />
              {label}
              {id === "messages" && unreadCount > 0 && (
                <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">Loading...</div>
        ) : (
          <>
            {tab === "overview" && (
              <div>
                <h1 className="font-heading text-2xl font-bold mb-8">Dashboard Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {[
                    { label: "Total Projects", value: projects.length, icon: FolderOpen },
                    { label: "Messages", value: messages.length, icon: Mail },
                    { label: "Unread", value: unreadCount, icon: BarChart3 },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="glass rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={20} className="text-primary" />
                        <span className="text-sm text-muted-foreground">{label}</span>
                      </div>
                      <p className="text-3xl font-heading font-bold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-xl p-6">
                  <h3 className="font-heading font-semibold mb-4">Recent Messages</h3>
                  {messages.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
                      <div className={`w-2 h-2 mt-2 rounded-full ${m.is_read ? "bg-muted" : "bg-primary"}`} />
                      <div>
                        <p className="text-sm font-medium">{m.name} <span className="text-muted-foreground font-normal">({m.email})</span></p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "projects" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="font-heading text-2xl font-bold">Projects</h1>
                  <button
                    onClick={() => setEditingProject({ title: "", description: "", tech_stack: [], category: "Web", is_visible: true })}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90"
                  >
                    <Plus size={16} /> Add Project
                  </button>
                </div>

                {editingProject && (
                  <div className="glass rounded-xl p-6 mb-6 space-y-4">
                    <h3 className="font-heading font-semibold">{editingProject.id ? "Edit" : "New"} Project</h3>
                    <input
                      placeholder="Title"
                      value={editingProject.title || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <textarea
                      placeholder="Description"
                      rows={3}
                      value={editingProject.description || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="Category (Web, AI, Data, Security)"
                        value={editingProject.category || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <input
                        placeholder="Tech stack (comma separated)"
                        value={(editingProject.tech_stack || []).join(", ")}
                        onChange={(e) => setEditingProject({ ...editingProject, tech_stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                        className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="GitHub URL"
                        value={editingProject.github_url || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <input
                        placeholder="Live demo URL"
                        value={editingProject.live_url || ""}
                        onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                        className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button onClick={saveProject} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                        Save
                      </button>
                      <button onClick={() => setEditingProject(null)} className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:opacity-90">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {projects.map((p) => (
                    <div key={p.id} className="glass rounded-xl p-4 flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{p.title}</h4>
                        <p className="text-xs text-muted-foreground">{p.category} · {p.tech_stack.join(", ")}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleVisibility(p.id, p.is_visible)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                          {p.is_visible ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button onClick={() => setEditingProject(p)} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg hover:bg-secondary text-destructive transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No projects yet. Add your first project!</p>
                  )}
                </div>
              </div>
            )}

            {tab === "messages" && (
              <div>
                <h1 className="font-heading text-2xl font-bold mb-8">Contact Messages</h1>
                <div className="space-y-3">
                  {messages.map((m) => (
                    <div key={m.id} className={`glass rounded-xl p-5 ${!m.is_read ? "border border-primary/20" : ""}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-medium text-sm">{m.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{m.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(m.created_at).toLocaleDateString()}
                          </span>
                          {!m.is_read && (
                            <button onClick={() => markRead(m.id)} className="text-xs text-primary hover:underline">
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{m.message}</p>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No messages yet.</p>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
