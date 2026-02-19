import { Progress } from "@/components/ui/progress";

interface SeverityMeterProps {
  value: number; // 0 to 1
  label?: string;
  className?: string;
}

export function SeverityMeter({ value, label, className }: SeverityMeterProps) {
  const percentage = Math.round(value * 100);

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {label && (
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{label}</span>
          <span className="font-medium text-foreground">{percentage}%</span>
        </div>
      )}
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
