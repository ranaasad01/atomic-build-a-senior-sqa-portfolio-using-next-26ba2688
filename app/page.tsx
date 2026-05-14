export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutomationPipeline from "@/components/AutomationPipeline";
import TerminalSection from "@/components/TerminalSection";
import SkillGrid from "@/components/SkillGrid";
import ImpactCards from "@/components/ImpactCards";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Automation Pipeline */}
      <AutomationPipeline />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />

      {/* Terminal */}
      <TerminalSection />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      {/* Skill Grid */}
      <SkillGrid />

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />

      {/* Impact Cards */}
      <ImpactCards />

      {/* Footer / Contact */}
      <Footer />
    </main>
  );
}
