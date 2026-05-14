"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Code2 as Github, Briefcase as Linkedin, Terminal, Activity } from 'lucide-react';

const subtitleLines = [
  "Scaling Reliability & CI/CD Pipelines",
  "Automating Quality at Every Commit",
  "Zero-Defect Deployments, Every Time",
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const currentLine = subtitleLines[lineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentLine.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!isDeleting && charIndex === currentLine.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLineIndex((l) => (l + 1) % subtitleLines.length);
    }

    setDisplayedText(currentLine.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, lineIndex]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector("#pipeline");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center grid-bg overflow-hidden"
    >
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(16,185,129,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-20 left-8 text-emerald-500/20 font-mono text-xs hidden lg:block">
        <div>{"// SYSTEM STATUS: ONLINE"}</div>
        <div className="mt-1">{"// ENV: PRODUCTION"}</div>
        <div className="mt-1">{"// BUILD: PASSING ✓"}</div>
      </div>
      <div className="absolute top-20 right-8 text-emerald-500/20 font-mono text-xs text-right hidden lg:block">
        <div>{"v2.4.1-stable"}</div>
        <div className="mt-1">{"uptime: 99.98%"}</div>
        <div className="mt-1">{"tests: 2,847 ✓"}</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs text-emerald-400">
            AVAILABLE FOR SENIOR SQA ROLES
          </span>
        </div>

        {/* Name */}
        <h1 className="font-sans font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white mb-4 tracking-tight">
          Alex{" "}
          <span className="gradient-text text-glow">Morgan</span>
        </h1>

        {/* Title */}
        <div className="font-mono text-lg sm:text-xl lg:text-2xl text-slate-400 mb-6 flex items-center justify-center gap-3 flex-wrap">
          <span className="text-emerald-500">$</span>
          <span>Quality &amp; Automation Engineer</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500">Senior SQA</span>
        </div>

        {/* Typewriter subtitle */}
        <div className="font-mono text-base sm:text-lg lg:text-xl text-slate-300 mb-10 h-8 flex items-center justify-center">
          <span className="text-emerald-400/60 mr-2">{">"}</span>
          <span>{displayedText}</span>
          <span
            className="ml-0.5 text-emerald-400 font-bold"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            _
          </span>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
          {[
            { label: "Tests Automated", value: "2,847+" },
            { label: "CI/CD Pipelines", value: "40+" },
            { label: "Regression Speed", value: "80% ↑" },
            { label: "API Coverage", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-2xl font-bold text-emerald-400">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-slate-500 mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={handleScrollDown}
            className="group flex items-center gap-2 px-6 py-3 bg-emerald-500 text-slate-950 font-mono font-semibold text-sm rounded hover:bg-emerald-400 transition-all duration-200 shadow-emerald-glow"
          >
            <Activity className="w-4 h-4" />
            view_pipeline()
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 py-3 border border-slate-700 text-slate-300 font-mono text-sm rounded hover:border-emerald-500/50 hover:text-emerald-400 transition-all duration-200"
          >
            <Terminal className="w-4 h-4" />
            get_in_touch()
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-emerald-400 transition-colors group"
          >
            <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
            github.com/alex-morgan
          </a>
          <span className="text-slate-700">·</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-emerald-400 transition-colors group"
          >
            <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            linkedin.com/in/alex-morgan
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-emerald-400 transition-colors group"
        aria-label="Scroll down"
      >
        <span className="font-mono text-xs">scroll_down</span>
        <div className="w-5 h-8 border border-slate-700 rounded-full flex items-start justify-center pt-1.5 group-hover:border-emerald-500/50 transition-colors">
          <div className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
