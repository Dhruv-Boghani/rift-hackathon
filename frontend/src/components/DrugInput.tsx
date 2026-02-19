"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pill } from "lucide-react";

interface DrugInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DrugInput({ value, onChange }: DrugInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="drug-input" className="flex items-center gap-2">
        <Pill className="w-4 h-4 text-primary" />
        Drug Name(s)
      </Label>
      <Input
        id="drug-input"
        placeholder="e.g., Warfarin, Clopidogrel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 bg-background border-input focus-visible:ring-primary"
      />
      <p className="text-xs text-muted-foreground">
        Enter a single drug name or multiple separated by commas.
      </p>
    </div>
  );
}
