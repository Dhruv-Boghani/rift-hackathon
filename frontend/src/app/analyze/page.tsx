"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";
import { DrugInput } from "@/components/DrugInput";
import { ResultCard } from "@/components/ResultCard";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { MOCK_RESULTS_MULTI, DrugResult } from "@/lib/mockData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [drugs, setDrugs] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<DrugResult[] | null>(null);

  const handleAnalyze = () => {
    if (!file || !drugs) {
      toast.error("Please provide both a VCF file and drug name(s).");
      return;
    }

    setIsAnalyzing(true);
    setResults(null);

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      // For demo, we just return the mock results regardless of input
      // In a real app, this would filter or fetch based on `drugs` and `file`
      setResults(MOCK_RESULTS_MULTI);
      toast.success("Analysis complete");
    }, 2500);
  };

  const handleReset = () => {
    setResults(null);
    setFile(null);
    setDrugs("");
    setIsAnalyzing(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="px-6 h-16 flex items-center border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary mr-8">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <ShieldCheck className="w-6 h-6" />
            <span>PharmaGuard</span>
          </Link>
        </div>
        <nav className="flex gap-4 ml-auto">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar: Controls */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-1">Input Data</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your VCF file and specify medications to analyze.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Genetic File (VCF)
                  </label>
                  {/* Note: FileUpload handles its own state, but we also track it here. 
                           Ideally FileUpload should be controlled or use a ref, but for this mock, 
                           tracking `file` via callback is enough. 
                           Resetting FileUpload requires a ref or key change. 
                           For simplicity, we mount a fresh one on reset by key.
                       */}
                  <FileUpload
                    key={file ? "loaded" : "empty"}
                    onFileSelect={setFile}
                  />
                </div>

                <DrugInput value={drugs} onChange={setDrugs} />

                <Button
                  className="w-full h-12 text-lg font-semibold shadow-md transition-all active:scale-95"
                  onClick={handleAnalyze}
                  disabled={!file || !drugs || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Analyze Risk"
                  )}
                </Button>
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-xs text-muted-foreground p-4 bg-muted/30 rounded-lg">
              <p>
                <strong>Note:</strong> This is a demo. Upload any .vcf file and
                enter any drug names to see the mock results.
              </p>
            </div>
          </div>

          {/* Right Content: Results */}
          <div className="lg:col-span-8 min-h-[500px]">
            {/* Initial State */}
            {!results && !isAnalyzing && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center text-muted-foreground bg-muted/5 animate-in fade-in duration-500">
                <div className="p-4 bg-muted/20 rounded-full mb-4">
                  <ShieldCheck className="w-12 h-12 text-muted-foreground/40" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Ready to Analyze</h3>
                <p className="max-w-md text-sm text-muted-foreground">
                  Upload your genome data and enter drugs to receive
                  personalized pharmacogenomic risk assessments and AI-driven
                  clinical insights.
                </p>
              </div>
            )}

            {/* Loading State */}
            {isAnalyzing && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <Alert className="bg-primary/5 border-primary/20 text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <AlertTitle>Analyzing Genomic Data</AlertTitle>
                  <AlertDescription>
                    Parsing VCF variants, mapping to CPIC guidelines, and
                    generating AI insights...
                  </AlertDescription>
                </Alert>

                {/* Simulated Loading Skeletons */}
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-card p-6 space-y-4 opacity-70"
                  >
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-muted/50 rounded w-1/3 animate-pulse"></div>
                      <div className="h-6 bg-muted/50 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted/50 rounded animate-pulse"></div>
                      <div className="h-24 bg-muted/50 rounded animate-pulse"></div>
                    </div>
                    <div className="h-12 bg-muted/50 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Results State */}
            {results && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <h2 className="text-2xl font-bold">Analysis Results</h2>
                    <p className="text-sm text-muted-foreground">
                      Risk assessment based on uploaded genome.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    Start New Analysis
                  </Button>
                </div>

                <div className="grid gap-6">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="animate-in fade-in slide-in-from-bottom-2"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <ResultCard result={result} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
