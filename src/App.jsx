import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Cube() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#38bdf8" />
    </mesh>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [repos, setRepos] = useState([]);

  // FETCH GITHUB PROJECTS
  useEffect(() => {
    fetch("https://api.github.com/users/shravan-03-coder/repos")
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);

  // EMAIL FUNCTION
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm(
      "Shravan26",
      "Shravan26",
      e.target,
      "uYatB774gQESKib-A"
    ).then(() => alert("Message sent successfully!"));

    e.target.reset();
  }

  return (
    <div className={dark ? "bg-slate-900 text-gray-200" : "bg-white text-slate-900"}>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-8 py-4 backdrop-blur bg-black/40 z-50">
        <h1 className="text-sky-400 font-bold">Shravan Bhosale</h1>
        <div className="space-x-6">
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
          <button onClick={() => setDark(!dark)} className="px-3 py-1 bg-sky-400 text-black rounded">
            {dark ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      {/* HERO WITH 3D */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-bold">
          Shravan Bhosale
        </motion.h1>
        <p className="text-sky-400 mt-2">Frontend Developer | React</p>

        <div className="w-full h-64 mt-6">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Cube />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </section>

      {/* PROJECTS FROM GITHUB */}
      <section id="projects" className="py-24 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-10">Live GitHub Projects</h2>
        <div className="grid md:grid-cols-3 gap-6 px-6">
          {repos.slice(0,6).map(repo => (
            <motion.div whileHover={{ y: -10 }} key={repo.id} className="p-6 bg-slate-800 rounded-xl">
              <h3 className="font-bold">{repo.name}</h3>
              <p className="text-gray-400 text-sm">{repo.description}</p>
              <a href={repo.html_url} target="_blank" className="text-sky-400">View Code</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT WITH EMAILJS */}
      <section id="contact" className="py-24 bg-black/30">
        <h2 className="text-center text-3xl font-bold mb-8">Contact Me</h2>
        <form onSubmit={sendEmail} className="max-w-md mx-auto flex flex-col gap-4 px-4">
          <input name="from_name" placeholder="Name" required className="p-2 rounded" />
          <input name="from_email" placeholder="Email" required className="p-2 rounded" />
          <textarea name="message" placeholder="Message" required className="p-2 rounded" />
          <button className="bg-sky-400 text-black py-2 rounded font-bold">Send Message</button>
        </form>
      </section>

      {/* RESUME */}
      <section className="py-16 text-center">
        <a
  href="/ShravanBhosale_InternshalaResume.pdf"
  download
  className="px-6 py-3 bg-blue-600 text-white rounded-lg"
>
  Download Resume
</a>

        
      </section>

      <footer className="py-6 text-center text-gray-400 bg-black/50">
        © 2025 Shravan Bhosale
      </footer>
    </div>
  );
}
