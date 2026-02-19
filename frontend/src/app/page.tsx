import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Dna,
  ShieldCheck,
  Activity,
  BrainCircuit,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-md fixed top-0 w-full z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <ShieldCheck className="w-6 h-6" />
          <span>PharmaGuard</span>
        </div>
        <nav className="ml-auto flex gap-4">
          <Button variant="ghost" asChild>
            <Link href="/analyze">Analyze</Link>
          </Button>
          <Button asChild>
            <Link href="/analyze" className="rounded-full">
              Get Started
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="py-24 px-6 text-center space-y-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
            v1.0 Public Beta
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-4xl mx-auto leading-tight">
            Precision Medicine <br className="hidden md:block" />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Powered by AI
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your genetic data to receive personalized pharmacogenomic
            risk assessments and AI-driven clinical insights.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/analyze">
                Start Analysis <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Dna className="w-8 h-8 text-blue-500" />}
              title="VCF Parsing"
              description="Securely process standard VCF files to extract relevant genetic variants."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-teal-500" />}
              title="CPIC Guidelines"
              description="Automatic mapping to latest CPIC/PharmGKB clinical guidelines."
            />
            <FeatureCard
              icon={<BrainCircuit className="w-8 h-8 text-indigo-500" />}
              title="AI Explanation"
              description="LLM-generated summaries explaining biological mechanisms."
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8 text-rose-500" />}
              title="Risk Dashboard"
              description="Clear visual indicators for toxicity risks and dosage adjustments."
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t bg-muted/20">
        <p>© 2024 PharmaGuard. AI-Powered Pharmacogenomics.</p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="mb-4 bg-secondary/50 w-fit p-3 rounded-xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
