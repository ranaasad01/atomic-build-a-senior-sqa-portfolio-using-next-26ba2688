"use client";

import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  category: string;
  proficiency: number;
  description: string;
  color: string;
  icon: React.ReactNode;
  tags: string[];
}

function PlaywrightIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#2EAD33" opacity="0.15" />
      <path d="M8 10 L16 6 L24 10 L24 22 L16 26 L8 22 Z" stroke="#2EAD33" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="4" fill="#2EAD33" />
    </svg>
  );
}

function K6Icon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#7D64FF" opacity="0.15" />
      <text x="5" y="22" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="#7D64FF">k6</text>
    </svg>
  );
}

function PostmanIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#FF6C37" opacity="0.15" />
      <circle cx="16" cy="16" r="8" stroke="#FF6C37" strokeWidth="1.5" fill="none" />
      <path d="M16 8 L20 16 L16 24 L12 16 Z" fill="#FF6C37" opacity="0.6" />
      <circle cx="16" cy="16" r="2.5" fill="#FF6C37" />
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="4" fill="#2496ED" opacity="0.15" />
      <rect x="6" y="14" width="4" height="3" rx="0.5" fill="#2496ED" />
      <rect x="11" y="14" width="4" height="3" rx="0.5" fill="#2496ED" />
      <rect x="16" y="14" width="4" height="3" rx="0.5" fill="#2496ED" />
      <rect x="11" y="10" width="4" height="3" rx="0.5" fill="#2496ED" />
      <rect x="16" y="10" width="4" height="3" rx="0.5" fill="#2496ED" />
    </svg>
  );
}

function GithubActionsIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#2088FF" opacity="0.15" />
      <circle cx="16" cy="16" r="6" stroke="#2088FF" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="2" fill="#2088FF" />
      <path d="M16 6 L16 10" stroke="#2088FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 22 L16 26" stroke="#2088FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 16 L10 16" stroke="#2088FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M22 16 L26 16" stroke="#2088FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CypressIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#69D3A7" opacity="0.15" />
      <circle cx="16" cy="16" r="8" stroke="#69D3A7" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="2" fill="#69D3A7" />
    </svg>
  );
}

function JestIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#C21325" opacity="0.15" />
      <text x="10" y="21" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="#C21325">Jest</text>
    </svg>
  );
}

function GrafanaIcon() {
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
      <circle cx="16" cy="16" r="14" fill="#F46800" opacity="0.15" />
      <path d="M8 22 L12 14 L16 18 L20 10 L24 16" stroke="#F46800" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const skills: Skill[] = [
  {
    name: "Playwright",
    category: "E2E Testing",
    proficiency: 95,
    description: "Cross-browser automation across Chromium, Firefox & WebKit with parallel execution and visual regression.",
    color: "#2EAD33",
    icon: <PlaywrightIcon />,
    tags: ["TypeScript", "Cross-browser", "Visual Regression"],
  },
  {
    name: "K6",
    category: "Performance",
    proficiency: 90,
    description: "Load testing with custom thresholds, P95 latency gates, and Grafana dashboards for real-time metrics.",
    color: "#7D64FF",
    icon: <K6Icon />,
    tags: ["Load Testing", "Thresholds", "Grafana"],
  },
  {
    name: "Postman / Newman",
    category: "API Testing",
    proficiency: 95,
    description: "API contract testing, schema validation, and automated collection runs integrated into CI pipelines.",
    color: "#FF6C37",
    icon: <PostmanIcon />,
    tags: ["REST", "GraphQL", "Contract Testing"],
  },
  {
    name: "Docker",
    category: "DevOps",
    proficiency: 85,
    description: "Containerized test environments, multi-stage builds, and isolated test runners for consistent CI execution.",
    color: "#2496ED",
    icon: <DockerIcon />,
    tags: ["Containers", "Compose", "CI Isolation"],
  },
  {
    name: "GitHub Actions",
    category: "CI/CD",
    proficiency: 92,
    description: "End-to-end pipeline automation with matrix builds, environment gates, and deployment workflows.",
    color: "#2088FF",
    icon: <GithubActionsIcon />,
    tags: ["Pipelines", "Matrix Builds", "Secrets"],
  },
  {
    name: "Cypress",
    category: "E2E Testing",
    proficiency: 88,
    description: "Component and integration testing with real-time reloading, network stubbing, and visual snapshots.",
    color: "#69D3A7",
    icon: <CypressIcon />,
    tags: ["Component", "Intercept", "Snapshots"],
  },
  {
    name: "Jest",
    category: "Unit Testing",
    proficiency: 90,
    description: "Unit and integration test suites with coverage thresholds, mocking, and snapshot testing.",
    color: "#C21325",
    icon: <JestIcon />,
    tags: ["Unit", "Mocking", "Coverage"],
  },
  {
    name: "Grafana",
    category: "Observability",
    proficiency: 80,
    description: "Real-time dashboards for test metrics, SLA monitoring, and performance trend analysis.",
    color: "#F46800",
    icon: <GrafanaIcon />,
    tags: ["Dashboards", "Alerts", "SLA"],
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const [animated, setAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setAnimated(true), index * 80);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const cardStyle: React.CSSProperties = {
    opacity: animated ? 1 : 0,
    transform: animated ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.5s ease " + (index * 0.08) + "s, transform 0.5s ease " + (index * 0.08) + "s",
  };

  const barStyle: React.CSSProperties = {
    width: animated ? skill.proficiency + "%" : "0%",
    background: "linear-gradient(90deg, " + skill.color + "80, " + skill.color + ")",
    transitionDelay: (index * 0.08 + 0.3) + "s",
  };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-xl border border-slate-800 bg-slate-900/60 p-5 card-hover cursor-default"
      style={cardStyle}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {skill.icon}
          <div>
            <div className="font-sans font-semibold text-sm text-white">
              {skill.name}
            </div>
            <div className="font-mono text-xs mt-0.5" style={{ color: skill.color }}>
              {skill.category}
            </div>
          </div>
        </div>
        <span className="font-mono text-xs font-bold" style={{ color: skill.color }}>
          {skill.proficiency}%
        </span>
      </div>

      <p className="font-mono text-xs text-slate-500 leading-relaxed mb-4">
        {skill.description}
      </p>

      <div className="mb-4">
        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={barStyle}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {skill.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2 py-0.5 rounded border"
            style={{
              borderColor: skill.color + "30",
              color: skill.color + "90",
              backgroundColor: skill.color + "08",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillGrid() {
  return (
    <section id="skills" className="py-24 px-4 relative grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-emerald-500 text-sm">04.</span>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              Technical Arsenal
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-3">
            Skill Grid
          </h2>
          <p className="font-mono text-sm text-slate-400 max-w-xl">
            A battle-tested toolkit spanning E2E automation, performance
            engineering, API validation, and DevOps infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Testing Frameworks", value: "8+" },
            { label: "Languages", value: "TypeScript, JS, Python" },
            { label: "CI Platforms", value: "GH Actions, Jenkins, CircleCI" },
            { label: "Years Experience", value: "7+" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-lg border border-slate-800 bg-slate-900/40"
            >
              <div className="font-mono text-xs text-slate-500 mb-1">
                {item.label}
              </div>
              <div className="font-mono text-sm text-emerald-400 font-medium">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
