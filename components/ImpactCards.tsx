"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Shield, Activity, ArrowUp, Clock, Check } from 'lucide-react';

interface ImpactCard {
  id: number;
  stat: string;
  label: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
  accentColor: string;
  metrics: { label: string; value: string }[];
}

const impactCards: ImpactCard[] = [
  {
    id: 1,
    stat: "80%",
    label: "Faster Regression",
    description: "Reduced full regression suite runtime from 6 hours to 72 minutes through parallel execution, smart test selection, and containerized runners.",
    detail: "6h → 72min",
    icon: <Zap className="w-6 h-6" />,
    accentColor: "#10b981",
    metrics: [
      { label: "Before", value: "6h 00m" },
      { label: "After", value: "72 min" },
      { label: "Workers", value: "16 parallel" },
      { label: "Flakiness", value: "0.2%" },
    ],
  },
  {
    id: 2,
    stat: "Zero",
    label: "Downtime Deployments",
    description: "Architected blue-green deployment pipelines with automated rollback triggers, health checks, and canary release validation across all production regions.",
    detail: "99.98% uptime",
    icon: <Shield className="w-6 h-6" />,
    accentColor: "#6366f1",
    metrics: [
      { label: "Uptime SLA", value: "99.98%" },
      { label: "Rollback Time", value: "< 30s" },
      { label: "Regions", value: "4 global" },
      { label: "Incidents", value: "0 in 18mo" },
    ],
  },
  {
    id: 3,
    stat: "100%",
    label: "API Coverage",
    description: "Achieved complete API contract coverage across 200+ endpoints using Postman collections, schema validation, and automated Newman runs in every CI build.",
    detail: "200+ endpoints",
    icon: <Activity className="w-6 h-6" />,
    accentColor: "#f59e0b",
    metrics: [
      { label: "Endpoints", value: "200+" },
      { label: "Schemas", value: "Validated" },
      { label: "Run Frequency", value: "Every PR" },
      { label: "Drift Alerts", value: "Real-time" },
    ],
  },
];

const additionalMetrics = [
  { icon: <ArrowUp className="w-4 h-4" />, value: "94%", label: "Defect Detection Rate", color: "#10b981" },
  { icon: <Clock className="w-4 h-4" />, value: "< 8min", label: "Pipeline Feedback Loop", color: "#6366f1" },
  { icon: <Check className="w-4 h-4" />, value: "2,847", label: "Automated Test Cases", color: "#f59e0b" },
  { icon: <Shield className="w-4 h-4" />, value: "40+", label: "CI/CD Pipelines Built", color: "#10b981" },
];

function ImpactCard({ card, index }: { card: ImpactCard; index: number }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-xl border border-slate-800 bg-slate-900/60 p-6 card-hover overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: card.accentColor + "08",
          filter: "blur(30px)",
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-2.5 rounded-lg"
          style={{
            backgroundColor: card.accentColor + "15",
            color: card.accentColor,
          }}
        >
          {card.icon}
        </div>
        <span
          className="font-mono text-xs px-2 py-1 rounded border"
          style={{
            borderColor: card.accentColor + "30",
            color: card.accentColor,
            backgroundColor: card.accentColor + "10",
          }}
        >
          {card.detail}
        </span>
      </div>

      {/* Stat */}
      <div
        className="font-sans font-black text-5xl sm:text-6xl mb-1 leading-none"
        style={{ color: card.accentColor }}
      >
        {card.stat}
      </div>
      <div className="font-sans font-bold text-lg text-white mb-3">
        {card.label}
      </div>

      {/* Description */}
      <p className="font-mono text-xs text-slate-400 leading-relaxed mb-5">
        {card.description}
      </p>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800">
        {card.metrics.map((m) => (
          <div key={m.label}>
            <div
              className="font-mono text-sm font-semibold"
              style={{ color: card.accentColor }}
            >
              {m.value}
            </div>
            <div className="font-mono text-xs text-slate-600">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ImpactCards() {
  const [metricsVisible, setMetricsVisible] = useState(false);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setMetricsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impact" className="py-24 px-4 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-emerald-500 text-sm">05.</span>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              Measurable Results
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-3">
            Engineering Impact
          </h2>
          <p className="font-mono text-sm text-slate-400 max-w-xl">
            Quality engineering measured in outcomes — not just test counts.
            Real metrics from production systems at scale.
          </p>
        </div>

        {/* Main impact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {impactCards.map((card, i) => (
            <ImpactCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Additional metrics bar */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {additionalMetrics.map((m, i) => (
            <div
              key={m.label}
              className="flex items-center gap-3 p-4 rounded-lg border border-slate-800 bg-slate-900/40"
              style={{
                opacity: metricsVisible ? 1 : 0,
                transform: metricsVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease " + (i * 0.1) + "s, transform 0.5s ease " + (i * 0.1) + "s",
              }}
            >
              <div
                className="p-2 rounded"
                style={{ backgroundColor: m.color + "15", color: m.color }}
              >
                {m.icon}
              </div>
              <div>
                <div
                  className="font-mono text-lg font-bold"
                  style={{ color: m.color }}
                >
                  {m.value}
                </div>
                <div className="font-mono text-xs text-slate-500">{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial / quote */}
        <div className="mt-10 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-start gap-4">
            <div className="text-emerald-500 font-mono text-4xl leading-none mt-1 opacity-50">
              &ldquo;
            </div>
            <div>
              <p className="font-mono text-sm text-slate-300 leading-relaxed mb-3">
                Alex transformed our QA process from a bottleneck into a
                competitive advantage. The automated pipeline he built reduced
                our release cycle from 2 weeks to 2 days while maintaining
                zero production incidents over 18 months.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <span className="font-mono text-xs text-emerald-400">JR</span>
                </div>
                <div>
                  <div className="font-mono text-xs text-white">
                    James Rodriguez
                  </div>
                  <div className="font-mono text-xs text-slate-500">
                    VP Engineering, TechScale Inc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
