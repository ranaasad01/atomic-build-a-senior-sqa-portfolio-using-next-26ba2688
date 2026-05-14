"use client";

import { useEffect, useState, useRef } from "react";
import { GitBranch, Activity, Zap, Check, Clock, AlertCircle } from 'lucide-react';

type StageStatus = "idle" | "running" | "passed" | "failed";

interface Stage {
  id: number;
  name: string;
  command: string;
  duration: string;
  icon: React.ReactNode;
  details: string[];
}

const stages: Stage[] = [
  {
    id: 0,
    name: "Code Commit",
    command: "git push origin main",
    duration: "0.3s",
    icon: <GitBranch className="w-5 h-5" />,
    details: ["Branch: main", "Commit: a3f9c2d", "Author: alex-morgan"],
  },
  {
    id: 1,
    name: "E2E Suite",
    command: "npx playwright test --workers=4",
    duration: "4m 12s",
    icon: <Activity className="w-5 h-5" />,
    details: ["Tests: 247", "Passed: 247", "Failed: 0"],
  },
  {
    id: 2,
    name: "Performance Gate",
    command: "k6 run load-test.js --vus=100",
    duration: "2m 30s",
    icon: <Zap className="w-5 h-5" />,
    details: ["P95: 142ms", "Error Rate: 0%", "Threshold: PASS"],
  },
  {
    id: 3,
    name: "Deploy",
    command: "vercel --prod --confirm",
    duration: "1m 45s",
    icon: <Check className="w-5 h-5" />,
    details: ["Region: iad1", "Rollback: Ready", "Status: LIVE"],
  },
];

const STATUS_COLORS: Record<StageStatus, string> = {
  idle: "border-slate-700 bg-slate-900",
  running: "border-emerald-500 bg-emerald-500/10",
  passed: "border-emerald-500/60 bg-emerald-500/5",
  failed: "border-red-500 bg-red-500/10",
};

const STATUS_BADGE: Record<StageStatus, { label: string; color: string }> = {
  idle: { label: "QUEUED", color: "text-slate-500 bg-slate-800" },
  running: { label: "RUNNING", color: "text-emerald-400 bg-emerald-500/20" },
  passed: { label: "PASSED", color: "text-emerald-400 bg-emerald-500/20" },
  failed: { label: "FAILED", color: "text-red-400 bg-red-500/20" },
};

export default function AutomationPipeline() {
  const [statuses, setStatuses] = useState<StageStatus[]>(["idle", "idle", "idle", "idle"]);
  const [connectors, setConnectors] = useState<boolean[]>([false, false, false]);
  const [isRunning, setIsRunning] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasStarted = useRef(false);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setRunCount((c) => c + 1);
    setStatuses(["idle", "idle", "idle", "idle"]);
    setConnectors([false, false, false]);

    const delays = [0, 1200, 3000, 5200];
    const durations = [800, 1800, 2200, 1600];

    stages.forEach((stage, i) => {
      setTimeout(() => {
        setStatuses((prev) => {
          const next = [...prev];
          next[i] = "running";
          return next;
        });
        setTimeout(() => {
          setStatuses((prev) => {
            const next = [...prev];
            next[i] = "passed";
            return next;
          });
          if (i < 3) {
            setTimeout(() => {
              setConnectors((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, 200);
          }
          if (i === 3) {
            setTimeout(() => setIsRunning(false), 500);
          }
        }, durations[i]);
      }, delays[i]);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setTimeout(runPipeline, 600);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="py-24 px-4 relative grid-bg"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-emerald-500 text-sm">02.</span>
            <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
              CI/CD Automation
            </span>
          </div>
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-3">
            Automation Pipeline
          </h2>
          <p className="font-mono text-sm text-slate-400 max-w-xl">
            Every commit triggers a fully automated quality gate — from E2E
            validation to performance thresholds before production deploy.
          </p>
        </div>

        {/* Pipeline run controls */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={runPipeline}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs rounded hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isRunning ? "pipeline_running..." : "run_pipeline()"}
          </button>
          {runCount > 0 && (
            <span className="font-mono text-xs text-slate-500">
              Run #{runCount} · {statuses.filter((s) => s === "passed").length}/4 stages complete
            </span>
          )}
        </div>

        {/* Pipeline stages — desktop horizontal */}
        <div className="hidden md:flex items-start gap-0 mb-8">
          {stages.map((stage, i) => (
            <div key={stage.id} className="flex items-start flex-1">
              {/* Stage card */}
              <div
                className={
                  "flex-1 rounded-lg border p-4 transition-all duration-500 " +
                  STATUS_COLORS[statuses[i]]
                }
                style={
                  statuses[i] === "running"
                    ? { boxShadow: "0 0 20px rgba(16,185,129,0.3)" }
                    : statuses[i] === "passed"
                    ? { boxShadow: "0 0 10px rgba(16,185,129,0.15)" }
                    : {}
                }
              >
                {/* Stage header */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={
                      "p-2 rounded " +
                      (statuses[i] === "idle"
                        ? "bg-slate-800 text-slate-500"
                        : "bg-emerald-500/20 text-emerald-400")
                    }
                  >
                    {statuses[i] === "running" ? (
                      <Clock className="w-5 h-5 animate-spin" />
                    ) : statuses[i] === "passed" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      stage.icon
                    )}
                  </div>
                  <span
                    className={
                      "font-mono text-xs px-2 py-0.5 rounded " +
                      STATUS_BADGE[statuses[i]].color
                    }
                  >
                    {STATUS_BADGE[statuses[i]].label}
                  </span>
                </div>

                {/* Stage name */}
                <div className="font-sans font-semibold text-sm text-white mb-1">
                  {stage.name}
                </div>

                {/* Command */}
                <div className="font-mono text-xs text-slate-500 mb-3 truncate">
                  $ {stage.command}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  {stage.details.map((d) => (
                    <div key={d} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                      <span className="font-mono text-xs text-slate-500">{d}</span>
                    </div>
                  ))}
                </div>

                {/* Duration */}
                <div className="mt-3 pt-3 border-t border-slate-800 font-mono text-xs text-slate-600">
                  duration: {stage.duration}
                </div>
              </div>

              {/* Connector */}
              {i < stages.length - 1 && (
                <div className="flex items-center justify-center w-8 mt-8 flex-shrink-0">
                  <div className="relative w-full h-0.5 bg-slate-800">
                    <div
                      className="absolute inset-0 bg-emerald-500 transition-all duration-700"
                      style={{ width: connectors[i] ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pipeline stages — mobile vertical */}
        <div className="md:hidden space-y-3 mb-8">
          {stages.map((stage, i) => (
            <div key={stage.id}>
              <div
                className={
                  "rounded-lg border p-4 transition-all duration-500 " +
                  STATUS_COLORS[statuses[i]]
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={
                        "p-1.5 rounded " +
                        (statuses[i] === "idle"
                          ? "bg-slate-800 text-slate-500"
                          : "bg-emerald-500/20 text-emerald-400")
                      }
                    >
                      {statuses[i] === "running" ? (
                        <Clock className="w-4 h-4 animate-spin" />
                      ) : statuses[i] === "passed" ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        stage.icon
                      )}
                    </div>
                    <div>
                      <div className="font-sans font-semibold text-sm text-white">
                        {stage.name}
                      </div>
                      <div className="font-mono text-xs text-slate-500">
                        {stage.duration}
                      </div>
                    </div>
                  </div>
                  <span
                    className={
                      "font-mono text-xs px-2 py-0.5 rounded " +
                      STATUS_BADGE[statuses[i]].color
                    }
                  >
                    {STATUS_BADGE[statuses[i]].label}
                  </span>
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-0.5 h-4 bg-slate-800 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-emerald-500 transition-all duration-700"
                      style={{ height: connectors[i] ? "100%" : "0%" }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pipeline summary bar */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              {[
                { label: "Total Tests", value: "247" },
                { label: "Pass Rate", value: "100%" },
                { label: "P95 Latency", value: "142ms" },
                { label: "Deploy Time", value: "~8m" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="font-mono text-lg font-bold text-emerald-400">
                    {m.value}
                  </div>
                  <div className="font-mono text-xs text-slate-500">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-emerald-500" />
              <span className="font-mono text-xs text-slate-400">
                All quality gates passing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
