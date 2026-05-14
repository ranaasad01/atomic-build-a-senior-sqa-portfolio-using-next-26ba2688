"use client";

import { useState, useEffect } from "react";
import { Menu, X, Terminal } from 'lucide-react';

const navLinks = [
  { label: "Pipeline", href: "#pipeline" },
  { label: "Terminal", href: "#terminal" },
  { label: "Skills", href: "#skills" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{ transition: "all 0.3s" }}
      className={
        "fixed top-0 left-0 right-0 z-50 " +
        (scrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-emerald-500/20 shadow-lg"
          : "bg-transparent")
      }
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded border border-emerald-500/50 flex items-center justify-center group-hover:border-emerald-400 transition-all duration-300">
              <Terminal className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="font-mono text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">
              <span className="text-emerald-500">~/</span>alex-morgan
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="font-mono text-xs text-slate-400 hover:text-emerald-400 px-3 py-2 rounded transition-all duration-200 hover:bg-emerald-500/10 relative group"
              >
                <span className="text-emerald-500/60 mr-1">./</span>
                {link.label.toLowerCase()}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-emerald-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="ml-4 font-mono text-xs px-4 py-2 border border-emerald-500 text-emerald-400 rounded hover:bg-emerald-500 hover:text-slate-950 transition-all duration-200 font-semibold"
            >
              hire_me()
            </a>
          </div>

          <button
            className="md:hidden text-slate-400 hover:text-emerald-400 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-950/98 backdrop-blur-md border-b border-emerald-500/20">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="block font-mono text-sm text-slate-400 hover:text-emerald-400 py-2 px-3 rounded hover:bg-emerald-500/10 transition-all duration-200"
              >
                <span className="text-emerald-500/60">$ </span>
                {link.label.toLowerCase()}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="block font-mono text-sm text-center mt-3 px-4 py-2 border border-emerald-500 text-emerald-400 rounded hover:bg-emerald-500 hover:text-slate-950 transition-all duration-200"
            >
              hire_me()
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
