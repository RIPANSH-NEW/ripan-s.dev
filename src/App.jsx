import { useState, useEffect, useRef } from "react";
import levistaImg from "./assets/levista.png";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React / Next.js", level: 10, icon: "⚛" },
  { name: "JavaScript", level: 75, icon: "𝗝𝗦" },
  { name: "UI/UX Design", level: 45, icon: "✦" },
  { name: "Tailwind CSS", level: 50, icon: "◈" },
  { name: "MySQL / MongoDB", level: 80, icon: "◉" },
  { name: "PAWN", level: 90, icon: "♙" },
  { name: "HTML", level: 90, icon: "</html>" },
  { name: "PHP / Laravel ", level: 90, icon: "ₚₕₚ" },
];

const PROJECTS = [
  {
    title: "Levista Shop",
    desc: "Landing page produk luxury perfume dengan animasi SVG, parallax scroll, dan desain hitam-emas.",
    tags: ["HTML", "CSS", "GSAP"],
    color: "#A78BFA",
    year: "2026",
    image: "levistaImg",
  },
  {
    title: "SAMP UCP",
    desc: "User Control Panel untuk game server SA-MP dengan backend PHP/MySQL, autentikasi, dan 11 API endpoint.",
    tags: ["PHP", "MySQL", "JWT"],
    color: "#7C3AED",
    year: "2025",
    image: "sampImg",
  },
];


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SkillBar({ name, level, icon, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: "#E9D5FF", fontSize: 14, fontFamily: "'Space Mono', monospace" }}>
          <span style={{ color: "#A78BFA", marginRight: 8 }}>{icon}</span>{name}
        </span>
        <span style={{ color: "#7C3AED", fontSize: 13, fontFamily: "'Space Mono', monospace" }}>{level}%</span>
      </div>
      <div style={{ background: "#1E1133", height: 6, borderRadius: 999, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #7C3AED, #A78BFA)",
          borderRadius: 999,
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          boxShadow: "0 0 12px #8B5CF680",
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useInView();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1A0F2E" : "#130C22",
        border: `1px solid ${hovered ? project.color : "#2D1B4E"}`,
        borderRadius: 16,
        padding: "20px",
        cursor: "default",
        transition: "all 0.3s ease",
        transform: visible ? `translateY(${hovered ? -6 : 0}px)` : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered ? `0 20px 40px ${project.color}22` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 🔥 IMAGE */}
      <div style={{ overflow: "hidden", borderRadius: 12, marginBottom: 16 }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "clamp(140px, 25vw, 180px)",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
      </div>

      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 80,
          height: 80,
          background: `radial-gradient(circle at top right, ${project.color}30, transparent 70%)`,
        }}
      />

      {/* Title */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#EDE9FE", fontFamily: "'Syne', sans-serif" }}>
          {project.title}
        </span>
        <span style={{ fontSize: 12, color: project.color, fontFamily: "'Space Mono', monospace", opacity: 0.8 }}>
          {project.year}
        </span>
      </div>

      {/* Desc */}
      <p style={{ color: "#9CA3AF", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
        {project.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              background: `${project.color}18`,
              border: `1px solid ${project.color}44`,
              color: project.color,
              fontSize: 11,
              padding: "3px 10px",
              borderRadius: 999,
              fontFamily: "'Space Mono', monospace",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const phrases = ["Full Stack Developer", "UI/UX Designer", "Creative Coder"];
  const phraseRef = useRef(0);
  const charRef = useRef(0);
  const dirRef = useRef(1);

  useEffect(() => {
    const loop = setInterval(() => {
      const phrase = phrases[phraseRef.current];
      if (dirRef.current === 1) {
        charRef.current++;
        setTypedText(phrase.slice(0, charRef.current));
        if (charRef.current === phrase.length) { dirRef.current = -1; setTimeout(() => {}, 1200); }
      } else {
        charRef.current--;
        setTypedText(phrase.slice(0, charRef.current));
        if (charRef.current === 0) {
          dirRef.current = 1;
          phraseRef.current = (phraseRef.current + 1) % phrases.length;
        }
      }
    }, 80);
    return () => clearInterval(loop);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  const S = {
    page: { background: "#0B0714", color: "#EDE9FE", minHeight: "100vh", fontFamily: "'Syne', sans-serif", overflowX: "hidden" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "#0D0919EE" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid #2D1B4E" : "none",
      transition: "all 0.4s ease",
      padding: "0 5%",
    },
    navInner: { maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" },
    logo: { fontSize: 22, fontWeight: 700, color: "#A78BFA", letterSpacing: "-0.5px", cursor: "pointer" },
    section: { maxWidth: 1100, margin: "0 auto", padding: "100px 5%" },
    sectionTitle: { fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700, color: "#EDE9FE", marginBottom: 12, letterSpacing: "-1px" },
    sectionSub: { color: "#7C3AED", fontFamily: "'Space Mono', monospace", fontSize: 13, marginBottom: 16, letterSpacing: 2 },
    divider: { width: 60, height: 3, background: "linear-gradient(90deg, #7C3AED, transparent)", borderRadius: 999, marginBottom: 48 },
  };

  return (
    <div style={S.page}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={S.nav}>
        <div style={S.navInner}>
          <div style={S.logo} onClick={() => scrollTo("Home")}>
            <span style={{ color: "#7C3AED" }}>{"<"}</span>RIPAN-S
            <span style={{ color: "#A78BFA" }}>Dev</span>
            <span style={{ color: "#7C3AED" }}>{"/>"}</span>
          </div>
          <div style={{ display: "flex", gap: 8, "@media(max-width:768px)": { display: "none" } }}>
            {NAV_LINKS.map(n => (
              <button key={n} onClick={() => scrollTo(n)}
                style={{
                  background: "none", border: activeNav === n ? "1px solid #7C3AED" : "1px solid transparent",
                  color: activeNav === n ? "#A78BFA" : "#9CA3AF",
                  fontSize: 13, padding: "6px 16px", borderRadius: 999, cursor: "pointer",
                  fontFamily: "'Space Mono', monospace",
                  transition: "all 0.2s",
                }}>
                {n}
              </button>
            ))}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "1px solid #2D1B4E", color: "#A78BFA",
            padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 18,
            display: "none",
          }}>☰</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "#0D0919F5", backdropFilter: "blur(20px)",
          padding: "20px 5%", borderBottom: "1px solid #2D1B4E",
        }}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{
              display: "block", width: "100%", textAlign: "left",
              background: "none", border: "none", color: "#C4B5FD",
              fontSize: 16, padding: "12px 0", cursor: "pointer",
              fontFamily: "'Syne', sans-serif", fontWeight: 600,
              borderBottom: "1px solid #1E1133",
            }}>{n}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* BG orbs */}
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #7C3AED18 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #A78BFA12 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 1, height: 1 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: 2, height: 2, borderRadius: "50%",
              background: "#A78BFA",
              top: `${Math.sin(i * 1.05) * 200}px`,
              left: `${Math.cos(i * 1.05) * 300}px`,
              opacity: 0.4,
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5%", width: "100%" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", color: "#7C3AED", fontSize: 13, letterSpacing: 3, marginBottom: 20 }}>
            ▸ AVAILABLE FOR HIRE
          </div>
          <h1 style={{ fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 800, color: "#EDE9FE", lineHeight: 1.1, letterSpacing: "-3px", margin: "0 0 20px" }}>
            Halo, Saya
            <br />
            <span style={{ color: "#A78BFA" }}>Rafa Ripansyah</span>
          </h1>
          <div style={{ fontSize: "clamp(18px, 3vw, 28px)", color: "#9CA3AF", marginBottom: 36, fontFamily: "'Space Mono', monospace", minHeight: 40 }}>
            <span style={{ color: "#C4B5FD" }}>{typedText}</span>
            <span style={{ color: "#7C3AED", animation: "blink 1s infinite" }}>|</span>
          </div>
          <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.8, maxWidth: 520, marginBottom: 48 }}>
            Saya membangun pengalaman digital yang indah, cepat, dan fungsional — dari konsep hingga produk siap pakai.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{
              background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
              border: "none", color: "#fff", fontSize: 14, padding: "14px 32px",
              borderRadius: 999, cursor: "pointer", fontFamily: "'Space Mono', monospace",
              fontWeight: 700, letterSpacing: 1,
              boxShadow: "0 8px 30px #7C3AED50",
              transition: "transform 0.2s",
            }}>
              Lihat Proyek ↗
            </button>
            <button onClick={() => scrollTo("Contact")} style={{
              background: "none", border: "1px solid #7C3AED", color: "#A78BFA",
              fontSize: 14, padding: "14px 32px", borderRadius: 999, cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              transition: "all 0.2s",
            }}>
              Hubungi Saya
            </button>
          </div>
          <div style={{ marginTop: 80, display: "flex", gap: 40 }}>
            {[["10+", "Proyek"], ["3+", "Tahun"], ["100%", "Komitmen"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 800, color: "#A78BFA", letterSpacing: "-1px" }}>{num}</div>
                <div style={{ color: "#6B7280", fontSize: 12, fontFamily: "'Space Mono', monospace", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div style={S.section}>
          <div style={S.sectionSub}>// ABOUT ME</div>
          <h2 style={S.sectionTitle}>Who am I</h2>
          <div style={S.divider} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "center" }}>
            <div>
              <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
                Saya adalah seorang <span style={{ color: "#A78BFA" }}>Full Stack Developer</span> yang passionate dalam membangun produk digital yang tidak hanya berfungsi dengan baik, tapi juga memiliki estetika tinggi.
              </p>
              <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.9, marginBottom: 32 }}>
                Dengan pengalaman lebih dari <span style={{ color: "#A78BFA" }}>3 tahun</span> di bidang web development, saya telah mengerjakan berbagai proyek — dari landing page komersial hingga platform game server yang kompleks.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["React", "Node.js", "PHP", "MySQL", "PAWN"].map(t => (
                  <span key={t} style={{ background: "#1A0F2E", border: "1px solid #2D1B4E", color: "#C4B5FD", fontSize: 12, padding: "6px 14px", borderRadius: 8, fontFamily: "'Space Mono', monospace" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ background: "#130C22", border: "1px solid #2D1B4E", borderRadius: 20, padding: 32 }}>
              {[
                ["📍", "Majalengka, Jawa Barat"],
                ["🎓", "SMK — Teknik Kendaraan Ringan"],
                ["💼", "SA-MP DEV & Freelance"],
                ["🌐", "Bahasa: Indonesia, English"],
                ["⚡", "Suka: Coffee, Dark Mode, Clean Code"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <span style={{ color: "#C4B5FD", fontSize: 14, fontFamily: "'Space Mono', monospace", lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#0D0919" }}>
        <div style={S.section}>
          <div style={S.sectionSub}>// SKILL</div>
          <h2 style={S.sectionTitle}>Tech Stack</h2>
          <div style={S.divider} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0 60px" }}>
            {SKILLS.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div style={S.section}>
          <div style={S.sectionSub}>// PORTOFOLIO</div>
          <h2 style={S.sectionTitle}>Project</h2>
          <div style={S.divider} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div style={S.section}>
          <div style={S.sectionSub}>// CONTACT</div>
          <h2 style={S.sectionTitle}>Contact Person</h2>
          <div style={S.divider} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "start" }}>
            <div>
              <p style={{ color: "#9CA3AF", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
                Punya proyek menarik? Atau sekadar ingin ngobrol tentang web development? Jangan ragu untuk menghubungi saya!
              </p>
              {[
                ["📧", "Email", "rafaripansyah47@gmail.com"],
                ["📱", "WhatsApp", "+62 851-2999-2576"],
                ["🐙", "GitHub", "github.com/RIPANSH-NEW"],
                ["💼", "Instagram", "@rfaa_.ripannsyh"],
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, background: "#1A0F2E", border: "1px solid #2D1B4E", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{icon}</div>
                  <div>
                    <div style={{ color: "#6B7280", fontSize: 11, fontFamily: "'Space Mono', monospace" }}>{label}</div>
                    <div style={{ color: "#C4B5FD", fontSize: 14 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #1E1133", padding: "32px 5%", textAlign: "center" }}>
        <div style={{ color: "#A78BFA", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
          <span style={{ color: "#7C3AED" }}>{"<"}</span>RIPANA-SDev<span style={{ color: "#7C3AED" }}>{"/>"}</span>
        </div>
        <div style={{ color: "#4B5563", fontSize: 12, fontFamily: "'Space Mono', monospace" }}>
          © 2026 RIPAN-S DEV
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1 } 51%, 100% { opacity: 0 } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px }
        ::-webkit-scrollbar-track { background: #0B0714 }
        ::-webkit-scrollbar-thumb { background: #7C3AED; border-radius: 3px }
        input::placeholder, textarea::placeholder { color: #374151 }
        input:focus, textarea:focus { border-color: #7C3AED !important; box-shadow: 0 0 0 2px #7C3AED30 }
        button:hover { opacity: 0.9; transform: translateY(-1px) }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important }
          .mobile-menu-btn { display: block !important }
        }
      `}</style>
    </div>
  );
}
