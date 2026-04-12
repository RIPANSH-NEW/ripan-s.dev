import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Contact"];

const SKILLS = [
  { name: "React / Next.js", level: 10, icon: "⚛" },
  { name: "JavaScript", level: 88, icon: "JS" },
  { name: "HTML & CSS / Tailwind", level: 95, icon: "</>" },
  { name: "MySQL / MongoDB", level: 75, icon: "DB" },
  { name: "Git & GitHub", level: 30, icon: "⑂" },
  { name: "UI/UX Design", level: 78, icon: "✦" },
  { name: "REST API", level: 10, icon: "⇄" },
  { name: "PAWN", level: 10, icon: "♙" },
  { name: "PHP / Laravel", level: 50, icon: "ₚₕₚ" },
];

const PROJECTS = [
  {
    title: "Levista Shop",
    desc: "Website penjualan produk dengan system chat to order.",
    tags: ["Html", "Node.js", "CSS"],
    img: "./src/assets/levista.png",
    color: "#7c3aed",
  },
  {
    title: "SA-MP Dashoard",
    desc: "Dashboard SA-MP dengan register, login, create character, edit character.",
    tags: ["Next.js", "OpenAI", "Tailwind"],
    img: "./src/assets/samp.png",
    color: "#6d28d9",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function GlowOrb({ style }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(80px)",
      pointerEvents: "none",
      zIndex: 0,
      ...style
    }} />
  );
}

function GridBg() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(124,58,237,0.06) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124,58,237,0.06) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
    }} />
  );
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 2rem",
      background: scrolled ? "rgba(9,4,26,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(124,58,237,0.2)" : "none",
      transition: "all 0.3s ease",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "64px",
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "1.2rem",
        fontWeight: 700,
        background: "linear-gradient(90deg, #a855f7, #7c3aed)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        letterSpacing: "0.08em",
      }}>
        RIPAN-S<span style={{ color: "#a855f7" }}>.</span>DEV
      </div>

      {/* Desktop Nav */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}
        className="desktop-nav">
        {NAV_LINKS.map(link => (
          <button key={link}
            onClick={() => scrollTo(link)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.95rem", fontWeight: 600,
              letterSpacing: "0.1em",
              color: active === link ? "#a855f7" : "rgba(255,255,255,0.65)",
              transition: "color 0.2s",
              textTransform: "uppercase",
              padding: "4px 0",
              borderBottom: active === link ? "1px solid #a855f7" : "1px solid transparent",
            }}
          >{link}</button>
        ))}
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(v => !v)}
        style={{
          background: "none", border: "1px solid rgba(124,58,237,0.4)",
          borderRadius: "6px", padding: "6px 10px", cursor: "pointer",
          color: "#a855f7", fontSize: "1.2rem",
          display: "none",
        }}
      >☰</button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: "64px", left: 0, right: 0,
          background: "rgba(9,4,26,0.97)",
          borderBottom: "1px solid rgba(124,58,237,0.3)",
          padding: "1rem 2rem",
          display: "flex", flexDirection: "column", gap: "1rem",
          zIndex: 99,
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "1.1rem", fontWeight: 600,
                color: active === link ? "#a855f7" : "rgba(255,255,255,0.75)",
                textAlign: "left", letterSpacing: "0.1em", textTransform: "uppercase",
              }}
            >{link}</button>
          ))}
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

function HeroSection() {
  const [typed, setTyped] = useState("");
  const titles = ["Full Stack Developer", "SA-MP Develpoer", "Apaaa yaaaaa???"];
  const [ti, setTi] = useState(0);
  const [charI, setCharI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const cur = titles[ti];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting) {
        setTyped(cur.slice(0, charI + 1));
        if (charI + 1 === cur.length) {
          setTimeout(() => setDeleting(true), 1600);
        } else { setCharI(c => c + 1); }
      } else {
        setTyped(cur.slice(0, charI - 1));
        if (charI - 1 === 0) {
          setDeleting(false);
          setCharI(0);
          setTi(t => (t + 1) % titles.length);
        } else { setCharI(c => c - 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typed, deleting, charI, ti]);

  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", flexDirection: "column",
      position: "relative", overflow: "hidden",
      padding: "80px 2rem 2rem",
      textAlign: "center",
    }}>
      <GlowOrb style={{ width: 500, height: 500, background: "rgba(124,58,237,0.18)", top: "10%", left: "50%", transform: "translateX(-50%)" }} />
      <GlowOrb style={{ width: 300, height: 300, background: "rgba(168,85,247,0.12)", top: "60%", right: "5%" }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        <div style={{
          display: "inline-block",
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.8rem", fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#a855f7",
          border: "1px solid rgba(168,85,247,0.4)",
          padding: "6px 16px", borderRadius: "20px",
          marginBottom: "1.5rem",
          background: "rgba(124,58,237,0.1)",
        }}>
          ✦ Selamat Datang di Portofolio Saya ✦
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          margin: "0 0 1rem",
          color: "#fff",
          letterSpacing: "0.02em",
        }}>
          Hai, Saya{" "}
          <span style={{
            background: "linear-gradient(135deg, #a855f7, #7c3aed, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Rafa</span>
        </h1>

        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: "rgba(255,255,255,0.7)",
          marginBottom: "2rem",
          minHeight: "2em",
        }}>
          <span style={{ color: "#a855f7" }}>&gt;</span>{" "}
          <span>{typed}</span>
          <span style={{ borderRight: "2px solid #a855f7", animation: "blink 1s infinite", marginLeft: 2 }} />
        </div>

        <p style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "rgba(255,255,255,0.55)",
          maxWidth: 560, margin: "0 auto 2.5rem",
          lineHeight: 1.7, fontWeight: 500,
        }}>
          Membangun pengalaman digital yang indah dan fungsional — dari antarmuka yang intuitif hingga sistem backend yang andal.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "14px 32px",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff", border: "none", borderRadius: "8px",
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(124,58,237,0.5)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 36px rgba(124,58,237,0.7)"; }}
            onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 0 24px rgba(124,58,237,0.5)"; }}
          >Lihat Proyek</button>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "14px 32px",
              background: "transparent",
              color: "#a855f7",
              border: "1px solid rgba(168,85,247,0.5)",
              borderRadius: "8px", cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "rgba(124,58,237,0.15)"; e.target.style.borderColor = "#a855f7"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(168,85,247,0.5)"; }}
          >Hubungi Saya</button>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "2rem", justifyContent: "center",
          marginTop: "3.5rem", flexWrap: "wrap",
        }}>
          {[["3+", "Tahun Pengalaman"], ["5+", "Proyek Selesai"], ["5+", "Klien Puas"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "1.8rem", fontWeight: 700,
                background: "linear-gradient(135deg, #a855f7, #c084fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>{num}</div>
              <div style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.8rem", letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", marginTop: 4,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        color: "rgba(255,255,255,0.3)", fontSize: "0.7rem",
        fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.2em",
        animation: "bounce 2s infinite",
      }}>
        SCROLL
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(168,85,247,0.6), transparent)" }} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{
      minHeight: "80vh", display: "flex", alignItems: "center",
      padding: "100px 2rem",
      position: "relative",
    }}>
      <GlowOrb style={{ width: 400, height: 400, background: "rgba(109,40,217,0.15)", top: "20%", left: "-5%" }} />
      <div style={{
        maxWidth: 1100, margin: "0 auto", width: "100%",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
        alignItems: "center", position: "relative", zIndex: 1,
      }} className="about-grid">
        {/* Avatar side */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(-40px)",
          transition: "all 0.8s ease",
          display: "flex", justifyContent: "center",
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: 280, height: 280,
              borderRadius: "24px",
              background: "linear-gradient(135deg, #7c3aed, #4c1d95)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "7rem",
              boxShadow: "0 0 60px rgba(124,58,237,0.4)",
              position: "relative", overflow: "hidden",
            }}>
              <img
                src="./src/assets/profile.jpeg"
                alt="Profile"
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  position: "relative", zIndex: 1,
                  borderRadius: "24px",
                }}
              />
            </div>
            {/* Floating badge */}
            <div style={{
              position: "absolute", bottom: -16, right: -16,
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              borderRadius: "12px", padding: "12px 20px",
              fontFamily: "'Orbitron', monospace",
              fontSize: "0.75rem", color: "#fff",
              boxShadow: "0 0 20px rgba(124,58,237,0.6)",
            }}>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>3+</div>
              <div style={{ opacity: 0.85, fontSize: "0.65rem", letterSpacing: "0.1em" }}>TAHUN EXP</div>
            </div>
            {/* Corner accent */}
            <div style={{
              position: "absolute", top: -12, left: -12, width: 24, height: 24,
              border: "2px solid #a855f7", borderRadius: "4px",
            }} />
          </div>
        </div>
 
        {/* Text side */}
        <div style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.8s ease 0.2s",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#a855f7",
            marginBottom: "0.75rem",
          }}>// TENTANG SAYA</div>
 
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.15, margin: "0 0 1.25rem",
          }}>
            Developer Kreatif &{" "}
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Problem Solver</span>
          </h2>
 
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1.05rem", fontWeight: 500,
            color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
            marginBottom: "1.25rem",
          }}>
            Saya adalah Full Stack Developer dengan passion mendalam terhadap teknologi web modern. Berpengalaman membangun aplikasi yang skalabel, performant, dan memiliki UX yang luar biasa.
          </p>
 
          <p style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1.05rem", fontWeight: 500,
            color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
            marginBottom: "2rem",
          }}>
            Dari frontend yang responsif hingga backend yang andal, saya memastikan setiap baris kode berkontribusi pada produk yang solid. Saya percaya bahwa kode yang baik adalah seni.
          </p>
 
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {["React", "Node.js", "MySQL", "Next.js", "TypeScript", "MongoDB"].map(tag => (
              <span key={tag} style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.75rem",
                border: "1px solid rgba(168,85,247,0.4)",
                borderRadius: "6px",
                padding: "6px 14px",
                color: "#c084fc",
                background: "rgba(124,58,237,0.1)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
 
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}

function SkillBar({ name, level, icon, delay }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(124,58,237,0.2)",
      borderRadius: "12px", padding: "1.25rem",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(20px)",
      transition: `all 0.6s ease ${delay}ms`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.8rem", color: "#a855f7",
            background: "rgba(124,58,237,0.2)",
            border: "1px solid rgba(168,85,247,0.3)",
            borderRadius: "6px", padding: "3px 8px",
          }}>{icon}</span>
          <span style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "1rem", fontWeight: 600,
            color: "rgba(255,255,255,0.85)",
          }}>{name}</span>
        </div>
        <span style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "0.8rem", color: "#a855f7",
        }}>{level}%</span>
      </div>
      <div style={{
        height: 6, borderRadius: "3px",
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: inView ? `${level}%` : "0%",
          borderRadius: "3px",
          background: "linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)",
          transition: `width 1.2s ease ${delay + 200}ms`,
          boxShadow: "0 0 8px rgba(168,85,247,0.6)",
        }} />
      </div>
    </div>
  );
}

function SkillsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="skills" style={{
      padding: "100px 2rem",
      position: "relative",
    }}>
      <GlowOrb style={{ width: 350, height: 350, background: "rgba(124,58,237,0.12)", top: "30%", right: "-5%" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#a855f7",
            marginBottom: "0.75rem",
          }}>// KEAHLIAN</div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 700, color: "#fff", margin: 0,
          }}>Tech <span style={{
            background: "linear-gradient(135deg, #a855f7, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Stack</span></h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
        }}>
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: `1px solid ${hovered ? "rgba(168,85,247,0.5)" : "rgba(124,58,237,0.2)"}`,
        background: "rgba(255,255,255,0.02)",
        opacity: inView ? 1 : 0,
        transform: inView ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(30px)",
        transition: `all 0.5s ease ${delay}ms`,
        boxShadow: hovered ? `0 20px 60px rgba(124,58,237,0.25)` : "none",
        cursor: "pointer",
      }}>
      {/* Image */}
      <div style={{
        height: 200, overflow: "hidden",
        position: "relative",
      }}>
        <img src={project.img} alt={project.title}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: "brightness(0.7) saturate(0.8)",
          }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, transparent 40%, ${project.color}99)`,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "1rem", fontWeight: 700,
          color: "#fff", margin: "0 0 0.75rem",
        }}>{project.title}</h3>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.95rem", fontWeight: 500,
          color: "rgba(255,255,255,0.55)",
          lineHeight: 1.7, margin: "0 0 1rem",
        }}>{project.desc}</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.7rem",
              background: "rgba(124,58,237,0.2)",
              border: "1px solid rgba(168,85,247,0.3)",
              borderRadius: "4px", padding: "4px 10px",
              color: "#c084fc",
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [ref, inView] = useInView();
  return (
    <section id="projects" style={{ padding: "100px 2rem", position: "relative" }}>
      <GlowOrb style={{ width: 400, height: 400, background: "rgba(109,40,217,0.12)", bottom: "10%", left: "5%" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#a855f7",
            marginBottom: "0.75rem",
          }}>// PORTOFOLIO</div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 700, color: "#fff", margin: 0,
          }}>Proyek <span style={{
            background: "linear-gradient(135deg, #a855f7, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Terbaru</span></h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.msg) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", email: "", msg: "" });
    }
  };

  const inputStyle = {
    width: "100%",
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "1rem", fontWeight: 500,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const CONTACTS = [
    { icon: "📧", label: "Email", value: "rafa@email.com", href: "mailto:rafa@email.com" },
    { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/rafa", href: "#" },
    { icon: "🐙", label: "GitHub", value: "github.com/rafa", href: "#" },
    { icon: "📱", label: "WhatsApp", value: "+62 812 3456 7890", href: "https://wa.me/6281234567890" },
  ];

  return (
    <section id="contact" style={{
      padding: "100px 2rem 120px",
      position: "relative",
    }}>
      <GlowOrb style={{ width: 500, height: 500, background: "rgba(124,58,237,0.12)", top: "20%", right: "10%" }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div ref={ref} style={{
          textAlign: "center", marginBottom: "3.5rem",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease",
        }}>
          <div style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: "0.75rem", letterSpacing: "0.3em",
            textTransform: "uppercase", color: "#a855f7",
            marginBottom: "0.75rem",
          }}>// KONTAK</div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 700, color: "#fff", margin: 0,
          }}>Mari <span style={{
            background: "linear-gradient(135deg, #a855f7, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>Terhubung</span></h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "3rem", alignItems: "start",
        }} className="contact-grid">
          {/* Left: Info */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(-30px)",
            transition: "all 0.7s ease 0.2s",
          }}>
            <p style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "1.05rem", fontWeight: 500,
              color: "rgba(255,255,255,0.6)", lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              Punya proyek menarik? Ingin berkolaborasi? Atau sekadar say hi? Jangan ragu untuk menghubungi saya. Saya selalu terbuka untuk peluang baru.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {CONTACTS.map(c => (
                <a key={c.label} href={c.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "1rem 1.25rem",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(124,58,237,0.2)",
                    borderRadius: "10px",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    color: "inherit",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)"; e.currentTarget.style.background = "rgba(124,58,237,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
                  <div>
                    <div style={{
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "0.7rem", letterSpacing: "0.2em",
                      textTransform: "uppercase", color: "#a855f7",
                      marginBottom: 2,
                    }}>{c.label}</div>
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: "0.85rem", color: "rgba(255,255,255,0.75)",
                    }}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0)" : "translateX(30px)",
            transition: "all 0.7s ease 0.3s",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(124,58,237,0.2)",
            borderRadius: "16px",
            padding: "2rem",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                placeholder="Nama Lengkap"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(124,58,237,0.3)"}
              />
              <input
                placeholder="Alamat Email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(124,58,237,0.3)"}
              />
              <textarea
                placeholder="Pesan Anda..."
                value={form.msg}
                onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(124,58,237,0.3)"}
              />
              <button
                onClick={handleSubmit}
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 700, fontSize: "1rem",
                  letterSpacing: "0.15em", textTransform: "uppercase",
                  padding: "16px",
                  background: sent ? "rgba(34,197,94,0.2)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: sent ? "#4ade80" : "#fff",
                  border: sent ? "1px solid rgba(74,222,128,0.4)" : "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  boxShadow: sent ? "none" : "0 0 20px rgba(124,58,237,0.4)",
                }}
              >{sent ? "✓ Pesan Terkirim!" : "Kirim Pesan →"}</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(124,58,237,0.2)",
      padding: "2rem",
      textAlign: "center",
      background: "rgba(0,0,0,0.3)",
    }}>
      <div style={{
        fontFamily: "'Orbitron', monospace",
        fontSize: "1rem", fontWeight: 700,
        background: "linear-gradient(90deg, #a855f7, #7c3aed)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "0.5rem",
      }}>RAFA.DEV</div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: "0.85rem", color: "rgba(255,255,255,0.3)",
        letterSpacing: "0.1em",
      }}>© 2025 Rafa Ripansyah. Dibuat dengan ❤️ dan ☕</div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(n => ({
        id: n.toLowerCase(),
        el: document.getElementById(n.toLowerCase()),
      }));
      for (const s of sections.reverse()) {
        if (s.el && window.scrollY >= s.el.offsetTop - 120) {
          setActive(NAV_LINKS.find(n => n.toLowerCase() === s.id) || "Home");
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#09041a",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <GridBg />
      <Navbar active={active} setActive={setActive} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}