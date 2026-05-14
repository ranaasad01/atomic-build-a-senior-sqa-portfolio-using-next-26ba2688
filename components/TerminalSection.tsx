"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal, Circle } from 'lucide-react';

interface LogLine {
  text: string;
  type: "pass" | "fail" | "info" | "dim" | "header" | "separator";
  delay: number;
}

const LOG_LINES: LogLine[] = [
  { text: "  Playwright Test Runner v1.42.0", type: "header", delay: 0 },
  { text: "  Running 247 tests using 4 workers", type: "info", delay: 200 },
  { text: "", type: "separator", delay: 400 },
  { text: "  [chromium] › auth/login.spec.ts:12 › Login › valid credentials", type: "pass", delay: 700 },
  { text: "  [chromium] › auth/login.spec.ts:28 › Login › invalid password shows error", type: "pass", delay: 1000 },
  { text: "  [chromium] › auth/login.spec.ts:44 › Login › rate limiting after 5 attempts", type: "pass", delay: 1300 },
  { text: "  [firefox] › dashboard/overview.spec.ts:8 › Dashboard › loads within 2s", type: "pass", delay: 1600 },
  { text: "  [firefox] › dashboard/overview.spec.ts:22 › Dashboard › renders all widgets", type: "pass", delay: 1900 },
  { text: "  [webkit] › api/users.spec.ts:15 › Users API › GET /users returns 200", type: "pass", delay: 2200 },
  { text: "  [webkit] › api/users.spec.ts:31 › Users API › POST /users validates schema", type: "pass", delay: 2500 },
  { text: "  [chromium] › checkout/flow.spec.ts:9 › Checkout › complete purchase flow", type: "pass", delay: 2800 },
  { text: "  [chromium] › checkout/flow.spec.ts:45 › Checkout › payment retry on failure", type: "pass", delay: 3100 },
  { text: "  [firefox] › search/filters.spec.ts:12 › Search › filter by category", type: "pass", delay: 3400 },
  { text: "  [webkit] › search/filters.spec.ts:28 › Search › pagination works correctly", type: "pass", delay: 3700 },
  { text: "", type: "separator", delay: 4000 },
  { text: "  Running K6 Performance Gate...", type: "info", delay: 4200 },
  { text: "  scenarios: (100.00%) 1 scenario, 100 max VUs, 2m30s max duration", type: "dim", delay: 4500 },
  { text: "  ✓ http_req_duration.............: avg=98ms  p(95)=142ms", type: "pass", delay: 4800 },
  { text: "  ✓ http_req_failed...............: 0.00%  ✓ 0  ✗ 0", type: "pass", delay: 5100 },
  { text: "  ✓ checks........................: 100.00% ✓ 18000 ✗ 0", type: "pass", delay: 5400 },
  { text: "", type: "separator", delay: 5700 },
  { text: "  Running Postman API Contract Tests...", type: "info", delay: 5900 },
  { text: "  ✓ GET  /api/v2/users        200 OK  (45ms)", type: "pass", delay: 6200 },
  { text: "  ✓ POST /api/v2/users        201 Created  (67ms)", type: "pass", delay: 6500 },
  { text: "  ✓ PUT  /api/v2/users/:id    200 OK  (52ms)", type: "pass", delay: 6800 },
  { text: "  ✓ DEL  /api/v2/users/:id    204 No Content  (38ms)", type: "pass", delay: 7100 },
  { text: "  ✓ GET  /api/v2/products     200 OK  (41ms)", type: "pass", delay: 7400 },
  { text: "  ✓ POST /api/v2/orders       201 Created  (89ms)", type: "pass", delay: 7700 },
  { text: "", type: "separator", delay: 8000 },
  { text: "  247 passed (8m 27s)", type: "header", delay: 8300 },
  { text: "  0 failed · 0 skipped · 0 flaky", type: "info", delay: 8600 },
  { text: "", type: "separator", delay: 8900 },
  { text: "  ✓ All quality gates passed — deploying to production", type: "pass", delay: 9200 },
  { text: "  ✓ Zero-downtime deployment complete", type: "pass", delay: 9600 },
  { text: "  ✓ Health checks passing on all regions", type: "pass", delay: 10000 },
];

const LINE_COLORS: Record<LogLine["type"], string> = {
  pass: "text-emerald-400",
  fail: "text-red-400",
  info: "text-slate-300",
  dim: "text-slate-500",
  header: "text-white font-semibold",
  separator: "text-transparent",
};

export default function TerminalSection() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasStarted = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startAnimation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCompleted(false);
    setVisibleLines(0);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    LOG_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(i + 1);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (i === LOG_LINES.length - 1) {
          setIsRunning(false);
          setCompleted(true);
        }
      }, line.delay);
      timeoutsRef.current.push(t);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setTimeout(startAnimation, 400);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      timeoutsRef.current.forEach(clearTimeout);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="terminal"
      ref={sectionRef}
      className="py-24 px-4 relative"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: description */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-emerald-500 text-sm">03.</span>
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">
                Live Execution
              </span>
            </div>
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-white mb-4">
              Test Runner
              <br />
              <span className="gradient-text">Command Center</span>
            </h2>
            <p className="font-mono text-sm text-slate-400 mb-6 leading-relaxed">
              Real-time test execution across Playwright E2E, K6 performance
              gates, and Postman API contract tests — all wired into a single
              CI/CD pipeline.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  label: "Playwright",
                  desc: "Cross-browser E2E across Chromium, Firefox & WebKit",
                  count: "247 tests",
                },
                {
                  label: "K6 Load Testing",
                  desc: "Performance gates with P95 latency thresholds",
                  count: "100 VUs",
                },
                {
                  label: "Postman / Newman",
                  desc: "API contract validation on every pipeline run",
                  count: "100% coverage",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 p-3 rounded border border-slate-800 bg-slate-900/50 hover:border-emerald-500/30 transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-white font-medium">
                        {item.label}
                      </span>
                      <span className="font-mono text-xs text-emerald-400">
                        {item.count}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={startAnimation}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs rounded hover:bg-emerald-500/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Terminal className="w-4 h-4" />
              {isRunning ? "executing..." : "replay_tests()"}
            </button>
          </div>

          {/* Right: terminal */}
          <div className="rounded-xl border border-slate-700/60 overflow-hidden shadow-2xl">
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-700/60">
              <Circle className="w-3 h-3 text-red-500 fill-red-500" />
              <Circle className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500" />
              <span className="ml-3 font-mono text-xs text-slate-500">
                alex@sqa-runner: ~/projects/e2e-suite
              </span>
              <div className="ml-auto flex items-center gap-2">
                {isRunning && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    running
                  </span>
                )}
                {completed && !isRunning && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    complete
                  </span>
                )}
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="bg-slate-950 p-4 h-96 overflow-y-auto font-mono text-xs leading-6 scroll-smooth"
            >
              <div className="text-slate-500 mb-2">
                $ npx playwright test && k6 run load-test.js && newman run api-suite.json
              </div>
              <div className="text-slate-600 mb-3">
                ─────────────────────────────────────────────────
              </div>

              {LOG_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={LINE_COLORS[line.type]}>
                  {line.type === "pass" ? (
                    <span>
                      <span className="text-emerald-500">✓</span>
                      {line.text.replace(/^  ✓/, "  ")}
                    </span>
                  ) : line.type === "separator" ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.text
                  )}
                </div>
              ))}

              {/* Blinking cursor */}
              {(isRunning || visibleLines === 0) && (
                <span className="text-emerald-400 cursor-blink">█</span>
              )}

              {completed && (
                <div className="mt-2 text-slate-500">
                  $ <span className="cursor-blink text-emerald-400">_</span>
                </div>
              )}
            </div>

            {/* Terminal footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-t border-slate-700/60">
              <span className="font-mono text-xs text-slate-600">
                bash · utf-8 · LF
              </span>
              <span className="font-mono text-xs text-emerald-500">
                {visibleLines}/{LOG_LINES.length} lines
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
