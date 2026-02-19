"use client";

import { AnalyzeResponse } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "./RiskBadge";
import { SeverityMeter } from "./SeverityMeter";
import {
  Download,
  Copy,
  Dna,
  Activity,
  BrainCircuit,
  BookOpen,
  Microscope,
} from "lucide-react";
import { toast } from "sonner";

interface ResultCardProps {
  result: AnalyzeResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    toast.success("JSON copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.drug}_analysis.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("JSON downloaded");
  };

  // Helper to determine border color based on severity
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
      case "high":
        return "oklch(0.577 0.245 27.325)"; // Red-ish
      case "moderate":
        return "oklch(0.795 0.184 86.047)"; // Yellow-ish
      default:
        return "oklch(0.623 0.184 149.214)"; // Green-ish
    }
  };

  return (
    <Card
      className="w-full overflow-hidden border-l-4 shadow-md transition-shadow hover:shadow-lg"
      style={{
        borderLeftColor: getSeverityColor(result.risk_assessment.severity),
      }}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-transparent to-primary/5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2 flex-wrap text-primary">
              {result.drug}
              <RiskBadge level={result.risk_assessment.risk_label} />
            </CardTitle>
            <CardDescription className="mt-1 flex items-center gap-2">
              <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                ID: {result.patient_id}
              </span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="w-3.5 h-3.5 mr-2" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-3.5 h-3.5 mr-2" /> JSON
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Risk & Confidence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary/50 rounded-xl space-y-3 border border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Activity className="w-4 h-4 text-primary" />
              Confidence Score
            </div>
            <SeverityMeter
              value={result.risk_assessment.confidence_score}
              label={`${(result.risk_assessment.confidence_score * 100).toFixed(0)}% Confidence`}
            />
          </div>
          <div className="p-4 bg-secondary/50 rounded-xl space-y-3 border border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Dna className="w-4 h-4 text-primary" />
              Genomic Profile
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">
                  Gene
                </span>
                <span className="font-semibold text-lg font-mono">
                  {result.pharmacogenomic_profile.primary_gene}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">
                  Diplotype
                </span>
                <span className="font-medium font-mono bg-background px-2 py-0.5 rounded inline-block border">
                  {result.pharmacogenomic_profile.diplotype}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground block text-xs uppercase tracking-wider">
                  Phenotype
                </span>
                <span className="font-semibold text-primary">
                  {result.pharmacogenomic_profile.phenotype}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Accordion */}
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="ai-explanation"
        >
          <AccordionItem value="clinical" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-2 px-4 rounded-lg hover:bg-muted/50 data-[state=open]:bg-muted/50">
              <span className="font-semibold">Clinical Recommendation</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-2">
              <div className="p-4 bg-sky-50 dark:bg-sky-950/20 rounded-lg border border-sky-100 dark:border-sky-900 group transition-colors hover:border-sky-200 dark:hover:border-sky-800">
                <h4 className="font-semibold text-sky-900 dark:text-sky-100 mb-2 flex items-center gap-2">
                  Dose Adjustment
                </h4>
                <p className="text-sky-800 dark:text-sky-200 leading-relaxed font-medium">
                  {result.clinical_recommendation.dose_adjustment}
                </p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800">
                <h4 className="font-semibold mb-2 text-slate-900 dark:text-slate-100">
                  Monitoring Advice
                </h4>
                <p className="text-slate-600 dark:text-slate-400">
                  {result.clinical_recommendation.monitoring}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* AI Explanation Section */}
          {result.llm_generated_explanation && (
            <AccordionItem value="ai-explanation" className="border-b-0 mt-4">
              <AccordionTrigger className="hover:no-underline py-2 px-4 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 data-[state=open]:bg-purple-50 dark:data-[state=open]:bg-purple-900/20">
                <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                  <BrainCircuit className="w-5 h-5" />
                  <span className="font-semibold">AI Clinical Explanation</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 px-2">
                <div className="p-4 bg-purple-50/50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800 space-y-4">
                  {/* Summary */}
                  <div>
                    <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                      Summary
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {result.llm_generated_explanation.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Mechanism */}
                    <div className="bg-background/50 p-3 rounded-md border border-purple-100 dark:border-purple-800/50">
                      <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                        <Microscope className="w-3 h-3" /> Biological Mechanism
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {result.llm_generated_explanation.biological_mechanism}
                      </p>
                    </div>

                    {/* Reasoning */}
                    <div className="bg-background/50 p-3 rounded-md border border-purple-100 dark:border-purple-800/50">
                      <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-2">
                        <BookOpen className="w-3 h-3" /> Clinical Reasoning
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        {result.llm_generated_explanation.clinical_reasoning}
                      </p>
                    </div>
                  </div>

                  {/* Citation */}
                  <div className="text-[10px] text-muted-foreground pt-2 border-t border-purple-200 dark:border-purple-800 flex justify-end italic">
                    Sources: {result.llm_generated_explanation.citations}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}
