"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface JsonViewerProps {
  data: any;
  title?: string;
  className?: string;
}

export function JsonViewer({
  data,
  title = "Raw JSON Data",
  className,
}: JsonViewerProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    toast.success("Copied to clipboard");
  };

  return (
    <div
      className={`w-full rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
        <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="h-7 w-7"
        >
          <Copy className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div className="overflow-hidden rounded-b-xl">
        <pre className="p-4 overflow-auto text-xs font-mono max-h-[300px] bg-slate-950 text-slate-50 dark:bg-black dark:text-emerald-400">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
