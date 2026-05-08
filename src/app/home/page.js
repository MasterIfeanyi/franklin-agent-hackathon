import Link from "next/link";
import { FiBook, FiFileText, FiZap, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: FiBook,
    title: "Story Library",
    description:
      "Browse AI-generated children's stories across Horror, Comedy, Folklore, and Action genres.",
    href: "/story",
  },
  {
    icon: FiFileText,
    title: "Text Summarizer",
    description:
      "Paste any long text and get a clear, concise summary powered by AI smart routing.",
    href: "/summarize",
  },
  {
    icon: FiZap,
    title: "Create your own Story",
    description:
      "Describe your idea and let our AI write a children's story — genre detected automatically.",
    href: "/generate",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Left — Hero */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full border border-border text-xs font-semibold text-muted-foreground tracking-wide uppercase">
            <FiZap size={11} />
            Franklin AI Smart Routing
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-tight">
            <Image
                src="/images/pix.png"
                width={120} height={120}
                className="-mx-3"
                alt="logo-sun"
            />
            Tales<span className="text-brand">AI</span>
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            Generate magical children's stories and summarize any text —
            all routed intelligently to the best AI model for the job.
          </p>

        </div>

        {/* Right — Feature Cards */}
        <div className="flex flex-col gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.href}
                href={feature.href}
                className="group flex items-start gap-4 p-5 bg-surface border border-border rounded-lg hover:border-brand/50 hover:shadow-card transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-md bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-brand" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <FiArrowRight
                  size={16}
                  className="text-muted-foreground group-hover:text-brand group-hover:translate-x-1 transition-all mt-1 shrink-0"
                />
              </Link>
            );
          })}
        </div>

      </section>
    </main>
  );
}