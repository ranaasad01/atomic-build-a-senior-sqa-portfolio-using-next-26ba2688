import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Morgan | Senior SQA & Automation Engineer",
  description:
    "Senior SQA & Automation Engineer specializing in Playwright, K6, CI/CD pipelines, and zero-downtime deployments. Engineering Command Center portfolio.",
  keywords: [
    "SQA Engineer",
    "Automation Engineer",
    "Playwright",
    "K6",
    "CI/CD",
    "Quality Assurance",
    "Test Automation",
    "DevOps",
  ],
  authors: [{ name: "Alex Morgan" }],
  openGraph: {
    title: "Alex Morgan | Senior SQA & Automation Engineer",
    description: "Scaling Reliability & CI/CD Pipelines",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased scanlines">
        {children}
      </body>
    </html>
  );
}
