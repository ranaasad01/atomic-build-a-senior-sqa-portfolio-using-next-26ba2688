"use client";

import { Code2 as Github, Briefcase as Linkedin, Mail, Terminal, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative border-t border-slate-800">
      {/* Top glow separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)",
        }}
      />

      {/* Contact section */}
      <div className="py-20 px-4 grid-bg">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: CTA */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-emerald-500 text-sm">06.</span>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                  Get In Touch
                </span>
              </div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-4">
                Let&apos;s Build
                <br />
                <span className="gradient-text">Reliable Systems</span>
              </h2>
              <p className="font-mono text-sm text-slate-400 leading-relaxed mb-8 max-w-md">
                Open to Senior SQA, Automation Lead, and Quality Engineering
                roles. I help teams ship faster with confidence — through
                automation, observability, and zero-downtime deployments.
              </p>

              <div className="space-y-3">
                <a
                  href="mailto:alex.morgan@example.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-200">
                    <Mail className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500">Email</div>
                    <div className="font-mono text-sm text-slate-300 group-hover:text-emerald-400 transition-colors">
                      alex.morgan@example.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-200">
                    <Github className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500">GitHub</div>
                    <div className="font-mono text-sm text-slate-300 group-hover:text-emerald-400 transition-colors">
                      github.com/alex-morgan
                    </div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-200">
                    <Linkedin className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-slate-500">LinkedIn</div>
                    <div className="font-mono text-sm text-slate-300 group-hover:text-emerald-400 transition-colors">
                      linkedin.com/in/alex-morgan
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right: availability card */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-sm text-emerald-400 font-medium">
                  Available for New Opportunities
                </span>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  { label: "Role", value: "Senior SQA / Automation Lead" },
                  { label: "Type", value: "Full-time / Contract" },
                  { label: "Location", value: "Remote / Hybrid (US/EU)" },
                  { label: "Notice", value: "2 weeks" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-800">
                    <span className="font-mono text-xs text-slate-500">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-slate-300">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <a
                  href="mailto:alex.morgan@example.com"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-500 text-slate-950 font-mono font-semibold text-sm rounded hover:bg-emerald-400 transition-all duration-200"
                >
                  <Mail className="w-4 h-4" />
                  send_message()
                </a>
                <a
                  href="/resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-slate-700 text-slate-300 font-mono text-sm rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200"
                >
                  <Terminal className="w-4 h-4" />
                  download_resume()
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60 py-6 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs text-slate-500">
              <span className="text-emerald-500">~/</span>alex-morgan
            </span>
            <span className="text-slate-700 mx-2">·</span>
            <span className="font-mono text-xs text-slate-600">
              Built with Next.js 14 &amp; Tailwind CSS
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-slate-600">
              &copy; {new Date().getFullYear()} Alex Morgan
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-emerald-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-emerald-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 font-mono text-xs text-slate-600 hover:text-emerald-400 transition-colors group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              back_to_top()
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
