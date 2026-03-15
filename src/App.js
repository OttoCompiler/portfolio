import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";


const sampleProjects = [
  { id: 1, title: "Plant Monitor", description: "", tags: ["Flask", "python3", "react"], link: "https://github.com/OttoCompiler/plant-monitor" },
  { id: 2, title: "Web Terminal", description: "", tags: ["python3", "react"], link: "https://github.com/OttoCompiler/web-terminal" },
  { id: 8, title: "About Me", description: "", tags: ["", ""], link: "https://celiacalc.com/summary" }
];


const COLORS = [
  { bg: "#201A3E", text: "white" },   // deep night violet
  { bg: "#162447", text: "white" },   // midnight blue
  { bg: "#3F2E64", text: "white" },   // royal purple
  { bg: "#1A1A1A", text: "white" },   // black contrast
  { bg: "#2A1F4A", text: "white" },   // nebula purple
];

function Badge({ children }) {
  return (
    <span className="inline-block text-xs font-semibold px-2 py-1 rounded-md bg-[#6C4BCE] text-white shadow">
      {children}
    </span>
  );
}


export default function BauhausGallery() {
  const [query, setQuery] = React.useState("");
  const [projects, setProjects] = React.useState(sampleProjects);

  React.useEffect(() => {
    if (!query) return setProjects(sampleProjects);
    const q = query.toLowerCase();
    setProjects(
      sampleProjects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.join(" ").toLowerCase().includes(q)
      )
    );
  }, [query]);

  return (
    <div
      className="min-h-screen text-white font-sans antialiased"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, rgba(90,0,140,0.25), transparent 60%),
          radial-gradient(circle at 80% 70%, rgba(0,120,255,0.25), transparent 60%),
          #0A0A14
        `
      }}
    >
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-[#0A0A14]/70 border-b border-[#3C3C5C] shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-extrabold tracking-tight text-purple-200">
            OttoCompiler’s Public Projects
          </h1>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="px-4 py-2 rounded-full border border-[#3C3C5C] bg-[#131322] text-purple-100 placeholder-purple-300/50 w-64 shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-lg font-bold mb-4 text-purple-200">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, idx) => {
            const color = COLORS[idx % COLORS.length];

            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                style={{
                  backgroundColor: color.bg,
                  color: color.text,
                }}
                className="rounded-xl p-6 border border-[#6A5ACD] shadow-xl shadow-black/40 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-black tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-purple-100/80 leading-snug">
                    {p.description || "—"}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={p.link}
                    className="text-sm font-bold inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 underline"
                  >
                    View Project <ArrowRight size={14} />
                  </a>
                  <span className="text-xs opacity-70 text-purple-300">
                    #{p.id}
                  </span>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="mt-16 py-6 text-center text-sm text-purple-300">
        OttoCompiler {new Date().getFullYear()} 
      </footer>
    </div>
  );
}

