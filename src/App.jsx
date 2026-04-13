import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#818cf8"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

export default function App() {
  const [repos, setRepos] = useState([]);
  const form = useRef();

  useEffect(() => {
    fetch("https://api.github.com/users/shravan-03-coder/repos")
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then(data => setRepos(data))
      .catch(err => console.error('Error fetching repos:', err));
  }, []);

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(
      "service_bd1xlel",
      "template_x1a2b3",
      form.current,
      "uYatB774gQESKib-A"
    )
      .then(() => {
        alert("Message Sent Successfully 🎉");
        form.current.reset();
      })
      .catch((error) => {
        console.log("EMAILJS ERROR DETAILS:", error);
        alert(`Email failed: ${error.text || error.message || 'Unknown error'} — see console`);
      });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#0f111a] text-slate-200 selection:bg-indigo-500/30">

      {/* BACKGROUND BLOBS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-12 py-5 glass-card z-50 border-b-0">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-xl font-bold tracking-wide">
            <span className="text-white">Shravan</span>
            <span className="text-indigo-400">.dev</span>
          </h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
          <a href="#projects" className="hover:text-indigo-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
        </motion.div>
      </nav>

      {/* HERO SECTION */}
      <section id="about" className="relative min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 md:px-12 pt-24">

        <motion.div
          className="flex-1 w-full flex flex-col justify-center text-center lg:text-left z-10"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold tracking-wider uppercase w-max mx-auto lg:mx-0">
            Welcome to my portfolio
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            AI-Driven <br />
            <span className="gradient-text">Scalable Solutions</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
            I'm Shravan Bhosale, a Computer Science student specializing in Machine Learning, NLP, and AI-driven development building scalable, data-driven applications.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <a href="#projects" className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1">
              View Work
            </a>
            <a href="./Shravan_Bhosale_Resume.pdf" download="Shravan_Bhosale_Resume.pdf" className="px-8 py-3.5 rounded-full border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-white font-medium transition-all transform hover:-translate-y-1">
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* 3D ELEMENT */}
        <motion.div
          className="flex-1 w-full h-[50vh] lg:h-[80vh] relative z-10"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
        >
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={2} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-10 max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 lg:gap-4"
        >
          {["Python", "C", "Machine Learning", "NLP", "LLMs", "React.js", "Node.js", "Generative AI"].map((skill) => (
            <div key={skill} className="px-5 py-2 glass-card rounded-full text-indigo-300 text-sm font-medium hover:bg-white/10 transition-colors cursor-default shadow-sm hover:shadow-indigo-500/20">
              {skill}
            </div>
          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured <span className="text-indigo-400">Projects</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A showcase of my recent work pulled directly from GitHub.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(repos) && repos.slice(0, 6).map((repo, idx) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 flex flex-col h-full group hover:bg-white/5 transition-all duration-300 hover:border-indigo-500/30 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(79,70,229,0.1)]"
            >
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">{repo.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {repo.description || "A repository showcasing specific web development skills and problem-solving."}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{repo.language || "Code"}</span>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Code <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <h2 className="text-3xl font-bold mb-3">Let's Work <span className="text-indigo-400">Together</span></h2>
            <p className="text-slate-400 mb-6">Have a project in mind? Send me a message and let's discuss.</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-xs md:text-sm text-indigo-200/80 font-medium">
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> bhosaleshravan26@gmail.com</span>
              <span className="hidden md:block text-slate-600">•</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> +91 7507255361</span>
              <span className="hidden md:block text-slate-600">•</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Maharashtra, India</span>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5 relative z-10">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Name</label>
                <input
                  name="from_name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400 ml-1">Email</label>
                <input
                  name="from_email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-400 ml-1">Message</label>
              <textarea
                name="message"
                placeholder="Tell me about your project..."
                required
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-none"
              />
            </div>
            <button className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(79,70,229,0.2)] hover:shadow-[0_10px_30px_rgba(79,70,229,0.4)] transform hover:-translate-y-1">
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 relative z-10 glass-card">
        <p>© {new Date().getFullYear()} Shravan Bhosale. All rights reserved.</p>
      </footer>
    </div>
  );
}
